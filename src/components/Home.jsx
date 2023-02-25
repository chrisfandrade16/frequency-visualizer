import { DIAGONAL_ICON_LINK, MICROPHONE_ICON_LINK } from "constants/links";
import { HOME_HEADING_TEXT, HOME_SUBHEADING_TEXT } from "constants/texts";
import { useEffect, useRef, useState } from "react";
import updateFrequencyGraph from "utils/updateFrequencyGraph";

const Home = () => {
	return (
		<div className="tw-flex tw-flex-row tw-gap-[12px] tw-p-[50px]">
			<HomeLeft />
			<HomeRight />
		</div>
	);
};

const HomeLeft = () => {
	return (
		<div className="tw-flex tw-flex-col tw-gap-[12px] tw-w-[50%]">
			<h1>{HOME_HEADING_TEXT}</h1>
			<h4>{HOME_SUBHEADING_TEXT}</h4>
		</div>
	);
};

const HomeRight = () => {
	const [audioContext, setAudioContext] = useState(null);
	const [analyzerNode, setAnalyzerNode] = useState(null);
	const [mediaStream, setMediaStream] = useState(null);
	const [mediaNode, setMediaNode] = useState(null);
	const [mediaInterval, setMediaInterval] = useState(null);
	const [isMicrophoneInitialized, setIsMicrophoneInitialized] = useState(false);
	const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
	const [visibleNoteLetter, setVisibleNoteLetter] = useState("");
	const [visibleNoteOctave, setVisibleNoteOctave] = useState("");
	const [visibleNoteAccidental, setVisibleNoteAccidental] = useState("");

	const canvasRef = useRef(null);

	const mediaIntervalSpeed = 1;
	const samplingRate = 48000;
	const fastFourierTransformSize = 32768;

	useEffect(() => {
		const newAudioContext = new AudioContext({
			sampleRate: samplingRate,
		});
		setAudioContext(newAudioContext);

		const newAnalyzerNode = new AnalyserNode(newAudioContext, {
			fftSize: fastFourierTransformSize,
			smoothingTimeConstant: 0,
		});
		setAnalyzerNode(newAnalyzerNode);
	}, []);

	<div className="tw-flex tw-flex-col tw-gap-[24px] tw-items-center tw-justify-center tw-w-[50%]">
		<div className="tw-flex tw-flex-row tw-gap-[12px]">
			<h1>{visibleNoteLetter}</h1>
			<div className="tw-flex tw-flex-col tw-gap-[6px]">
				<h5>{visibleNoteOctave}</h5>
				<h5>{visibleNoteAccidental}</h5>
			</div>
		</div>
		<canvas ref={canvasRef}></canvas>
		<div
			className="tw-w-[32px] tw-h-[32px]"
			onClick={async () => {
				if (!isMicrophoneInitialized) {
					try {
						const newMediaStream = await navigator.mediaDevices.getUserMedia({
							audio: true,
							video: false,
						});
						setMediaStream(newMediaStream);

						const newMediaNode = new MediaStreamAudioSourceNode(audioContext, {
							newMediaStream,
						});
						setMediaNode(newMediaNode);

						newMediaNode.connect(analyzerNode);

						setMediaInterval(
							setInterval(() => {
								updateFrequencyGraph(
									analyzerNode,
									samplingRate,
									fastFourierTransformSize,
									canvasRef,
									setVisibleNoteLetter,
									setVisibleNoteOctave,
									setVisibleNoteAccidental
								);
							}, mediaIntervalSpeed)
						);

						setIsMicrophoneInitialized(true);

						setIsMicrophoneOn(true);
					} catch (error) {}
				} else {
					if (!isMicrophoneOn) {
						this.context.resume();
						setMediaInterval(
							setInterval(() => {
								updateFrequencyGraph(
									analyzerNode,
									samplingRate,
									fastFourierTransformSize,
									canvasRef,
									setVisibleNoteLetter,
									setVisibleNoteOctave,
									setVisibleNoteAccidental
								);
							}, mediaIntervalSpeed)
						);
					} else {
						this.context.suspend();
						clearInterval(mediaInterval);
					}
				}

				setIsMicrophoneOn(!isMicrophoneOn);
			}}
		>
			<img src={MICROPHONE_ICON_LINK} id="microphone-symbol"></img>
			{!isMicrophoneOn ? (
				<img src={DIAGONAL_ICON_LINK} id="diagonal-symbol"></img>
			) : null}
		</div>
	</div>;
};

export default Home;
