import createHTTPService from "./httpService";
export interface IUser {
  id: number;
  name: string;
}

const userService = createHTTPService("users");

export default userService;
