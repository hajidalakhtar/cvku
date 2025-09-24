import { seed } from 'drizzle-seed';
import bcrypt from 'bcryptjs';
import db from './db';
import { usersTable } from './schema';

async function main() {
  // eslint-disable-next-line no-console
  console.log('🌱 Starting seeding process...');

  // Clear existing data
  await db.delete(usersTable);

  // Reset the identity sequence to start from 1
  await db.execute('ALTER SEQUENCE users_id_seq RESTART WITH 1');

  // eslint-disable-next-line no-console
  console.log('🗑️ Cleared existing users and reset sequence');

  // Hash passwords for demo users
  const hashedPassword = await bcrypt.hash('123456', 10);

  // Insert some specific demo users
  await db.insert(usersTable).values([
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword
    },
    {
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword
    }
  ]);

  // eslint-disable-next-line no-console
  console.log('✅ Seeded 12 users successfully!');
}

main()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Seeding done!');
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error('Error during seeding:', e);
  });

