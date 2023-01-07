import styled from "styled-components";
import { RxPlus } from "react-icons/rx";
import { useState } from "react";

function Edit() {
  const [inputs, setInputs] = useState({
    content: "",
    images: [],
  });
  const [previewUrls, setPreviewUrls] = useState([]);
  const handleImages = (e) => {
    const { files } = e.target;
    setInputs({
      ...inputs,
      images: [...inputs.images, ...files],
    });

    setPreviewUrls([]);

    const fileArr = [...files];
    fileArr.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewUrls((urls) => [...urls, reader.result]);
      };
    });
  };
  return (
    <Container>
      <Textarea placeholder="내용" />
      <ImagesWrapper>
        {previewUrls.map((url, idx) => (
          <Preview key={idx} url={url} />
        ))}
        <BtnInput htmlFor="postImages">
          <RxPlus color="ccc" size={35} />
        </BtnInput>
        <input
          id="postImages"
          type="file"
          multiple
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImages}
        />
      </ImagesWrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
`;

const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100px;
  border: 1px solid #ddd;
  padding: 5px;
`;

const BtnInput = styled.label`
  width: 50px;
  height: 50px;
  display: flex;
  border: 2px solid #ddd;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ImagesWrapper = styled.div``;

export default Edit;

function Preview({ url }) {
  return (
    <PreviewBox>
      <img src={url} alt="" />
    </PreviewBox>
  );
}

const PreviewBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 300px;

  & + & {
    margin-top: 10px;
  }
`;
