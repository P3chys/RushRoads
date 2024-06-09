import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'
import { Lights } from './helpers/init_lights';
import { Load_model } from './helpers/import_player';
import { playMusic } from './music';
import {AnimateMovement} from './move';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

camera.position.z = 50;
camera.position.y = 20;

var player = new THREE.Object3D;
player.name='player';
scene.add(player);

Lights(scene);

Load_model(player,0,0,0);

playMusic(camera);

document.onkeydown = function (e) {
    if (e.key === 'd') {
        AnimateMovement(player,5)
    }
    if (e.key === 'a') {
        AnimateMovement(player,-5)
    }
}

const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( geometry, material ); 
cube.position.set(10,0,0);
scene.add( cube );


function Collision(){
    if(player.position.x > 5 || player.position < -5){
        console.log("crash outside map");
    } 
            const otherBoundingBox = new THREE.Box3().setFromObject(cube)
            const boundingBox = new THREE.Box3().setFromObject(player)
            if(boundingBox.intersectsBox(otherBoundingBox)){
                console.log("HIT")
            }
}














var otherCars = [];

function animate() {
    requestAnimationFrame( animate );
    TWEEN.update();
    Collision();
	renderer.render( scene, camera );
}

var clock = new THREE.Clock()
var time = 0;
var delta = 0;


function render(){
    delta = clock.getDelta();
    time += delta;
    if(time>3){
        //generate new model
        //will need separate spawner for each model
    }
        
}