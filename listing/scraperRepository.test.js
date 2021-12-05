const { ScraperRepository } = require('./scraperRepository');
const axios = require('axios');

jest.mock("axios");

describe('Scraper repository scrape tests', () => {
  let scraperRepository;
  let items;

  beforeEach(() => {
    scraperRepository = new ScraperRepository(axios);
    items = {
      data: [
        { make: "hyundai", model: "i20"},
        { make: "hyundai", model: "i10"}
      ]
    }
    axios.get.mockResolvedValueOnce(items);
  })

  test('Call client get with scrape id parameter', async () => {
    await scraperRepository.scrape('truecar1');

    expect(axios.get).toHaveBeenCalledWith('http://localhost:2000/text?id=truecar1');
  });

  test('Call client get with query id and query parameter', async () => {
    await scraperRepository.query('araba1', 'hyundai i20');

    expect(axios.get).toHaveBeenCalledWith('http://localhost:2000/query?id=araba1&q=hyundai%20i20');
  });
})