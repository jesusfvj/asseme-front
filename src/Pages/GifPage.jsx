import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Typography } from '../Components/BaseComponents/Typography';
import { useUI } from '../Context/UI/UIContext';

export const GifPage = () => {
    const { gifId } = useParams();
    const { items } = useUI()
    const foundItem = items.find((obj) => obj._id === gifId);
    console.log(foundItem)

    return (
        <div className='relative w-screen h-[80vh] flex justify-center items-center z-20'>
            <div className='w-[40vw] h-[40vh] flex flex-col items-center'>
                <Link to={`/artist/${foundItem.owner[0]._id}`}>
                    <Typography text={foundItem.owner[0].name} type="p1" color="blue" styles="hover:text-blue-500" />
                </Link>
                <img className="w-full h-full object-contain" src={foundItem.itemUrl} alt="gif" />
            </div>
        </div>
    )
}
