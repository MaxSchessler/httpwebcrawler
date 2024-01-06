const {normalizeURL} = require("httpwebcrawler/crawl.js"); 
const {test, expect} = require("@jest/globals");

test("normalizeURL strip protocal ", () => {
    const input = "https://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected); // expect expected value to equal actual
    // if these fail jest will specified test failed.
});

test("normalizeURL strip trailing /", () => {
    const input = "https://blog.boot.dev/path/"; // has slash on the end
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected); // trim trailing slashes

});

test("normalizeURL to lower case", () => {
    const input = "https://BLOG.BOOT.DEV/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toStrictEqual(expected);
});

test("normalizeURL strip http", () => {
    const input = "http://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev";
    expect(actual).toEqual(actual);
})