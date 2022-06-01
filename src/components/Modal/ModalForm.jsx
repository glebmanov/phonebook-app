import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const ModalForm = ({ contact, handlerSubmit, toggleModal, togglePayload }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, submitCount },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  if (contact && submitCount <= 1) {
    setValue('name', contact?.name);
    setValue('number', contact?.number);
    setValue('email', contact?.email);
    setValue('address', contact?.address);
  }

  const onSubmit = data => {
    if (contact) {
      dispatch(handlerSubmit({ ...data, id: contact.id }));
    } else {
      dispatch(handlerSubmit(data));
    }
    reset();
    dispatch(toggleModal({ isActive: false }));
  };

  const closeModal = () => {
    dispatch(toggleModal(togglePayload));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name', {
          required: 'Поле обязательно к заполнению',
          pattern: /[а-яА-ЯёЁa-zA-Z0-9]/,
        })}
        placeholder='Имя'
      />
      <div className='warning'>{errors?.name && <span>{errors?.name?.message}</span>}</div>
      <input
        {...register('number', {
          required: 'Поле обязательно к заполнению',
          pattern: {
            value: /^[+]?[0-9_ -]+$/,
            message: 'Номер должен состоять из цифр',
          },
        })}
        placeholder='Номер'
      />
      <div className='warning'>{errors?.number && <span>{errors?.number?.message}</span>}</div>
      <input
        {...register('email', {
          required: 'Поле обязательно к заполнению',
          pattern: {
            value: /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z.]{2,6})$/,
            message: 'Некорректный email',
          },
        })}
        placeholder='Электронная почта'
      />
      <div className='warning'>{errors?.email && <span>{errors?.email?.message}</span>}</div>
      <input
        {...register('address', {
          required: 'Поле обязательно к заполнению',
          pattern: {
            value: /[а-яА-ЯёЁa-zA-Z0-9]/,
            message: 'Поле не может быть пустым',
          },
        })}
        placeholder='Адрес'
      />
      <div className='warning'>{errors?.address && <span>{errors?.address?.message}</span>}</div>
      <div className='buttons'>
        <button type='submit'>СОХРАНИТЬ</button>
        <button type='button' onClick={() => closeModal()}>
          ОТМЕНА
        </button>
      </div>
    </form>
  );
};

export default ModalForm;
