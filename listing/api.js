require('dotenv/config');
const express = require('express');
const { Repository } = require('./repository');
const { ScraperRepository } = require('./scraperRepository');
const { Formatter } = require("./formatter");
const { ListingService } = require('./service');
const { MongoClient } = require("mongodb");
const httpClient = require('axios');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:8080' }));

const uri = `mongodb+srv://gokcelb:${process.env.MY_PASSWORD}@pricesaroundtheglobe.c9lzx.mongodb.net/${process.env.MY_DATABASE}?retryWrites=true&w=majority`
const dbClient = new MongoClient(uri);

async function run() {
    await dbClient.connect();
}
run();

const repository = new Repository(dbClient);
const scraperRepository = new ScraperRepository(httpClient);
const formatter = new Formatter();
const isoList = ['tr', 'us', 'lu'];
const service = new ListingService(repository, scraperRepository, formatter, isoList);

app.get('/categories/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const iso = req.query.iso;
        const items = await service.forceList(category, iso);
        res.send(items);
    } catch (e) {
        console.error(e.message);
        res.status(404).send(e);
    }
})

app.get('/', async (req, res) => {
    try {
        const query = req.query.q;
        const iso = req.query.iso;
        const items = await service.forceQuery(query, iso);
        res.send(items);
    } catch (e) {
        console.error(e.message);
        res.status(404).send(e);
    }
})

app.get('/search', async (req, res) => {
    try {
        const texts = await service.search();
        res.send(texts);
    } catch (e) {
        console.error(e);
        res.status(404).send(e);
    }
})

const port = process.env.PORT;
app.listen(port, () => console.log(`app listening on PORT ${port}`));