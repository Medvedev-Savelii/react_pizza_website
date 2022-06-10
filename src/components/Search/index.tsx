import React, { useState } from "react";
import { useDispatch } from "react-redux";

import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search: React.FC = () => {

  const [value, setValue] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
		inputRef.current?.focus();
	
  };

  const updateSearchValue = React.useCallback(
    debounce((str:string) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (event:any) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icons}
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 0 48 48"
        width="48"
      >
        <path d="M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
        <path d="M0 0h48v48H0z" fill="none" />
      </svg>
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clear}
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 0 48 48"
          width="48"
        >
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы...."
      />
    </div>
  );
}

export default Search;
