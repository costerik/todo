import {TaskType} from '../../reducers/tasks/types';

export type ColumnType = {
  title?: string;
  state?: string;
  addAnotherCardText?: string;
  addACard?: string;
  addCard?: string;
  tasks?: Array<TaskType>;
};
