import * as THREE from 'three';

const fogNear = 650, fogFar = 850;

export function initScene(){
    let scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xaaaaaa, fogNear, fogFar);
    return scene;
}
