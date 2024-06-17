import * as THREE from 'three';

export function initLights(scene){
        // Ambient Light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3); // soft white light
        scene.add(ambientLight);

        // Directional Light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Point Light
        //const pointLight = new THREE.PointLight(0xff0000, 1, 100);
        //pointLight.position.set(5, 5, 5);
        //scene.add(pointLight);

        // Spot Light
       // const spotLight = new THREE.SpotLight(0x00ff00);
        //spotLight.position.set(-5, 5, -5);
        //spotLight.castShadow = true;
        //scene.add(spotLight);
}

