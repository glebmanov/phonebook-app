import React from 'react';
import { useDispatch } from 'react-redux';
import { findContact } from '../store/contactListSlice';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className='search-wrapper'>
      <input type='text' placeholder='Поиск' onChange={e => dispatch(findContact({ value: e.target.value.trim() }))} />
    </div>
  );
};

export default Header;
