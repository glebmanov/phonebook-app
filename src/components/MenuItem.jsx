import React from 'react';

import { ReactComponent as SvgAddUser } from '../icons/adduser.svg';
import { ReactComponent as SvgImport } from '../icons/import.svg';
import { ReactComponent as SvgExport } from '../icons/export.svg';
import { ReactComponent as SvgEdit } from '../icons/edit.svg';

const MenuItem = ({ name, onClick, text }) => {
  const getItem = value => {
    switch (value) {
      case 'add':
        return <SvgAddUser />;
      case 'import':
        return <SvgImport />;
      case 'export':
        return <SvgExport />;
      case 'edit':
        return <SvgEdit />;
      default:
        return null;
    }
  };

  return (
    <div className='menu-item' onClick={() => onClick()}>
      <div className='inner-item'>
        {getItem(name)}
        <span>{text}</span>
      </div>
    </div>
  );
};

export default MenuItem;
