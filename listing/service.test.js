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

    test('Call get forceList of data from repository according to given category and websiteId', () => {
        service.forceList('car', 'autopolis1');
        service.forceList('food', 'lalo1');

        expect(mockRepository.findByCategory).toHaveBeenCalledWith('car');
        expect(mockRepository.findByCategory).toHaveBeenCalledWith('food');
    });

    test('Do not call scraper scrape when there is data in repository', async() => {
        mockRepository.findByCategory.mockReturnValue([1,2]);

        const result = await service.forceList('car');

        expect(mockRepository.findByCategory).toHaveBeenCalled();
        expect(mockScraperRepository.scrape).not.toHaveBeenCalled();
        expect(result).toEqual([1, 2]);
    });

    test('Call scraper for data when there is no data inside repository', async () => {
        mockRepository.findByCategory.mockReturnValue([]);
        mockScraperRepository.scrape.mockReturnValue([3]);

        const result = await service.forceList('car', 'autopolis1');

        expect(mockScraperRepository.scrape).toHaveBeenCalledWith('autopolis1');
        expect(result).toEqual([3]);
    });

    test('Save scraped data with given category to repository', async () => {
        mockScraperRepository.scrape.mockReturnValue([3]);

        await service.forceList('car', 'autopolis1');

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

    // test('Call searchEngine search function with repository and query', async () => {
    //     mockSearchEngine.search.mockReturnValue([0, 4]);
    //
    //     const result = await service.forceQuery('autopolis1', 'i20');
    //
    //     expect(mockSearchEngine.search).toHaveBeenCalledWith(mockRepository, 'i20');
    //     expect(result).toEqual([0, 4]);
    // });

    test('Call scraperRepository query function with query if searchEngine search method returns empty', async () => {
        mockScraperRepository.query.mockReturnValue([3]);
        // mockSearchEngine.search.mockReturnValue([]);

        const result = await service.forceQuery('autopolis1', 'bmw');

        expect(mockScraperRepository.query).toHaveBeenCalledWith('autopolis1', 'bmw');
        expect(result).toEqual([3]);
    })

    test('Save scraped query result to repository', async () => {
        mockScraperRepository.query.mockReturnValue([3]);

        await service.forceQuery('autopolis1', 'compass');

        expect(mockScraperRepository.query).toHaveBeenCalledWith('autopolis1', 'compass');
        expect(mockRepository.save).toHaveBeenCalledWith([3]);
    })
});