import styled from "styled-components";
import { postUser } from "../../api/admin";
import { useInputs } from "../../hook/useInputs";
import AdminForm from "../admin/AdminForm";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

function SignUp() {
  const [inputs, handleInputs] = useInputs({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = inputs;

  const active = name !== "" && email !== "" && password !== "";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!active) return;

    postUser(inputs).then((res) => console.log(res));
  };
  return (
    <AdminForm title="회원가입" onSubmit={handleSubmit}>
      <InputWrapper>
        <Input
          type="text"
          placeholder="name"
          name="name"
          onChange={handleInputs}
        />
        <Input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleInputs}
        />
        <Input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleInputs}
        />
      </InputWrapper>
      <BtnWrapper>
        <Button type="submit" bgColor={!active && "#ccc"}>
          submit
        </Button>
        <Button type="reset" bgColor="#999">
          cancel
        </Button>
      </BtnWrapper>
    </AdminForm>
  );
}

const InputWrapper = styled.div``;

const BtnWrapper = styled.div`
  margin-top: 20px;
`;

export default SignUp;
