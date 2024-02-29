import CardInfo from "../CardInfo/CardInfo";
import './CardList.css'


function CardList() {
    return (
        <div className="CardList">
            <div className="CardList__content"><CardInfo />
                <CardInfo />
                <CardInfo />
                <CardInfo />
                <CardInfo />
                <CardInfo />
            </div>
        </div>
    )
}

export default CardList;