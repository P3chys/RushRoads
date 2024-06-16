import * as THREE from 'three';

const cameraFOV = 75, cameraNear = 0.1, cameraFar = 2000;
const cameraZ=50, cameraY=20;

export function initCamera(scene){
    let camera = new THREE.PerspectiveCamera(cameraFOV, window.innerWidth / window.innerHeight, cameraNear, cameraFar);
    camera.position.z = cameraZ;
    camera.position.y = cameraY;
    return camera;
}