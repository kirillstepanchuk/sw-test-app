import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ::-webkit-scrollbar {
  width: 0.5rem;
}

::-webkit-scrollbar-thumb {
  background: #d3d3d3;
  border-radius: 0.5rem;
}

::-webkit-scrollbar-thumb:hover {
  background: #888;
}
`;