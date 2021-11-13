import { ScraperFactory } from "./scraper"

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

async function main(): Promise<void> {
    const arabalarBaseURL = 'http://www.arabalar.com.tr/araba-fiyatlari';
    const arabalarBrandsSelector = '#fiyatlar .marka';
    const arabalarBrandsChildren = ['.name', 'h2', 'a'];
    const arabalarBrandsAttribute = 'href';
    const autopolisBaseURL = 'https://www.autopolis.lu/fr/vehicules-neufs/en-stock?gclid=CjwKCAiAm7OMBhAQEiwArvGi3K8vltr60JAp_z2cUeo_SUqwXdVH5oYAuQ9p2tFgUacQCinMr_1ZcxoCYnMQAvD_BwE';
    const autopolisCarSelector = '.search-car__results div a';
    const autopolisCarChildren = ['.row', '.result__details', '.result__name', '.result__brand'];

    const factory = new ScraperFactory();
    const hrefs = await factory.createAttrScraper(arabalarBaseURL, arabalarBrandsAttribute)
        .select(arabalarBrandsSelector)
        .child(...arabalarBrandsChildren)
        .scrape();

    const brands = await factory.createTextScraper(autopolisBaseURL)
        .select(autopolisCarSelector)
        .child(...autopolisCarChildren)
        .scrape();

    console.log(hrefs);
    console.log(brands);
}

main()