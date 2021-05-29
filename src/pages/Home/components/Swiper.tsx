import { memo, FC, useState } from "react";
import { Carousel } from "antd-mobile";
import styled from "styled-components";
const WrapA = styled.a`
  display: "inline-block";
  width: "100%";
  height: ${(props: { imgHeight: number | string }) => props.imgHeight};
  .img {
    width: 100%;
    vertical-align: top;
  }
`;

type PropType = {
  data: {
    created_at: Date;
    id: number;
    img: string;
    img_url: string;
    seq: number;
    status: number;
    title: string;
    updated_at: Date;
    url: string;
  }[];
};
const Swiper: FC<PropType> = memo(({ data }) => {
  const [imgHeight, setImgHeight] = useState<number | string>(176);
  return (
    <Carousel
      autoplay={true}
      infinite
      // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
      // afterChange={(index) => console.log("slide to", index)}
    >
      {data &&
        data.map((item) => (
          <WrapA imgHeight={imgHeight} key={item.id} href={item.url}>
            <img
              src={item.img_url}
              alt={item.title}
              className="img"
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event("resize"));
                setImgHeight("auto");
              }}
            />
          </WrapA>
        ))}
    </Carousel>
  );
});

export default Swiper;
