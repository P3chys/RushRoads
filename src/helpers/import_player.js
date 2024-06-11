import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



export function Load_model(scene,x,y,z){
    var loader = new GLTFLoader();
    var mesh = new THREE.Object3D();
        loader.load(
            './models/car03.glb',
            function ( gltf ) {
                console.log(gltf);
                mesh = gltf.scene
                var materials = gltf.materials;
                var nodes = gltf.children;
                mesh.scale.x=4;
                mesh.scale.y=4;
                mesh.scale.z=4;
                mesh.rotateY(-Math.PI * 45);
                console.log(mesh.children)
                console.log(materials);
                mesh.castShadow = true;
                scene.add(mesh);  
            }
        );
}
