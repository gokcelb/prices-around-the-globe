const listing = require('./service');

describe('Listing Service forceList tests', () => {
    let mockRepository;
    let mockScraperRepository;
    let service;

    beforeEach(() => {
        mockRepository = { 'findByCategory': jest.fn(), 'saveWithCategory': jest.fn() };
        mockScraperRepository = { 'scrape': jest.fn() };

        service = new listing.ListingService(mockRepository, mockScraperRepository);
    })

    test('Call get forceList of data from repository according to given category', () => {
        mockRepository.findByCategory.mockReturnValue([1,2]);

        service.forceList('car');
        service.forceList('food');

        expect(mockRepository.findByCategory).toHaveBeenCalledWith('car');
        expect(mockRepository.findByCategory).toHaveBeenCalledWith('food');
    });

    test('Do not call scraper scrape when there is data in repository', () => {
        mockRepository.findByCategory.mockReturnValue([1,2]);

        const result = service.forceList('car');

        expect(mockRepository.findByCategory).toHaveBeenCalled();
        expect(mockScraperRepository.scrape).not.toHaveBeenCalled();
        expect(result).toEqual([1, 2]);
    });

    test('Call scraper for data when there is no data inside repository', () => {
        mockRepository.findByCategory.mockReturnValue([]);
        mockScraperRepository.scrape.mockReturnValue([3]);

        const result = service.forceList('car');

        expect(mockScraperRepository.scrape).toHaveBeenCalledWith('car');
        expect(result).toEqual([3]);
    });

    test('Save scraped data with given category to repository', () => {
        mockScraperRepository.scrape.mockReturnValue([3]);

        service.forceList('car');

        expect(mockRepository.saveWithCategory).toHaveBeenCalledWith('car', [3]);
    });
});


describe('Listing Service ForceQuery tests', () => {
    let mockRepository;
    let mockScraperRepository;
    let mockSearchEngine;
    let service;
    
    beforeEach( () => {
        mockRepository = { 'save': jest.fn() };
        mockScraperRepository = { 'query': jest.fn() };
        mockSearchEngine = { 'search': jest.fn() };

        service = new listing.ListingService(mockRepository, mockScraperRepository, mockSearchEngine);
    })

    test('Call searchEngine search function with repository and query', () => {
        mockSearchEngine.search.mockReturnValue([0, 4]);

        const result = service.forceQuery('i20');

        expect(mockSearchEngine.search).toHaveBeenCalledWith(mockRepository, 'i20');
        expect(result).toEqual([0, 4]);
    });

    test('Call scraperRepository query function with query if searchEngine search method returns empty', () => {
        mockScraperRepository.query.mockReturnValue([3]);
        mockSearchEngine.search.mockReturnValue([]);

        const result = service.forceQuery('bmw');

        expect(mockScraperRepository.query).toHaveBeenCalledWith('bmw');
        expect(result).toEqual([3]);

    })

    test('Save scraped query result to repository', () => {
        mockScraperRepository.query.mockReturnValue([3]);

        service.forceQuery('compass');

        expect(mockScraperRepository.query).toHaveBeenCalledWith('compass');
        expect(mockRepository.save).toHaveBeenCalledWith([3]);
    })
});