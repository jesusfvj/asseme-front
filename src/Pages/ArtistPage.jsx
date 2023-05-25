import { useParams } from "react-router-dom";
import { Typography } from "../Components/BaseComponents/Typography";
import { useUI } from "../Context/UI/UIContext";
import { useUser } from "../Context/UserContext/UserContext";
import { GifElement, ArtistElement } from "../Components/BaseComponents/CarouselList/Elements"
import { RiUserFollowFill, RiUserFollowLine } from "react-icons/ri";
import { toggleFollowing } from "../API/UserApi/UserApi";
import { useState } from "react";

export const ArtistPage = () => {
  const { artistId } = useParams();
  const { user } = useUser()
  const { users, items, setIsLoading, setMessageSuccessToaster, setMessageErrorToaster } = useUI()
  const foundArtist = users.find((obj) => obj._id === artistId);
  const isUser = user?._id === artistId
  const [isFollowed, setIsFollowed] = useState(user?.following.includes(artistId))

  const followClicked = async () => {
    setIsLoading(true)
    const response = await toggleFollowing(user._id, artistId, isFollowed);
    setIsLoading(false)
    if (response.ok) {
      setIsFollowed(!response.isFollowed)
      setMessageSuccessToaster(`You are succesfully ${!isFollowed ? 'un' : ""}following this user.`);
    } else {
      setMessageErrorToaster(response.message)
    }
  }

  return (
    <div className="w-screen min-h-[80vh] relative z-20 pl-28 pr-10 my-10">
      <div className="flex flex-col gap-32">
        <div className="flex items-end gap-4">
          <div className="flex flex-col gap-1 w-[15vw] h-fit items-end">
            <Typography text={foundArtist.name} type="p1" color="yellow" styles="pr-1 h-full" />
            <div className="relative w-full h-full rounded-lg bg-gray-700 p-2 flex justify-center items-center">
              <img className="w-full h-full" src={foundArtist.profilePhoto} alt="artist image" />
              {!isUser && user &&
                <div
                  className="z-30 absolute top-2 right-2 cursor-pointer flex justify-center items-center"
                  onClick={followClicked}
                >
                  <Typography
                    text={isFollowed ? <RiUserFollowLine /> : <RiUserFollowFill />}
                    type="p0"
                    color={isFollowed ? "gray" : "white"}
                  />
                </div>
              }
            </div>
          </div>
          <div>
            <Typography text={`Following ${isFollowed ? foundArtist.following.length - 1: foundArtist.following.length} users`} type="p1" color="blue" />
            <Typography text={`Followed by ${isFollowed ? foundArtist.followedBy.length - 1: foundArtist.followedBy.length} users`} type="p1" color="blue" />
            <Typography text={`Has ${foundArtist.uploadedItems.length} gifs and memes`} type="p1" color="blue" />
          </div>
        </div>
        {foundArtist?.uploadedItems && foundArtist?.uploadedItems.length > 0 &&
          <div className="flex flex-col gap-2">
            <Typography text="Gifs and memes" type="important" color="yellow" />
            <div className="w-full flex flex-wrap gap-4">
              {
                foundArtist?.uploadedItems.map((itemId, index) => {
                  const foundItem = items.find((obj) => obj._id === itemId);
                  if (foundItem !== undefined) {
                    return (
                      <GifElement key={index} object={foundItem} isOwner={true} />
                    )
                  }
                })
              }
            </div>
          </div>
        }
        {foundArtist?.following && foundArtist?.following.length > 0 &&
          <div className="flex flex-col gap-2">
            <Typography text="Following artists" type="important" color="yellow" />
            <div className="w-full flex flex-wrap gap-4">
              {
                foundArtist?.following.map((artist, index) => {
                  const foundItem = users.find((obj) => obj._id === artist._id);
                  if (foundItem !== undefined) {
                    return (
                      <ArtistElement key={index} object={foundItem} />
                    )
                  }
                })
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}
