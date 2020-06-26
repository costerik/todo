import {TaskType} from '../../reducers/tasks/types';

export type CardType = {
  placeholder?: string;
  edit?: boolean;
  owner?: string;
  titleText?: string;
  descriptionText?: string;
  stateText?: string;
  userText?: string;
  updateText?: string;
  removeUserText?: string;
  onChangeValueText?: (value: string) => void;
} & Partial<TaskType>;
