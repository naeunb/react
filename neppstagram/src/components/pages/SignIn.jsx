import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCurrUser, signIn } from "../../api/admin";
import { useUserIdDispatch } from "../../data/auth";
import { useInputs } from "../../hook/useInputs";
import AdminForm from "../admin/AdminForm";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

function SignIn() {
  const [inputs, handleInputs] = useInputs({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const navigate = useNavigate();

  const dispatch = useUserIdDispatch();

  const active = email !== "" && password !== "";

  const onSubmit = async (e) => {
    e.preventDefault();

    await signIn(inputs);

    const user = await getCurrUser();

    dispatch(user.id);

    navigate("/");
  };

  const toSignUp = () => {
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
