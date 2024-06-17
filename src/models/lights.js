import * as THREE from 'three';
import { getCurrentMap } from '../utils/currentSettingHandler';

export function initLights(scene){
        // Ambient Light/*
        const ambientLight = new THREE.AmbientLight(0x404040, 1); // soft white light
        scene.add(ambientLight);

        // Directional Light
        const directionalLight = new THREE.DirectionalLight(0x000000, 1);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        if(getCurrentMap() == 2){
        // Point Light
        const pointLight = new THREE.PointLight(0xFFAF00, 300, 80,1);
        pointLight.position.set(5, 5, -15);
        //pointLight.lookAt(0,0,-80);
        scene.add(pointLight);
        }
        

        if(getCurrentMap() == 1){
       const spotLight = new THREE.SpotLight(0xff0000);
       spotLight.position.set( 30, 0, -100 );
       spotLight.castShadow = true;
       spotLight.intensity =10000;

       spotLight.shadow.mapSize.width = 1024;
       spotLight.shadow.mapSize.height = 1024;
       
       spotLight.shadow.camera.near = 500;
       spotLight.shadow.camera.far = 4000;
       spotLight.shadow.camera.fov = 30;
        scene.add(spotLight);
        }
}

