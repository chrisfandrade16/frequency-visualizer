export const APP_CLASS = "tw-flex tw-flex-col";

export const NAVIGATOR_CLASS =
	"tw-w-[100%] tw-h-[48px] tw-p-[12px] tw-bg-white tw-flex tw-flex-row tw-fixed tw-z-10";
export const NAVIGATOR_BOX_CLASS = "tw-flex tw-flex-row tw-flex-1";
export const NAVIGATOR_ICON_CLASS =
	"tw-h-[100%] tw-duration-500 tw-grayscale hover:tw-filter-none";
export const NAVIGATOR_TAB_CLASS = (isSelected) =>
	`tw-duration-500 hover:tw-text-slate-500 ${
		isSelected ? "tw-text-[#e3163d]" : "tw-text-slate-400"
	}`;

export const HOME_CLASS =
	"tw-w-[100vw] tw-h-[100vh] tw-flex tw-flex-row tw-items-center tw-gap-[12px] tw-p-[50px]";
export const HOME_LEFT_CLASS = "tw-flex tw-flex-col tw-gap-[12px] tw-w-[50%]";
export const HOME_RIGHT_CLASS =
	"tw-flex tw-flex-col tw-gap-[24px] tw-items-center tw-justify-center tw-w-[50%]";

export const HEADING_CLASS = "tw-text-5xl";
export const SUBHEADING_CLASS = "tw-text-lg";

export const NOTE_CLASS =
	"tw-flex tw-flex-row tw-gap-[12px] tw-w-[80px] tw-h-[80px]";
export const NOTE_DETAILS_CLASS = "tw-flex tw-flex-col tw-opacity-50";

export const MICROPHONE_CLASS =
	"tw-duration-500 tw-w-[60px] tw-h-[60px] tw-relative tw-cursor-pointer hover:tw-brightness-75";
