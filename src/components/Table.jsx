import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleModalMenu, sortedContacts } from '../store/contactListSlice';

import ContactList from './ContactList';

import { ReactComponent as SvgMenu } from '../icons/dots.svg';

const Table = () => {
  const dispatch = useDispatch();

  return (
    <table className='table'>
      <thead>
        <tr className='headlines'>
          <td>
            <div className='menu'>
              <SvgMenu onClick={() => dispatch(toggleModalMenu({ isActive: true }))} />
            </div>
          </td>
          <td onClick={() => dispatch(sortedContacts({ param: 'name' }))}>
            <p>Имя</p>
          </td>
          <td onClick={() => dispatch(sortedContacts({ param: 'number' }))}>
            <p>Телефон</p>
          </td>
          <td onClick={() => dispatch(sortedContacts({ param: 'address' }))}>
            <p>Адрес</p>
          </td>
          <td onClick={() => dispatch(sortedContacts({ param: 'email' }))}>
            <p>Электронная почта</p>
          </td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <ContactList />
      </tbody>
    </table>
  );
};

export default Table;
