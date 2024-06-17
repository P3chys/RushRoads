import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const rLane = 30, lLane = -30, mLane = 0, maxDelay = 600, minDelay = 400, coinScale = 8, carScale = 4, spawnDistance = -800, spawnHeight = 4, rLaneSpeed = 16, lLaneSpeed = 12, mLaneSpeed = 14;



function getRandomPosition() {
    const numbers = [rLane, lLane, mLane];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
}

function getRandomDelay() {
    return Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
}

export function loadOtherCars(scene) {
    //KEEP REPEATING SPAWNER
    setInterval(loadRandomGLB, getRandomDelay());

    //keeping reference
    var models = [];

    //manager to load more glb
    const manager = new THREE.LoadingManager();

    // GLTFLoader instance with the manager
    const loader = new GLTFLoader(manager);

    // Array of GLB file paths
    const glbFiles = ['assets/models/car.glb', 'assets/models/car02.glb', 'assets/models/car03.glb', 'assets/models/coin.glb'];

    //spawner for other cars
    function loadRandomGLB() {
        const randomIndex = Math.floor(Math.random() * glbFiles.length);
        const selectedFile = glbFiles[randomIndex];

        loader.load(selectedFile, function (gltf) {
            
            const model = gltf.scene;

            //IS A COIN
            if (model.children.length == 1) {
                model.scale.x = coinScale;
                model.scale.z = coinScale;
                model.scale.y = coinScale;
                model.userData.type = "coin";

                //IS A CAR
            } else {
                model.scale.x = carScale;
                model.scale.z = carScale;
                model.scale.y = carScale;
            }

            model.position.set(getRandomPosition(), spawnHeight, spawnDistance);

            if (model.position.x == rLane) {
                model.userData.speed = rLaneSpeed;
            } else if (model.position.x == mLane) {
                model.userData.speed = mLaneSpeed;
            } else {
                model.userData.speed = lLaneSpeed;
            }
            scene.add(model);
            models.push(model);
        }, undefined, function (error) {
            console.error('An error happened', error);
        });

    }
    return models;

}
