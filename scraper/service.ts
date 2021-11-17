import { FormatterFactory } from "./formatter";
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
    return cars.map(car => objectFormatter.format(car, isoCode, currencyFormat));
  }
}