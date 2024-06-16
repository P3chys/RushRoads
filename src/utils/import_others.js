import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function getRandomPosition(){
    const numbers = [30, 0, -30];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
}

function getRandomDelay(){
    return Math.floor(Math.random()* (600-400+1)) + 400;
}
export function Load_model_X(scene){
setInterval(loadRandomGLB, getRandomDelay());
var models = [];
const manager = new THREE.LoadingManager();
    
    // Functions to handle the loading process
    manager.onStart = function (url, itemsLoaded, itemsTotal) {
        //console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    };

    manager.onLoad = function () {
        //console.log('Loading complete!');
    };

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        //console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    };

    manager.onError = function (url) {
        //console.log('There was an error loading ' + url);
    };

    // GLTFLoader instance with the manager
    const loader = new GLTFLoader(manager);

    // Array of GLB file paths
    const glbFiles = ['assets/models/car.glb', 'assets/models/car02.glb','assets/models/car03.glb', 'assets/models/coin.glb'];

    
    function loadRandomGLB() {
        const randomIndex = Math.floor(Math.random() * glbFiles.length);
        const selectedFile = glbFiles[randomIndex];

        loader.load(selectedFile, function (gltf) {
            const model = gltf.scene;
            
            if(model.children.length == 1){
                model.scale.x = 8;
                model.scale.z = 8;
                model.scale.y = 8;
                model.userData.type = "coin";
                model.userData.animation = gltf.animations[0];
                
            }else{
                model.scale.x = 4;
                model.scale.z = 4;
                model.scale.y = 4;
            }
            
            model.position.set(getRandomPosition(), 4, -800);
            if(model.position.x == 30){
                model.userData.speed = 16;
            }else if(model.position.x == 0){
                model.userData.speed = 14;
            }else{
                model.userData.speed = 12;
            }
            scene.add(model);
            models.push(model);
        }, undefined, function (error) {
            console.error('An error happened', error);
        });
        
    }
    return models;
    
    
    
}
