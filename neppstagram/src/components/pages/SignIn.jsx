import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signIn } from "../../api/admin";
import { useInputs } from "../../hook/useInputs";
import AdminForm from "../admin/AdminForm";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

function SignIn() {
  const [inputs, handleInputs] = useInputs({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = inputs;

  const active = email !== "" && password !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (!active) return;
    signIn(inputs).then((res) => {
      window.localStorage.setItem("access-token", res.data.data.token);
      navigate("/");
    });
  };

  const toSignUp = (e) => {
    navigate("/signup");
  };

  return (
    <AdminForm title="로그인" onSubmit={onSubmit}>
      <InputWrapper>
        <Input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleInputs}
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleInputs}
        />
      </InputWrapper>
      <BtnWrapper>
        <Button bgColor={!active && "#ccc"} type="submit">
          signIn
        </Button>
        <Button onClick={toSignUp}>signUp</Button>
      </BtnWrapper>
    </AdminForm>
  );
}

const InputWrapper = styled.div``;

const BtnWrapper = styled.div`
  margin-top: 20px;
`;
export default SignIn;
