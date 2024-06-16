import * as TWEEN from '@tweenjs/tween.js'
var finished = true;

export function AnimateMovement(player,amount) {
    if(finished){
    new TWEEN.Tween(player.position)
        .to(player.position.clone().setX(player.position.x + amount), 300)
        .onStart(function () {
            finished = false;
        })
        .onComplete(function () {
            finished = true;
        })
        .start();
    }
}

