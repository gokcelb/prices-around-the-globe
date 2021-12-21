import axios from 'axios';

export async function getAllCategoryItems(category) {
    try {
        const { data } = await axios.get(`http://localhost:5000/categories/${category}`);
        return data;
    } catch (e) {
        console.error(e);
    }
}

export async function getCategoryItemsWithCountry(category) {
    try {
        const { data } = await axios.get(`http://localhost:5000/categories/${category}?iso=us`);
        return data;
    } catch (e) {
        console.error(e);
    }
}

export async function getSearchTexts() {
    try {
        const { data } = await axios.get(`http://localhost:5000/search`);
        return data;
    } catch (e) {
        console.error(e);
    }
}