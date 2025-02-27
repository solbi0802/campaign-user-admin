/** @jsxImportSource @emotion/react */
import MenuBar from "./components/MenuBar";
import { css } from "@emotion/react";

const Container = css`
  display: flex;
  justify-content: center;
  width: 1980px;
`;
function App() {
  return (
    <>
      <div css={Container}>
        <MenuBar />
      </div>
    </>
  );
}

export default App;
