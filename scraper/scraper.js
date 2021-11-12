// dependencies
const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'http://www.arabalar.com.tr';

const ARABALAR_BRANDS_URL = 'http://www.arabalar.com.tr/araba-fiyatlari';
const ARABALAR_BRANDS_SELECTOR = '#fiyatlar .marka';
const ARABALAR_BRANDS_CHILD1 = '.name';
const ARABALAR_BRANDS_CHILD2 = 'h2';
const ARABALAR_BRANDS_CHILD3 = 'a';
const ARABALAR_BRANDS_ATTRIBUTE = 'href';

const ARABALAR_SERIES_SELECTOR = '#models .model';
const ARABALAR_SERIES_CHILD1 = '.modelthumb';
const ARABALAR_SERIES_CHILD2 = 'a';
const ARABALAR_SERIES_ATTRIBUTE = 'href';

const ARABALAR_MODELS_SELECTOR = '#0km ul li';
const ARABALAR_CHILD_MODEL = 'a';
const ARABALAR_CHILD_PRICE = 'span';

async function findBrandHref(url, selector, child1, child2, child3, attribute) {
  const brandHrefs = [];
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const brandHrefItem = $(selector);
    brandHrefItem.each((idx, el) => {
      const brandHref = $(el).children(child1).children(child2).children(child3).attr(attribute);
      brandHrefs.push(brandHref);
    })
  } catch (err) {
    console.error(err);
  }
  return brandHrefs;
};

async function findModelHref(url, selector, child1, child2, attribute) {
  const modelHrefs = [];
  try {
    const brandHrefsToLoop = await findBrandHref(ARABALAR_BRANDS_URL, ARABALAR_BRANDS_SELECTOR, ARABALAR_BRANDS_CHILD1, ARABALAR_BRANDS_CHILD2, ARABALAR_BRANDS_CHILD3, ARABALAR_BRANDS_ATTRIBUTE);
    console.log(brandHrefsToLoop);
    for (let i = 0; i < brandHrefsToLoop.length; i++) {
      url = BASE_URL + brandHrefsToLoop[i];
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const modelHrefItem = $(selector);
      modelHrefItem.each((idx, el) => {
        const modelHref = $(el).children(child1).children(child2).attr(attribute);
        modelHrefs.push(modelHref);
      })
    }
  } catch (err) {
    console.error(err);
  }
  return modelHrefs;
};

async function scrapeData(url, selector, model, price) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const carItem = $(selector);
    const cars = [];
    carItem.each((idx, el) => {
      const car = {
        model: $(el).children(model).text(),
        price: $(el).children(price).text()
      };
      cars.push(car);
    })
    const filteredCars = cars.filter(car => car.price !== 'Satış Dışı ');
    return filteredCars;
  } catch (err) {
    console.error(err);
  }
};

async function callScrapeDataForArabalar() {
  const modelHrefs = await findModelHref(BASE_URL, ARABALAR_SERIES_SELECTOR, ARABALAR_SERIES_CHILD1, ARABALAR_SERIES_CHILD2, ARABALAR_SERIES_ATTRIBUTE);
  const carsToShowcase = [];
  for (let i = 0; i < modelHrefs.length; i++) {
    const url = BASE_URL + modelHrefs[i];
    const filteredCars = await scrapeData(url, ARABALAR_MODELS_SELECTOR, ARABALAR_CHILD_MODEL, ARABALAR_CHILD_PRICE);
    if (filteredCars) {
      carsToShowcase.push(...filteredCars);
    }
  }
  console.log(carsToShowcase);
};

callScrapeDataForArabalar();
