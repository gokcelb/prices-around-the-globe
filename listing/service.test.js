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

    test('calls get forceList of data from repository according to given category and websiteId', () => {
        service.forceList('car', 'autopolis1');
        service.forceList('food', 'lalo1');

        expect(mockRepository.findByCategory).toHaveBeenCalledWith('car');
        expect(mockRepository.findByCategory).toHaveBeenCalledWith('food');
    });

    test('does not call scraper scrape when there is data in repository', async() => {
        mockRepository.findByCategory.mockReturnValue([1,2]);

        const result = await service.forceList('car');

        expect(mockRepository.findByCategory).toHaveBeenCalled();
        expect(mockScraperRepository.scrape).not.toHaveBeenCalled();
        expect(result).toEqual([1, 2]);
    });

    test('calls scraper for data when there is no data inside repository', async () => {
        mockRepository.findByCategory.mockReturnValue([]);
        mockScraperRepository.scrape.mockReturnValue([3]);

        const result = await service.forceList('car', 'autopolis1');

        expect(mockScraperRepository.scrape).toHaveBeenCalledWith('autopolis1');
        expect(result).toEqual([3]);
    });

    test('saves scraped data with given category to repository', async () => {
        mockScraperRepository.scrape.mockReturnValue([3]);

        await service.forceList('car', 'autopolis1');

        expect(mockRepository.saveWithCategory).toHaveBeenCalledWith('car', [3]);
    });

    test('returns empty list if error occurs', async () => {
        mockRepository = {
            'findByCategory': jest.fn(() => new Error('error')), 'findByQuery': jest.fn()
        };

        try {
            await service.forceQuery('truecar1', 'bmw');
        } catch (e) {
            expect(e).toMatch('error')
        }
    });
})


describe('Listing Service ForceQuery tests', () => {
    let mockRepository;
    let mockScraperRepository;
    let service;
    
    beforeEach( () => {
        mockRepository = { 'save': jest.fn(), 'findByQuery': jest.fn() };
        mockScraperRepository = { 'query': jest.fn() };

        service = new listing.ListingService(mockRepository, mockScraperRepository);
    });

    test('calls repository findByQuery function with query and returns result', async () => {
        mockRepository.findByQuery.mockReturnValue([5, 8]);

        const result = await service.forceQuery('autopolis1', 'bmw');

        expect(mockRepository.findByQuery).toHaveBeenCalledWith('bmw');
        expect(mockScraperRepository.query).not.toHaveBeenCalled();
        expect(result).toEqual([5, 8]);
    });

    test('calls scraperRepository query function with query if repository findByQuery method returns empty', async () => {
        mockRepository.findByQuery.mockReturnValue([]);
        mockScraperRepository.query.mockReturnValue([
            {
                make: "BMW",
                year: "2012",
                mileage: 432000,
                price: 75000,
                currency: "$",
                category: "car"
            }
        ]);

        const result = await service.forceQuery('autopolis1', 'bmw');

        expect(mockScraperRepository.query).toHaveBeenCalledWith('autopolis1', 'bmw');
        expect(result).toEqual([{
            make: "BMW",
            year: "2012",
            mileage: 432000,
            price: 75000,
            currency: "$",
            category: "car",
            textSearch: "BMW 2012"
        }]);
    });

    test('calls save function to save scraped query result to repository', async () => {
        mockRepository.findByQuery.mockReturnValue([]);
        mockScraperRepository.query.mockReturnValue([{
            make: "BMW",
            year: "2012",
            mileage: 432000,
            price: 75000,
            currency: "$",
            category: "car"
        }]);

        await service.forceQuery('autopolis1', 'compass');

        expect(mockRepository.save).toHaveBeenCalledWith([
            {
                make: "BMW",
                year: "2012",
                mileage: 432000,
                price: 75000,
                currency: "$",
                category: "car",
                textSearch: "BMW 2012"
            }
        ]);
    });

    test('returns empty list if error occurs', async () => {
        mockRepository = {
            'findByCategory': jest.fn(), 'findByQuery': jest.fn(() => new Error('error'))
        };

        try {
            await service.forceQuery('truecar1', 'bmw');
        } catch (e) {
            expect(e).toMatch('error')
        }
    });
})