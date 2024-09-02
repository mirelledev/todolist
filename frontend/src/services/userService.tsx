import { api, requestConfig } from "../utils/config";

const getUserInfo = async (token: any) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await fetch(api + "/users/", config).then((res) =>
      res.json().catch((err) => err)
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  getUserInfo,
};

export default userService;
