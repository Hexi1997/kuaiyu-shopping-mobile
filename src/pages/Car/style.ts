import styled from "styled-components";
const WarpDiv = styled.div`
  height: 100vh;
  .list-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1rem solid #f5f5f5;
    .check-div {
      width: 3rem;
      height: 8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .check-img {
        width: 2rem;
        height: 2rem;
      }
    }
    .list-img {
      width: 10rem;
      height: 10rem;
    }
    .text-area {
      height: 8rem;
      display: flex;
      flex: 1;
      margin-right: 1rem;
      flex-direction: column;
      justify-content: space-between;
      .top-text {
        .title {
          font-size: 1.6rem;
          font-weight: bold;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .price {
          margin-top: 0.4rem;
          font-size: 1.3rem;
        }
      }
      .bottom-text {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .stepper {
          width: 10rem;
        }
        .delete-btn {
          font-size: large;
        }
      }
    }
  }
  .bottom-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: white;
    z-index: 999999;
    .select-all-container {
      display: flex;
      align-items: center;
      .select-all-img {
        width: 2rem;
        height: 2rem;
        margin: 1rem;
      }
      img + span {
        font-size: 1.4rem;
      }
    }
    .right-container {
      font-size: 1.4rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      .total-price {
        margin: 0.5rem;
      }
      .btn-calc {
        font-style: 1.4rem;
        background: linear-gradient(to left, #ed1626, #f95930);
        color: white;
        padding: 0.6rem 1.2rem;
        margin: 1rem;
        border-radius: 1rem;
      }
    }
  }
`;
export default WarpDiv;
