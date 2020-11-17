class Microphone
{
    constructor(audio_context)
    {
        this.context = audio_context;
        this.analyzer = new AnalyserNode(this.context, {fftSize: 16384, smoothingTimeConstant: 0});
        this.frequencies = new Uint8Array(this.analyzer.frequencyBinCount);
        this.initialized = false;
        this.status = 0;
        this.stream;
        this.node;
    }

    async on_click()
    {
        if(this.initialized == false)
        {
            this.stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false });
            this.node = new MediaStreamAudioSourceNode(this.context, {mediaStream: this.stream});
            this.node.connect(this.analyzer);
            this.initialized = true;
            visualizer_updater();
        }

        if(this.status == 0)
        {
            $("#microphone-diagonal").css("opacity", "0%");
            this.status = 1;
            this.context.resume();
        }
        else if(this.status == 1)
        {
            $("#microphone-diagonal").css("opacity", "100%");
            this.status = 0;
            this.context.suspend();
        }
    }
}

let audio_context = new AudioContext();

let microphone_object = new Microphone(audio_context);

let microphone_button = document.querySelector("#microphone")

microphone_button.addEventListener("click", () => microphone_object.on_click());