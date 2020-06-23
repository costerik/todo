import React, {ReactElement} from 'react';
import style from './tasks.module.scss';

import Column from '../column';

function Tasks(): ReactElement {
  return (
    <div className={style.container}>
      <Column title="Open" />
      <Column title="In progress" />
      <Column title="Done" />
      <Column title="Archived" />
    </div>
  );
}

export default Tasks;
