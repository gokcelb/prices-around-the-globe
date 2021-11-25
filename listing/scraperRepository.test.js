const { ScraperRepository } = require('./scraperRepository');

describe('Scraper repository scrape tests', () => {
  let client;

  beforeEach(() => {
    client = { 'get': jest.fn() };

    scraperRepository = new ScraperRepository(client);
  })

  test('Call client get with scrape id paramater', async () => {
    await scraperRepository.scrape('truecar1');

    expect(client.get).toHaveBeenCalledWith('http://localhost:2000/text?id=truecar1');
  });

  test('Call client get with query id and query parameter', async () => {
    await scraperRepository.query('araba1', 'hyundai i20');

    expect(client.get).toHaveBeenCalledWith('http://localhost:2000/query?id=araba1&q=hyundai%20i20');
  });
})