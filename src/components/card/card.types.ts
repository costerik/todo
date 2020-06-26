import {TaskType} from '../../reducers/tasks/types';

export type CardType = {
  placeholder?: string;
  edit?: boolean;
  owner?: string;
  onChangeValueText?: (value: string) => void;
} & Partial<TaskType>;
