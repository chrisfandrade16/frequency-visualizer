import findFundamentalFrequency from "utils/findFundamentalFrequency";
import { ALL_NOTES } from "constants/arrays";

const updateFrequencyGraph = (
	analyzerNode,
	samplingRate,
	fastFourierTransformSize,
	canvasRef,
	setViislbeNoteLetter,
	setVisisbleNoteOctave,
	setVisibleNoteAccidental
) => {
	console.log(`Sampling rate: ${samplingRate}`);
	console.log(`Fast fourier transform size: ${fastFourierTransformSize}`);

	const maximumMicrophoneFrequency = samplingRate / 2;

	console.log(`Maximum microphone frequency: ${maximumMicrophoneFrequency}`);

	const numberOfDecibelValuesPerFrequencyResolution =
		fastFourierTransformSize / 2;

	console.log(
		`Number of decibel values per frequency resolution: ${numberOfDecibelValuesPerFrequencyResolution}`
	);

	const frequencyResolution =
		maximumMicrophoneFrequency / numberOfDecibelValuesPerFrequencyResolution;

	console.log(`Frequency resolution: ${frequencyResolution}`);

	// each element is the decibel loudness for each frequency resolution
	const decibelValuesPerFrequencyResolution = new Uint8Array(
		numberOfDecibelValuesPerFrequencyResolution
	);
	analyzerNode.getByteFrequencyData(decibelValuesPerFrequencyResolution);

	const maximumDeiredFrequency = 7902; // B8
	const numberOfFrequencyValues = Math.round(
		maximumDeiredFrequency / frequencyResolution
	);

	console.log(`Number of frequency values: ${numberOfFrequencyValues}`);

	let barWidthInGraph = canvasRef.width / numberOfFrequencyValues;

	console.log(`Bar width in graph: ${barWidthInGraph}`);

	const canvasContext = canvasRef.getContext("2d");
	const redRGB = "rgb(227,22,61)";
	const whiteRGB = "rgb(255,255,255)";

	canvasContext.fillStyle = redRGB;
	canvasContext.fillRect(0, 0, canvasRef.width, canvasRef.height);

	for (let bar = 0; bar < numberOfFrequencyValues; bar++) {
		// dividng by 2 since since 1 pixel per frequency is too high
		const barHeightInGraph = decibelValuesPerFrequencyResolution[bar] / 2;

		const barXLocationInGraph = bar * barWidthInGraph;
		const barYLocationInGraph = canvasRef.height - barHeightInGraph;

		canvasContext.fillStyle = whiteRGB;
		canvasContext.fillRect(
			barXLocationInGraph,
			barYLocationInGraph,
			barWidthInGraph,
			barHeightInGraph
		);
	}

	const frequencyRangeToDecibelValueMap = new Array(numberOfFrequencyValues);

	for (let index = 0; index < numberOfFrequencyValues; index++) {
		const lowerBoundFrequencyRange = index * frequencyResolution;
		const upperBoundFrequencyRange =
			lowerBoundFrequencyRange + frequencyResolution;
		frequencyRangeToDecibelValueMap[index] = [
			[lowerBoundFrequencyRange, upperBoundFrequencyRange], // discrete frequency
			decibelValuesPerFrequencyResolution[index], // loudness detected in that range
		];
	}

	const fundamentalFrequency = findFundamentalFrequency(
		frequencyRangeToDecibelValueMap
	);
	const numberOfSemitonesPerOctave = 12;
	const A4Frequency = 440;
	const A4Index = 57;
	const semitoneDistanceFromA4 = Math.round(
		numberOfSemitonesPerOctave * Math.log2(fundamentalFrequency / A4Frequency)
	);
	const noteIndex = A4Index + semitoneDistanceFromA4;

	if (noteIndex >= 0 && noteIndex < ALL_NOTES.length) {
		const noteFull = ALL_NOTES[noteIndex];
		setViislbeNoteLetter(noteFull.substring(0, 1));
		setVisisbleNoteOctave(noteFull.substring(1, 2));

		if (noteFull.length > 2) {
			setVisibleNoteAccidental(noteFull.substring(2, 7));
		}
	}
};

export default updateFrequencyGraph;
