
class ListingService {
    repository;
    scraperRepository;
    searchEngine;

    constructor(repository, scraperRepository) {
        this.repository = repository;
        this.scraperRepository = scraperRepository;
        // this.searchEngine = searchEngine;
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
            // let items = this.searchEngine.search(this.repository, query);

            if (!items || items.length === 0) {
                items = await this.scraperRepository.query(websiteId, query);
                this.repository.save(items);
            }
        } catch (err) { console.log(err); }

        return items;
    }
}

exports.ListingService = ListingService;