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

  // console.log(orders);

  // const userMap = orders.reduce((memo, order) => {

    // console.log(order.id);

    // if(!memo[order.userId]) {
      // memo[order.userId] = 1;
    // }
    // else {
      // memo[order.userId]++;
    // }
    // return memo;
  // }, {});

  // const _orders = orders.map((order, index, array) => {
    // const randomIndex = sMath.round(Math.random()) * (array.length - 1);
    // const active = () => !!Math.round(Math.random())
    // console.log(randomIndex, active)
    // console.log(userMap);
    // return !Object.keys(userMap).includes(order.userId) && active ? (
      // Object.assign({}, order, { isActive: true, date: null })
    // ) : order;
  // });

  return Promise.all([
    ...categories,
    ...products,
    ...users,
    ...orders,
    ...lineItems,
    User.create({
      firstName: 'Jeremy',
      lastName: 'Philipson',
      isAdmin: true,
      username: 'jphilipson',
      password: 'JEREMY',
      email: 'jeremy@gmail.com',
      street: [faker.address.streetAddress()],
      city: [faker.address.city()],
      state: [faker.address.state()],
      zip: [faker.address.zipCode()],
    }),
    User.create({
      firstName: 'Jeremy',
      lastName: 'Grubard',
      isAdmin: true,
      username: 'jgrubard',
      password: 'JEREMY',
      email: 'jgrubard@gmail.com',
      street: [faker.address.streetAddress()],
      city: [faker.address.city()],
      state: [faker.address.state()],
      zip: [faker.address.zipCode()],
    }),
    User.create({
      firstName: 'Alice',
      lastName: 'Luong',
      isAdmin: true,
      username: 'aluong',
      password: 'ALICE',
      email: 'alice@gmail.com',
      street: [faker.address.streetAddress()],
      city: [faker.address.city()],
      state: [faker.address.state()],
      zip: [faker.address.zipCode()],
    }),
    User.create({
      firstName: 'Alex',
      lastName: 'Levin',
      isAdmin: true,
      username: 'alevin',
      password: 'ALEX',
      email: 'alex@gmail.com',
      street: [faker.address.streetAddress()],
      city: [faker.address.city()],
      state: [faker.address.state()],
      zip: [faker.address.zipCode()],
    }),
    User.create({
      firstName: 'John',
      lastName: 'Doe',
      isAdmin: false,
      username: 'jdoe',
      password: 'JOHN',
      email: 'john@gmail.com',
      street: [faker.address.streetAddress()],
      city: [faker.address.city()],
      state: [faker.address.state()],
      zip: [faker.address.zipCode()],
    }),
  ]).then((all) => {
    // console.log(orders[0].id, orders[0].name);
    return Order.findAll()
    .then(orders => {
      // console.log(orders[0])
      const userOrdersMap = orders.reduce((memo, order) => {

        // console.log(order.id, order.userId);
        if(!memo[order.userId]) {
          memo[order.userId] = 1;
        } else {
          memo[order.userId]++;
        }
        return memo;
      }, {});
      console.log(userOrdersMap);

      const _orders = orders.map(order => {
        if(order.userId in userOrdersMap) {
          delete userOrdersMap[order.userId]
          return Object.assign(order, { isActive: true });
          // console.log(order);
          // return order.save();
        }
        console.log(userOrdersMap)
        return order
        // console.log(order.isActive);
      })

      _orders.forEach(order => {
        console.log(order.isActive)
      })

    })
  })
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
