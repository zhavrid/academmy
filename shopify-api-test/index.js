(async () => {
    const { default: fetch } = await import('node-fetch');

// Access Token и URL магазина
    const SHOPIFY_STORE = 'academmy.myshopify.com'; // имя магазина
    const ACCESS_TOKEN = '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'; //токен

// URL для получения продуктов
    const API_URL = `https://${SHOPIFY_STORE}/admin/api/2023-10/products.json`;

// Запрос к Shopify API
    async function getProducts() {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': ACCESS_TOKEN,
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Products:', data);
        } catch (error) {
            console.error('Request error:', error);
        }
    }

    getProducts();
})();
