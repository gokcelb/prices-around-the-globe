import { Scraper } from './scraper';

export class LinkedScraper {
  scrapers: Scraper<any>[] = [];
  finalResult: any[] = [];

  addScraper(scraper: Scraper<any>) {
    this.scrapers.push(scraper);
  }

  async exec(index: number, result: any[] = [], limit: number) {
    this.finalResult = result;
    if (this.scrapers.length === index) return;
    if (result.length != 0) {
      const arr = []
      for (let i = 0; i < result.length - limit; i++) {
        const r = await this.scrapers[index].scrape(result[i]);
        arr.push(...r)
      }
      await this.exec(index + 1, arr, limit);
    } else {
      console.log(await this.scrapers[index].scrape());
      await this.exec(index + 1, await this.scrapers[index].scrape(), limit)
    }
  }
}