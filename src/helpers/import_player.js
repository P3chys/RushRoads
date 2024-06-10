import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



export function Load_model(scene,x,y,z){
    var loader = new GLTFLoader();
    var mesh = new THREE.Object3D();
        loader.load(
            './models/car.glb',
            function ( gltf ) {
                mesh = gltf.scene;
                mesh.scale.x=4;
                mesh.scale.y=4;
                mesh.scale.z=4;
                mesh.rotateY(-Math.PI * 45);
                scene.add(mesh);
               
            }
        );
}
