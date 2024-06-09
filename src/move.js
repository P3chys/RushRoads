import * as THREE from 'three';
var goal, keys;

var time = 0;
var newPosition = new THREE.Vector3();
var matrix = new THREE.Matrix4();

var stop = 1;
var DEGTORAD = 0.01745327;
var temp = new THREE.Vector3;
var dir = new THREE.Vector3;
var a = new THREE.Vector3;
var b = new THREE.Vector3;
var coronaSafetyDistance = 0.3;
var velocity = 0.0;
var speed = 0.0;




export function Move(mesh) {
    speed = 0.0;
    window.addEventListener(
        "keydown",
        (event) => {  
          switch (event.key) {
            case "ArrowLeft":
                speed = 1;
              break;
            case "ArrowRight":
                speed = -1;
              break;

            default:
              return; // Quit when this doesn't handle the key event.
          }
          event.preventDefault();
        },
        true,
      );


  
    

  velocity += ( speed - velocity );
  mesh.translateZ( velocity );
    console.log(velocity);
		
  
   // a.lerp(mesh.position, 0.4);
    //b.copy(goal.position);
  
 //   dir.copy( a ).sub( b ).normalize();
  //  const dis = a.distanceTo( b ) - coronaSafetyDistance;
   // goal.position.addScaledVector( dir, dis );
}