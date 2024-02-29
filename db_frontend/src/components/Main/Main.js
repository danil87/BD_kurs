import CardList from '../CardList/CardList';
import Description from '../Description/Description';
import MainImg from '../MainImg/MainImg';
import './Main.css'

function Main() {
    return (
        <main className="Main">
            <MainImg />
            <CardList />
            <Description />
        </main>
    )
}

export default Main;