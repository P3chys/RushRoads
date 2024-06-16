import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { getCurrentMap } from '../utils/currentSettingHandler';

export function initRGBELoader(scene){
    var hdri;
    const rgbeLoader = new RGBELoader();
    if(getCurrentMap() == 1){
        hdri = "001.hdr"
    }
    if(getCurrentMap() == 2){
        hdri = "002.hdr"
    }
    if(getCurrentMap() == 3){
        hdri = "003.hdr"
    }
    rgbeLoader.load('assets/hdri/'+hdri, function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = texture;
    });
}
