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
  errorCode: "404",
  errorMsg: "given id not found"
};

interface TextScrapeQuery {
  id: string;
  q?: string;
  format: string;
}

app.get('/text', async (req, res) => {
  const linkedScraperQuery: TextScrapeQuery = {
    id: req.query.id as string,
    format: req.query.format as string,
  }
  try {
    const linkedScrapeResponse = await scraperService.scrapeLinked(linkedScraperQuery.id, linkedScraperQuery.format);
    res.send(linkedScrapeResponse);
    return;
  } catch (e) {
    res.status(404).send(notFoundErr);
    console.error(e);
    
  }
})

app.get('/query', async (req, res) => {
  const linkedScraperQuery: TextScrapeQuery = {
    id: req.query.id as string,
    q: req.query.q as string,
    format: req.query.format as string,
  }
  try {
    const linkedScrapeResponse = await scraperService.scrapeLinked(
      linkedScraperQuery.id, linkedScraperQuery.format, linkedScraperQuery.q
      );
    res.send(linkedScrapeResponse);
    return;
  } catch (e) {
    console.error(e);
    res.status(404).send(notFoundErr);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app listening on PORT ${port}`));

function saveMockData(): void {
  const data = JSON.parse(readFileSync('data.json').toString());

  for (let i = 0; i < data.length; i++) {
    const info: ScrapeInformation = data[i];
    scraperRepository.save(info);
  }
}
