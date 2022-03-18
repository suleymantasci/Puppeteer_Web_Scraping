const puppeteer = require("puppeteer");
const userAgent = require("user-agents");

async function categoryList(url) {
    let startTime = Date.now();
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.setUserAgent(userAgent.toString());
    await page.goto(url, { waitUntil: "networkidle2" });
  
    const result = await page.evaluate(() => {
      let totalSearchResults = Array.from(
        document.querySelectorAll("#mm-1 > ul:nth-child(2) > li > a:nth-child(2)")
      ).length;
  
      let productsList = [];
  
      for (let i = 1; i < totalSearchResults - 1; i++) {
        let product = {
          url: "",
          name: "",
        };
  
        let rawUrl = document.querySelector(
          `#mm-1 > ul:nth-child(2) > li:nth-child(${i}) > a:nth-child(2)`
        );
        product.url = rawUrl ? rawUrl.href : "";
  
        let rawName = document.querySelector(
          `#mm-1 > ul:nth-child(2) > li:nth-child(${i}) > a:nth-child(2)`
        );
        product.name = rawName ? rawName.innerText : "";
  
        productsList.push(product);
      }
  
      return productsList;
    });
  
    await browser.close();
  
    console.log("Time: ", (Date.now() - startTime) / 1000, "s");
  
    return result;
  }

module.exports = {categoryList}