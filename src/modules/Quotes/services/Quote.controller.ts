import Controller from '@/packages/server/base/Controller';
import { PDFDocument } from 'pdf-lib';
import puppeteer from 'puppeteer';
class CQuote extends Controller {
  /**
   * Use arrow function to create Controller method.
   * @see https://www.geeksforgeeks.org/arrow-functions-in-javascript/
   * @param req Request
   */

  public random = async() => {

    try {
      const browser = await puppeteer.launch({
        headless: true
      });
      const page = await browser.newPage();
      const numberPages = 1;

      await page.goto('http://localhost:3000/resume', { waitUntil: 'networkidle0' });

      const pagesBuffer: Buffer[] = [];

      const processPage = async(index: number) => {
        const pageElement = await page.$('[data-page="testing"]');
        // eslint-disable-next-line unicorn/no-await-expression-member
        const width = (await (await pageElement?.getProperty('scrollWidth'))?.jsonValue()) ?? 0;
        // eslint-disable-next-line unicorn/no-await-expression-member
        const height = (await (await pageElement?.getProperty('scrollHeight'))?.jsonValue()) ?? 0;

        const temporaryHtml = await page.evaluate((element) => {
          if (!element) return document.body.innerHTML;
          const clonedElement = element.cloneNode(true) as HTMLElement;
          const temporaryHtml_ = document.body.innerHTML;
          document.body.innerHTML = (clonedElement as HTMLElement).outerHTML;
          return temporaryHtml_;
        }, pageElement);

        const uint8array = await page.pdf({ width, height, printBackground: true });
        const buffer = Buffer.from(uint8array);
        pagesBuffer.push(buffer);

        await page.evaluate((temporaryHtml_: string) => {
          document.body.innerHTML = temporaryHtml_;
        }, temporaryHtml);
      };

      // Loop through all the pages and print them, by first displaying them, printing the PDF and then hiding them back
      for (let index = 1; index <= numberPages; index++) {
        await processPage(index);
      }

      // Using 'pdf-lib', merge all the pages from their buffers into a single PDF
      const pdf = await PDFDocument.create();

      for (const element of pagesBuffer) {
        const page = await PDFDocument.load(element);
        const [copiedPage] = await pdf.copyPages(page, [0]);
        pdf.addPage(copiedPage);
      }

      const buffer = Buffer.from(await pdf.save());
      return this.sendResponse(buffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="document.pdf"'
        }
      });
    } catch (error) {

      console.log(error);

      return this.sendJSON(
        {
          code: 200,
          message: 'asdasd'
        },
        { title: 'Error' }
      );

    }
  };
}

const QuoteController = new CQuote();
export default QuoteController;
