import { collision } from '/src/utils/collisionHandler';
const removeBoundry=200;

export function handleOtherCars(otherCars, scene, gameSpeed, clock, renderer, collision_flag, player){
    otherCars.forEach(element => {
        element.position.z += element.userData.speed*gameSpeed;
        if (element.position.z > removeBoundry) {
            scene.remove(element);
            otherCars.shift();
        }
    collision(element, clock,renderer,collision_flag,scene,player)
    });
    return otherCars;
}