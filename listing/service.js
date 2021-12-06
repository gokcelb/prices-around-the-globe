class ListingService {
    repository;
    scraperRepository;

    constructor(repository, scraperRepository) {
        this.repository = repository;
        this.scraperRepository = scraperRepository;
    }

    async forceList(itemCategory, websiteId) {
        let items;

        try {
            items = await this.repository.findByCategory(itemCategory);

            if (!items || items.length === 0) {
                console.log('items DOES NOT EXIST');
                items = await this.scraperRepository.scrape(websiteId);
                this.repository.saveWithCategory(itemCategory, items);
            }
        } catch (err) {
            console.log(err);
        }

        return items;
    }

    async forceQuery(websiteId, query) {
        let items;

        try {
            items = await this.repository.findByQuery(query);

            if (!items || items.length === 0) {
                console.log('went into forceQuery IF')

                items = await this.scraperRepository.query(websiteId, query);

                items.forEach(item => {
                    const propertyNames = Object.getOwnPropertyNames(item);
                    console.log(propertyNames);
                    const propertyValues = [];
                    for (let i = 0; i < propertyNames.length; i++) {
                        let name = propertyNames[i];
                        if (name === 'price' || name === 'mileage' || name === 'currency' || name === 'category') continue;
                        propertyValues.push(item[name]);
                    }
                    item['textSearch'] = propertyValues.join(' ');
                    console.log(item['textSearch']);
                })

                this.repository.save(items);
            }
        }
         catch (err) {
            console.log(err);
        }

        return items;
    }
}

exports.ListingService = ListingService;