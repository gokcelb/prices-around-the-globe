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
  errorCode: "404", // code oylesine
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

app.get('/text', async (req, res) => {
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
    console.error(e);

    res.status(404).send(notFoundErr)
  }
});

app.get('/attr', async (req, res) => {
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
})

app.get('/linked', async (req, res) => {
  const linkedScraperQuery: TextScrapeQuery = {
    q: req.query.q as string,
    iso: req.query.iso as string,
    format: req.query.format as string,
  }
  try {
    const linkedScrapeResponse = await scraperService.scrapeLinked(linkedScraperQuery.q, linkedScraperQuery.iso, linkedScraperQuery.format);
    res.send(linkedScrapeResponse);
    return;
  } catch (e) {
    res.status(404).send(notFoundErr);
  }
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app listening on PORT ${port}`));

function saveMockData() {
  const data = JSON.parse(readFileSync('data.json').toString());
  const autopolistScrapeTextInfo: ScrapeInformation = data[0];
  const arabalarBrandsScrapeAttrInfo: ScrapeInformation = data[1];
  const arabalarSeriesScrapeAttrInfo: ScrapeInformation = data[2];
  const arabalarScrapeTextInfo: ScrapeInformation = data[3];
  const truecarScrapeTextInfo: ScrapeInformation = data[4];
  scraperRepository.save(autopolistScrapeTextInfo);
  scraperRepository.save(arabalarBrandsScrapeAttrInfo);
  scraperRepository.save(arabalarSeriesScrapeAttrInfo);
  scraperRepository.save(arabalarScrapeTextInfo);
  scraperRepository.save(truecarScrapeTextInfo);
}
