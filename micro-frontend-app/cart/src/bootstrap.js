import faker from 'faker';

const fakeNumber = faker.random.number();
document.getElementById('dev-cart').innerHTML = `<dev>Total item(s) in cart: ${fakeNumber}</dev>`