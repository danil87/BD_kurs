import CardInfo from '../CardInfo/CardInfo';
import './CardList.css';

function CardList({ myStyle }) {
  return (
        <div className="CardList" style={myStyle}>
            <div className="CardList__content"><CardInfo />
                <CardInfo />
                <CardInfo />
                <CardInfo />
                <CardInfo />
                <CardInfo />
            </div>
        </div>
  );
}

export default CardList;
