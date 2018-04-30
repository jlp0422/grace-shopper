const { conn } = require('./conn');
const { models } = require('./index');
const { Category, LineItem, Order, Product, User, Address, Review, ProductCategory, CreditCard } = models;

const faker = require('faker');

/*-------------HOW-MANY-D0-WE-WANT-TO-SEED?-------------*/

const categoryCount = 8;
const productCount = 20;
const userCount = 100;
const orderCount = 25;
const lineItemCount = 70;
const addressCount = (userCount + 5) * 2;
const reviewCount = 1000;
const productCategoryCount = 300;
const creditCardCount = 300;

/*---------------HOW-MANY-SHOULD-WE-MAKE?---------------*/

const createThisMany = (count, item) => {
  const result = []
  while (result.length < count) {
    result.push(item());
  }
  return result;
}

/*--------------GENERATE-CREDIT-CARD---------------*/

function createCreditCard() {
  // const ccInfo = {}
  const month = Math.ceil(Math.random() * 12)
  const ccExp = `${ month < 10 ? '0' + month : month }/20${Math.round(Math.random() * 5) + 20}`
  const type = ['VISA', 'MASTERCARD', 'DISCOVER', 'AMEX'];
  let ccType = type[Math.round(Math.random() * 3)]
  let ccSec = '';
  let ccNum = '';
  for(let i = 0; i < 4; i++) {
    ccSec += Math.round(Math.random() * 9)
  }
  if(ccType !== 'AMEX') {
    ccSec = ccSec.slice(0,3);
  }
  for(let j = 0; j < 16; j++) {
    ccNum += Math.round(Math.random() * 9)
  }
  return CreditCard.create({ ccType, ccNum, ccExp, ccSec });
}

/*--------------GENERATE-ONE-GENERIC-ITEM---------------*/

/*const createCategory = () => {
  return Category.create({ name: faker.commerce.department() });
}*/

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
  // const { ccType, ccNum, ccSec, ccExp } = createCreditCard();
  return User.create({
    firstName: firstName,
    lastName: lastName,
    isAdmin: false,
    username: `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    password: faker.internet.password(),
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
    // ccType,
    // ccNum,
    // ccExp,
    // ccSec
  });
}

const createAddress = () => {
  return Address.create({
    isShipping: true,
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    userId: Math.ceil(Math.random() * userCount + 4)
  });
}

const createOrder = () => {
  return Order.create({
    isActive: false,
    date: faker.date.past(),
    userId: Math.ceil(Math.random() * (userCount + 4))
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
    userId: Math.ceil(Math.random() * (userCount + 4)),
    description: faker.lorem.paragraph(),
  });
}

/*const createProductCategory = () => {
  return ProductCategory.create({
    productId: Math.ceil(Math.random() * productCount),
    categoryId: Math.ceil(Math.random() * categoryCount),
  });
}*/

/*-----------------POPULATE-MANY-ITEMS------------------*/

/*const populateCategories = () => {
  return createThisMany(categoryCount, createCategory);
}*/

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

const populateCreditCards = () => {
  return createThisMany(creditCardCount, createCreditCard);
}

/*const populateProductCategories = () => {
  return createThisMany(productCategoryCount, createProductCategory);
}*/

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
      email: 'jeremy@gmail.com',
      // ccType: createCreditCard().ccType,
      // ccNum: createCreditCard().ccNum,
      // ccExp: createCreditCard().ccExp,
      // ccSec: createCreditCard().ccSec
    }),
    User.create({
      firstName: 'Jeremy',
      lastName: 'Grubard',
      isAdmin: true,
      username: 'jgrubard',
      password: 'JEREMY',
      email: 'jgrubard@gmail.com',
      // ccType: createCreditCard().ccType,
      // ccNum: createCreditCard().ccNum,
      // ccExp: createCreditCard().ccExp,
      // ccSec: createCreditCard().ccSec
    }),
    User.create({
      firstName: 'Alex',
      lastName: 'Levin',
      isAdmin: true,
      username: 'alevin',
      password: 'ALEX',
      email: 'alex@gmail.com',
      // ccType: createCreditCard().ccType,
      // ccNum: createCreditCard().ccNum,
      // ccExp: createCreditCard().ccExp,
      // ccSec: createCreditCard().ccSec
    }),
    User.create({
      firstName: 'John',
      lastName: 'Doe',
      isAdmin: false,
      username: 'jdoe',
      password: 'JOHN',
      email: 'john@gmail.com',
      // ccType: createCreditCard().ccType,
      // ccNum: createCreditCard().ccNum,
      // ccExp: createCreditCard().ccExp,
      // ccSec: createCreditCard().ccSec
    }),
  ])
  .then((users) => {
    users.forEach(user => {
      Order.create({ isActive: true, date: null, userId: user.id });
    })
  })
  .then(() => {
    return Promise.all([
      Category.create({ name: 'Books'}),
      Category.create({ name: 'Computers'}),
      Category.create({ name: 'Bags'}),
      Category.create({ name: 'Outdoors'}),
      Category.create({ name: 'Sports'}),
      Category.create({ name: 'Electronics'}),
      Category.create({ name: 'Woodworking'}),
      Category.create({ name: 'Hardware'}),
      ...populateProducts(),
    ])
    .then(() => {
      return Promise.all([
        ProductCategory.create({ productId: 3, categoryId: 1 }),
        ProductCategory.create({ productId: 1, categoryId: 1 }),
        ProductCategory.create({ productId: 2, categoryId: 1 }),
        ProductCategory.create({ productId: 4, categoryId: 1 }),
        ProductCategory.create({ productId: 5, categoryId: 1 }),
        ProductCategory.create({ productId: 5, categoryId: 2 }),
        ProductCategory.create({ productId: 7, categoryId: 2 }),
        ProductCategory.create({ productId: 8, categoryId: 2 }),
        ProductCategory.create({ productId: 9, categoryId: 2 }),
        ProductCategory.create({ productId: 3, categoryId: 3 }),
        ProductCategory.create({ productId: 4, categoryId: 3 }),
        ProductCategory.create({ productId: 7, categoryId: 3 }),
        ProductCategory.create({ productId: 5, categoryId: 3 }),
        ProductCategory.create({ productId: 10, categoryId: 3 }),
        ProductCategory.create({ productId: 3, categoryId: 4 }),
        ProductCategory.create({ productId: 7, categoryId: 4 }),
        ProductCategory.create({ productId: 9, categoryId: 5 }),
        ProductCategory.create({ productId: 8, categoryId: 5 }),
        ProductCategory.create({ productId: 9, categoryId: 6 })
      ])
        //populateProductCategories()])
        /*.then((pc) => {
          console.log('before:', pc.length)
          // pc.forEach(_pc => console.log(_pc.get()))
          // console.log(pc[0].get())
          const arr = [];

          const filtered = pc.forEach((_pc, index, array) => {
            array.forEach(p => {
              if(_pc.productId === p.productId && _pc.categoryId === p.categoryId) {
                arr.push(_pc)
              }
            })
          })
          console.log('after:', arr.length)
        })*/
    .then(() => Promise.all(populateOrders()))
    .then(() => Promise.all(populateLineItems()))
    .then(() => Promise.all(populateAddresses()))
    .then(() => Promise.all(populateReviews()))
    .then(() => Promise.all(populateCreditCards()))
  })
  .catch(err => console.error(err))
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


// module.exports = {
//   seed
// }
