import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'
import { Lights } from './helpers/init_lights';
import { Load_model } from './helpers/import_player';
import { Move} from './move.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

camera.position.z = 50;
camera.position.y = 20;

Lights(scene);

var player = new THREE.Object3D;
player.name='player';
scene.add(player);

Load_model(player,0,0,0);


console.log(scene.getObjectByName('player').position);



function onClick(amount) {

  new TWEEN.Tween(player.position)
    .to(player.position.clone().setX(player.position.x+amount), 500)
    .onStart(function() {
    })
    .onComplete(function() {
    })
    .start();
}
 
function animate() {
    requestAnimationFrame( animate );
	renderer.render( scene, camera );
    

    document.onkeydown = function(e){
        if(e.key === 'd'){
            onClick(5)
        }
        if(e.key === 'a'){
            onClick(-5)
        }
    }
    TWEEN.update()
}