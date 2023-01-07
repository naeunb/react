import axios from "axios";
import { useEffect, useState } from "react";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const fetchTodos = async () => {
    /*
    Fetch 사용
    let result = await fetch("http://localhost:4000/todos");
    let json = await result.json();
    setTodos(json);
    */

    //Axios 사용
    const { data } = await axios.get("http://localhost:4000/todos");
    // console.log(data);
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async () => {
    /* try {
      let result = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
          done: false,
        }),
      });

      fetchTodos();
      setInput("");

      // 결과값을 활용
      // let json = await result.json();
      // console.log(json);
    } catch (e) {
      console.log(e);
    } */

    axios
      .post(`http://localhost:4000/todos`, {
        text: input,
        done: false,
      })
      .then(() => {
        fetchTodos();
        setInput("");
      })
      .catch((e) => console.log(e));
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleToggle = (id, done) => {
    /* fetch("http://localhost:4000/todos/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        done: !done,
      }),
    })
      .then(() => {
        fetchTodos();
      })
      .catch((e) => {
        console.log(e);
      });
 */
    //shift+alt+a
    axios
      .patch(`http://localhost:4000/todos/${id}`, {
        done: !done,
      })
      .then(() => fetchTodos())
      .catch((e) => console.log(e));
  };

  const handleDelete = (id) => {
    /*
    fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
      body: { id },
    })
      .then(() => {
        fetchTodos();
      })
      .catch((e) => {
        console.log(e);
      });*/

    axios
      .delete(`http://localhost:4000/todos/${id}`)
      .then(() => fetchTodos())
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <input type="text" onChange={handleInput} value={input} />
      <button onClick={handleSubmit}>등록</button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.done && "line-through" }}
          >
            {/* 이벤트버블링 */}
            <span onClick={() => handleToggle(todo.id, todo.done)}>
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;

//* promise, await, async
