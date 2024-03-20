import AuthorizationButton from '../AuthorizationButton/AuthorizationButton';
import './MainImg.css';

function MainImg() {
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
        <AuthorizationButton color="#1d7cfb" />
      </div>
      <div className='circle red' />
      <div className='circle green' />
      <div className='circle yellow' />
    </div>
  );
}

export default MainImg;
