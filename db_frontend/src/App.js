import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './page/Main/Main';
import Footer from './components/Footer/Footer';
import ClassSchedule from './page/ClassSchedule/ClassSchedule';
import SpecialistsList from './page/SpecialiststList/SpecialistsList';
import UsersReviews from './page/UsersReviews/UsersReviews';
import PersonalAccount from './page/PersonalAccount/PersonalAccount';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/schedule' element={<ClassSchedule />} />
        <Route path='/specialists' element={<SpecialistsList />} />
        <Route path='/reviews' element={<UsersReviews />} />
        <Route path='/cabinet' element={<PersonalAccount />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
