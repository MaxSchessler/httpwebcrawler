const {JSDOM} = require("jsdom");
const { cursorTo } = require("readline");

function getURLsFromHTML(htmlBody, baseURL) {
    // base is base url of website we are crawling
    // htmlBodyis html of website we are crawling
    // returns araw of strings represending the urls on the web page
    let urls = [];
    const dom = new JSDOM(htmlBody);
    const aTags = dom.window.document.querySelectorAll("a");
    
    for (const linkElement of aTags) {
        if (linkElement.href.slice(0, 1) === "/") {
            // this is a relative url
            // append relative url to end of base url
            try {
                const url = new URL(`${baseURL}${linkElement.href}`);
                urls.push(url.href);
            } catch (error) {
                console.log("ERROR: " + error.message);
            }
            
        } else {
            // this is a absolute url
            try {
                const url = new URL(linkElement.href);
                urls.push(url.href);
            } catch (error) {
                console.log("ERROR: " + error.message);
            }
        }
    }
    return urls;
}


function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    // check/remove trailing /
    if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
        return hostPath.slice(0, -1);
    } 
    return hostPath;
}

async function crawlPage(baseURL, currentURL, pages) {
    console.log("Crawling " + currentURL);

    // check if currentURL is on the same site
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(baseURL);

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages;
    }

    // check if we already crawled this page
    // get normalized version
    // check if normalizedCurrentURL is in pages object
    const normalizedCurrentURL = normalizeURL(currentURL);
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizeURL] ++;
        return pages;
    }

    // not visited this currentURL
    pages[normalizedCurrentURL] = 1;

    try {
        const responce = await fetch(currentURL);
        // make sure responce status is not errored out
        if (responce.status > 399) {
            console.log(`ERROR IN FETCH: STATUS: ${ responce.status}`);
            return pages;
        }
        // get content type and make sure it is html
        const contentType = responce.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.log(`NON HTML RESPONCE: ${contentType} ON ${currentURL}`);
            return pages;
        }

        // get html, get links from html body
        const htmlBody = await responce.text();
        const links = getURLsFromHTML(htmlBody, baseURL);
        // recurrsively call crawlpages
        for (const nextURL of Object.entries(pages)) {
            await 
            crawlPage(baseURL, nextURL, pages);
        }

        return pages;


    } catch (err) {
        console.log(`ERROR ${err.message}`)
    }

}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
