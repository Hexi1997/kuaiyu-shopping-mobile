import styled from "styled-components";
const WarpDiv = styled.div`
  background-color: white-space;
  .add-btn {
    margin: 5rem 1rem;
    border-radius: 3rem;
  }
  .address-container {
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    align-items: center;
    border-bottom: 1px solid #ddd;

    .text-container {
      height: 4rem;
      padding-bottom: 1rem;

      .part1 {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding-bottom: 1rem;
        font-size: 1.6rem;
        font-weight: bold;
        .default {
          display: inline-block;
          padding: 0.3rem 1rem;
          margin-left: 1rem;
          border-radius: 0.2rem;
          background-color: #d10411;
          color: white;
          border-radius: 1rem;
          font-weight: normal;
          font-size: 1.5rem;
        }
      }
      .part2 {
        font-size: 1.4rem;
        font-style: italic;
      }
    }
    .editor {
      padding: 2rem;
    }
  }
`;
export default WarpDiv;
