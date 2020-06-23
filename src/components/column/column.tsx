import React, {ReactElement} from 'react';
import style from './column.module.scss';

/* types */
import {ColumnType} from './column.types';
import Card from '../card';

function Column({title, addCardText = 'Add a card'}: ColumnType): ReactElement {
  return (
    <div className={style.container}>
      <h1 className={style.title}>{title}</h1>
      <Card />
      <div className={style.addCardContainer}>
        <p className={style.addCard}>{addCardText}</p>
      </div>
    </div>
  );
}

export default Column;
