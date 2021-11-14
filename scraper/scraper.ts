import * as cheerio from 'cheerio';
import HttpClient from "./client";

export class ScraperFactory {
    createAttrScraper(baseURL: string, attribute: string): AttrScraper {
        const httpClient = new HttpClient(baseURL);
        return new AttrScraper(httpClient).attr(attribute);
    }

    createTextScraper(baseURL: string): TextScraper {
        const httpClient = new HttpClient(baseURL);
        return new TextScraper(httpClient);
    }
}

export abstract class Scraper<T> {
    protected readonly httpClient: HttpClient;

    protected selector: string = '';
    protected children: string[] = [];

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    select(selector: string): Scraper<T> {
        this.selector = selector;
        return this;
    }

    child(...child: string[]): Scraper<T> {
        if (child.length > 0) {
            this.children.push(...child);
        }
        return this;
    }

    abstract scrape(path?: string): Promise<T[]>;

    protected findChildren($: cheerio.Cheerio<cheerio.Node>, children: string[]): cheerio.Cheerio<cheerio.Node> {
        children.forEach(child => $ = $.children(child));
        return $;
    }
}

export class AttrScraper extends Scraper<string> {
    private attribute: string = '';

    attr(attribute: string): AttrScraper {
        this.attribute = attribute;
        return this;
    }

    async scrape(path?: string): Promise<string[]> {
        const attrResult: string[] = [];
        const rawHTML = await this.httpClient.get(path);
        const $ = cheerio.load(rawHTML);

        const items = $(this.selector);
        items.each((_, element) => {
            const result = this.findChildren($(element), this.children).attr(this.attribute);
            if (result) attrResult.push(result);
        });

        return attrResult;
    }
}

interface Branch {
    children: string[];
    key: string;
}

export class TextScraper extends Scraper<object> {
    private branches: Branch[] = [];

    branch(children: string[], key: string): TextScraper {
        this.branches.push({
            children: children,
            key: key
        });
        return this;
    }

    async scrape(path?: string): Promise<object[]> {
        const result: object[] = [];
        const rawHTML = await this.httpClient.get(path);
        const $ = cheerio.load(rawHTML);
        const items = $(this.selector);

        items.each((_, element) => {
            const loadedCheerio = $(element);
            const object: any = {};

            this.branches.forEach(branch => {
                const value = this.findChildren(loadedCheerio, branch.children).text();
                object[branch.key] = value;
            });

            result.push(object);
        });

        return result;
    }
}