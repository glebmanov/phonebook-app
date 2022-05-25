import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, toggleModalAdd } from '../../store/contactListSlice';

import { ReactComponent as SvgUser } from '../../icons/user.svg';
import '../../styles/modal-add.scss';

const ModalAdd = () => {
  const dispatch = useDispatch();
  const isActive = useSelector(state => state.contactList.modals.add.isActive);
  const [name, setName] = useState('');
  const [nameDirty, setNameDirty] = useState('');
  const [nameError, setNameError] = useState('Поле не может быть пустым');
  const [number, setNumber] = useState('');
  const [numberDirty, setNumberDirty] = useState('');
  const [numberError, setNumberError] = useState('Поле не может быть пустым');
  const [email, setEmail] = useState('');
  const [emailDirty, setEmailDirty] = useState('');
  const [emailError, setEmailError] = useState('Поле не может быть пустым');
  const [address, setAddress] = useState('');
  const [addressDirty, setAddressDirty] = useState('');
  const [addressError, setAddressError] = useState('Поле не может быть пустым');

  const nameHandler = e => {
    setName(e.target.value);
    const re = /[а-яА-ЯёЁa-zA-Z0-9]/;
    if (!re.test(String(e.target.value))) {
      setNameError('Имя должно состоять из букв');
    } else {
      setNameError('');
    }
  };

  const numberHandler = e => {
    setNumber(e.target.value);
    const re = /^[+]?[0-9_ -]+$/;
    if (!re.test(String(e.target.value))) {
      setNumberError('Номер должен состоять из цифр');
    } else {
      setNumberError('');
    }
  };

  const emailHandler = e => {
    setEmail(e.target.value);
    const re = /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z.]{2,6})$/;
    if (!re.test(String(e.target.value))) {
      setEmailError('Некорректный email');
    } else {
      setEmailError('');
    }
  };

  const addressHandler = e => {
    setAddress(e.target.value);
    const re = /[а-яА-ЯёЁa-zA-Z0-9]/;
    if (!re.test(String(e.target.value))) {
      setAddressError('Поле не может быть пустым');
    } else {
      setAddressError('');
    }
  };

  const blurHandler = e => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'number':
        setNumberDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'address':
        setAddressDirty(true);
        break;

      default:
        break;
    }
  };

  const addUserContact = () => {
    dispatch(addContact({ name, number, email, address }));
    setName('');
    setNumber('');
    setEmail('');
    setAddress('');
    dispatch(toggleModalAdd({ isActive: false }));
  };

  const closeModalAdd = () => {
    setName('');
    setNumber('');
    setEmail('');
    setAddress('');
    dispatch(toggleModalAdd({ isActive: false }));
  };

  return (
    <div
      className={isActive ? 'modal-add active' : 'modal-add'}
      onClick={() => closeModalAdd()}
    >
      <div className='modal-add-content' onClick={e => e.stopPropagation()}>
        <form>
          <p>Добавить пользователя</p>
          <div className='avatar'>
            <SvgUser width='105' height='105' />
          </div>
          <div className='input'>
            <input
              type='text'
              name='name'
              value={name}
              placeholder='Имя'
              onChange={e => nameHandler(e)}
              onBlur={e => blurHandler(e)}
            />
          </div>
          <div className='warning'>{nameError && nameDirty && <span>{nameError}</span>}</div>
          <div className='input'>
            <input
              type='text'
              name='number'
              value={number}
              placeholder='Номер'
              onChange={e => numberHandler(e)}
              onBlur={e => blurHandler(e)}
            />
          </div>
          <div className='warning'>{numberError && numberDirty && <span>{numberError}</span>}</div>
          <div className='input'>
            <input
              type='text'
              name='email'
              value={email}
              placeholder='Электронна почта'
              onChange={e => emailHandler(e)}
              onBlur={e => blurHandler(e)}
            />
          </div>
          <div className='warning'>{emailError && emailDirty && <span>{emailError}</span>}</div>
          <div className='input'>
            <input
              type='text'
              name='address'
              value={address}
              placeholder='Адрес'
              onChange={e => addressHandler(e)}
              onBlur={e => blurHandler(e)}
            />
          </div>
          <div className='warning'>{addressError && addressDirty && <span>{addressError}</span>}</div>
          <div className='buttons'>
            <input type='button' value='СОХРАНИТЬ' onClick={() => addUserContact()} />
            <input type='button' value='ОТМЕНА' onClick={() => closeModalAdd()} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAdd;
