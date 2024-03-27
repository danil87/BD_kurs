import './MainImg.css';

const MainImg = () => (
  <div className="MainImg">
    <img className="MainImg_img" src="https://mp6.siedlce.pl/wp/wp-content/uploads/2021/03/baner2.jpg" alt="d" />
    <div className='MainImg__description circle blue'>
      <h2>Радуга - мир развития и веселья!</h2>
      <h3 className='MainImg__Text1'>
        Это место, где ваши дети могут весело и с пользой провести время.
        Мы предлагаем разнообразные занятия и игры, которые помогут развить их таланты и умения.
        Наши опытные педагоги и аниматоры всегда готовы помочь детям в их занятиях и играх,
        а также создать дружелюбную и безопасную атмосферу.
      </h3>
    </div>
    <div className='circle red' />
    <div className='circle green' />
    <div className='circle yellow' />
  </div>
);

export default MainImg;
