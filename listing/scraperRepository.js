class ScraperRepository {
  client;

  constructor(client) {
    this.client = client;
  }

  async scrape(id) {
    return await this.client.get(`http://localhost:2000/text?id=${id}`);
  }


  async query(id, query) {
    return await this.client.get(`http://localhost:2000/query?id=${id}&q=${encodeURI(query)}`);
  }
}

exports.ScraperRepository = ScraperRepository;