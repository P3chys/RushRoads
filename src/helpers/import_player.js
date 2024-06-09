import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



export function Load_model(scene){
    var loader = new GLTFLoader();
    var mesh = new THREE.Object3D();
        loader.load(
            './models/car.glb',
            function ( gltf ) {
                mesh = gltf.scene;
                
                scene.add(mesh);
                mesh.rotation.y = 3
            }
        );
}
