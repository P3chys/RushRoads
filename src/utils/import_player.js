import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



export function Load_model(scene,x,y,z){
    var loader = new GLTFLoader();
    var mesh = new THREE.Object3D();
        loader.load(
            'assets/models/car03.glb',
            function ( gltf ) {
                mesh = gltf.scene
                var materials = gltf.materials;
                var nodes = gltf.children;
                mesh.scale.x=4;
                mesh.scale.y=4;
                mesh.scale.z=4;
                mesh.rotateY(-Math.PI * 45);
                mesh.position.set(0,4,0);

                mesh.castShadow = true;
                scene.add(mesh);  
            }
        );
}
