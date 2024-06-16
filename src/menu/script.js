document.addEventListener('DOMContentLoaded', () => {
    const coinCountElement = document.getElementById('coin-count');
    let coins = parseInt(sessionStorage.getItem('coins')) || 0;
    coinCountElement.textContent = coins;

    document.querySelectorAll('.item').forEach(item => {
        const itemName = item.getAttribute('data-item');
        const itemPrice = parseInt(item.getAttribute('data-price'));
        const button = item.querySelector('button');

        button.addEventListener('click', () => {
            if (coins >= itemPrice) {
                coins -= itemPrice;
                sessionStorage.setItem('coins', coins);
                coinCountElement.textContent = coins;

                if (['car2', 'car3', 'map2', 'map3'].includes(itemName)) {
                    sessionStorage.setItem(itemName, 'true');
                } else if (['invincible', 'slow-down'].includes(itemName)) {
                    let count = parseInt(sessionStorage.getItem(itemName)) || 0;
                    sessionStorage.setItem(itemName, count + 1);
                }
                alert(`${itemName} purchased!`);
                button.disabled = true;
            } else {
                alert('Not enough coins!');
            }
        });

        if (sessionStorage.getItem(itemName) === 'true' || parseInt(sessionStorage.getItem(itemName)) > 0) {
            button.disabled = true;
        }
    });
});