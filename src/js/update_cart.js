document.getElementById('update-cart').addEventListener('click', () => {
    fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: '123456789', quantity: 1 }), // Замените ID товара
    })
        .then(response => response.json())
        .then(() => {
            // Задержка для обработки изменений
            setTimeout(() => {
                fetch(`/?sections=cart-items&timestamp=${Date.now()}`)
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('shopify-section-cart-items').innerHTML = data['cart-items'];
                    });
            }, 500);
        })
        .catch(error => console.error('Ошибка:', error));
});
