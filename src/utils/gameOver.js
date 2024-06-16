import { getCurrentMap } from "./currentSettingHandler";
import { playMusic} from "./music";

export function gameOver(coins, clock, renderer, camera) {
    let map_val = getCurrentMap()
    if (sessionStorage.getItem("distance_map_"+map_val) < clock.getElapsedTime()) {
        sessionStorage.setItem("distance_map_"+map_val, clock.getElapsedTime())
    }
    let curCoins = parseInt(sessionStorage.getItem("coins"));
    sessionStorage.setItem("coins",curCoins+coins);

    sessionStorage.setItem("lastDistance",parseInt(clock.getElapsedTime()));
    sessionStorage.setItem("collectedCoins",parseInt(coins));
    clock.stop();
    renderer.domElement.style.display = 'none';
    window.location.href = "./menu/gameOver.html";
}