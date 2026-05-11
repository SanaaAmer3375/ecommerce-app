const BASE_URL = "https://dummyjson.com";

export const productsApi = {
    getAll: async (limit = 12, skip = 0, search = "") => {
        const url = search
        ? `${BASE_URL}/products/search?q=${search}&limit=${limit}&skip=${skip}`
        : `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
        const res = await fetch(url);
        return res.json();
    },

    getById: async (id: number) => {
        const res = await fetch(`${BASE_URL}/products/${id}`);
        return res.json();
    },

    getCategories: async () => {
        const res = await fetch(`${BASE_URL}/products/categories`);
        return res.json();
    },

    getByCategory: async (category: string, limit = 12, skip = 0) => {
        const res = await fetch(
        `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
        );
        return res.json();
    },
};