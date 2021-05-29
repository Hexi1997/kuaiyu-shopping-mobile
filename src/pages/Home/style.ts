import styled from "styled-components";
import { theme_color } from "../config";
const WarpDiv = styled.div`
  .img-home {
    width: 4rem;
    height: 4rem;
    background: ${theme_color};
    border-radius: 50%;
    box-shadow: 0 0 0.2rem;
    z-index: 999999;
    display: ${(props: { showReturnBtn: boolean }) =>
      props.showReturnBtn ? "flex" : "none"};
    position: absolute;
    bottom: 7rem;
    right: 2rem;
    font-size: 1rem;
    align-items: center;
    justify-content: center;
    .icon-home {
      width: 4rem;
      height: 4rem;
      color: white;
    }
  }
`;
export default WarpDiv;
