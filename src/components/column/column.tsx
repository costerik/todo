import React, {ReactElement} from 'react';
import {useDispatch} from 'react-redux';
import style from './column.module.scss';

/* actions */
import {createTask} from '../../reducers/tasks/actions';

/* types */
import {ColumnType} from './column.types';
import Card from '../card';

function Column({
  title,
  addAnotherCardText = 'Add another card',
  addCard = 'Add Card',
  addACard = 'Add a card',
  tasks,
  state,
}: ColumnType): ReactElement {
  const dispatch = useDispatch();
  const [create, setCreate] = React.useState(false);
  const [newCardTitle, setNewCardTitle] = React.useState('');
  return (
    <div className={style.container}>
      <h1 className={style.title}>{title}</h1>
      {tasks?.map((t) => {
        const owner = t.user ? `${t.user?.name} ${t.user?.lastname}` : undefined;
        return <Card key={t._id} owner={owner} title={t.title} id={t._id} />;
      })}
      {!create ? (
        <div className={style.addCardContainer} onClick={(): void => setCreate(true)}>
          <p className={style.addCard}>{tasks && tasks.length > 0 ? addAnotherCardText : addACard}</p>
        </div>
      ) : (
        <>
          <Card
            edit={create}
            onChangeValueText={(value): void => {
              setNewCardTitle(value);
            }}
          />
          <div>
            <button
              className={style.addCardButton}
              onClick={(): void => {
                if (newCardTitle.trim().length > 0 && state) {
                  dispatch(createTask(newCardTitle, state));
                  setCreate(false);
                }
              }}>
              {addCard}
            </button>
            <span className={style.cross} onClick={(): void => setCreate(false)}>
              X
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default Column;
