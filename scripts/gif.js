class GIF
{
    constructor(div, frames, slowness)
    {
		this.div = div;
		this.frames = frames;
        this.slowness = slowness;
        this.frame = 0;
		this.interval;
	}

    
    initialize()
    {
        this.div.style.backgroundImage = "url(" + this.frames[0] + ")";
    }

    pause()
    {
        clearInterval(this.interval);
    }

    resume()
    {
        let dupe = this;
        dupe.interval = setInterval(() => {dupe.frame < (dupe.frames.length - 1) ? dupe.frame++ : dupe.frame = 0; dupe.div.style.backgroundImage = "url(" + dupe.frames[dupe.frame] + ")";}, dupe.slowness);
    }
}