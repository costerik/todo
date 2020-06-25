import React, {ReactElement} from 'react';
import style from './card.module.scss';
import {CardType} from './card.types';

function Card({
  placeholder = 'Enter a title for this card',
  title,
  edit = false,
  owner,
  onChangeValueText,
}: CardType): ReactElement {
  return (
    <div className={style.container}>
      {owner && (
        <div className={style.containerOwner}>
          <p className={style.owner}>{owner}</p>
        </div>
      )}
      {edit ? (
        <textarea
          className={style.textarea}
          placeholder={placeholder}
          onChange={(e): void => {
            if (onChangeValueText) onChangeValueText(e.target.value);
          }}
        />
      ) : (
        <p className={style.title}>{title}</p>
      )}
    </div>
  );
}

export default Card;
