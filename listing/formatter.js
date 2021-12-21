class Formatter {
    formatProperties(items) {
        console.log('went into FORMAT PROPERTIES')
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item["yearMakeModelFeatures"]) {
                const values = item["yearMakeModelFeatures"].split(' ');
                item["year"] = values[0];
                item["make"] = values[1];
                item["modelFeatures"] = values.slice(2, values.length).join(' ');
                delete item["yearMakeModelFeatures"];
            }
            if (item["makeModelFeatures"]) {
                const values = item["makeModelFeatures"].split(' ');
                item["make"] = values[0];
                item["modelFeatures"] = values.slice(1, values.length).join(' ');
                delete item["makeModelFeatures"];
            }
            if (item["makeModel"]) {
                const values = item["makeModel"].split(' ');
                item["make"] = values[0];
                item["model"] = values.slice(1, values.length).join(' ');
                delete item["makeModel"];
            }
            if (item["model"] && item["features"]) {
                const model = item["model"];
                const features = item["features"];
                item["modelFeatures"] = model + ' ' + features;
                delete item["model"];
                delete item["features"];
            }
        }
        return items;
    }
}

exports.Formatter = Formatter;