import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function Load_model(scene){
    const loader = new GLTFLoader();

loader.load( './models/car.glb', function ( gltf ) {

	    scene.add( gltf.scene );

    }, undefined, function ( error ) {

	    console.error( error );

} );
    
}
