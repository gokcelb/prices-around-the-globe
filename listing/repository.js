class Repository {
  client;

  constructor(client) {
    this.client = client;
  }

  async findByCategory(category, iso) {
    const cursor = await this.client.db('listing').collection('car').find({category: category, iso: iso});
    return await cursor.toArray();
  }

  async saveWithCategory(category, items) {
    await this.client.db('listing').collection(category).insertMany(items);
  }

  async findByQuery(queryText, iso) {
    this.client.db('listing').collection('car').createIndex({textSearch: "text"});
    const cursor = await this.client.db('listing').collection('car').find({iso: iso, $text: {$search: queryText}});
    return await cursor.toArray();
  }

  async save(items) {
    await this.client.db('listing').collection('car').insertMany(items);
  }

  async getSearchTexts() {
    console.log('went into get search texts')
    const cursor = await this.client.db('listing').collection('car').find(
        { },
        { projection: {textSearch: 1, _id: 0} }
    )
    return await cursor.toArray();
  }
}

exports.Repository = Repository;
