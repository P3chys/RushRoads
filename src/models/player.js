import * as THREE from 'three';
import { Load_model } from '/src/utils/importPlayer';

export function initPlayer(scene) {
    let player = new THREE.Object3D;
    player.name = 'player';
    scene.add(player);
    Load_model(player);
    return player;
}