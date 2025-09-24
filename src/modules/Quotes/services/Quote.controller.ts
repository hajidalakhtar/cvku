import UserModel from '@/modules/Users/User.model';
import Controller from '@/packages/server/base/Controller';

class CQuote extends Controller {
  /**
   * Use arrow function to create Controller method.
   * @see https://www.geeksforgeeks.org/arrow-functions-in-javascript/
   * @param req Request
   */
  public random = async() => {
    try {
      const payload = await UserModel.getUserByPassword(
        'tes@gmail.com', '1234qs56'
      );

      console.log(payload);
      return this.sendJSON({
        code: 200,
        message: 'Success get random quotess',
        payload
      });
    } catch (err) {
      return this.handleError(err);
    }
  };
}

const QuoteController = new CQuote();
export default QuoteController;
