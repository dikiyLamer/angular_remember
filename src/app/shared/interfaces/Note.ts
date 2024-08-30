import { Tag } from './Tag';

export interface Note {
  id?: string;
  title: string;
  description: string;
  tags: Tag[];
  created?: string;
}
