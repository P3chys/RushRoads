import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { getCurrentMap } from '../utils/currentSettingHandler';

export function initRGBELoader(scene){
    var hdri;
    const rgbeLoader = new RGBELoader();
    if(getCurrentMap() == 1){
        hdri = "001.hdr"
        scene.backgroundIntensity = 1;
    }
    if(getCurrentMap() == 2){
        hdri = "002.hdr"
        scene.backgroundIntensity = 0.5;
    }
    if(getCurrentMap() == 3){
        hdri = "003.hdr"
        scene.backgroundIntensity = 2;
    }
    rgbeLoader.load('assets/hdri/'+hdri, function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        
        scene.environment = texture;
        scene.background = texture;
        scene.environmentInstesity = -10;
        
    });
}
