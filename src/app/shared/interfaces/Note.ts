import { RemindDates } from '../enums/cron.enums';
import { Tag } from './Tag';

export interface Note {
  id?: string;
  title: string;
  description: string;
  tags: Tag[];
  created?: string;
  whenRemind?: RemindDates | null;
}
