class ListingService {
    repository;
    scraperRepository;
    formatter;
    isoList;

    constructor(repository, scraperRepository, formatter, isoList) {
        this.repository = repository;
        this.scraperRepository = scraperRepository;
        this.formatter = formatter;
        this.isoList = isoList;
    }

    async forceList(category, iso=null) {
        let items;
        try {
            if (iso) {
                items = await this.repository.findByCategory(category, iso);
            } else {
                const allItems = [];
                for (let i = 0; i < this.isoList.length; i++) {
                    let currIso = this.isoList[i];
                    items = await this.repository.findByCategory(category, currIso);
                    if (items.length === 0) break;
                    allItems.push(...items);
                }
                return allItems;
            }

            if (!items || items.length === 0) {
                items = await this.scraperRepository.scrape(iso);
                items = this.formatter.formatProperties(items);
                this.repository.saveWithCategory(category, items);
            }
            return items;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async forceQuery(query, iso=null) {
        let items;
        try {
            if (iso) {
                items = await this.repository.findByQuery(query, iso);
            } else {
                const allItems = [];
                for (let i = 0; i < this.isoList.length; i++) {
                    let currIso = this.isoList[i];
                    items = await this.repository.findByQuery(query, currIso);
                    if (items.length === 0) break;
                    allItems.push(...items);
                }
                return allItems;
            }

            if (!items || items.length === 0) {
                items = await this.scraperRepository.query(query, iso);
                items.forEach(item => {
                    const propertyNames = Object.getOwnPropertyNames(item);
                    const propertyValues = [];
                    for (let i = 0; i < propertyNames.length; i++) {
                        let name = propertyNames[i];
                        const willNotInclude = ['price', 'mileage', 'currency', 'category', 'iso', 'imageURL'];
                        if (willNotInclude.includes(name)) continue;
                        propertyValues.push(item[name]);
                    }
                    item['textSearch'] = propertyValues.join(' ');
                });
                items = this.formatter.formatProperties(items);
                this.repository.save(items);
            }
            return items;
        }
         catch (err) {
            console.log(err);
            return [];
        }
    }

    async search() {
        try {
            console.log('went into searchTexts')
            return await this.repository.getSearchTexts();
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}

exports.ListingService = ListingService;