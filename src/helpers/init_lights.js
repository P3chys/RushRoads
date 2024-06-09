import * as THREE from 'three';

export function Lights(scene){
    const light = new THREE.AmbientLight( 0x404040,100); // soft white light
    scene.add( light );
    
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 10);
    scene.add( directionalLight );
    
    const lightx = new THREE.HemisphereLight( 0xffffbb, 0x080820, 5 );
    scene.add( lightx );
}

