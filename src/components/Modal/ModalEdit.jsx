import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalEdit, editContact } from '../../store/contactListSlice';

import { ReactComponent as SvgUser } from '../../icons/user.svg';
import '../../styles/modal-edit.scss';

const ModalEdit = () => {
  const dispatch = useDispatch();
  const isActive = useSelector(state => state.contactList.modals.edit.isActive);
  const contacts = useSelector(state => state.contactList.contacts);
  const id = useSelector(state => state.contactList.modals.edit.id);
  const contact = contacts.find(contact => contact.id === id);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setNumber(contact.number);
      setEmail(contact.email);
      setAddress(contact.address);
    }
  }, [contact]);

  const handleChange = (e, handle) => {
    const value = e.target.value;
    handle(value);
  };

  const overwriteContact = () => {
    dispatch(editContact({ id, name, number, email, address }));
    dispatch(toggleModalEdit({ isActive: false, id: null }));
  };

  return (
    <div
      className={isActive ? 'modal-edit active' : 'modal-edit'}
      onClick={() => dispatch(toggleModalEdit({ isActive: false, id: null }))}
    >
      <div className='modal-edit-content' onClick={e => e.stopPropagation()}>
        <form>
          <p>Редактировать пользователя</p>
          <div className='avatar'>
            <SvgUser width='105' height='105' />
          </div>
          <div className='input'>
            <input type='text' name='name' value={name} placeholder='Имя' onChange={e => handleChange(e, setName)} />
          </div>
          <div className='input'>
            <input
              type='text'
              name='number'
              value={number}
              placeholder='Номер'
              onChange={e => handleChange(e, setNumber)}
            />
          </div>
          <div className='input'>
            <input
              type='text'
              name='email'
              value={email}
              placeholder='Электронна почта'
              onChange={e => handleChange(e, setEmail)}
            />
          </div>
          <div className='input'>
            <input
              type='text'
              name='address'
              value={address}
              placeholder='Адрес'
              onChange={e => handleChange(e, setAddress)}
            />
          </div>
          <div className='buttons'>
            <input type='button' value='СОХРАНИТЬ' onClick={() => overwriteContact()} />
            <input type='button' value='ОТМЕНА' onClick={() => dispatch(toggleModalEdit({ isActive: false }))} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;
