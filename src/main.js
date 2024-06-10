import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'
import { Lights } from './helpers/init_lights';
import { Load_model } from './helpers/import_player';
import { playMusic } from './music';
import {AnimateMovement} from './move';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.8;


let ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 2000).rotateX(-Math.PI * 0.5).rotateY(-0.05), new THREE.MeshBasicMaterial({color: new THREE.Color(0x442288).multiplyScalar(1.5)}));
let ground2 = new THREE.Mesh(new THREE.PlaneGeometry(30, 2000).rotateX(-Math.PI * 0.5).rotateY(-0.05), new THREE.MeshBasicMaterial({color: new THREE.Color(0x224488).multiplyScalar(1.5)}));
ground2.position.x=-30
let ground3 = new THREE.Mesh(new THREE.PlaneGeometry(30, 2000).rotateX(-Math.PI * 0.5).rotateY(-0.05), new THREE.MeshBasicMaterial({color: new THREE.Color(0x444422).multiplyScalar(1.5)}));
ground3.position.x=30
scene.add(ground);
scene.add(ground2);
scene.add(ground3);



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
        AnimateMovement(player,30)
    }
    if (e.key === 'a') {
        AnimateMovement(player,-30)
    }
}



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
    //Collision();
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