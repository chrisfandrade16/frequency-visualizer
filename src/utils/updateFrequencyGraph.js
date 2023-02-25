import findFundamentalFrequency from "./findFundamentalFrequency";
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
	const maximumMicrophoneFrequency = samplingRate / 2;
	const numberOfDecibelValuesPerFrequencyResolution =
		fastFourierTransformSize / 2;
	const frequencyResolution =
		maximumMicrophoneFrequency / numberOfDecibelValuesPerFrequencyResolution;

	// each element is the decibel loudness for index * rangeOfFrequencyPerBin frequency
	const decibelValuesPerFrequencyResolution = new Uint8Array(
		numberOfDecibelValuesPerFrequencyResolution
	);
	analyzerNode.getByteFrequencyData(decibelValuesPerFrequencyResolution);

	const maximumDeiredFrequency = 7902; // B8
	const numberOfFrequencyValues = maximumDeiredFrequency / frequencyResolution;

	let barWidthInGraph = canvasRef.width / numberOfFrequencyValues;

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

	const frequenciesMap = new Array(numberOfFrequencyValues);

	for (let index = 0; index < numberOfFrequencyValues; index++) {
		frequenciesMap[index] = [
			index * frequencyResolution, // discrete frequency
			decibelValuesPerFrequencyResolution[index], // loudness of that frequency
		];
	}

	const fundamentalFrequency = findFundamentalFrequency(frequenciesMap);
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
