import { Link } from 'react-router-dom'
import { useUser } from '../../../../Context/UserContext/UserContext'
import { Typography } from '../../Typography'
import { AiOutlineCopy } from "react-icons/ai";
import { useUI } from '../../../../Context/UI/UIContext';

export const GifElement = ({ object, isOwner }) => {
  const { user } = useUser()

  const {
    setMessageSuccessToaster,
  } = useUI()

  const handleCopyClipboard = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setMessageSuccessToaster("Url copied to the clipboard.")

      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
      });
  };

  return (
    <div className='w-[14vw] relative cursor-pointer'>
      <Link to={`/gif/${object._id}`}>
        <img className="h-full w-full object-contain" src={object.itemUrl} alt="gif" />
      </Link>
        <div className='absolute top-2 right-2' onClick={() => handleCopyClipboard(object.itemUrl)}>
          <Typography
            text={<AiOutlineCopy />}
            type="p1"
            color="gray"
            styles="hover:text-white cursor-pointer"
          />
        </div>
      {
        !isOwner &&
        < Link to={`/artist/${object.owner[0]._id}`}>
          <Typography
            text={object.owner[0].name}
            type="p2"
            color="blue"
            styles="hover:text-blue-500"
          />
        </Link>
      }
    </div >
  )
}
