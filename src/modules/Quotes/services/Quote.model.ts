import db from '@/db/db';
import { Http } from '@/packages/libs/BaseHttp';
import { usersTable } from '@/db/schema'; // Adjust the import path as needed

export interface IQuote {
  quote: string;
}

async function random() {
  const response = await Http.request('GET', 'https://quotes-api-self.vercel.app/quote');
  return Http.getResponseJson<IQuote>(response);
}

async function nameQuote() {
  const users = await db.select().from(usersTable);
  return users;
}

const QuoteModel = {
  random,
  nameQuote
};

export default QuoteModel;
