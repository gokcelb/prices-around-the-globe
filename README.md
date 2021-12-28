# Prices Around the Globe

__Prices Around the Globe__ is a web application that allows users to compare prices from around the world. Basically, the app scrapes data from the web and merges those data in a user-friendly way with country and product category options.

### Getting Started

Run the application using docker.

```bash
# go inside the scraper folder
$ docker build . -t scraper
$ docker run scraper
```

Run the application using docker-compose.

```bash
# go to root directory
$ docker compose up
```

## User Interface

Below is how the app currently looks. You can see the comparison tool and categories:car sections with real data.

![Updated UI design](./.docs/ui4.gif)

## Design

Below is a diagram of the app design:

![System Design](./.docs/prices-around-the-world-design.png)

Below is a diagram of linked scraper design:

![Linked Scraper Design](./.docs/linked-scraper-design.png)

## Technologies

Scraper microservice is responsible for scraping relative data from the web. Listing microservice is responsible for communicating with Scraper app and making scraped data available for Client app. Also, Listing is the server that communicates with the database (MongoDB).