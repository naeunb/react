import axios from "axios";

axios.defaults.headers = {
  Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
};

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export async function getDetail(id) {
  try {
    const { data } = await axios.get("/movie/" + id, {
      params: {
        language: "ko-KR",
      },
    });
    return data;
  } catch (e) {
    // throw new Error(e);
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }
}

export default async function getPopular(page) {
  const { data } = await axios.get("/movie/popular", {
    //쿼리스트링 : params로 넘겨야함
    params: {
      language: "ko-KR",
      page,
    },
  });
  return data.results;
}
