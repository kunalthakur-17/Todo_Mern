import { APICore } from "../../helpers/api/apiCore";
import { login, logout, signup } from "../../constants/endpoint";

const api = new APICore();

export const loginApi = (data) => {
  const { identifier, password } = data;
  return api.create(login, {
    identifier,
    password,
  });
};

export const logoutApi = () => {
  return api.create(logout, {});
};

export const signupApi = (data) => {
  const { firstName, lastName, email, username, password, treamandcondition } = data;
  return api.create(signup, {
    firstName,
    lastName,
    email,
    username,
    password,
    treamandcondition,
  });
};