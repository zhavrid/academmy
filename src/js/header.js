document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.getElementById('cart-icon');
    const sidebarCart = document.getElementById('cart-sidebar');
    const closeCart = document.getElementById('close-cart');

    if (cartIcon) {
        cartIcon.addEventListener('click', function () {
            console.log('Клик на иконку корзины');
            sidebarCart.classList.remove('hidden');
            updateCart(); // Обновление содержимого корзины через AJAX
        });
    } else {
        console.error("cart-icon не найден");
    }

    if (closeCart) {
        closeCart.addEventListener('click', function () {
            console.log('Клик на крестик');
            sidebarCart.classList.add('hidden');
        });
    } else {
        console.error("close-cart не найден");
    }

    document.addEventListener('click', function (e) {
        if (!sidebarCart.contains(e.target) && !cartIcon.contains(e.target)) {
            sidebarCart.classList.add('hidden');
        }
    });

    // Функция для обновления содержимого корзины
    function updateCart() {
        fetch('/?section_id=cart-sidebar') // Используем Section Rendering API
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newCartContent = doc.querySelector('#cart-sidebar').innerHTML;
                sidebarCart.innerHTML = newCartContent; // Обновляем содержимое корзины
                attachEventListeners(); // Повторно привязываем обработчики событий
            });
    }

    // Привязка обработчиков событий для удаления товаров из корзины
    function attachEventListeners() {
        const removeButtons = sidebarCart.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const itemKey = button.dataset.key;
                fetch('/cart/change.js', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: itemKey, quantity: 0 }),
                }).then(() => updateCart());
            });
        });
    }

    // Добавление товара в корзину
    document.querySelectorAll('form[action="/cart/add"]').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            fetch('/cart/add.js', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' },
            }).then(() => updateCart());
        });
    });
});
