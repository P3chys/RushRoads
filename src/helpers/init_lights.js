import * as THREE from 'three';

export function Lights(scene){
    const light = new THREE.AmbientLight( 0x004040,100); // soft white light
    light.position.set(5,5,5);
    scene.add( light );
    
    const lightb = new THREE.AmbientLight( 0x004040,100); // soft white light
    light.position.set(-5,5,5);
    scene.add( lightb );
    

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
    directionalLight.position.set(10,8,10);
    scene.add( directionalLight );
    
    const lightx = new THREE.HemisphereLight( 0xffffff, 0x080820, 5 );
    lightx.position.set(0,0,5);
    scene.add( lightx );
}

