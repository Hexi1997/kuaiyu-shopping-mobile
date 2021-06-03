import styled from "styled-components";
const WarpDiv = styled.div`
  height: 100vh;
  .info-card-container {
    margin: 1rem;
    height: 10rem;
    padding: 2rem;
    background: linear-gradient(to left, #9ecac6, #37c9aa);
    border-radius: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .img-container {
      position: relative;
      .avatar {
        width: 6rem;
        height: 6rem;
        margin-right: 2rem;
        border-radius: 3rem;
      }
      .upload {
        width: 6rem;
        height: 6rem;
        margin-right: 2rem;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 99999;
        opacity: 0;
      }
    }

    .info-text {
      color: white;
      height: 6rem;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .edit {
          margin-left: 0.4rem;
        }
      }
      .email {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .quit-btn {
    border-radius: 1rem;
    font-size: 1.6rem;
    margin: 2rem 1rem;
  }
`;
export default WarpDiv;
