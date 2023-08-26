import faker from "faker";

let products = '';

for (i = 0; i < 3; i++) {
    products += `<div>${faker.commerce.productName()}</div>`
}

console.log(products)