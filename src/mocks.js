import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const PASSWORD_PLAIN = "coder123";
const PASSWORD_HASHED = bcrypt.hashSync(PASSWORD_PLAIN, 10);

export function generateMockPets(count = 100) {
    const pets = [];

    for (let i = 0; i < count; i++) {
        pets.push({
            name: faker.animal.petName(),
            type: faker.animal.type(),
            age: faker.number.int({ min: 1, max: 15 }),
            adopted: false,
        });
    }

    return pets;
}
export function generateMockUsers(count = 50) {
    const users = [];

    for (let i = 0; i < count; i++) {
        users.push({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: PASSWORD_HASHED,
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: []
        });
    }

    return users;
}
export function generateMockProducts(count) {
    const products = [];
    for (let i = 0; i < count; i++) {
        products.push({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            code: faker.commerce.isbn(),
            category: faker.commerce.department(),
            stock: faker.number.int({ min: 0, max: 100 })
        });
    }
    return products;
}