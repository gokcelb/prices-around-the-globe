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

  async scrapeText(id: string, currencyFormat: string) {
    const scrapeInfo = await this.scraperRepository.get(id);

    const textScraper = this.scraperFactory.createTextScraper(scrapeInfo.baseURL)
      .select(scrapeInfo.selector) as TextScraper;
    scrapeInfo.queryText.forEach(branch => {
      textScraper.branch(branch.children, branch.key);
    })
    const cars = await textScraper.scrape();
    console.log(scrapeInfo.iso);
    
    const objectFormatter = FormatterFactory.get('object');
    const formattedCars = cars.map(car => objectFormatter.format(car, scrapeInfo.iso, currencyFormat));
    return formattedCars;
  }

  async scrapeLinked(id: string, currencyFormat: string, query?: string): Promise<object[]> {
    console.log('activated', id);

    let scraperInfo: ScrapeInformation = await this.scraperRepository.get(id);

    if (query) {
      scraperInfo.baseURL = scraperInfo.baseURL.replace('{q}', query);
    }
    console.log(scraperInfo);

    const scraperInformationList: ScrapeInformation[] = [scraperInfo];

    while (scraperInfo.next !== null) {
      scraperInfo = await this.scraperRepository.get(scraperInfo.next);
      scraperInformationList.push(scraperInfo);
    }
    console.log(scraperInformationList);

    const link = new LinkedScraper();

    let idx = 0;
    while (idx !== scraperInformationList.length - 1) {
      let currentScraperInfo = scraperInformationList[idx]
      const attrScraper = this.scraperFactory.createAttrScraper(currentScraperInfo.baseURL, currentScraperInfo.attr)
        .select(currentScraperInfo.selector)
      if (currentScraperInfo.queryAttr) {
        attrScraper.child(...currentScraperInfo.queryAttr.split(' '));
      }
      link.addScraper(attrScraper)
      idx++;
    }

    const textScraper = this.scraperFactory.createTextScraper(scraperInformationList[idx].baseURL);
    scraperInformationList[idx].queryText.forEach(branch => {
      textScraper.branch(branch.children, branch.key);
    })
    textScraper.select(scraperInformationList[idx].selector);
    link.addScraper(textScraper);

    const objectFormatter = FormatterFactory.get('object');
    await link.exec(0, [], 0);
    console.log(link.finalResult);

    return link.finalResult.map(f => objectFormatter.format(f, scraperInformationList[idx].iso, currencyFormat));
  }
}