import CardList from './CardList';
import Description from './Description';
import './Main.css'

function Main() {
    return (
        <main className="Main">
            <img className="Main_img" src="https://mp6.siedlce.pl/wp/wp-content/uploads/2021/03/baner2.jpg" alt="d" />
            <CardList />
            <Description />
        </main>
    )
}

export default Main;