import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalMenu, toggleModalAdd, toggleModalImport } from '../../store/contactListSlice';

import MenuItem from '../MenuItem';
import { saveAs } from 'file-saver';
import '../../styles/modal-menu.scss';

const ModalMenu = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contactList.contacts);
  const isActive = useSelector(state => state.contactList.modals.menu.isActive);

  const closeModalAdd = () => dispatch(toggleModalMenu({ isActive: false }));

  const handleExport = () => {
    const file = new Blob([JSON.stringify(contacts, null, 2)], {
      type: 'application/json;charset=' + document.characterSet,
    });
    saveAs(file, 'contacts.json');
  };

  return (
    <div className={isActive ? 'modal-menu active' : 'modal-menu'} onClick={() => closeModalAdd()}>
      <div className='modal-menu-content' onClick={e => e.stopPropagation()}>
        <MenuItem
          name={'add'}
          text={'Добавить пользователя'}
          onClick={() => {
            dispatch(toggleModalAdd({ isActive: true }));
            dispatch(toggleModalMenu({ isActive: false }));
          }}
        ></MenuItem>
        <MenuItem
          name={'export'}
          text={'Экспортировать контакты'}
          onClick={() => {
            handleExport();
            dispatch(toggleModalMenu({ isActive: false }));
          }}
        ></MenuItem>
        <MenuItem
          name={'edit'}
          text={'Редактировать список'}
          onClick={() => dispatch(toggleModalMenu({ isActive: false }))}
        ></MenuItem>
        <MenuItem
          name={'import'}
          text={'Импортировать контакты'}
          onClick={() => {
            dispatch(toggleModalImport({ isActive: true }));
            dispatch(toggleModalMenu({ isActive: false }));
          }}
        ></MenuItem>
        <div className='circle'></div>
      </div>
    </div>
  );
};

export default ModalMenu;
