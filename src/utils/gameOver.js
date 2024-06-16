export function gameOver(coins, clock, renderer) {
    if (sessionStorage.getItem("distance_map_1") < clock.getElapsedTime()) {
        sessionStorage.setItem("distance_map_1", clock.getElapsedTime())
    }
    let curCoins = parseInt(sessionStorage.getItem("coins"));
    sessionStorage.setItem("coins",curCoins+coins);

    clock.stop();
    renderer.domElement.style.display = 'none';
    window.location.href = "./menu/menu.html";
}