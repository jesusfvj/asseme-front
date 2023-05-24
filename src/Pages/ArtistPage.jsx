import { useParams } from "react-router-dom";
import { Typography } from "../Components/BaseComponents/Typography";
import { useUI } from "../Context/UI/UIContext";
import { useUser } from "../Context/UserContext/UserContext";
import { GifElement, ArtistElement } from "../Components/BaseComponents/CarouselList/Elements"
import { RiUserFollowFill, RiUserFollowLine } from "react-icons/ri";

export const ArtistPage = () => {
  const { artistId } = useParams();
  const { user } = useUser()
  const { users, items } = useUI()

  const foundArtist = users.find((obj) => obj._id === artistId);
  const isUser = user?._id === artistId
  const isFollowed = false

  const followClicked = () => {
    console.log("hola")
  }

  return (
    <div className="w-screen min-h-[80vh] relative z-20 pl-28 pr-10 my-10">
      <div className="flex flex-col gap-32">
        <div className="flex items-end gap-4">
          <div className="flex flex-col gap-1 w-[15vw] h-fit items-end">
            <Typography text={foundArtist.name} type="p1" color="yellow" styles="pr-1 h-full" />
            <div className="relative w-full h-full rounded-lg bg-gray-700 p-2 flex justify-center items-center">
              <img className="w-full h-full" src={foundArtist.profilePhoto} alt="artist image" />
              {isUser &&
                <div
                  className="absolute top-2 right-2 cursor-pointer flex justify-center items-center"
                  onClick={followClicked}
                >
                  <Typography
                    text={isFollowed ? <RiUserFollowFill /> : <RiUserFollowLine />}
                    type="p0"
                    color={isFollowed ? "white" : "gray"}
                    styles="hidden xs:flex"
                  />

                </div>
              }
            </div>
          </div>
          <div>
            <Typography text={`Following ${foundArtist.following.length} users`} type="p1" color="blue" />
            <Typography text={`Followed by ${foundArtist.followedBy.length} users`} type="p1" color="blue" />
            <Typography text={`Has ${foundArtist.uploadedItems.length} gifs and memes`} type="p1" color="blue" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Typography text="Gifs and memes" type="important" color="yellow" />
          <div className="w-full flex flex-wrap gap-4">
            {
              foundArtist.uploadedItems.map((itemId, index) => {
                const foundItem = items.find((obj) => obj._id === itemId);
                if (foundItem !== undefined) {
                  return (
                    <GifElement key={index} object={foundItem} isOwner={true}/>
                  )
                }
              })
            }
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Typography text="Following artists" type="important" color="yellow" />
          <div className="w-full flex flex-wrap gap-4">
            {
              foundArtist.following.map((artistId, index) => {
                const foundItem = users.find((obj) => obj._id === artistId);
                if (foundItem !== undefined) {
                  return (
                    <ArtistElement key={index} object={foundItem} />
                  )
                }
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
