import React from 'react';

import Header from './components/Header';
import Table from './components/Table';
import ModalMenu from './components/Modal/ModalMenu';
import ModalAdd from './components/Modal/ModalAdd';
import ModalEdit from './components/Modal/ModalEdit';
import ModalImport from './components/Modal/ModalImport';

import './styles/app.scss';

function App() {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <Table />
      </div>
      <ModalMenu />
      <ModalAdd />
      <ModalEdit />
      <ModalImport />
    </div>
  );
}

export default App;
