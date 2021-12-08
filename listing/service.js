class ListingService {
    repository;
    scraperRepository;

    constructor(repository, scraperRepository) {
        this.repository = repository;
        this.scraperRepository = scraperRepository;
    }

    async forceList(itemCategory, iso) {
        // TODO - decide whether it should be with or without iso
        let items;
        try {
            items = await this.repository.findByCategory(itemCategory);

            if (!items || items.length === 0) {
                items = await this.scraperRepository.scrape(iso);

                if (items.length > 0) {
                    this.repository.saveWithCategory(itemCategory, items);
                }
            }
        } catch (err) {
            console.log(err);
            return [];
        }
        return items;
    }

    async forceQuery(iso, query) {
        let items;
        try {
            items = await this.repository.findByQuery(query);

            if (!items || items.length === 0) {
                console.log('went into if to call query function')
                items = await this.scraperRepository.query(iso, query);
                console.log('called query function')

                items.forEach(item => {
                    const propertyNames = Object.getOwnPropertyNames(item);
                    const propertyValues = [];
                    for (let i = 0; i < propertyNames.length; i++) {
                        let name = propertyNames[i];
                        if (name === 'price' || name === 'mileage' || name === 'currency' || name === 'category') continue;
                        propertyValues.push(item[name]);
                    }
                    item['textSearch'] = propertyValues.join(' ');
                });

                if (items.length > 0) {
                    this.repository.save(items);
                }
            }
        }
         catch (err) {
            console.log(err);
            return [];
        }
        return items;
    }
}

exports.ListingService = ListingService;