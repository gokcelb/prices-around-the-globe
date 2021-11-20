import { ScraperFactory, TextScraper } from "./scraper"
import { InMemoryScrapeInformationRepository, Repository, ScrapeInformation, ScraperType } from "./repository";
import { PriceFormatter, DefaultFormatter, CurrencyFormatter, FormatterFactory } from './formatter'
import { LinkedScraper } from "./linked";
import { ScraperService } from "./service";

async function main(): Promise<void> {
  

  // link.add(factory.createTextScraper().select('').branch([], 'key'));
}

main()