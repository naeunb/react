import styled from "styled-components";

function AdminForm({ title, children, onSubmit }) {
  return (
    <Container>
      <Form noValidate onSubmit={onSubmit}>
        <Title>{title}</Title>
        {children}
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  padding: 0 20px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 30px;
`;

export default AdminForm;
