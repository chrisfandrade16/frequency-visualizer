import { GITHUB_REPO_LINK } from "constants/links";
import { HOME_TAB_TEXT } from "constants/texts";
import { useEffect, useState } from "react";
import gifFrameInitial from "images/logo_frames/logo00.png";
import {
	NAVIGATOR_BOX_CLASS,
	NAVIGATOR_CLASS,
	NAVIGATOR_ICON_CLASS,
	NAVIGATOR_TAB_CLASS,
} from "constants/classes";
import GITHUB_ICON from "images/github.png";

const Navigator = () => {
	const [gifFrames, setGifFrames] = useState([gifFrameInitial]);
	const [gifFrameIndex, setGifFrameIndex] = useState(0);
	const [gifFrameInterval, setGifFrameInterval] = useState(null);
	const [selectedTab, setSelecedTab] = useState(null);

	const gifFrameSpeed = 25;

	useEffect(() => {
		const imagesContext = require.context(
			"images/logo_frames",
			false,
			/\.(png|jpe?g|svg)$/
		);
		const images = imagesContext.keys().map((imageKey) => {
			return imagesContext(imageKey);
		});
		setGifFrames(images);
	}, []);

	return (
		<div className={NAVIGATOR_CLASS}>
			<div className={`${NAVIGATOR_BOX_CLASS} tw-mr-auto tw-justify-start`}>
				<img
					className={NAVIGATOR_ICON_CLASS}
					onMouseEnter={() => {
						let currentIntervalGifFrameIndex = gifFrameIndex;
						setGifFrameInterval(
							setInterval(() => {
								if (currentIntervalGifFrameIndex < gifFrames.length - 1) {
									currentIntervalGifFrameIndex += 1;
									setGifFrameIndex(currentIntervalGifFrameIndex);
								} else {
									currentIntervalGifFrameIndex = 0;
									setGifFrameIndex(currentIntervalGifFrameIndex);
								}
							}, gifFrameSpeed)
						);
					}}
					onMouseLeave={() => {
						clearInterval(gifFrameInterval);
					}}
					src={gifFrames[gifFrameIndex]}
				></img>
			</div>

			<div className={`${NAVIGATOR_BOX_CLASS} tw-justify-center`}>
				<a
					className={NAVIGATOR_TAB_CLASS(selectedTab === 0)}
					href="#home"
					onClick={() => {
						setSelecedTab(0);
					}}
				>
					{HOME_TAB_TEXT}
				</a>
			</div>
			<div className={`${NAVIGATOR_BOX_CLASS} tw-ml-auto tw-justify-end`}>
				<a
					className={NAVIGATOR_ICON_CLASS}
					href={GITHUB_REPO_LINK}
					target="_blank"
				>
					<img className={NAVIGATOR_ICON_CLASS} src={GITHUB_ICON}></img>
				</a>
			</div>
		</div>
	);
};

export default Navigator;
