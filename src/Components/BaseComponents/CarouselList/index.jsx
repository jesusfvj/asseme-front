import { useState } from "react";
import { Typography } from "../Typography";
import { Carousel } from "./Carousel";
import { ArtistElement, GifElement, MemeElement } from "./Elements";
import { SkeletonGifElement, SkeletonMemeElement, SkeletonArtistElement } from "./Skeletons";

export const CarouselList = ({
  object,
  sectionTitle,
  dataType,
  textType = "important",
  itemsNumber = {
    itemsSuperLarge: 7,
    itemsDesktop: 5,
    itemsTablet: 3,
    itemsMobile: 2,
  },

}) => {
  const [isSwipping, setIsSwipping] = useState(false);

  return (
    <div className="w-full">
      <div className="flex pl-4">
        <Typography type={textType} text={sectionTitle} color="white" />
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
            case "meme":
              return <MemeElement key={index} object={object} />;
            case "artist":
              return <ArtistElement key={index} object={object} />;
            case "skeletonPlaylist":
              return <SkeletonGifElement key={index} object={object} />;
            case "skeletonAlbum":
              return <SkeletonMemeElement key={index} object={object} />;
            case "skeletonArtist":
              return <SkeletonArtistElement key={index} object={object} />;
            default:
              break;
          }
        })}
      </Carousel>
    </div>
  );
};
