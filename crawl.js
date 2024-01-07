const {JSDOM} = require("jsdom");

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

module.exports = {
    normalizeURL,
    getURLsFromHTML
}
