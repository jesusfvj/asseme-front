import { Link } from 'react-router-dom'
import { useUser } from '../../../../Context/UserContext/UserContext'
import { Typography } from '../../Typography'

export const ArtistElement = ({ object }) => {
  const { user } = useUser()
  const isUser = user?._id === object._id
  return (
    <div className='w-[14vw] relative cursor-pointer'>
      <Link to={`/artist/${object._id}`}>
        <img className="h-full w-full object-contain" src={object.profilePhoto} alt="gif" />
      </Link>
      {
        !isUser &&
        < Link to={`/artist/${object._id}`}>
      <Typography
        text={object.name}
        type="p2"
        color="blue"
        styles="hover:text-blue-500"
      />
    </Link>
        }
    </div >
  )
}
