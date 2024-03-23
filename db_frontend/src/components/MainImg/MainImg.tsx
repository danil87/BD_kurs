import { useState } from 'react';
import AuthorizationButton from '../AuthorizationButton/AuthorizationButton';
import LoginFrom from '../LoginForm/LoginForm';
import './MainImg.css';
import initStateLogin from '../../context';
import ModalCard from '../ModalCard/ModalCard';
import authApi from '../../services/AuthService';

function MainImg() {
  const [openLogin, setOpenLogin] = useState(false);
  const [userForLogin, setUser] = useState(initStateLogin);
  const [login, { isSuccess, isError }] = authApi.useLoginMutation();

  const changeUser = (key: string, value: string) => {
    setUser({ ...userForLogin, [key]: value });
  };

  const submit = () => {
    login(userForLogin);
  };

  return (
    <div className="MainImg">
      <img className="MainImg_img" src="https://mp6.siedlce.pl/wp/wp-content/uploads/2021/03/baner2.jpg" alt="d" />
      <div className='MainImg__description circle blue'>
        <h2>Радуга - мир развития и веселья!</h2>
        <p className='MainImg__Text1'>
          Текст раздела 1 Текст раздела 1 Текст раздела 1
          Текст раздела 1 Текст раздела 1 Текст раздела 1
          Текст раздела 1 Текст раздела 1 Текст раздела 1
        </p>
        <AuthorizationButton color="#1d7cfb" openLogin={() => { setOpenLogin(true); }} />
      </div>
      <div className='circle red' />
      <div className='circle green' />
      <div className='circle yellow' />
      <ModalCard
        title='Вход'
        titleButton='Войти'
        isSuccess={isSuccess}
        isError={isError}
        submit={submit}
        open={openLogin} close={() => setOpenLogin(false)}>
        <LoginFrom userForLogin={userForLogin} changeUser={changeUser} />
      </ModalCard>
    </div>
  );
}

export default MainImg;
