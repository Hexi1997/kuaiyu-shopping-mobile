import { memo, FC, useState } from "react";
import { Carousel } from "antd-mobile";

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
          <a
            key={item.id}
            href={item.url}
            style={{
              display: "inline-block",
              width: "100%",
              height: imgHeight,
            }}
          >
            <img
              src={item.img_url}
              alt=""
              style={{ width: "100%", verticalAlign: "top" }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event("resize"));
                setImgHeight("auto");
              }}
            />
          </a>
        ))}
    </Carousel>
  );
});

export default Swiper;
