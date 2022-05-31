import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, toggleModalAdd } from '../../store/contactListSlice';

import ModalForm from './ModalForm';

import { ReactComponent as SvgUser } from '../../icons/user.svg';
import '../../styles/modal-add-edit-import.scss';

const ModalAdd = () => {
  const dispatch = useDispatch();
  const isActive = useSelector(state => state.contactList.modals.add.isActive);

  return (
    <div
      className={isActive ? 'modal-add active' : 'modal-add'}
      onClick={() => dispatch(toggleModalAdd({ isActive: false }))}
    >
      <div className='modal-add-content' onClick={e => e.stopPropagation()}>
        <p>Добавить пользователя</p>
        <div className='avatar'>
          <SvgUser width='105' height='105' />
        </div>
        <ModalForm handlerSubmit={addContact} toggleModal={toggleModalAdd} togglePayload={{ isActive: false }} />
      </div>
    </div>
  );
};

export default ModalAdd;
