class Repository {
  client;

  constructor(client) {
    this.client = client;
  }

  async findByCategory(itemCategory) {
    try {
      console.log('went into find by category in REPOSITORY');
      const cursor = await this.client.db('listing').collection('cars').find({ category: itemCategory });
      const result = await cursor.toArray();
      return result;
    } catch(e) {
      console.error(e);
    }
  }

  async saveWithCategory(category, items) {
    const collectionName = category + 's';
    try {
      await this.client.db('listing').collection(collectionName).insertMany(items);
    } catch (e) {
      console.error(e);
    }
  }

  async save(data) {
    try {
      console.log('Entered save function successfully');
      await this.client.db('listing').collection('cars').insertMany(data);
      console.log(`The items look like the following ${JSON.stringify(data)}`);
    } catch (e) {
      console.error(e);
    }
  }
}

exports.Repository = Repository;
