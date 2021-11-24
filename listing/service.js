
class ListingService {
    repository;
    scraperRepository;

    constructor(repository, scraperRepository) {
        this.repository = repository;
        this.scraperRepository = scraperRepository;
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

    }
}

exports.ListingService = ListingService;