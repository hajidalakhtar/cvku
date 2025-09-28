import QuoteModel from '@/modules/Quotes/services/Quote.model';
import Controller from '@/packages/server/base/Controller';

class CQuote extends Controller {
  /**
   * Use arrow function to create Controller method.
   * @see https://www.geeksforgeeks.org/arrow-functions-in-javascript/
   * @param req Request
   */
  public random = async() => {
    try {
      const payload = await QuoteModel.nameQuote();
      return this.sendJSON({
        code: 200,
        message: 'Success get random quote.',
        payload
      }, { title: 'Success' });
    } catch (err) {
      return this.handleError(err);
    }
  };
}

const QuoteController = new CQuote();
export default QuoteController;
