import { TAGS_COLORS } from '../consts/tags';

export const getRandomColor = () => {
  const index = Math.floor(Math.random() * TAGS_COLORS.length);
  return TAGS_COLORS[index];
};
