import Scraper from "./scraper"

async function main(): Promise<void> {
    const baseURL = 'http://www.arabalar.com.tr/araba-fiyatlari';
    const selector = '#fiyatlar .marka';
    const children = ['.name', 'h2', 'a'];
    const attribute = 'href';

    const hrefs = await Scraper.create(baseURL)
        .select(selector)
        .child(...children)
        .attr(attribute)
        .scrape();
        // .nextPhase()
        // .select()
        // .child()
        // .child();

    console.log(hrefs);
}

main()