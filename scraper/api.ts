import 'dotenv/config';
import express from 'express';
import { readFileSync } from 'fs';
import { InMemoryScrapeInformationRepository, ScrapeInformation } from './repository';
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

interface TextScrapeQuery {
  q: string;
  iso: string;
  format: string;
}

interface AttrScrapeQuery {
  q: string;
  attr: string;
}

app.get('/:type', async (req, res) => {
  if (req.params.type === 'text') {
    const textScraperQuery: TextScrapeQuery = {
      q: req.query.q as string,
      iso: req.query.iso as string,
      format: req.query.format as string,
    };
    try {
      const textScrapeResponse = await scraperService.scrapeText(textScraperQuery.q, textScraperQuery.iso, textScraperQuery.format);
      res.send(textScrapeResponse);
      return;
    } catch (e) {
      res.status(404).send(notFoundErr)
    }
  } else if (req.params.type === 'attr') {
    const attrScraperQuery: AttrScrapeQuery = {
      q: req.query.q as string,
      attr: req.query.attr as string,
    };
    try {
      const attrScraperResponse = await scraperService.scrapeAttr(attrScraperQuery.q, attrScraperQuery.attr);
      res.send(attrScraperResponse);
      return;
    } catch (e) {
      res.status(404).send(notFoundErr);
    }
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app listening on PORT ${port}`));

function saveMockData() {
  const data = JSON.parse(readFileSync('data.json').toString());
  const autopolistScrapeTextInfo: ScrapeInformation = data[0];
  const arabalarScrapeAttrInfo: ScrapeInformation = data[1];
  scraperRepository.save(autopolistScrapeTextInfo);
  scraperRepository.save(arabalarScrapeAttrInfo);
}
