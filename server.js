/**
 * Created by Gameboy97242 on 22/10/2016.
 */

var five = require("johnny-five");
var songs = require("j5-songs");
var board = new five.Board({
    port: "/dev/cu.usbmodem1411"
});

board.on("ready", function() {
    var led = new five.Leds([2,3,4]);
    led.blink(500);

    var servo = new five.Servo(7);

    servo.sweep();

    var piezo = new five.Piezo(8);
    // Load a song object
    var song = songs.load('tetris-theme');

    // Play it !
    piezo.play(song);


    // Injects the piezo into the repl
    board.repl.inject({
        piezo: piezo
    });

    // Plays a song
    /*piezo.play({
        // song is composed by an array of pairs of notes and beats
        // The first argument is the note (null means "no note")
        // The second argument is the length of time (beat) of the note (or non-note)
        song: [
            ["C4", 1 / 4],
            ["D4", 1 / 4],
            ["F4", 1 / 4],
            ["D4", 1 / 4],
            ["A4", 1 / 4],
            [null, 1 / 4],
            ["A4", 1],
            ["G4", 1],
            [null, 1 / 2],
            ["C4", 1 / 4],
            ["D4", 1 / 4],
            ["F4", 1 / 4],
            ["D4", 1 / 4],
            ["G4", 1 / 4],
            [null, 1 / 4],
            ["G4", 1],
            ["F4", 1],
            [null, 1 / 2]
        ],
        tempo: 100
    });*/
});