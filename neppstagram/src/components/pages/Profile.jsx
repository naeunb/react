import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCurrUser, patchProfile } from "../../api/admin";

function Profile() {
  const [user, setUser] = useState({});
  const { name, profile_url } = user;

  const handleChange = (e) => {
    const form = new FormData();

    form.append("image", e.target.files[0]);

    patchProfile(form).then((res) => console.log(res));
  };

  useEffect(() => {
    getCurrUser().then((res) => setUser(res.data.data));
  }, []);

  return (
    <Container>
      <Wrapper>
        <UserName>{name}1</UserName>
        <ProfileCircle htmlFor="profile">
          <img src={profile_url} alt="" />
        </ProfileCircle>
        <input
          type="file"
          id="profile"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleChange}
        />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const UserName = styled.h2`
  text-align: center;
`;

const ProfileCircle = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-top: 20px;
  border: 3px solid #eee;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 300px;
  }
`;

export default Profile;
