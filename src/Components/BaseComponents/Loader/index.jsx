import { Typography } from "../Typography";

export const Loader = ({modal = false, text = ""}) => {
  return (
    <div className={`fixed h-screen w-screen top-0 bottom-0 left-0 right-0 ${modal ? 'backdrop-blur-md' : 'bg-gradient-to-b from-[#4A4A4A]'} to-[#373f3f] flex items-center justify-center`}>
      <div className="animate-rotate flex flex-col items-center gap-4">
        <img src="https://res.cloudinary.com/diek1olu2/image/upload/v1684838608/ASSEME%20-%20visual/logo_vzfxlv.png" alt="logo"/>
        <Typography
          text={text}
          color="white"
          type="big"
          />
      </div>
    </div>
  );
};