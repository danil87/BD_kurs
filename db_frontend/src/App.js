import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import ClassSchedule from './components/ClassSchedule/ClassSchedule';
import SpecialistsList from './components/SpecialiststList/SpecialistsList';
import './App.css';
import UsersReviews from './components/UsersReviews/UsersReviews';
import AboutUs from './components/AboutUs/AboutUs';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/schedule' element={<ClassSchedule />} />
        <Route path='/specialists' element={<SpecialistsList />} />
        <Route path='/reviews' element={<UsersReviews />} />
        {/* <Route path='/aboutUs' element={<AboutUs />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
