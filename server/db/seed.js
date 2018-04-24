const { conn } = require('./conn');
const { models } = require('./index');
const { Category, LineItem, Order, Product, User } = models;

const faker = require('faker');

/*-------------HOW-MANY-D0-WE-WANT-TO-SEED?-------------*/

const categoryCount = 3;
const productCount = 50;
const userCount = 5;
const orderCount = 25;
const lineItemCount = 70;

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
    street: [ faker.address.streetAddress() ],
    city: [ faker.address.city() ],
    state: [ faker.address.state() ],
    zip: [ faker.address.zipCode() ],
  });
}

const createOrder = () => {
  // const activeStatus = !!Math.round(Math.random());
  return Order.create({
    isActive: false,
    // date: activeStatus ? null : faker.date.past(),
    date: faker.date.past(),
    userId: Math.ceil(Math.random() * userCount)
  });
}

const createLineItem = () => {
  return LineItem.create({
    quantity: Math.ceil(Math.random() * 10),
    productId: Math.ceil(Math.random() * productCount),
    orderId: Math.ceil(Math.random() * orderCount + userCount)
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

const populateOrders = () => {
  return createThisMany(orderCount, createOrder);
}

const populateLineItems = () => {
  return createThisMany(lineItemCount, createLineItem);
}

/*--------------------SEED-DATABASE---------------------*/

let _orders;
const seed = () => {
  return Promise.all(populateUsers())
  .then((users) => {
    users.forEach(user => {
      Order.create({ isActive: true, date: null, userId: user.id });
    })
  })
  .then(() => {
    return Promise.all([
    ...populateCategories(),
    ...populateProducts(),
    // ...populateOrders(),
    // ...populateLineItems(),
    ])
      .then(() => Promise.all(populateOrders()))
  .then(orders => _orders = orders)
  .then(() => Promise.all(populateLineItems()))
  .then(lineItems => {
    console.log('Pre-filter:', _orders.length);
    const filteredOrders = _orders.filter(order => {
      const lineItem = lineItems.find(lineItem => order.id === lineItem.orderId);
      return lineItem;
    })

    console.log('Post-filter:', filteredOrders.length)

    // filteredOrders.forEach(order => {
      // console.log(order.id)
    // })
    return filteredOrders;
  })
  // .then(() => Promise.all(populateOrders()))
  // .then(orders => _orders = orders)
  // .then(() => Promise.all(populateLineItems()))
  // .then(lineItems => {
  //   console.log('Pre-filter:', _orders.length);
  //   const filteredOrders = _orders.filter(order => {
  //     const lineItem = lineItems.find(lineItem => order.id === lineItem.orderId);
  //     return lineItem;
  //   })

  //   console.log('Post-filter:', filteredOrders.length)

  //   // filteredOrders.forEach(order => {
  //     // console.log(order.id)
  //   // })
  //   return filteredOrders;
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
