import * as THREE from 'three';
import { getCurrentCar, getCurrentMap } from '../utils/currentSettingHandler';

const roadSizeWidth = 30, raodSizeLength = 2000, roadRotateX = 0.5, roadColorScalar = 1.5;
const groundSize = 2000;
const rLane = 30, lLane = -30;

var groundColor = new THREE.MeshToonMaterial({color: 0x136d15})

export function initRoads(scene){
    let ground = new THREE.Mesh(
        new THREE.PlaneGeometry(
            roadSizeWidth, 
            raodSizeLength) .rotateX(-Math.PI * roadRotateX), 
            new THREE.MeshBasicMaterial({ color: new THREE.Color(0x442288).multiplyScalar(roadColorScalar) })
        );
    let ground2 = new THREE.Mesh(
        new THREE.PlaneGeometry(
            roadSizeWidth, 
            raodSizeLength).rotateX(-Math.PI * roadRotateX), 
            new THREE.MeshBasicMaterial({ color: new THREE.Color(0x224488).multiplyScalar(roadColorScalar) })
        );
    
    let ground3 = new THREE.Mesh(
        new THREE.PlaneGeometry(
            roadSizeWidth, 
            raodSizeLength).rotateX(-Math.PI * roadRotateX),
            new THREE.MeshBasicMaterial({ color: new THREE.Color(0x444422).multiplyScalar(roadColorScalar) })
        );
    if(parseInt(getCurrentMap())==1){
        groundColor = new THREE.MeshToonMaterial({color: 0x136d15})
    }   
    if(parseInt(getCurrentMap())==2){
        groundColor = new THREE.MeshToonMaterial({color: 0x5f5f5f})
    } 
    if(parseInt(getCurrentMap())==3){
        groundColor = new THREE.MeshToonMaterial({color: 0x0e87cc})
    }   
    
    let groundx = new THREE.Mesh(
        new THREE.PlaneGeometry(groundSize, groundSize).rotateX(-Math.PI * roadRotateX),
        groundColor
    );
    
    ground2.position.x = lLane;
    ground3.position.x = rLane;
    groundx.position.y = -2; //so it is below

    scene.add(ground);
    scene.add(ground2);
    scene.add(ground3);
    scene.add(groundx);
}