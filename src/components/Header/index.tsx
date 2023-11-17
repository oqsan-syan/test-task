import { FC } from "react";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <h4 className="text-primary font-inter text-xl font-sans mb-10 font-bold">
      {title}
    </h4>
  );
};

export default Header;
