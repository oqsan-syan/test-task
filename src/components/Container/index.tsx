import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`lg:h-screen p-10 w-full ${className}`}>{children}</div>
  );
};

export default Container;
