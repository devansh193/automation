import { Builder, Browser, By, Key, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

async function main() {
  const options = new Options();
  options.addArguments("--disable-blink-features=AutomationControlled");

  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("https://www.google.com");
    await driver.findElement(By.name("q")).sendKeys("flipkart", Key.RETURN);
    await driver.wait(
      until.elementLocated(By.partialLinkText("flipkart")),
      10000
    );
    await driver.findElement(By.partialLinkText("flipkart")).click();
    const searchBox = await driver.findElement(By.name("q"));
    await searchBox.sendKeys("AULA F87", Key.RETURN);
    const firstProduct = await driver.findElement(
      By.partialLinkText("Aula F87")
    );
    await driver.executeScript(
      "arguments[0].removeAttribute('target');",
      firstProduct
    );
    await firstProduct.click();

    await driver.wait(
      until.elementLocated(By.partialLinkText("Buy now")),
      10000
    );
    await driver.findElement(By.id("Buy now")).click();
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
