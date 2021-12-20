import axios from 'axios';

export async function getCategoryItems(category) {
    try {
        const { data } = await axios.get(`http://localhost:5000/categories/${category}?iso=lu`);
        return data;
    } catch (e) {
        console.error(e);
    }
}

export async function getCategoryItemsWithCountry(category, country) {
    try {
        const { data } = await axios.get(`http://localhost:5000/categories/${category}?iso=${country}`);
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