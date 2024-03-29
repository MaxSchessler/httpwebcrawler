const { crawlPage } = require("./crawl.js");

async function main() {
    if (process.argv.length < 3) {
        console.log("NO WEBSITE PROVIDED.");
        return;
    } else if (process.argv.length > 3) {
        console.log("TO MANY ARGUMENTS.");
        return;
    }

    const baseURL = process.argv[2];
    console.log(`CRAWLING ${baseURL} NOW...`);
    const pages = await crawlPage(baseURL, baseURL, {});
    console.log(JSON.stringify(pages));
}

main();