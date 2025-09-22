import { IntroProps } from "./type";

const Intro = ({ data }: IntroProps) => {
  if (!data?.intro) return null;

  return (
    <div className="w-full" dangerouslySetInnerHTML={{ __html: data.intro }} />
  );
};

export default Intro;
