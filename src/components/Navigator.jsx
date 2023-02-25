import { GITHUB_LOGO_LINK, GITHUB_REPO_LINK } from "constants/links";
import { HOME_TAB_TEXT } from "constants/texts";
import { useEffect, useRef, useState } from "react";

const Navigator = () => {
	const [gifFrames, setGifFrames] = useState([]);
	const [gifFrameIndex, setGifFrameIndex] = useState(0);
	const [gifFrameInterval, setGifFrameInterval] = useState(null);
	const [selectedTab, setSelecedTab] = useState(0);

	const gifFrameSpeed = 15;

	console.log(gifFrames);

	useEffect(() => {
		setGifFrames(require.context("images/logo_frames", false, /\.(png)$/));
	}, []);

	return (
		<div className="navigator">
			<div className="navigator-box">
				<img
					className="navigator-icon"
					onMouseEnter={() => {
						setGifFrameInterval(
							setInterval(() => {
								if (gifFrameIndex < gifFrames.length - 1) {
									const newGifFrameIndex = gifFrameIndex + 1;
									setGifFrameIndex(newGifFrameIndex);
								} else {
									const newGifFrameIndex = 0;
									setGifFrameIndex(newGifFrameIndex);
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

			<div className="navigator-box">
				<a
					className={`navigator-tab ${selectedTab === 0 ? "selected" : ""}`}
					href="#home"
					onClick={() => {
						setSelecedTab(0);
					}}
				>
					{HOME_TAB_TEXT}
				</a>
			</div>
			<div className="navigator-box">
				<a className="navigator-icon" href={GITHUB_REPO_LINK}>
					<img src={GITHUB_LOGO_LINK}></img>
				</a>
			</div>
		</div>
	);
};

export default Navigator;
