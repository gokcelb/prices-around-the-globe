# Prices Around the Globe

__Prices Around the Globe__ will be a web application that allows users to compare prices from around the world. Basically, the app will scrape data from the web and merge those data in a user-friendly way with country and product options.

Below is a diagram of the app design:

![System Design](./.docs/prices-around-the-world-design.png)

## Getting Started

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