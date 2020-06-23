import React, {ReactElement} from 'react';
import style from './search-box.module.scss';
import {SearchBoxType} from './search-box.types';

function SearchBox({placeholder = 'search'}: SearchBoxType): ReactElement {
  return (
    <div className={style.container}>
      <input className={style.input} type="search" placeholder={placeholder} />
    </div>
  );
}

export default SearchBox;
