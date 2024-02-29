import CardList from "../CardList/CardList";
import './SpecialistsList.css'

function SpecialistsList() {
    return (
        <div className="SpecialistsList">
            <CardList myStyle={{backgroundColor: '#fff', height: '100%'}} />
        </div>
    )
}

export default SpecialistsList;