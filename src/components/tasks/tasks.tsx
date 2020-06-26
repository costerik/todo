import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';
import style from './tasks.module.scss';

/* components */
import Column from '../column';

/*  types */
import {ReturnRootStateType} from '../../reducers/reducers.types';
import {TaskType} from '../../reducers/tasks/types';

function Tasks({search}: {search: string}): ReactElement {
  const {open, inProgress, completed, archived} = useSelector((state: ReturnRootStateType) => {
    const open: Array<TaskType> = [];
    const inProgress: Array<TaskType> = [];
    const completed: Array<TaskType> = [];
    const archived: Array<TaskType> = [];
    state.tasksReducer.tasks?.forEach((t) => {
      switch (t.state.name.replace(/ /g, '').toUpperCase()) {
        case 'OPEN':
          open.push(t);
          break;
        case 'IN-PROGRESS':
          inProgress.push(t);
          break;
        case 'COMPLETED':
          completed.push(t);
          break;
        case 'ARCHIVED':
          archived.push(t);
          break;
        default:
      }
    });
    return {
      open,
      inProgress,
      archived,
      completed,
    };
  });

  return (
    <div className={style.container}>
      <Column title="Open" state="OPEN" tasks={open.filter((e) => e.title.includes(search))} />
      <Column
        title="In progress"
        state="IN-PROGRESS"
        tasks={inProgress.filter((e) => e.title.includes(search))}
      />
      <Column title="Completed" state="COMPLETED" tasks={completed.filter((e) => e.title.includes(search))} />
      <Column title="Archived" state="ARCHIVED" tasks={archived.filter((e) => e.title.includes(search))} />
    </div>
  );
}

export default Tasks;
