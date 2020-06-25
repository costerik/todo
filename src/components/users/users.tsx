import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';
import style from './users.module.scss';

/*  types */
import {ReturnRootStateType} from '../../reducers/reducers.types';

function Users(): ReactElement {
  const users = useSelector((state: ReturnRootStateType) => state.usersReducer.users);
  return (
    <div className={style.container}>
      {users?.map((e) => {
        return (
          <div key={e._id} className={style.card}>
            <p className={style.name}>
              {e.name} {e.lastname}
            </p>
            <p className={style.tasks}>Tasks: {e.tasks.length}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Users;
