class ScraperRepository {
  baseURL = "http://localhost:2000";
  client;

  constructor(client) {
    this.client = client;
  }

  async scrape(iso) {
    const { data } = await this.client.get(`${this.baseURL}/text?iso=${iso}`);
    return data;
  }

  async query(iso, query) {
    console.log(query)
    const { data } = await this.client.get(`${this.baseURL}/query?iso=${iso}&q=${encodeURI(query)}`);
    return data;
  }
}

exports.ScraperRepository = ScraperRepository;