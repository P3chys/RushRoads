import * as THREE from 'three';


const toneMappingExposure = 0.5;

export function initRenderer(){
   let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
    
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.CineonToneMapping;
    renderer.toneMappingExposure = toneMappingExposure;
    return renderer;
}
