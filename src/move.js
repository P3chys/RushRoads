import * as TWEEN from '@tweenjs/tween.js'

export function AnimateMovement(player,amount) {

    new TWEEN.Tween(player.position)
        .to(player.position.clone().setX(player.position.x + amount), 300)
        .onStart(function () {
        })
        .onComplete(function () {
        })
        .start();
}

