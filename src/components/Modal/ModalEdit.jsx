import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalEdit, editContact } from '../../store/contactListSlice';

import ModalForm from './ModalForm';

import { ReactComponent as SvgUser } from '../../icons/user.svg';
import '../../styles/modal-add-edit-import.scss';

const ModalEdit = () => {
  const dispatch = useDispatch();
  const isActive = useSelector(state => state.contactList.modals.edit.isActive);
  const contacts = useSelector(state => state.contactList.contacts);
  const id = useSelector(state => state.contactList.modals.edit.id);
  const contact = contacts.find(contact => contact.id === id);

  return (
    <div
      className={isActive ? 'modal-edit active' : 'modal-edit'}
      onClick={() => dispatch(toggleModalEdit({ isActive: false, id: null }))}
    >
      <div className='modal-edit-content' onClick={e => e.stopPropagation()}>
        <p>Редактировать пользователя</p>
        <div className='avatar'>
          <SvgUser width='105' height='105' />
        </div>
        <ModalForm
          contact={contact}
          handlerSubmit={editContact}
          toggleModal={toggleModalEdit}
          togglePayload={{ isActive: false, id: null }}
        />
      </div>
    </div>
  );
};

export default ModalEdit;
