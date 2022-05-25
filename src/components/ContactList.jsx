import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalEdit } from '../store/contactListSlice';

import { getPageCount } from '../utils/pages';

import { ReactComponent as SvgUser } from '../icons/user.svg';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contactList.contacts);
  const searchedQuery = useSelector(state => state.contactList.searchedQuery);
  const searchedContacts = useSelector(state => state.contactList.searchedContacts);
  const openModalEdit = ({ id }) => dispatch(toggleModalEdit({ isActive: true, id }));

  let limit = 12;
  let totalCount = contacts.length;
  let totalPages = getPageCount(totalCount, limit);
  const [currentPage, setCurrentPage] = useState(1);
  const [endSlice, setEndSlice] = useState(limit);

  const scrollHandler = useCallback(() => {
    let documentRect = document.documentElement.getBoundingClientRect();
    if (documentRect.bottom < document.documentElement.clientHeight + 1 && currentPage < totalPages) {
      setCurrentPage(2);
      setEndSlice(endSlice + limit);
    }
  }, [currentPage, endSlice, limit, totalPages])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  return (searchedQuery ? searchedContacts : contacts)
    .slice(0, endSlice)
    .map(({ id, name, number, address, email }) => (
      <tr key={id} className='contact'>
        <td>
          <SvgUser width='50' heigth='50' />
        </td>
        <td>{name}</td>
        <td>{number}</td>
        <td>{address}</td>
        <td>{email}</td>
        <td>
          <button className='change-btn' onClick={() => openModalEdit({ id })}>
            Редактировать
          </button>
        </td>
      </tr>
    ));
};

export default ContactList;
