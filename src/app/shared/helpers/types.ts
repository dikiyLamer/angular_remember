import { TAGS_COLORS } from '../consts/tags';

export type TagsColors = (typeof TAGS_COLORS)[number];
export type SearchParams = {
  title: string;
};
