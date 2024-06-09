import * as THREE from 'three';
import { Lights } from './init_lights';
import { Load_model } from './import_models';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

Lights(scene);


camera.position.z = 50;
camera.position.y = 20;

Load_model(scene);

function animate() {

	renderer.render( scene, camera );

}