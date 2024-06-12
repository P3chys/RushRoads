import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
function getRandomNumber() {
    // Helper function to generate a random number within a specific range
    function getRandomInRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    let randomNumber;
    do {
      randomNumber = getRandomInRange(-700, 700);
    } while (randomNumber >= -50 && randomNumber <= 50);
  
    return randomNumber;
  }

export function Load_trees(scene){
    var loader = new GLTFLoader();
    var mesh = new THREE.Object3D();

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
                const randomNum = getRandomNumber();
                modelInstance.position.set( randomNum,-1,-500);
                modelInstance.rotateY(-Math.PI * Math.random() *(100));
                modelInstance.rotateZ(-Math.PI * Math.random() *(0.1));
                //modelInstance.rotateX(-Math.PI * Math.random() *(0.2));
                
                instances.push(modelInstance);
                scene.add(modelInstance);
                //console.log(modelInstance.userData.speed);
               
            },200);
        });
        return instances
}