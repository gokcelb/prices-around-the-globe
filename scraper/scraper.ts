import * as cheerio from 'cheerio';
import { children } from 'cheerio/lib/api/traversing';

import HttpClient from "./client";

export default class Scraper<T> {
    private readonly httpClient: HttpClient;

    private selectors: string[] = [];
    private children: string[] = [];
    private attribute: string = '';

    private constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    static create<T>(baseURL: string): Scraper<T> {
        const httpClient = new HttpClient(baseURL);
        return new Scraper<T>(httpClient);
    }

    select(selector: string): Scraper<T> {
        this.selectors.push(selector);
        return this;
    }

    child(...child: string[]): Scraper<T> {
        if (child.length > 0) {
            this.children.push(...child);
        }
        return this;
    }

    attr(attribute: string): Scraper<T> {
        this.attribute = attribute;
        return this;
    }

    async scrape(path?: string): Promise<string[]> {
        const scrapeResult: string[] = [];
        const rawHTML = await this.httpClient.get();
        const $ = cheerio.load(rawHTML);

        const items = $(this.selectors[0]);
        items.each((_, element) => {
            const result = this.findChildren($(element)).attr(this.attribute);
            if (result) scrapeResult.push(result);
        });

        return scrapeResult;
    }

    private findChildren($: cheerio.Cheerio<cheerio.Node>): cheerio.Cheerio<cheerio.Node> {
        this.children.forEach(child => $ = $.children(child));
        return $;
    }
}