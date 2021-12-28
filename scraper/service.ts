import {FormatterFactory} from "./formatter";
import {LinkedScraper} from "./linked";
import {Repository, ScrapeInformation, ScraperType} from "./repository";
import {ScraperFactory} from "./scraper";
import {readFileSync} from "fs";

export class ScraperService {
  scraperFactory: ScraperFactory;
  scraperRepository: Repository<ScrapeInformation>;

  constructor(scraperFactory: ScraperFactory, scraperRepository: Repository<ScrapeInformation>) {
    this.scraperFactory = scraperFactory;
    this.scraperRepository = scraperRepository;
  }

  protected getIdFromIso(iso: string | null, viableScraperType: ScraperType): string[] {
    const data = JSON.parse(readFileSync('data.json').toString());
    const ids: string[] = [];

    for (let i = 0; i < data.length; i++) {
      const info: ScrapeInformation = data[i];
      if (iso === null || iso === undefined) {
        info.parent === null && info.subtype === viableScraperType ? ids.push(info.id) : null;
      } else {
        info.iso.toLowerCase() === iso.toLowerCase() && info.parent === null && info.subtype === viableScraperType ? ids.push(info.id) : null;
      }
    }
    return ids;
  }

  protected prepareLinkedForText(scraperInformationList: ScrapeInformation[], link: LinkedScraper): number {
    let idx = 0;
    while (idx !== scraperInformationList.length - 1) {
      let currentScraperInfo = scraperInformationList[idx]
      const attrScraper = this.scraperFactory.createAttrScraper(currentScraperInfo.baseURL, currentScraperInfo.attr)
          .select(currentScraperInfo.selector)
      if (currentScraperInfo.queryAttr) {
        attrScraper.child(...currentScraperInfo.queryAttr.split(' '));
      }
      link.addScraper(attrScraper);
      idx++;
    }

    const textScraper = this.scraperFactory.createTextScraper(scraperInformationList[idx].baseURL);
    scraperInformationList[idx].queryText.forEach(branch => {
      textScraper.branch(branch.children, branch.key, branch.out);
    })
    textScraper.select(scraperInformationList[idx].selector);
    link.addScraper(textScraper);
    return idx;
  }

  async scrapeLinked(iso: string | null, category: string | null, currencyFormat: string, query?: string): Promise<object[]> {
    const viableScraperType = query ? ScraperType.QUERY : ScraperType.TEXT;
    const ids = this.getIdFromIso(iso, viableScraperType);
    const results: object[] = [];

    for(let i = 0; i < ids.length; i++) {
      let id = ids[i];
      let scraperInfo: ScrapeInformation = await this.scraperRepository.get(id);

      if (query) {
        let temp = scraperInfo.baseURL;
        const end = temp.indexOf('?');
        const toReplace = temp.substring(end+1);
        temp = temp.replace(toReplace, `q=${query}`);
        scraperInfo.baseURL = temp;
      }

      const scraperInformationList: ScrapeInformation[] = [scraperInfo];
      while (scraperInfo.next !== null) {
        scraperInfo = await this.scraperRepository.get(scraperInfo.next);
        scraperInformationList.push(scraperInfo);
      }

      const link = new LinkedScraper();
      const idx = this.prepareLinkedForText(scraperInformationList, link);
      await link.exec(0, [], 0);
      const objectFormatter = FormatterFactory.get('object');
      const result = link.finalResult.map(obj => objectFormatter.format(
          obj, scraperInformationList[idx].iso, currencyFormat, scraperInformationList[idx].category));
      results.push(...result);
    }
    return results;
  }
}