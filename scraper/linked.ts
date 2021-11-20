import { Scraper } from './scraper';

export class LinkedScraper {
  private scrapers: Scraper<any>[] = [];
  finalResult: any[] = [];

  setTextScraper(textScraper: Scraper<object>) {
    this.scrapers.push(textScraper);
  }

  setAttrScrapers(attrScrapers: Scraper<string>[]) {
    this.scrapers = attrScrapers;
  }

  async exec(index: number, result: any[]= [], limit: number) {
    this.finalResult = result;
    if(this.scrapers.length === index) return;
    if (result.length != 0) {
      const arr = []
      for (let i=0; i<result.length-limit; i++) {
        const r = await this.scrapers[index].scrape(result[i]);
        arr.push(...r)
      }
      await this.exec(index+1, arr, limit);
    } else {
      await this.exec(index+1, await this.scrapers[index].scrape(), limit)
    }
  }
}