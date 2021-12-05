class ScraperRepository {
  baseURL = "http://localhost:2000";
  client;

  constructor(client) {
    this.client = client;
  }

  async scrape(id) {
    console.log('SCRAAAAPE');
    const { data } = await this.client.get(`${this.baseURL}/text?id=${id}`);
    return data;
  }


  async query(id, query) {
    const { data } = await this.client.get(`${this.baseURL}/query?id=${id}&q=${encodeURI(query)}`);
    return data;
  }
}

exports.ScraperRepository = ScraperRepository;