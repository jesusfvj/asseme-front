import { Link } from 'react-router-dom'
import { Typography } from '../../Typography'

export const GifElement = ({ object }) => {
  return (
    <div className='w-[14vw] relative cursor-pointer'>
      <Link to={`/gif/${object._id}`}>
      <img className="h-full w-full" src={object.itemUrl} alt="gif" />
      </Link>
      <Link to={`/artist/${object.owner[0]._id}`}>
        <Typography
          text={object.owner[0].name}
          type="p2"
          color="blue"
          styles="hover:text-blue-500"
        />
      </Link>
    </div >
  )
}
