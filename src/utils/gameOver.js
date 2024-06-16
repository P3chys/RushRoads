import { getCurrentMap } from "./currentSettingHandler";

export function gameOver(coins, clock, renderer) {
    let map_val = getCurrentMap()
    if (sessionStorage.getItem("distance_map_"+map_val) < clock.getElapsedTime()) {
        sessionStorage.setItem("distance_map_"+map_val, clock.getElapsedTime())
    }
    let curCoins = parseInt(sessionStorage.getItem("coins"));
    sessionStorage.setItem("coins",curCoins+coins);

    clock.stop();
    renderer.domElement.style.display = 'none';
    window.location.href = "./menu/menu.html";
}