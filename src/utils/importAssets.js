import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { getCurrentMap } from './currentSettingHandler';

var minAssetWidth = -700, maxAssetWidth = 700, excludedMin = -50, excludedMax = 50, spawnerFrequency = 20000;
var assetScale = 12, assetPositionZ = -1, assetPositionX = -800, assetRotationY = 100, assetRotationZ = 0.1;


function getRandomNumber() {

  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let randomNumber;
  do {
    randomNumber = getRandomInRange(minAssetWidth, maxAssetWidth);
  } while (randomNumber >= excludedMin && randomNumber <= excludedMax);

  return randomNumber;
}


export function loadAssets(scene) {

  var models = [];
  const manager = new THREE.LoadingManager();

  // GLTFLoader instance with the manager
  const loader = new GLTFLoader(manager);
  var glbFiles = []
  switch (getCurrentMap()) {
    case 1:
      minAssetWidth = -700, maxAssetWidth = 700, excludedMin = -50, excludedMax = 50, spawnerFrequency = 200;
      assetScale = 12, assetPositionZ = -1, assetPositionX = -800, assetRotationY = 100, assetRotationZ = 0.1;
      glbFiles = ['assets/models/tree.glb', 'assets/models/tree2.glb', 'assets/models/stone1.glb', 'assets/models/stone2.glb'];
      break;
    case 2:
      minAssetWidth = -700, maxAssetWidth = 700, excludedMin = -160, excludedMax = 160, spawnerFrequency = 200;
      assetScale = 12, assetPositionZ = -10, assetPositionX = -800; assetRotationY = 100, assetRotationZ = 0;
      glbFiles = ['assets/models/lamp.glb', 'assets/models/skyscraper1.glb'];
      break;
    default:
      break;
  }
  setInterval(loadRandomGLB, spawnerFrequency);
  // Array of GLB file paths


  function loadRandomGLB() {
    const randomIndex = Math.floor(Math.random() * glbFiles.length);
    const selectedFile = glbFiles[randomIndex];

    loader.load(selectedFile, function (gltf) {
      const model = gltf.scene;
        model.scale.x = assetScale;
        model.scale.y = assetScale;
        model.scale.z = assetScale;
        const modelInstance = model.clone();
        modelInstance.frustumCulled = true;
        modelInstance.castShadow = true;
        const randomNum = getRandomNumber();
        modelInstance.position.set(randomNum, assetPositionZ, assetPositionX);
        modelInstance.rotateY(-Math.PI * Math.random() * (assetRotationY));
        modelInstance.rotateZ(-Math.PI * Math.random() * (assetRotationZ));
      models.push(modelInstance);
      scene.add(modelInstance);
    });
  }

  return models;
}