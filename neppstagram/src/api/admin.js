import axios from "axios";

const token = localStorage.getItem("access-token");

axios.defaults.baseURL = "http://101.101.218.43";

if (!token) {
  axios.defaults.headers = {
    Authorization: `Bearer ${token}`,
  };
}

export const postUser = async (form) => {
  try {
    //가공이 필요한 경우
    const result = await axios.post("users", {
      ...form,
    });

    return result;
  } catch (err) {
    console.log(err);
  }
};

export const signIn = (form) => {
  //가공이 필요없을 경우
  return axios.post("users/login", {
    ...form,
  });
};

export const getCurrUser = () => {
  return axios.get("users/current");
};

export const patchProfile = (form) => {
  return axios.patch("users/profile", form);
};
