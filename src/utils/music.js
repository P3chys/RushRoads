import * as THREE from 'three';

export function playMusic(sample,camera){
    const listener = new THREE.AudioListener();
    camera.add( listener );
    
    // create a global audio source
    const sound = new THREE.Audio( listener );
    
    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( '/assets/music/'+sample+'.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );
        sound.play();
    });
}
