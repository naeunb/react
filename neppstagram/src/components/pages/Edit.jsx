import styled from "styled-components";
import { RxPlus } from "react-icons/rx";
import { useEffect, useState } from "react";
import { Button } from "../common/Button";
import { convertUrl, getPostById, postPost } from "../../api/admin";
import { useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [inputs, setInputs] = useState({
    content: "",
    images: [],
  });
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleImages = (e) => {
    if (inputs.images.length + e.target.files.length > 5) {
      alert("5개 이하 업로드 가능");
      return;
    }
    const { files } = e.target;

    //초기화
    setPreviewUrls([]);

    setInputs((inputs) => {
      const prevImages = inputs.images;

      const fileArr = [...prevImages, ...files];

      //미리보기
      fileArr.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setPreviewUrls((urls) => [...urls, reader.result]);
        };
      });

      //최종상태 업데이트
      return { ...inputs, images: [...prevImages, ...files] };
    });
  };
  const handleSubmit = () => {
    const form = new FormData();
    form.append("content", inputs.content);

    inputs.images.forEach((image) => {
      form.append("images", image);
    });

    postPost(form).then((res) => console.log(res));
  };

  useEffect(() => {
    if (id) {
      getPostById(id).then((data) => {
        setPost(data);
        setInputs((inputs) => ({ ...inputs, content: data.content }));
        setPreviewUrls([...data.img_list.map((img) => img.url)]);
        Promise.all(
          data.img_list.map((img) => {
            const file = convertUrl(img.url);
            return file;
          })
        ).then((res) => console.log(res));
      });
    }
  }, [id]);

  return (
    <Container>
      <Textarea
        placeholder="내용"
        value={inputs.content}
        onChange={(e) =>
          setInputs((inputs) => ({ ...inputs, content: e.target.value }))
        }
      ></Textarea>
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
      <Button
        onClick={handleSubmit}
        style={{ position: "absolute", bottom: 0, left: 0 }}
      >
        등록
      </Button>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  position: relative;
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

const ImagesWrapper = styled.div`
  display: flex;
`;

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
  width: 100px;
  height: 100px;

  img {
    width: 200px;
  }
`;
