import db from '@/db/db';
import { usersTable } from '@/db/schema'; // Adjust the import path as needed
import { eq } from 'drizzle-orm';

export interface IUser {
  id: number,
  name: string,
  email: string,
  password: string
}

async function findByEmail(email: string): Promise<IUser[] | null> {
  const users = await db.select().from(usersTable).where(eq(usersTable.email, email));
  return users || null;
}

// async function create

const UserModel = {
  findByEmail
};

export default UserModel;
