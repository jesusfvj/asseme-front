import { useUI } from "../Context/UI/UIContext"
import { GifElement, ArtistElement } from "../Components/BaseComponents/CarouselList/Elements"
import { Typography } from "../Components/BaseComponents/Typography"

export const SearchPage = () => {
  const { searchResults } = useUI()
  const { items, searchUnderThree } = useUI()

  return (
    <div className="z-20 relative flex flex-col gap-5 w-screen px-20 my-10">
      <div className="flex flex-col gap-4">
        {searchUnderThree &&
          <div className="w-full h-full">
            <Typography text="Top 20 recomendations for you" type="important" color="yellow" styles="pl-16" />
          </div>
        }
       { !searchUnderThree && searchResults?.items && searchResults?.items.length > 0 &&
       <div className="w-full h-full">
          <Typography text="Gifs and memes" type="important" color="yellow" styles="pl-16" />
        </div>
        }
        <div className="flex flex-wrap justify-center gap-5">
          {
            searchResults?.items && searchResults?.items.length > 0 &&
            <>{
              searchResults?.items.map((item, index) => {
                const foundItem = items.find((obj) => obj._id === item._id);
                return (
                  <GifElement key={index} object={foundItem} />
                )
              })
            }
            </>
          }
        </div>
       { !searchUnderThree && searchResults?.users && searchResults?.users.length > 0 &&
       <div className="w-full h-full">
          <Typography text="Users" type="important" color="yellow" styles="pl-16" />
        </div>
        }
        <div className="flex flex-wrap justify-center gap-5">
          {
            searchResults?.users && searchResults?.users.length > 0 &&
            <>{
              searchResults?.users.map((user, index) => {
                return (
                  <ArtistElement key={index} object={user} />
                )
              })
            }
            </>
          }
        </div>
      </div>
    </div>
  )
}