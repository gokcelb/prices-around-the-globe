import { FormatterFactory } from "./formatter";
import { LinkedScraper } from "./linked";
import { Repository, ScrapeInformation } from "./repository";
import { ScraperFactory, TextScraper } from "./scraper";

export class ScraperService {
  scraperFactory: ScraperFactory;
  scraperRepository: Repository<ScrapeInformation>;

  constructor(scraperFactory: ScraperFactory,
    scraperRepository: Repository<ScrapeInformation>) {
    this.scraperFactory = scraperFactory;
    this.scraperRepository = scraperRepository;
  }

  async scrapeAttr(id: string, attr: string) {
    const scrapeInfo = await this.scraperRepository.get(id);
    const attrScraper = await this.scraperFactory.createAttrScraper(scrapeInfo.baseURL, attr)
      .select(scrapeInfo.selector)
      .child(...scrapeInfo.queryAttr.split(' '))
      .scrape();

    return attrScraper;
  }

  async scrapeText(id: string, isoCode: string, currencyFormat: string) {
    const scrapeInfo = await this.scraperRepository.get(id);

    const textScraper = this.scraperFactory.createTextScraper(scrapeInfo.baseURL)
      .select(scrapeInfo.selector) as TextScraper;
    scrapeInfo.queryText.forEach(branch => {
      textScraper.branch(branch.children, branch.key);
    })
    const cars = await textScraper.scrape();

    const objectFormatter = FormatterFactory.get('object');
    // return cars.map(car => objectFormatter.format(car, isoCode, currencyFormat));
    const formattedCars = cars.map(car => objectFormatter.format(car, isoCode, currencyFormat));
    return formattedCars;
  }

  async scrapeLinked(id:string, isoCode: string, currencyFormat: string): Promise<object[]> {
    const scrapeBrandsInfo = await this.scraperRepository.get('arabalar-brands');
    const scrapeSeriesInfo = await this.scraperRepository.get('arabalar-series');
    const scrapeDataInfo = await this.scraperRepository.get(id);
    const link = new LinkedScraper();

    const attrScraper = this.scraperFactory.createAttrScraper(scrapeBrandsInfo.baseURL, scrapeBrandsInfo.attr)
      .select(scrapeBrandsInfo.selector)
      .child(...scrapeBrandsInfo.queryAttr.split(' '));

    const secondAttrScraper = this.scraperFactory.createAttrScraper(scrapeSeriesInfo.baseURL, scrapeSeriesInfo.attr)
      .select(scrapeSeriesInfo.selector)
      .child(...scrapeSeriesInfo.queryAttr.split(' '));

    const textScraper = this.scraperFactory.createTextScraper(scrapeDataInfo.baseURL);
    scrapeDataInfo.queryText.forEach(branch => {
      textScraper.branch(branch.children, branch.key);
    })
    textScraper.select(scrapeDataInfo.selector);

    link.setAttrScrapers([attrScraper, secondAttrScraper]);
    link.setTextScraper(textScraper);

    const objectFormatter = FormatterFactory.get('object');
    await link.exec(0, [], 8);
    console.log(link.finalResult);

    return link.finalResult.map(f => objectFormatter.format(f, isoCode, currencyFormat));
  }
}