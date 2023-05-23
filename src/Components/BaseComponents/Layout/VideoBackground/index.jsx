import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const VideoBackground = () => {
  const videoRef = useRef(null);
  const {pathname} = useLocation();
  const objectVideos = {
    loginregister: "https://res.cloudinary.com/diek1olu2/video/upload/v1684796957/ASSEME%20-%20visual/mixkit-glitter-light-lines-rising-from-bottom-30617-medium_zgxsy9.mp4",
    base: "https://res.cloudinary.com/diek1olu2/video/upload/v1684774446/ASSEME%20-%20visual/mixkit-traveling-between-the-stars-and-nebulae-14151-medium_ueixbe.mp4"
  }
  const [path, setPath] = useState(pathname !== "/loginregister" ? objectVideos['base'] : objectVideos[`${pathname.substring(1)}`])

  useEffect(() => {
    const videoElement = videoRef.current;
    const playVideo = () => {
      videoElement.play();
    };
    videoElement.addEventListener('ended', playVideo);
    return () => {
      videoElement.removeEventListener('ended', playVideo);
    };
  }, []);
  
  useEffect(() => {
    pathname !== "/loginregister" ? setPath(objectVideos['base']) : setPath(objectVideos[`${pathname.substring(1)}`])
  }, [pathname])
  

  return (
    <>
    <div className="fixed min-h-screen w-screen top-0 right-0 bottom-0 left-0">
      <video className="h-full w-full object-cover" ref={videoRef} autoPlay muted loop>
        <source src={path} type="video/mp4" />
      </video>
    </div>
    <div className='fixed h-screen w-screen top-0 right-0 left-0 bottom-0 bg-[#95B7BF] opacity-60'></div>
    <div className='fixed h-screen w-screen top-0 right-0 left-0 bottom-0 backdrop-blur-sm'></div>
    </>
  )
}