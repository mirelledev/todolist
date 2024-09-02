import { api, requestConfig } from "../utils/config";

export interface IUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

const register = async (data: IUser) => {
  const config = requestConfig("POST", data, null);

  try {
    const res = await fetch(api + "/users/register", config).then((res) =>
      res.json().catch((err) => err)
    );

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const login = async (data: IUserLogin) => {
  const config = requestConfig("POST", data, null);

  try {
    const res = await fetch(api + "/users/login", config).then((res) =>
      res.json().catch((err) => err)
    );

    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
