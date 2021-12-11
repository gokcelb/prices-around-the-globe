class ListingService {
    repository;
    scraperRepository;
    isoList;

    constructor(repository, scraperRepository, isoList) {
        this.repository = repository;
        this.scraperRepository = scraperRepository;
        this.isoList = isoList;
    }

    async forceList(category, iso=null) {
        let items;
        try {
            if (iso) {
                items = await this.repository.findByCategory(category, iso);
            } else {
                for (let i = 0; i < this.isoList.length; i++) {
                    let currIso = this.isoList[i];
                    items = await this.repository.findByCategory(category, currIso);
                    if (items.length === 0) break;
                }
            }

            if (!items || items.length === 0) {
                items = await this.scraperRepository.scrape(iso);

                if (items.length > 0) {
                    this.repository.saveWithCategory(category, items);
                }
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
                for (let i = 0; i < this.isoList.length; i++) {
                    let currIso = this.isoList[i];
                    items = await this.repository.findByQuery(query, currIso);
                    if (items.length === 0) break;
                }
            }

            if (!items || items.length === 0) {
                items = await this.scraperRepository.query(query, iso);

                items.forEach(item => {
                    const propertyNames = Object.getOwnPropertyNames(item);
                    const propertyValues = [];
                    for (let i = 0; i < propertyNames.length; i++) {
                        let name = propertyNames[i];
                        const willNotInclude = ['price', 'mileage', 'currency', 'category', 'iso'];
                        if (willNotInclude.includes(name)) continue;
                        propertyValues.push(item[name]);
                    }
                    item['textSearch'] = propertyValues.join(' ');
                });

                if (items.length > 0) {
                    this.repository.save(items);
                }
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