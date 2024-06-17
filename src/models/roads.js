import * as THREE from 'three';
import { getCurrentMap } from '../utils/currentSettingHandler';
import vertex_shader from '../../public/assets/vertex_shader';
import fragmentShader from '../../public/assets/fragment_shader';

const roadSizeWidth = 30, raodSizeLength = 2000, roadRotateX = 0.5, roadColorScalar = 1.5;
const groundSize = 2000;
const rLane = 30, lLane = -30;

var groundColor = new THREE.MeshToonMaterial({color: 0x136d15})

export function initRoads(scene){
    let ground = new THREE.Mesh(
        new THREE.PlaneGeometry(
            roadSizeWidth, 
            raodSizeLength) .rotateX(-Math.PI * roadRotateX), 
            new THREE.MeshLambertMaterial({ color: new THREE.Color(0x442288).multiplyScalar(roadColorScalar),emissive:0x442288,emissiveIntensity:7})
        );
    let ground2 = new THREE.Mesh(
        new THREE.PlaneGeometry(
            roadSizeWidth, 
            raodSizeLength).rotateX(-Math.PI * roadRotateX), 
            new THREE.MeshLambertMaterial({ color: new THREE.Color(0x224488), emissive:0x224488,emissiveIntensity:7 })
        );
    
    let ground3 = new THREE.Mesh(
        new THREE.PlaneGeometry(
            roadSizeWidth, 
            raodSizeLength).rotateX(-Math.PI * roadRotateX),
            new THREE.MeshLambertMaterial({ color: new THREE.Color(0x444422).multiplyScalar(roadColorScalar),emissive:0x444422,emissiveIntensity:7 })
        );

    if(parseInt(getCurrentMap())==1){
        groundColor = new THREE.MeshToonMaterial({color: 0x136d15})
    }   
    if(parseInt(getCurrentMap())==2){
        groundColor = new THREE.MeshToonMaterial({color: 0x5f5f5f})
    } 
    if(parseInt(getCurrentMap())==3){
        groundColor = new THREE.ShaderMaterial( {
              vertexShader: vertex_shader,
              fragmentShader:fragmentShader,
        } );
    }   
    
    let groundx = new THREE.Mesh(
        new THREE.PlaneGeometry(groundSize, groundSize).rotateX(-Math.PI * roadRotateX),
        groundColor,
    );
    
    ground2.position.x = lLane;
    ground3.position.x = rLane;

    groundx.position.y = -2; //so it is below
    groundx.receiveShadow = true;
    scene.add(ground);
    scene.add(ground2);
    scene.add(ground3);
    scene.add(groundx);
}