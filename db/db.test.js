const { connect, disconnect, saveUser, findUser } = require("./db");
const User = require("../models/usermodel");
const mongoose = require("mongoose");

jest.mock('./db');

beforeAll(async () => {
    return await connect();
});
describe('User test suite', () => {
    test('As a user I want to save a user to db', async () => {
        const newUser = new User(
            {
                _id: new mongoose.Types.ObjectId(), //mongoose.Types.ObjectId,
                firstName: 'Eric2',
                lastName: 'Clarke',
                address: '123 main St.',
                city: 'Manchester',
                state: 'Manchest',
                email: 'Eric@gmail.com',
                zipCode: '456789',
            }
        );
        const user = await saveUser(newUser);
        expect(user.firstName).toEqual('Eric2');
    });
    test('As a user I want to find a user by any property', async () => {
        const obj = { firstName: 'Eric2' };
        await findUser(obj).then((user) => {
            console.log('user is found' + user);
        });
    });
});
afterAll(async () => {
    return await disconnect();
});