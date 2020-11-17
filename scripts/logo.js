let frames = 
[
    "./images/logo0.png",
    "./images/logo1.png",
    "./images/logo2.png",
    "./images/logo3.png",
    "./images/logo4.png",
    "./images/logo5.png",
    "./images/logo6.png",
    "./images/logo7.png",
    "./images/logo8.png",
    "./images/logo9.png",
    "./images/logo10.png",
    "./images/logo11.png",
    "./images/logo12.png",
    "./images/logo13.png",
    "./images/logo14.png",
    "./images/logo15.png",
    "./images/logo16.png",
    "./images/logo17.png",
    "./images/logo18.png",
    "./images/logo19.png",
    "./images/logo20.png",
    "./images/logo21.png",
    "./images/logo22.png",
    "./images/logo23.png",
    "./images/logo24.png",
    "./images/logo25.png",
    "./images/logo26.png",
    "./images/logo27.png",
    "./images/logo28.png",
];

let frames_length = frames.length;
let images = new Array(frames_length);

for(let index = 0; index < frames_length; index++)
{
    image = new Image();
    image.src = frames[index];
    images[index] = image;
}

let div = document.querySelector(".navigator-left");
let logo = new GIF(div, frames, 15);

logo.initialize();

div.addEventListener('mouseenter', () => {logo.resume(); div.style.filter = "grayscale(0%) brightness(100%)";});
div.addEventListener('mouseleave', () => {logo.pause(); div.style.filter = "grayscale(100%) brightness(275%)";});