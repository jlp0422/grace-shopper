const { conn } = require('./conn');
const { models } = require('./index');
const { Category, LineItem, Order, Product, User, Address, Review } = models;

const faker = require('faker');

/*-------------HOW-MANY-D0-WE-WANT-TO-SEED?-------------*/

const categoryCount = 3;
const productCount = 200;
const userCount = 5;
const orderCount = 25;
const lineItemCount = 70;
const addressCount = (userCount + 5) * 2;
const reviewCount = 100;

/*---------------HOW-MANY-SHOULD-WE-MAKE?---------------*/

const createThisMany = (count, item) => {
  const result = []
  while (result.length < count) {
    result.push(item());
  }
  return result;
}

/*--------------GENERATE-ONE-GENERIC-ITEM---------------*/

const createCategory = () => {
  return Category.create({ name: faker.commerce.department() });
}

const createProduct = () => {
  return Product.create({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    quantity: Math.round(Math.random() * 100),
    description: faker.lorem.paragraph(),
    categoryId: Math.ceil(Math.random() * categoryCount)
  });
}

const createUser = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return User.create({
    firstName: firstName,
    lastName: lastName,
    isAdmin: false,
    username: `${firstName.slice(0, 1).toLowerCase()}${lastName.toLowerCase()}`,
    password: faker.internet.password(),
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
  });
}

const createAddress = () => {
  return Address.create({
    isShipping: true,
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    userId: Math.ceil(Math.random() * userCount + 5)
  });
}

const createOrder = () => {
  return Order.create({
    isActive: false,
    date: faker.date.past(),
    userId: Math.ceil(Math.random() * (userCount + 5))
  });
}

const createLineItem = () => {
  return LineItem.create({
    quantity: Math.ceil(Math.random() * 10),
    productId: Math.ceil(Math.random() * productCount),
    orderId: Math.ceil(Math.random() * orderCount + userCount)
  });
}

const createReview = () => {
  return Review.create({
    rating: Math.round(Math.random() * 5),
    productId: Math.ceil(Math.random() * productCount),
    userId: Math.ceil(Math.random() * (userCount + 5)),
    description: faker.lorem.paragraph(),
  });
}

/*-----------------POPULATE-MANY-ITEMS------------------*/

const populateCategories = () => {
  return createThisMany(categoryCount, createCategory);
}

const populateProducts = () => {
  return createThisMany(productCount, createProduct);
}

const populateUsers = () => {
  return createThisMany(userCount, createUser);
}

const populateAddresses = () => {
  return createThisMany(addressCount, createAddress);
}

const populateOrders = () => {
  return createThisMany(orderCount, createOrder);
}

const populateLineItems = () => {
  return createThisMany(lineItemCount, createLineItem);
}

const populateReviews = () => {
  return createThisMany(reviewCount, createReview);
}

/*--------------------SEED-DATABASE---------------------*/

let _orders;
const seed = () => {
  return Promise.all([
    ...populateUsers(),
    User.create({
      firstName: 'Jeremy',
      lastName: 'Philipson',
      isAdmin: true,
      username: 'jphilipson',
      password: 'JEREMY',
      email: 'jeremy@gmail.com'
    }),
    User.create({
      firstName: 'Jeremy',
      lastName: 'Grubard',
      isAdmin: true,
      username: 'jgrubard',
      password: 'JEREMY',
      email: 'jgrubard@gmail.com'
    }),
    User.create({
      firstName: 'Alice',
      lastName: 'Luong',
      isAdmin: true,
      username: 'aluong',
      password: 'ALICE',
      email: 'alice@gmail.com'
    }),
    User.create({
      firstName: 'Alex',
      lastName: 'Levin',
      isAdmin: true,
      username: 'alevin',
      password: 'ALEX',
      email: 'alex@gmail.com'
    }),
    User.create({
      firstName: 'John',
      lastName: 'Doe',
      isAdmin: false,
      username: 'jdoe',
      password: 'JOHN',
      email: 'john@gmail.com'
    }),
  ])
  .then((users) => {
    users.forEach(user => {
      Order.create({ isActive: true, date: null, userId: user.id });
    })
  })
  .then(() => {
    return Promise.all([
    ...populateCategories(),
    ...populateProducts(),
    ])
    .then(() => Promise.all(populateOrders()))
    .then(() => Promise.all(populateLineItems()))
    .then(() => Promise.all(populateAddresses()))
    .then(() => Promise.all(populateReviews()))
  })
  .catch(err => console.error(err))
}

conn.sync({ force: true })
  .then(() => {
    console.log('...Seeding Database');
    return seed();
  })
  .then(() => console.log('Database Seeded!'))
  .then(() => {
    conn.close();
    console.log('Connection Closed...');
    return null;
  })
  .catch(err => {
    console.log('Error Seeding Database');
    console.error(err);
  });
