import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



export function Load_model_X(scene){
    var loader = new GLTFLoader();
    var mesh = new THREE.Object3D();
    const numbers = [-15, 15, -45];
    

    var instances = []
        loader.load(
            './models/car02.glb',
            function ( gltf ) {
                mesh = gltf.scene;
                mesh.scale.x=4;
                mesh.scale.y=4;
                mesh.scale.z=4;
                const spawnInterval = setInterval(() => {
                const modelInstance = mesh.clone();
                modelInstance.frustumCulled = true;
                const randomIndex = Math.floor(Math.random() * numbers.length);
                modelInstance.position.set(numbers[randomIndex],0,-500);
                modelInstance.rotateX(-Math.PI * 0);

                if(modelInstance.position.x == 15){
                    modelInstance.userData.speed = 10;
                }else if(modelInstance.position.x == -15){
                    modelInstance.userData.speed = 7;
                }else{
                    modelInstance.userData.speed = 9;
                }
                
                instances.push(modelInstance);
                scene.add(modelInstance);
                console.log(modelInstance.userData.speed);
               
            },2000);
        });
        return instances;
}
