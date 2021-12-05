const express = require('express');
const { ScraperRepository } = require('./scraperRepository');

const app = express();

// const port = 2000;
// app.listen(port, () => console.log(`App listening on port ${port}`))


const listing = require('./service');

const scraperRepository = new ScraperRepository();
const service = new listing.ListingService(scraperRepository);
// service.forceList('autopolis1').then(r => console.log(r));
service.forceQuery('araba1', 'hyundai i20').then(r => console.log(r));
