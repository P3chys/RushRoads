import * as THREE from 'three';
var camera, scene, renderer;


init();
animate();



function init() {

}

function move(item){

}

function animate() {

    requestAnimationFrame( animate );
    
    renderer.render( scene, camera );

}