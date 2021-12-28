export interface Repository<T> {
  get(id: string): Promise<T>;
  save(t: T): void;
}

export enum ScraperType {
  ATTR,
  TEXT,
  QUERY,
}
export interface Branch {
  key: string;
  children: string[];
  out: string;
}

export interface ScrapeInformation {
  id: string;
  iso: string;
  category: string;
  next: string | null;
  parent: string | null;
  type: ScraperType;
  subtype: ScraperType;
  baseURL: string;
  selector: string;
  queryText: Branch[];
  queryAttr: string;
  attr: string;
}

export class InMemoryScrapeInformationRepository implements Repository<ScrapeInformation> {
  private storage: Map<string, ScrapeInformation> = new Map();

  get(id: string): Promise<ScrapeInformation> {
    const scrapeInfo = this.storage.get(id);
    if (!scrapeInfo) {
      return Promise.reject("Scrape information could not be found in repository");
    }
    return Promise.resolve(scrapeInfo);
  }

  save(scrapeInformation: ScrapeInformation): void {
    this.storage.set(scrapeInformation.id, scrapeInformation);
  }
}