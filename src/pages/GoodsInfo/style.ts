import styled from "styled-components";
const WarpDiv = styled.div`
  background-color: white;
  .cover_container {
    position: relative;
    .cover_url {
      width: 100%;
    }
    .star {
      position: absolute;
      width: 2rem;
      height: 2rem;
      bottom: 0rem;
      right: 0rem;
      padding: 2rem;
    }
  }

  .area {
    background-color: #fbfbfb;
    padding: 1rem 2rem;
    .title {
      font-size: 1.6rem;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 1rem;
    }
    .category {
      font-size: 1.4rem;
    }
    .tags {
      display: flex;
      flex-direction: row;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      .recommend {
        font-size: 1.2rem;
        padding: 0.1rem 0.2rem;
        border: 0.2rem solid #e40f27;
        color: #e40f27;
        margin-right: 0.5rem;
        height: 1.6rem;
      }
      .new {
        font-size: 1.2rem;
        padding: 0.1rem 0.2rem;
        border: 0.2rem solid #e40f27;
        color: #e40f27;
        height: 1.6rem;
      }
    }
    .price {
      font-size: 1.2rem;
    }
    .btn-groups {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      color: white;
      font-size: 1.4rem;
      .add-to-cart {
        background-color: #fd9867;
        padding: 1rem;
        margin-right: 0.5rem;
      }
      .buy {
        background-color: #e40f27;
        padding: 1rem;
      }
    }
  }

  .hot-comment {
    text-align: center;
    margin-top: 10rem;
  }

  .realted-div {
    background-color: white;
    .realted-container {
      margin-top: 1rem;
      margin-bottom: 1rem;
      display: inline-flex;
      width: 50%;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .realted-img {
        align-self: center;
        width: 100%;
      }
      .realted-title {
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 1.6rem;
      }
    }
  }
`;
export default WarpDiv;
