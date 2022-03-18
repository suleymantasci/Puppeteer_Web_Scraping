const puppeteer = require("puppeteer");
const userAgent = require("user-agents");

async function post(url) {
    let startTime = Date.now();
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.setUserAgent(userAgent.toString());
    await page.goto(url, { waitUntil: "networkidle2" });
  
    const result = await page.evaluate(() => {

 
        let product = {
          title: "",
          summary: "",
          img:"",
          subject:"",
        };
    
        let title = document.querySelector(
          `#page > div.content-area > section > div > div.article-box.video-wrap > h1`
        );
        let summary = document.querySelector(
          `#page > div.content-area > section > div > div.article-box.video-wrap > h2`
        );
        let img = document.querySelector(
          `#page > div.content-area > section > div > div.article-box.video-wrap > div.row > div.col-md-12.col-lg-8 > div > figure > img`
        );
        let subject = document.querySelector(
          `#page > div.content-area > section > div > div.article-box.video-wrap > div.row > div.col-md-12.col-lg-8 > div > div.content.fontsizevalue`
        );

        product.title = title ? title.innerHTML : "";
        product.summary = summary ? summary.innerHTML : "";
        product.img = img ? img.src : "";
        product.subject = subject ? subject.innerHTML : "";
  
      return product;
    });
  
    await browser.close();
  
    console.log("Time: ", (Date.now() - startTime) / 1000, "s");
  
    return result;
  }

module.exports = {post}