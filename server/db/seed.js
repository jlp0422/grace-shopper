const { conn } = require('./conn');
const { models } = require('./index');
const { Category, LineItem, Order, Product, User } = models;

const faker = require('faker');

/*-------------HOW-MANY-D0-WE-WANT-TO-SEED?-------------*/

const categoryCount = 3;
const productCount = 10;
const userCount = 5;
const orderCount = 5;
const lineItemCount = 3;

/*------------------ARRAYS-TO-POPULATE------------------*/

const categories = [];
const products = [];
const users = [];
const orders = [];
const lineItems = [];

/*---------------HOW-MANY-SHOULD-WE-MAKE?---------------*/

const createThisMany = (arr, count, item) => {
  while (arr.length < count) {
    arr.push(item());
  }
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
    street: [ faker.address.streetAddress() ],
    city: [ faker.address.city() ],
    state: [ faker.address.state() ],
    zip: [ faker.address.zipCode() ],
  });
}

const createOrder = () => {
  const activeStatus = !!Math.round(Math.random());
  return Order.create({
    isActive: activeStatus,
    date: activeStatus ? null : faker.date.past(),
    userId: Math.ceil(Math.random() * userCount)
  });
}

const createLineItem = () => {
  return LineItem.create({
    quantity: Math.ceil(Math.random() * 10),
    productId: Math.ceil(Math.random() * products.length),
    orderId: Math.ceil(Math.random() * orderCount)
  });
}

/*-----------------POPULATE-MANY-ITEMS------------------*/

const populateCategories = () => {
  return createThisMany(categories, categoryCount, createCategory);
}

const populateProducts = () => {
  return createThisMany(products, productCount, createProduct);
}

const populateUsers = () => {
  return createThisMany(users, userCount, createUser);
}

const populateOrders = () => {
  return createThisMany(orders, orderCount, createOrder);
}

const populateLineItems = () => {
  return createThisMany(lineItems, lineItemCount, createLineItem);
}

/*--------------------SEED-DATABASE---------------------*/

const seed = () => {
  populateCategories();
  populateProducts();
  populateUsers();
  populateOrders();
  populateLineItems();
  return Promise.all([
    ...categories,
    ...products,
    ...users,
    ...orders,
    ...lineItems,
    User.create({
      firstName: 'Jeremy',
      lastName: 'Philipson',
      isAdmin: false,
      username: 'jeremyphilipson',
      password: 'JEREMY',
      email: 'jeremy@gmail.com',
      street: [faker.address.streetAddress()],
      city: [faker.address.city()],
      state: [faker.address.state()],
      zip: [faker.address.zipCode()],
    })
  ]);
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
