import {TaskType} from '../../reducers/tasks/types';

export type CardType = {
  placeholder?: string;
  edit?: boolean;
  owner?: string;
  titleText?: string;
  descriptionText?: string;
  stateText?: string;
  onChangeValueText?: (value: string) => void;
} & Partial<TaskType>;
