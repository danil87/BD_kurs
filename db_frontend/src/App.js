import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import ClassSchedule from './components/ClassSchedule/ClassSchedule';
import SpecialistsList from './components/SpecialiststList/SpecialistsList';
import UsersReviews from './components/UsersReviews/UsersReviews';
import PersonalAccount from './components/PersonalAccount/PersonalAccount';
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
