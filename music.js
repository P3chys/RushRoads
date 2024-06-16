import * as THREE from 'three';

export function playMusic(camera){
    const listener = new THREE.AudioListener();
    camera.add( listener );
    
    // create a global audio source
    const sound = new THREE.Audio( listener );
    
    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( './001.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.3 );
        sound.play();
    });
}
