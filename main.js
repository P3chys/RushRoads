import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'
import { Lights } from './helpers/init_lights';
import { Load_model } from './helpers/import_player';
import { playMusic } from './music';
import { AnimateMovement } from './move';
import { Load_model_X } from './helpers/import_others';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { Load_assets } from './helpers/spawn_trees';


if (sessionStorage.getItem("user_exists") === null) { window.location.href = "./public/menu/menu.html"; }

var scene, camera, renderer, player, clock, gameSpeed=0.5, collision_flag=true;
const rLane = 30, lLane = -30, bonusTime = 5000, removeBoundry=200, assetSpeed = 1;
const cameraFOV = 75, cameraNear = 0.1, cameraFar = 2000;
const toneMappingExposure = 1.8, fogNear = 650, fogFar = 850;
const roadSizeWidth = 30, raodSizeLength = 2000, roadRotateX = 0.5, roadColorScalar = 1.5;
const groundSize = 2000;
const refreshTimeScore = 1000;
const cameraZ=50, cameraY=20;

const rgbeLoader = new RGBELoader();

function init_scene() {
    //SETUP SCENE AND RENDERER
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(cameraFOV, window.innerWidth / window.innerHeight, cameraNear, cameraFar);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = toneMappingExposure;


    //INITIATE GROUND GEOMETRY
    let ground = new THREE.Mesh(
        new THREE.PlaneGeometry(
            roadSizeWidth, 
            raodSizeLength) .rotateX(-Math.PI * roadRotateX), 
            new THREE.MeshBasicMaterial({ color: new THREE.Color(0x442288).multiplyScalar(roadColorScalar) })
        );
    let ground2 = new THREE.Mesh(
        new THREE.PlaneGeometry(
            roadSizeWidth, 
            raodSizeLength).rotateX(-Math.PI * roadRotateX), 
            new THREE.MeshBasicMaterial({ color: new THREE.Color(0x224488).multiplyScalar(roadColorScalar) })
        );
    
    let ground3 = new THREE.Mesh(
        new THREE.PlaneGeometry(
            roadSizeWidth, 
            raodSizeLength).rotateX(-Math.PI * roadRotateX),
            new THREE.MeshBasicMaterial({ color: new THREE.Color(0x444422).multiplyScalar(roadColorScalar) })
        );

    let groundx = new THREE.Mesh(
        new THREE.PlaneGeometry(groundSize, groundSize).rotateX(-Math.PI * roadRotateX),
        new THREE.MeshToonMaterial({ color: 0x136d15 })
    );
    ground2.position.x = lLane;
    ground3.position.x = rLane;
    groundx.position.z = -1; //so it is below

    scene.add(ground);
    scene.add(ground2);
    scene.add(ground3);
    scene.add(groundx);

    //SETUP VISUAL EFFECTS
    scene.fog = new THREE.Fog(0xaaaaaa, fogNear, fogFar);

    rgbeLoader.load('assets/hdri/map.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = texture;
    });


    //SETUP CAMERA
    camera.position.z = cameraZ;
    camera.position.y = cameraY;

    //SETUP LIGHTS
    Lights(scene);

    //SETUP CLOCK
    clock = new THREE.Clock();
    clock.getDelta();
    setInterval(ShowScore, refreshTimeScore);

}

function ShowScore() {
    var x = clock.getElapsedTime();
    document.getElementById("info").innerHTML = "Distance: " + Math.trunc(x);
}

function init_player() {
    player = new THREE.Object3D;
    player.name = 'player';
    scene.add(player);
    Load_model(player);
}

function gameOver() {
    if (sessionStorage.getItem("distance_map_1") < clock.getElapsedTime()) {
        sessionStorage.setItem("distance_map_1", clock.getElapsedTime())
    }
    clock.stop();
    renderer.domElement.style.display = 'none';
    window.location.href = "./menu/menu.html";
}

function Collision(element) {
    if(collision_flag == true){
    if (player.position.x > rLane || player.position < lLane) {
        gameOver();
    }

    const otherBoundingBox = new THREE.Box3().setFromObject(element)
    const boundingBox = new THREE.Box3().setFromObject(player)
    if (boundingBox.intersectsBox(otherBoundingBox)) {
        gameOver();
    }
}
}

init_scene();
init_player();

var instances = Load_model_X(scene);

var instances_assets = Load_assets(scene);

playMusic(camera);

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


function animate() {
    instances.forEach(element => {
        console.log(gameSpeed);
        element.position.z += element.userData.speed*gameSpeed;
        if (element.position.z > removeBoundry) {
            scene.remove(element);
            instances.shift();
        }
        Collision(element)
    });

    instances_assets.forEach(asset => {
        asset.position.z += assetSpeed;
        if (asset.position.z > removeBoundry) {
            scene.remove(asset);
            instances_assets.shift();
        }
    });
    TWEEN.update();
    renderer.render(scene, camera);
}

