import { gameOver } from "./gameOver";
import * as THREE from 'three';

const rLane = 30, lLane = -30;
var coins = 0;

export function collision(element, clock, renderer, collision_flag, scene, player, camera) {
    if(collision_flag == true){
    if (player.position.x > rLane || player.position.x < lLane) {
        gameOver(coins,clock,renderer);
    }
    const otherBoundingBox = new THREE.Box3().setFromObject(element)
    const boundingBox = new THREE.Box3().setFromObject(player)
    if (boundingBox.intersectsBox(otherBoundingBox)) {
        if(element.userData.type == "coin"){
            coins++;
            scene.remove(element);
        }else{
            gameOver(coins,clock,renderer, camera);
        }
        
    }
}
}