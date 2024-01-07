const {JSDOM} = require("jsdom");

function getURLsFromHTML(htmlBody, baseURL) {
    // base is base url of website we are crawling
    // htmlBodyis html of website we are crawling
    // returns araw of strings represending the urls on the web page
    let urls = [];
    const dom = new JSDOM(htmlBody);
    const aTags = dom.window.document.querySelectorAll("a");
    for (const linkelement of aTags) {

      if (linkelement.href.slice(0, 1) === "/") {
        // relative url
        urls.push(`${baseURL}${linkelement.href}`);
      } else {
        // absolute url
        urls.push(linkelement.href);
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

module.exports = {
    normalizeURL,
    getURLsFromHTML
}
