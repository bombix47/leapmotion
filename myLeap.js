/**
 * Created by Gameboy97242 on 22/10/2016.
 */
var fs = require('fs');
var Leap = require('leapjs');

// file is included here:
//eval(fs.readFileSync('./_v2/LeapSDK/leap.js')+'');

var five = require("johnny-five");
//var songs = require("j5-songs");
var board = new five.Board({
    port: "/dev/cu.usbmodem1411"
});

board.on("ready", function() {
    /*var led = new five.Leds([2,3,4]);
    led.blink(500);

    var servo = new five.Servo(5);

    servo.sweep();*/

    /*var piezo = new five.Piezo(8);
     // Load a song object
     var song = songs.load('tetris-theme');

     // Play it !
     piezo.play(song);


     // Injects the piezo into the repl
     board.repl.inject({
     piezo: piezo
     });*/

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
    var outputs = [];

    GestureHandler = {
    action: {},
    handleGrab: function () {
        var ledvert = new five.Led(2);
        outputs.push(ledvert);
        //console.log(outputs);
        ledvert.blink(250);
        console.log("GRAAAAAAAAAAAAAAAAAAB");
    },
    handleSwipe: function () {
    }
}

var LeapController = function () {
    var volume = {
        'val': 0,
        'max': 100,
        'min': 0
    };
    var paused = false;
    var controller = Leap.loop({enableGestures: true}, function (frame) {


        if (!paused) {
            if (checkForgesture(frame) || checkGrap(frame)) {
                getGesture(frame);
                console.log('main loop : ' + GestureHandler.action);
                if (GestureHandler.action != null) {
                    switch (GestureHandler.action.type) {
                        case 'grab':
                            GestureHandler.handleGrab();
                            break;
                        case 'swipe':
                            var ledbleu = new five.Led(4);
                            outputs.push(ledbleu);
                            ledbleu.blink(250);
                            console.log("SWIIIIIIIIPE");
                            break;
                        case 'circle':
                            var led = new five.Led(4);
                            outputs.push(led);
                            led.blink(250);
                            console.log("CIRCLEEEEEEE");
                            break;
                        default :
                            var led = new five.Led(4);
                            outputs.push(led);
                            led.blink(250);
                            console.log("AUTRE MOUV");
                    }

                    paused = true;
                    setTimeout(function () {
                            paused = false;
                            outputs.forEach(function(led) {
                                led.stop().off();
                            });
                    }, 1500)
                }

            }
        }
    });

    function checkForgesture(frame) {
        //console.log('has gesture' + frame.valid && frame.gestures.length > 0);
        return frame.valid && frame.gestures.length > 0

    }

    function checkGrap(frame) {
        if (frame.hands.length > 0) {
            for (var i = 0; i < frame.hands.length; i++) {
                var hand = frame.hands[i];
                if (hand.grabStrength == 1 && hand.pinchStrength == 1) {
                    return true;
                }
                else
                    return false;
            }
        }
    }

    function getCircleDirection(frame, gesture) {

        var pointableID = gesture.pointableIds[0];
        var direction = frame.pointable(pointableID).direction;
        var dotProduct = Leap.vec3.dot(direction, gesture.normal);
        return dotProduct > 0 ? 'right' : 'left';
    }

    function getSwipeDirection(gesture) {
        return gesture.direction[0] > 0 ? 'right' : 'left';

    }

    function getGesture(frame) {
        console.log('ON GET GESTURE');
        var action = {};
        if (checkGrap(frame)) {
            action.type = 'grab';
            action.direction = null;
            action.command = switchOff;
        }
        else {

            frame.gestures.forEach(function (gesture) {
                switch (gesture.type) {
                    case 'circle':
                        action.type = gesture.type;
                        action.direction = getCircleDirection(frame, gesture);
                        break;
                    case 'swipe':
                        action.type = gesture.type;
                        action.direction = getSwipeDirection(gesture);
                        break;
                }


                //return action;
            });
        }
        GestureHandler.action = action;
        console.log('GET GESTURE END', action);

    }

    var switchOff = function () {
        console.log('yeahhhhhhaaaaa');
    }


}

var toto = new LeapController()

});
