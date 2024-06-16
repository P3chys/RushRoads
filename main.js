import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'
import { initLights } from './src/models/lights';
import { playMusic } from './src/utils/music';
import { AnimateMovement } from './src/utils/move';
import { Load_model_X } from './src/utils/import_others';
import { Load_assets } from './src/utils/spawn_trees';
import { initRGBELoader } from './src/models/rgbeLoader';
import { initRoads } from './src/models/roads';
import { initCamera } from './src/models/camera';
import { initScene } from './src/models/scene';
import { initRenderer } from './src/models/renderer';
import { initClock } from './src/utils/clock';
import { initPlayer } from './src/models/player';
import { handleOtherCars } from './src/utils/carHandler';
import { handleAssets } from './src/utils/assetHandler';


if (sessionStorage.getItem("user_exists") === null) { window.location.href = "./public/menu/menu.html"; }

var scene, camera, renderer, player, clock, gameSpeed=0.5;
var bonusTime = 5000, collision_flag=true;
const refreshTimeScore = 1000;
const rLane = 30, lLane = -30;




//INIT SCENE
function sceneManager() {

    scene = initScene();
    renderer = initRenderer();
    renderer.setAnimationLoop(animate);
    camera = initCamera(scene)
    
    initLights(scene);
    initRoads(scene);
    initRGBELoader(scene);

    clock = initClock();
    setInterval(ShowScore, refreshTimeScore);
    

}

//START COUNTING SCORE
function ShowScore() {
    document.getElementById("info").innerHTML = "Distance: " + Math.trunc(clock.getElapsedTime());
}


//CALL SCENE INIT
sceneManager();

//CREATE PLAYER
player = initPlayer(scene);

//CREATE OTHER CARS
var otherCars = Load_model_X(scene);

//CREATE ASSETS
var assets = Load_assets(scene);

//MUSIC PLAYER
playMusic(camera);

//LISTENERS FOR MOVEMENT
document.onkeydown = function (e) {
    if (e.key === 'd') {
        AnimateMovement(player, rLane);
    }
    if (e.key === 'a') {
        AnimateMovement(player, lLane);
    }
    if (e.key === 'b' ) {
        let count = sessionStorage.getItem("invincible");
        if(count > 0){
            collision_flag = false;
            setTimeout(()=>collision_flag=true,bonusTime);
            sessionStorage.setItem("invincible",count-1);
        }
    }
    if(e.key === 'n'){
        let count = sessionStorage.getItem("slow-down");
            if(count > 0){
            gameSpeed = 0.25;
            setTimeout(()=>gameSpeed=0.5,bonusTime);
            sessionStorage.setItem("slow-down",count-1);
    }}
}

//ANIMATION LOOP
function animate() {
    otherCars = handleOtherCars(otherCars,scene, gameSpeed,clock, renderer, collision_flag, player);
    assets = handleAssets(assets, scene);
    TWEEN.update();
    renderer.render(scene, camera);
}

