import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getItems, getTopItems } from "../API/ItemsApi";
import { getUsers } from "../API/UserApi/UserApi";
import { CarouselList } from "../Components/BaseComponents/CarouselList";
import { Typography } from "../Components/BaseComponents/Typography";
import { useUI } from "../Context/UI/UIContext";
import { skeletonData } from "../Utils/skeletonData";

export const LandingPage = () => {
  const { items, topItems, setItems, setTopItems, setUsers } = useUI()

  useEffect(() => {
    const fetchTopGifs = async () => {
      const response = await getTopItems();
      if (response.ok) {
        setTopItems(response.items)
        console.log(response.items)
      }
    };
    fetchTopGifs();
    const fetchGifsMemes = async () => {
      const response = await getItems();
      if (response.ok) {
        setItems(response.items)
        console.log(response.items)
      }
    };
    fetchGifsMemes();
    const fetchUsers = async () => {
      const response = await getUsers();
      if (response.ok) {
        setUsers(response.users)
        console.log(response.users)
      }
    };
    fetchUsers();
  }, [])

  return (
    <>
      <div className="relative flex flex-col justify-center items-center md:gap-y-[4rem] sm:pt-[4rem] sm:pb-[4rem] w-full z-20">
        <div className="w-full md:w-5/6">
          {topItems?.length > 0 ? (
            <CarouselList
              object={items}
              sectionTitle="Top gifs"
              dataType="gif"
            />
          ) :
            <CarouselList
              dataType="skeleton"
              object={skeletonData}
              sectionTitle="Top gifs"
            />
          }
        </div>
      </div>
      <div className="relative px-[9vw] w-full mb-10 z-20">
        {items?.length > 0
          ?
          <>
            <div className="flex mb-10">
              <Typography type="important" text="Gifs and Memes" color="blue" />
            </div>
            <div className="flex flex-wrap w-full gap-4">
              {items.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col">
                    <Link to={`/artist/${item.owner[0]._id}`}>
                      <Typography text={item.owner[0].name} type="p2" color="blue" styles="hover:text-blue-500" />
                    </Link>
                    <Link to={`/gif/${item._id}`}>
                      <img
                        className="object-cover w-[15vw] h-[15vw] cursor-pointer"
                        src={item.itemUrl}
                        alt="gif"
                      />
                    </Link>
                  </div>
                )
              })}
            </div>
          </>
          :
          <CarouselList
            dataType="skeleton"
            object={skeletonData}
            sectionTitle="Gifs and memes"
          />
        }
      </div>
    </>
  )
};