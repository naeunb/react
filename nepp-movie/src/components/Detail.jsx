import { useParams } from "react-router-dom";
import { users } from "./Hello";

function Detail() {
  const parmas = useParams();
  const { userId } = parmas;
  const user = users.find((user) => user.id === parseInt(userId));
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
    </div>
  );
}

export default Detail;
