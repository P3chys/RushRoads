import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function Load_trees(scene){
    var loader = new GLTFLoader();
    var mesh = new THREE.Object3D();
    const numbers = [ 55, -45];

    var instances = []
        loader.load(
            './models/tree.glb',
            function ( gltf ) {
                mesh = gltf.scene;
                mesh.scale.x=12;
                mesh.scale.y=12;
                mesh.scale.z=12;
                const spawnInterval = setInterval(() => {
                const modelInstance = mesh.clone();
                modelInstance.frustumCulled = true;
                modelInstance.castShadow = true;
                const randomIndex = Math.floor(Math.random() * numbers.length);
                modelInstance.position.set(numbers[randomIndex],-1,-500);
                modelInstance.rotateX(-Math.PI * 0);
               
                
                instances.push(modelInstance);
                scene.add(modelInstance);
                console.log(modelInstance.userData.speed);
               
            },2000);
        });
        return instances
}