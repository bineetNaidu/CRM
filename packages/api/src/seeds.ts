import faker from 'faker';
import mongoose from 'mongoose';
import { Customer } from './models/Customer';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('✨ Database connected');
});

// 💙 Github Copilot!
// a function to genarate fake data using faker to create a customer
export async function seedCustomers(count = 10) {
  const c = [];
  for (let i = 0; i < count; i++) {
    const customer = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber(),
      avatar: faker.image.avatar(),
      timezone: faker.address.timeZone(),
      notes: [],
    };
    c.push(customer);
  }

  // create the customers
  const created = await Customer.insertMany(c);
  console.log(`🔥 Created ${created.length} customers`);
}

seedCustomers().then(() => {
  mongoose.connection.close();
});
