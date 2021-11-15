import { ScraperFactory, TextScraper } from "./scraper"
import { PriceFormatter, DefaultFormatter, CurrencyFormatter, FormatterFactory } from './formatter'

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
    const autopolisCarChildrenBrand = ['.row', '.result__details', '.result__name', '.result__brand'];
    const autopolisCarChildrenModel = ['.row', '.result__details', '.result__name', '.result__range'];
    const autopolisCarChildrenCharacteristics = ['.row', '.result__details', '.result__characteristics', '.result__model'];
    const autopolisCarChildrenPrice = ['.row', '.result__prices', '.result__price', 'strong'];
    const autopolisCarChildrenCurrency = ['.row', '.result__prices', '.result__price', 'span'];

    const factory = new ScraperFactory();
    const hrefs = await factory.createAttrScraper(arabalarBaseURL, arabalarBrandsAttribute)
        .select(arabalarBrandsSelector)
        .child(...arabalarBrandsChildren)
        .scrape();

    const cars = await (factory.createTextScraper(autopolisBaseURL)
        .select(autopolisCarSelector) as TextScraper)
        .branch(autopolisCarChildrenBrand, 'brand')
        .branch(autopolisCarChildrenModel, 'model')
        .branch(autopolisCarChildrenPrice, 'price')
        .branch(autopolisCarChildrenCharacteristics, 'characteristics')
        .branch(autopolisCarChildrenCurrency, 'currency')
        .scrape();

    console.log(hrefs);
    console.log(cars);

    
    const priceFormatter = FormatterFactory.get('price');
    console.log('29.990,00');
    console.log(priceFormatter.format('29.990,30'));

    const defaultFormatter = FormatterFactory.get()
    console.log('\n\t\t\t\t\tJeep\n\t\t\t\t');
    console.log(defaultFormatter.format('\n\t\t\t\t\tJeep\n\t\t\t\t'));
    
    const currencyFormatter = FormatterFactory.get('currency');
    console.log(currencyFormatter.format('us', 'symbol'));    

    const objectFormatter = FormatterFactory.get('object');
    const formattedObject = objectFormatter.format(cars[0], 'lu');

    console.log(formattedObject);
}

main()