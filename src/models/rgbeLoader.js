import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';


export function initRGBELoader(scene){
    const rgbeLoader = new RGBELoader();

    rgbeLoader.load('assets/hdri/map.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = texture;
    });
}
