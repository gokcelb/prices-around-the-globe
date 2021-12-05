const express = require('express');
require('dotenv').config();
const { ScraperRepository } = require('./scraperRepository');
const { Repository } = require('./repository')
const axios = require('axios');
const { MongoClient } = require('mongodb');
const listing = require('./service');

const uri = `mongodb+srv://gokcelb:${process.env.MY_PASSWORD}@pricesaroundtheglobe.c9lzx.mongodb.net/${process.env.MY_DATABASE}?retryWrites=true&w=majority`
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
    const repository = new Repository(client);
    const scraperRepository = new ScraperRepository(axios);
    const service = new listing.ListingService(repository, scraperRepository);
    // service.forceQuery('araba1', 'bmw 1').then(r => console.log(r));
    service.forceList('car', 'autopolis1').then(r => console.log(r)).catch(e => console.error(e));
  } catch(e) {
    console.error(e);
  }
}

run();
