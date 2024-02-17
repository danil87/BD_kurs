import CardList from './CardList';
import Description from './Description';
import MainImg from './MainImg';
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