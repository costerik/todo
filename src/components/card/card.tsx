import React, {ReactElement} from 'react';
import style from './card.module.scss';
import {CardType} from './card.types';

function Card({placeholder = 'Enter a title for this card'}: CardType): ReactElement {
  return (
    <div className={style.container}>
      <textarea
        className={style.textarea}
        placeholder={placeholder}
        onChange={(): void => {
          //TODO
        }}
      />
    </div>
  );
}

export default Card;
