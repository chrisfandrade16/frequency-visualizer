function visualizer_updater()
{
    /* 
       the total range of frequencies is 0 to Nyquist frequency, where the Nyquist frequency is half of the sampling rate, and the sampling rate is defined by default in the AudioContext as 48000, so 24000.
       We set our FFT (Fast Fourier transform) size to be 32768, which means our frequency bin count will be half of that, 16384. So, since our range of frequencies is 24000, and our array size is 16384,
       24000 / 16384 = 1.46484375 Hz determines the range of frequency per array logo.
    */

    microphone_object.analyzer.getByteFrequencyData(microphone_object.frequencies);

    canvas_context.fillStyle = "rgb(227,22,61)";
    canvas_context.fillRect(0, 0, canvas_location.width, canvas_location.height);

    let number_of_bars = 300; // 5395 * 1.46484375Hz = approx 7902Hz, so the range of the bar graph is from 0Hz (C0) to 7920Hz (B8)
    let bar_width = canvas_location.width / number_of_bars;
    let bar_height;
    let x_distance = 0;

    for(let index = 1; index < number_of_bars; index++)
    {
        bar_height = microphone_object.frequencies[index * 3] / 2;

        canvas_context.fillStyle = "rgb(255,255,255)";
        canvas_context.fillRect(x_distance, canvas_location.height - bar_height, bar_width, bar_height);

        x_distance += bar_width;
    }

    let frequencies_map_length = 5395; // the max note we show (B8) has a frequency of approx 7902Hz and 5395 * 1.46484375Hz = approx 7902Hz
    let frequencies_map = new Array(frequencies_map_length);

    for(let index = 0; index < frequencies_map_length; index++)
    {
        frequencies_map[index] = [index * 1.46484375, microphone_object.frequencies[index]]; // key = approx discrete frequency, value = loudness of that frequency
    }

    let fundamental_frequency = fundamental_frequency_finder(frequencies_map);
    let semitoneDistance = Math.round(12 * Math.log2(fundamental_frequency / 440));
    let noteIndex = 57 + semitoneDistance;

    $("."+notes_cache[0]).css("opacity", "0");
    $("."+notes_cache[1]).css("opacity", "0");
    if(notes_cache[2] !== "")
    {
        $("."+notes_cache[2]).css("opacity", "0");
    }

    if(noteIndex >= 0 && noteIndex < notes_full_length)
    {
        let note_full = notes_full[noteIndex];
        let note_letter = note_full.substring(0, 1);
        let note_octave = note_full.substring(1, 2);
        let note_symbol = "";

        if(note_full.length == 7)
        {
            note_symbol = note_full.substring(2, 7);
        }

        notes_cache[0] = note_letter;
        notes_cache[1] = note_octave;
        notes_cache[2] = note_symbol;

        $("." + note_letter).css("opacity", "100%");
        $("." + note_octave).css("opacity", "100%");
        if(note_full.length == 7)
        {
            $("." + note_symbol).css("opacity", "100%");
        }
    }

    requestAnimationFrame(visualizer_updater);
}

let canvas_location = document.querySelector("#visualizer")

let canvas_context = canvas_location.getContext("2d");

let notes_cache = ["A", "4", ""];

let notes_full =
[
    "C0", "C0sharp", "D0", "D0sharp", "E0", "F0", "F0sharp", "G0", "G0sharp", "A0", "A0sharp", "B0",
    "C1", "C1sharp", "D1", "D1sharp", "E1", "F1", "F1sharp", "G1", "G1sharp", "A1", "A1sharp", "B1",
    "C2", "C2sharp", "D2", "D2sharp", "E2", "F2", "F2sharp", "G2", "G2sharp", "A2", "A2sharp", "B2",
    "C3", "C3sharp", "D3", "D3sharp", "E3", "F3", "F3sharp", "G3", "G3sharp", "A3", "A3sharp", "B3",
    "C4", "C4sharp", "D4", "D4sharp", "E4", "F4", "F4sharp", "G4", "G4sharp", "A4", "A4sharp", "B4",
    "C5", "C5sharp", "D5", "D5sharp", "E5", "F5", "F5sharp", "G5", "G5sharp", "A5", "A5sharp", "B5",
    "C6", "C6sharp", "D6", "D6sharp", "E6", "F6", "F6sharp", "G6", "G6sharp", "A6", "A6sharp", "B6",
    "C7", "C7sharp", "D7", "D7sharp", "E7", "F7", "F7sharp", "G7", "G7sharp", "A7", "A7sharp", "B7",
    "C8", "C8sharp", "D8", "D8sharp", "E8", "F8", "F8sharp", "G8", "G8sharp", "A8", "A8sharp", "B8"
];

let notes_full_length = notes_full.length;