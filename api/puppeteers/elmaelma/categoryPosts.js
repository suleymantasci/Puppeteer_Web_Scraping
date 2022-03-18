const puppeteer = require("puppeteer");
const userAgent = require("user-agents");

async function postList(url) {
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
        document.querySelectorAll("#page > div.content-area > section:nth-child(4) > div > div > div.col-md-12.col-lg-8 > section:nth-child(2) > div > div")
      ).length;
      let productsList = [];

      for (let i = 1; i < totalSearchResults; i++) {
        let product = {
          url: "",
          name: "",
          img:"",
        };
  
        let hasClassDiv = document.querySelector(`#page > div.content-area > section:nth-child(4) > div > div > div.col-md-12.col-lg-8 > section:nth-child(2) > div > div:nth-child(${i}) > div`);


        if (hasClassDiv.classList.contains('box-ads')) {
            continue;
        }
        let raw = document.querySelector(
          `#page > div.content-area > section:nth-child(4) > div > div > div.col-md-12.col-lg-8 > section:nth-child(2) > div > div:nth-child(${i}) > div > a.img`
        );

        product.url = raw ? raw.href : "";
        product.name = raw ? raw.title : "";

        let rawSrc = document.querySelector(
          `#page > div.content-area > section:nth-child(4) > div > div > div.col-md-12.col-lg-8 > section:nth-child(2) > div > div:nth-child(${i}) > div > a.img > img`
        );
        product.img = rawSrc ? rawSrc.src : "";
  
        productsList.push(product);
      }
  
      return productsList;
    });
  
    await browser.close();
  
    console.log("Time: ", (Date.now() - startTime) / 1000, "s");
  
    return result;
  }

module.exports = {postList}