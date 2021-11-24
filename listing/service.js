
class ListingService {
    repository;
    scraperRepository;
    searchEngine;

    constructor(repository, scraperRepository, searchEngine) {
        this.repository = repository;
        this.scraperRepository = scraperRepository;
        this.searchEngine = searchEngine;
    }

    forceList(type) {
        let items = this.repository.findByCategory(type);
        if (!items || items.length === 0) {
            items = this.scraperRepository.scrape(type);
            this.repository.saveWithCategory(type, items);
        }
        return items;    
    }

    forceQuery(query) {
        let items = this.searchEngine.search(this.repository, query);
        if (!items || items.length === 0) {
            items = this.scraperRepository.query(query);
            this.repository.save(items);
        }
        return items;
    }
}

exports.ListingService = ListingService;