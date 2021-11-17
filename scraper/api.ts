import 'dotenv/config';
import express from 'express';
import { readFileSync } from 'fs';
import { InMemoryScrapeInformationRepository, ScrapeInformation, ScraperType } from './repository';
import { ScraperFactory } from './scraper';
import { ScraperService } from './service';

const app = express();
const scraperFactory = new ScraperFactory();
const scraperRepository = new InMemoryScrapeInformationRepository();
const scraperService = new ScraperService(scraperFactory, scraperRepository);

app.use(express.json());

saveMockData();

const notFoundErr = {
  errorCode: "0012", // code oylesine
  errorMsg: "given id not found"
};

interface ScrapeQuery {
  q: string;
  iso: string;
  format: string;
}

app.get('/', async (req, res) => {
  const scraperQuery: ScrapeQuery = {
    q: req.query.q as string,
    iso: req.query.iso as string,
    format: req.query.format as string
  };
  try {
    const scrapeResponse = await scraperService.scrape(scraperQuery.q, scraperQuery.iso, scraperQuery.format);
    res.send(scrapeResponse);
    return;
  } catch (e) {
    res.status(404).send(notFoundErr)
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app listening on PORT ${port}`));

function saveMockData() {
  const data = JSON.parse(readFileSync('data.json').toString());
  const autopolistScrapeInfo: ScrapeInformation = data[0];
  scraperRepository.save(autopolistScrapeInfo);
}
