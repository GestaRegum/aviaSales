import React from 'react';
import { FilterCheckbox, FILTER_CHECKBOXES } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/Store';
import { setFilters } from '../../DataSlice/DataSlice';
import styles from './CheckboxesGroup.module.css';
import classNames from 'classnames';

const CHECKBOXES = [
  { filterCheckbox: FILTER_CHECKBOXES.ALL, text: 'Все' },
  { filterCheckbox: FILTER_CHECKBOXES.ONE, text: '1 Пересадка' },
  { filterCheckbox: FILTER_CHECKBOXES.TWO, text: '2 Пересадка' },
  { filterCheckbox: FILTER_CHECKBOXES.THREE, text: '3 Пересадка' },
];

export const CheckboxesGroup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedFilters = useSelector((state: RootState) => state.data.filters);

  const handleCheckboxChange = (filter: FilterCheckbox) => {
    if (filter === FILTER_CHECKBOXES.ALL) {
      if (selectedFilters.includes(FILTER_CHECKBOXES.ALL)) {
        dispatch(setFilters([]));
      } else {
        dispatch(setFilters(Object.values(FILTER_CHECKBOXES)));
      }
    } else {
      const isFilterSelected = selectedFilters.includes(filter);
      const newFilters = isFilterSelected
        ? selectedFilters.filter((item) => item !== filter)
        : [...selectedFilters.filter((f) => f !== FILTER_CHECKBOXES.ALL), filter];

      dispatch(setFilters(newFilters.length > 0 ? newFilters : [0]));
    }
  };

  return (
    <div className={classNames(styles.checkbox_list)}>
      <p> Количество пересадок</p>
      {CHECKBOXES.map((checkbox) => (
        <div key={checkbox.filterCheckbox}>
          <label className={classNames(styles.check)}> 
            <span
              className={classNames(
                selectedFilters.includes(checkbox.filterCheckbox) ? styles.check_box_checked : styles.check__box
              )}
            ></span>
            <input
              className={classNames(styles.check__input)}
              type="checkbox"
              checked={selectedFilters.includes(checkbox.filterCheckbox)}
              onChange={() => handleCheckboxChange(checkbox.filterCheckbox)}
            />

            {checkbox.text}
          </label>
        </div>
      ))}
    </div>
  );
};
