import CardInfo from '../CardInfo/CardInfo';
import './CardList.css';

type Props = {
  myStyle?: React.CSSProperties
}

function CardList({ myStyle }: Props) {
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
