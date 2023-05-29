import styled from "styled-components";
import loading from "../assets/loading.gif";

export default function LoadPage() {
  return <Loading src={loading} />;
}

const Loading = styled.img`
  height: 150px;
  width: 150px;
  margin: auto;
  margin-top: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;