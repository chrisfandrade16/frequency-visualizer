import {
	HEADING_CLASS,
	HOME_CLASS,
	HOME_LEFT_CLASS,
	HOME_RIGHT_CLASS,
	MICROPHONE_CLASS,
	NOTE_CLASS,
	NOTE_DETAILS_CLASS,
	SUBHEADING_CLASS,
} from "constants/classes";
import MICROPHONE_ICON from "images/microphone.png";
import DIAGONAL_ICON from "images/diagonal.png";
import { HOME_HEADING_TEXT, HOME_SUBHEADING_TEXT } from "constants/texts";
import { useEffect, useRef, useState } from "react";
import updateFrequencyGraph from "utils/updateFrequencyGraph";

const Home = () => {
	return (
		<div className={HOME_CLASS}>
			<HomeLeft />
			<HomeRight />
		</div>
	);
};

const HomeLeft = () => {
	return (
		<div className={HOME_LEFT_CLASS}>
			<div className={HEADING_CLASS}>{HOME_HEADING_TEXT}</div>
			<div className={SUBHEADING_CLASS}>{HOME_SUBHEADING_TEXT}</div>
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

	const mediaIntervalSpeed = 500;
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

	return (
		<div className={HOME_RIGHT_CLASS}>
			<div className={NOTE_CLASS}>
				<div className={HEADING_CLASS}>{visibleNoteLetter}</div>
				<div className={NOTE_DETAILS_CLASS}>
					<div className={SUBHEADING_CLASS}>{visibleNoteOctave}</div>
					<div className={SUBHEADING_CLASS}>{visibleNoteAccidental}</div>
				</div>
			</div>
			<canvas ref={canvasRef}></canvas>
			<div
				className={MICROPHONE_CLASS}
				onClick={async () => {
					if (!isMicrophoneInitialized) {
						try {
							const newMediaStream = await navigator.mediaDevices.getUserMedia({
								audio: true,
								video: false,
							});
							setMediaStream(newMediaStream);

							console.log();

							const newMediaNode = new MediaStreamAudioSourceNode(
								audioContext,
								{
									mediaStream: newMediaStream,
								}
							);
							setMediaNode(newMediaNode);

							newMediaNode.connect(analyzerNode);

							setMediaInterval(
								setInterval(() => {
									updateFrequencyGraph(
										analyzerNode,
										samplingRate,
										fastFourierTransformSize,
										canvasRef.current,
										setVisibleNoteLetter,
										setVisibleNoteOctave,
										setVisibleNoteAccidental
									);
								}, mediaIntervalSpeed)
							);

							setIsMicrophoneInitialized(true);
							setIsMicrophoneOn(true);
						} catch (error) {
							console.log(error);
						}
					} else {
						if (!isMicrophoneOn) {
							audioContext.resume();
							setMediaInterval(
								setInterval(() => {
									updateFrequencyGraph(
										analyzerNode,
										samplingRate,
										fastFourierTransformSize,
										canvasRef.current,
										setVisibleNoteLetter,
										setVisibleNoteOctave,
										setVisibleNoteAccidental
									);
								}, mediaIntervalSpeed)
							);
							setIsMicrophoneOn(true);
						} else {
							audioContext.suspend();
							clearInterval(mediaInterval);
							setIsMicrophoneOn(false);
						}
					}
				}}
			>
				<img className="tw-absolute" src={MICROPHONE_ICON}></img>
				{!isMicrophoneOn ? (
					<img className="tw-absolute" src={DIAGONAL_ICON}></img>
				) : null}
			</div>
		</div>
	);
};

export default Home;
