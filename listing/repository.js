class Repository {
  // TODO - refactor functions: save, saveWithCategory
  client;

  constructor(client) {
    this.client = client;
  }

  async findByQuery(queryText) {
    try {
      console.log("find by query executed")
      this.client.db('listing').collection('car').createIndex({ textSearch: "text" });
      console.log('index created')
      const cursor = await this.client.db('listing').collection('car').find({ $text: {$search: queryText}  });
      console.log(`find textSearch ran for=${queryText}`)
      return await cursor.toArray();
    } catch(e) {
      console.error(e);
      return [];
    }
  }

  async findByCategory(itemCategory) {
    try {
      console.log('went into find by category in REPOSITORY');
      const cursor = await this.client.db('listing').collection('car').find({ category: itemCategory });
      return await cursor.toArray();
    } catch(e) {
      console.error(e);
    }
  }

  async saveWithCategory(category, items) {
    try {
      await this.client.db('listing').collection(category).insertMany(items);
    } catch (e) {
      console.error(e);
    }
  }

  async save(data) {
    try {
      console.log('Entered save function successfully');
      await this.client.db('listing').collection('car').insertMany(data);
      console.log(`The items look like the following ${JSON.stringify(data)}`);
    } catch (e) {
      console.error(e);
    }
  }
}

exports.Repository = Repository;
