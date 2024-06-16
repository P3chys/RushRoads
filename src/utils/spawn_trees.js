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


export function Load_assets(scene){
  setInterval(loadRandomGLB, 200);
  var models=[];
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
       // console.log('There was an error loading ' + url);
    };

    // GLTFLoader instance with the manager
    const loader = new GLTFLoader(manager);

    // Array of GLB file paths
    const glbFiles = ['assets/models/tree.glb', 'assets/models/tree2.glb','assets/models/stone1.glb','assets/models/stone2.glb'];
    
    function loadRandomGLB() {
      const randomIndex = Math.floor(Math.random() * glbFiles.length);
      const selectedFile = glbFiles[randomIndex];

      loader.load(selectedFile, function (gltf) {
          const model = gltf.scene;
          model.scale.x=12;
          model.scale.y=12;
          model.scale.z=12;
                
                const modelInstance = model.clone();
                modelInstance.frustumCulled = true;
                modelInstance.castShadow = true;
                const randomNum = getRandomNumber();
                modelInstance.position.set( randomNum,-1,-800);
                modelInstance.rotateY(-Math.PI * Math.random() *(100));
                modelInstance.rotateZ(-Math.PI * Math.random() *(0.1));
                
                models.push(modelInstance);
                scene.add(modelInstance);
        });
    }

        return models;
}