import { toSvg } from "jdenticon";

export const generateAvatar = (email: string) => {
  const dataUrl = toSvg(email, 100);
  return dataUrl;
};
