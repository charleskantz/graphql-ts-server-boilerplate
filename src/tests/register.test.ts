import { request } from "graphql-request";
import { createConnection } from "typeorm";
import { User } from "../entity/User";
import { host } from "./constants";

const mockEmail = "test@test.test";
const mockPassword = "password";

const mutation = `
  mutation {
    register(email: "${mockEmail}", password: "${mockPassword}")
  }
`;

test("Register user", async () => {
  const response = await request(host, mutation);
  expect(response).toEqual({ register: true });
  await createConnection();
  const users = await User.find({ where: { email: mockEmail } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(mockEmail);
  expect(user.password).not.toEqual(mockPassword);
});

/*
Improvements:
- implement a test db
- drop data once test is over
- should start server when starting test
- beforeAll for db connection?
*/
