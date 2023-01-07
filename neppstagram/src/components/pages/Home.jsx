import { useEffect } from "react";
import { getAllPost } from "../../api/admin";

function Home() {
  useEffect(() => {
    getAllPost();
  });
  return <div>home</div>;
}

export default Home;
