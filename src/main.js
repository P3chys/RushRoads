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


function animate() {
    requestAnimationFrame( animate );
    TWEEN.update()
	renderer.render( scene, camera );
}