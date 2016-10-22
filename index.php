<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="télécommande/css/source.css">
    <script src="http://js.leapmotion.com/leap-0.6.3.js"></script>
    <script src="./GestureHandler.js"></script>
</head>
<body>
<div id="volume">
    <div id="volumeplus">
        <p>+</p>
    </div>
    <div id="volume_-">
        <p>-</p>
    </div>
</div>
<div id="ligne">
    <div id="eteindre">
        <p id="all">eteindre</p>
    </div>
    <div id="allume">
        <p id="all">Allumé</p>
    </div>
</div>
<div id="chaine">
    <div id="chainesuiv">
        <p id="all">chaine suiv</p>
    </div>
    <div id="chaineprec">
        <p id="all">chaine prec</p>
    </div>
</div>
</body>
</html>

<script>

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
                    if(GestureHandler.action != null){
                        switch (GestureHandler.action.type) {
                            case 'grab':
                                GestureHandler.handleGrab();
                                break;
                            case 'swipe':
                                break;
                            case 'circle':
                                break;

                        }

                        paused = true;
                        setTimeout(function () {
                                paused = false;
                            }, 1500
                        )
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
                    if(hand.grabStrength == 1 && hand.pinchStrength == 1) {
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
            if(checkGrap(frame))
            {
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



    //Si il detecte un geste
    /*if (frame.valid && frame.gestures.length > 0) {
        frame.gestures.forEach(function (gesture) {

            switch (gesture.type) {
                default:
                    console.log('toto');
                    break;
                case "circle":

ype
                    if (clockwise && volume.val < volume.max) {
                        volume.val += 0.5;
                    }
                    else if (!clockwise && volume.val > volume.min) {
                        volume.val -= 0.5;
                    }
                    console.log(Math.round(volume.val));
                    paused = true;
                    break;
                case "keyTap":

                    break;
                case "screenTap":

                    break;
                case "swipe":

                    break;
            }
            return;
            // Skip this update

        });
    }
    })
    ;
    }
    ;
*/
    var toto = new LeapController();


</script>