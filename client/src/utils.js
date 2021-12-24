const isoToCountry = {
    tr: "Turkey",
    us: "United States",
    lu: "Luxembourg",
}

export function encodeByCountry(items) {
    const encodedItems = {};
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let country = isoToCountry[item["iso"]];
        if (!encodedItems[country]) {
            encodedItems[country] = [];
        }
        encodedItems[country].push(item);
    }
    return encodedItems;
}

export function paginate(items, itemsPerPage, page) {
    return items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
}