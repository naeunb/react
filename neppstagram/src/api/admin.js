import axios from "axios";

const token = localStorage.getItem("access-token");

axios.defaults.baseURL = "http://101.101.218.43";

if (token) {
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

export const signIn = async (form) => {
  //가공이 필요없을 경우
  // return axios.post("users/login", {
  //   ...form,
  // }).then(res => console.log(res));

  const result = await axios.post("users/login", {
    ...form,
  });

  const token = result.data.data.token;
  window.localStorage.setItem("access-token", token);
  axios.defaults.headers.Authorization = `Bearer ${token}`;

  return true;
};

export const getCurrUser = async () => {
  const { data } = await axios.get("users/current");
  return data;
};

export const patchProfile = (form) => {
  return axios.patch("users/profile", form);
};

export const postPost = (form) => {
  return axios.post("posts", form);
};

export const getPosts = async (page = 1) => {
  const { data } = await axios.get(`/posts`, {
    params: {
      page,
    },
  });
  return data.data;
};

export const getPostById = async (id) => {
  const { data } = await axios.get("/posts/" + id);
  return data.data;
};

export const getComments = async (postId, page = 1) => {
  const { data } = await axios.get("/comments", {
    params: {
      page,
      postId,
    },
  });
  return data.data;
};

export const postComment = async (form) => {
  const { data } = await axios.post(
    `/comments?postId=${form.postId}&content=${form.content}`
  );

  return data.data;
};

export const deleteComment = async (postId) => {
  const { data } = axios.delete(`/comments/${postId}`);
  return data;
};

export const convertUrl = async (url) => {
  const res = await fetch(url);
  const data = await res.blob();
  const ext = url.split(".").pop();
  const filename = url.split("/").pop();
  const meta = { type: `image/${ext}` };

  return new File([data], filename, meta);
};
