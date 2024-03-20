import CardList from '../../components/CardList/CardList';
import Description from '../../components/Description/Description';
import MainImg from '../../components/MainImg/MainImg';
import './Main.css';

function Main() {
  return (
    <main className="Main">
      <MainImg />
      <CardList />
      <Description />
    </main>
  );
}

export default Main;
