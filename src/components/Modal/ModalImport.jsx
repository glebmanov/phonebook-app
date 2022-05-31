import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { importFile, toggleModalImport } from '../../store/contactListSlice';

import '../../styles/modal-add-edit-import.scss';

const ModalImport = () => {
  const dispatch = useDispatch();
  const isActive = useSelector(state => state.contactList.modals.import.isActive);
  const [correctFormat, setCorrectFormat] = useState(true);

  const handleChange = e => {
    if (e.target.files[0].type === 'application/json') {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = e => {
        const data = JSON.parse(e.target.result);
        dispatch(importFile(data.contacts));
      };
      e.target.value = '';
      dispatch(toggleModalImport({ isActive: false }));
      setCorrectFormat(true);
    }
    e.target.value = '';
    setCorrectFormat(false);
  };

  return (
    <div
      className={isActive ? 'modal-import active' : 'modal-import'}
      onClick={() => dispatch(toggleModalImport({ isActive: false }))}
    >
      <div className='modal-import-content' onClick={e => e.stopPropagation()}>
        {!correctFormat && <span className='warning'>Импорт только json файла</span>}
        <input id='import' type='file' onChange={e => handleChange(e)} />
      </div>
    </div>
  );
};

export default ModalImport;
