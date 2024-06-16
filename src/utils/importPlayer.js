import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



export function Load_model(scene) {
    var loader = new GLTFLoader();
    var mesh = new THREE.Object3D();
    var assetToLoad;
    var param = parseInt(sessionStorage.getItem("currentCar"));
    console.log(param);
    switch (param) {
        case 1:
            assetToLoad = "assets/models/car.glb";
            break;
        case 2:
            assetToLoad = "assets/models/car02.glb";
            break;
        case 3:
            assetToLoad = "assets/models/car03.glb";
            break;
        default:
            console.error("Error while selecting player model");
            break;
    }
    loader.load(
        assetToLoad,
        function (gltf) {
            mesh = gltf.scene
            mesh.scale.x = 4;
            mesh.scale.y = 4;
            mesh.scale.z = 4;
            mesh.rotateY(-Math.PI * 45);
            mesh.position.set(0, 4, 0);

            mesh.castShadow = true;
            scene.add(mesh);
        }
    );
}
