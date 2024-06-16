import * as THREE from 'three';


var clock;

export function initClock(){
    clock = new THREE.Clock();
    clock.getDelta();
    return clock;
}

