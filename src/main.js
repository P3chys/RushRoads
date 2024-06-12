import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'
import { Lights } from './helpers/init_lights';
import { Load_model } from './helpers/import_player';
import { playMusic } from './music';
import { AnimateMovement } from './move';
import { Load_model_X } from './helpers/import_others';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { Load_trees } from './helpers/spawn_trees';
import { roughness } from 'three/examples/jsm/nodes/Nodes.js';





if (sessionStorage.getItem("user_exists") === null) { window.location.href = "./menu/menu.html"; }

var scene, camera, renderer, player, score, clock;
const rgbeLoader = new RGBELoader();

function init_scene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;


    let ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 2000).rotateX(-Math.PI * 0.5), new THREE.MeshBasicMaterial({ color: new THREE.Color(0x442288).multiplyScalar(1.5) }));
    let ground2 = new THREE.Mesh(new THREE.PlaneGeometry(30, 2000).rotateX(-Math.PI * 0.5), new THREE.MeshBasicMaterial({ color: new THREE.Color(0x224488).multiplyScalar(1.5) }));
    ground2.position.x = -30
    let ground3 = new THREE.Mesh(new THREE.PlaneGeometry(30, 2000).rotateX(-Math.PI * 0.5), new THREE.MeshBasicMaterial({ color: new THREE.Color(0x444422).multiplyScalar(1.5) }));
    ground3.position.x = 30
    
    scene.add(ground);
    scene.add(ground2);
    scene.add(ground3);
    


    rgbeLoader.load('./models/map.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = texture;
    });


    let groundx = new THREE.Mesh(
        new THREE.PlaneGeometry(2000, 2000).rotateX(-Math.PI * 0.5),
        new THREE.MeshToonMaterial({color: 0x136d15, roughness: 10,})
    );
    groundx.position.z = -1

    scene.add(groundx);

    camera.position.z = 50;
    camera.position.y = 20;

    Lights(scene);

    clock = new THREE.Clock();
    clock.getDelta();
}

function init_player() {
    player = new THREE.Object3D;
    player.name = 'player';
    scene.add(player);
    Load_model(player, 0, 4, 0);
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
    if (player.position.x > 5 || player.position < -5) {
        //console.log("crash outside map");
    }

    const otherBoundingBox = new THREE.Box3().setFromObject(element)
    const boundingBox = new THREE.Box3().setFromObject(player)
    if (boundingBox.intersectsBox(otherBoundingBox)) {
        //console.log("HIT");
        gameOver();
    }
}

init_scene();
init_player();

var instances = Load_model_X(scene);

var instances_trees = Load_trees(scene, 0, 0, 0);

playMusic(camera);

document.onkeydown = function (e) {
    if (e.key === 'd') {
        AnimateMovement(player, 30)
    }
    if (e.key === 'a') {
        AnimateMovement(player, -30)
    }
}

gameSpeed = 0.2;


function animate() {
    
    instances.forEach(element => {
        element.position.z += gameSpeed * element.userData.speed;
        if (element.position.z > 20) {
            scene.remove(element);
            instances.splice(instances.indexOf(element),1);
        }
       Collision(element)
    });

    instances_trees.forEach(tree =>{
        tree.position.z += 0.5;
        if (tree.position.z > 20) {
            scene.remove(tree);
            instances.splice(instances.indexOf(tree),1);
        }
    });
    TWEEN.update();
    renderer.render(scene, camera);
}

//DONE:
    //ADD Player stats (owned items, cars, coins, distance per map)

//ADD handle distance, coins at endgame

//CREATE items and item control handle

//CREATE shop menu

//CREATE screen for model change

//ADD models

//CREATE level desings

//ADD level branching from menu

//Randomize level spawning cars

//ADD music
