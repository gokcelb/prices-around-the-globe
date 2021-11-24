const forceListing = require('./service');

describe('Listing Service forceList tests', () => {

    test('Call get forceList of data from repository according to given category', () => {
        const mockRepository = { 'findByCategory': jest.fn(() => [1, 2])};
        const mockScraperRepository = { 'scrape': jest.fn() };
        const service = new forceListing.ListingService(mockRepository, mockScraperRepository);

        service.forceList('car');
        service.forceList('food');

        expect(mockRepository.findByCategory).toHaveBeenCalledWith('car');
        expect(mockRepository.findByCategory).toHaveBeenCalledWith('food');
    });

    test('Do not call scraper scrape when there is data in repository', () => {
        const mockRepository = { 'findByCategory': jest.fn(() => [1, 2]) };
        const scraperRepository = { 'scrape': jest.fn() };
        const service = new forceListing.ListingService(mockRepository, scraperRepository);

        const result = service.forceList('car');

        expect(mockRepository.findByCategory).toHaveBeenCalled();
        expect(scraperRepository.scrape).not.toHaveBeenCalled();
        expect(result).toEqual([1, 2]);
    });

    test('Call scraper for data when there is no data inside repository', () => {
        const mockRepository = { 'findByCategory': jest.fn(() => []), 'saveWithCategory': jest.fn() };
        const scraperRepository = { 'scrape': jest.fn(() => [3]) };
        const service = new forceListing.ListingService(mockRepository, scraperRepository);

        const result = service.forceList('car');

        expect(scraperRepository.scrape).toHaveBeenCalledWith('car');
        expect(result).toEqual([3]);
    });

    test('Save scraped data with given category to repository', () => {
        const mockRepository = { 'findByCategory': jest.fn(), 'saveWithCategory': jest.fn() };
        const scraperRepository = { 'scrape': jest.fn(() => [3]) };

        const service = new forceListing.ListingService(mockRepository, scraperRepository);
        service.forceList('car');

        expect(mockRepository.saveWithCategory).toHaveBeenCalledWith('car', [3]);
    });
});


describe('Listing Service ForceQuery tests', () => {

});