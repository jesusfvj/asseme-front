export const Typography = ({
  text,
  type = "p1",
  color = "primary",
  family = "one",
  styles = "",
  onClick
}) => {
  const types = {
    title: `text-xl sm:text-4xl font-bold`,
    subtitle: `text-2xl sm:text-6xl font-medium`,
    important: `text-2xl sm:text-5xl font-bold`,
    big: `text-xl sm:text-4xl font-bold`,
    p0: `text-xl sm:text-2xl font-normal`,
    p1: `text-sm sm:text-lg font-normal`,
    p2: `text-xs sm:text-md font-normal`,
  };

  const colors = {
    black: "text-black",
    white: "text-white",
    yellow: "text-[#C4D977]",
    lightGreen: "text-[#a39281]",
    darkGreen: "text-[#5b5046]",
    ligthBlue: "text-[#144360]",
    blue: "text-[#042940]",
    transparent: "text-gray-500/0",
    danger: "text-red-400",
  };

  const fontFamily = {
    one: "font-one",
    /* pilonyc: "pilonyc tracking-widest", */
  };

  const finalClassName = `${types[type]} ${colors[color]} ${fontFamily[family]} ${styles} transition duration-500`;

  switch (type) {
    case "p0":
    case "p1":
    case "p2":
    case "important":
    case "big":
      return <p className={finalClassName} onClick={onClick}>{text}</p>;
    case "title":
      return <h1 className={finalClassName} onClick={onClick}>{text}</h1>;
    case "subtitle":
      return <h2 className={finalClassName} onClick={onClick}>{text}</h2>;
    default:
      break;
  }
};
