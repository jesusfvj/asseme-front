import { useState } from "react";
import { Typography } from "../Typography";
import { Carousel } from "./Carousel";
import { ArtistElement, GifElement } from "./Elements";
import { SkeletonElement } from "./Skeletons/SkeletonElement";

export const CarouselList = ({
  object,
  sectionTitle,
  dataType,
  textType = "important",
}) => {
  const [isSwipping, setIsSwipping] = useState(false);
  const itemsNumber = {
    itemsSuperLarge: 7,
    itemsDesktop: 5,
    itemsTablet: 3,
    itemsMobile: 2,
  }

  return (
    <div className="w-full">
      <div className="flex pl-4 mb-10">
        <Typography type={textType} text={sectionTitle} color="blue" />
      </div>
      <Carousel
        itemsSuperLarge={itemsNumber["itemsSuperLarge"]}
        itemsDesktop={itemsNumber["itemsDesktop"]}
        itemsTablet={itemsNumber["itemsTablet"]}
        itemsMobile={itemsNumber["itemsMobile"]}
        setIsSwipping={setIsSwipping}
      >
        {object.map((object, index) => {
          switch (dataType) {
            case "gif":
              return <GifElement key={index} object={object} />;
            case "artist":
              return <ArtistElement key={index} object={object} />;
            case "skeleton":
              return <SkeletonElement key={index} object={object} />;
            default:
              break;
          }
        })}
      </Carousel>
    </div>
  );
};
