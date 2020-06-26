import React, {ReactElement} from 'react';
import style from './search-box.module.scss';
import {SearchBoxType} from './search-box.types';

function SearchBox({placeholder = 'search', onChangeText}: SearchBoxType): ReactElement {
  return (
    <div className={style.container}>
      <input
        className={style.input}
        onChange={(e): void => {
          if (onChangeText) onChangeText(e.target.value);
        }}
        type="search"
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchBox;
