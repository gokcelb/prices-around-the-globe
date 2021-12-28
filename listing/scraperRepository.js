require('dotenv/config');

class ScraperRepository {
  // baseURL = `${process.env.SCRAPER_HOST}`;
  baseURL = `http://localhost:2000`
  client;

  constructor(client) {
    this.client = client;
  }

  async scrape(iso) {
    const isoQueryString = iso ? `?iso=${iso}` : '';

    const { data } = await this.client.get(`${this.baseURL}/text${isoQueryString}`);
    return data;
  }

  async query(query, iso) {
    const isoQueryString = iso ? `&iso=${iso}` : '';

    const { data } = await this.client.get(`${this.baseURL}/query?q=${encodeURI(query)}${isoQueryString}`);
    return data;
  }
}

exports.ScraperRepository = ScraperRepository;