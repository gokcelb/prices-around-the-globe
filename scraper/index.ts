import { ScraperFactory, TextScraper } from "./scraper"
import { InMemoryScrapeInformationRepository, Repository, ScrapeInformation, ScraperType } from "./repository";
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

}

main()