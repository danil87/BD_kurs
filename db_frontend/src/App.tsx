import { Route, Routes } from 'react-router-dom';
import {
  Box,
  ThemeProvider
} from '@mui/material';
import Header from './components/Header/Header';
import Main from './page/Main/Main';
import Footer from './components/Footer/Footer';
import ClassSchedule from './page/ClassSchedule/ClassSchedule';
import SpecialistsList from './page/SpecialiststList/SpecialistsList';
import UsersReviews from './page/UsersReviews/UsersReviews';
import PersonalAccount from './page/PersonalAccount/PersonalAccount';
import './App.css';
import { secondaryTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={secondaryTheme}>
      <Box className="App">
        <Header />
        <Box sx={{ marginTop: '82px' }}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/schedule' element={<ClassSchedule />} />
            <Route path='/specialists' element={<SpecialistsList />} />
            <Route path='/reviews' element={<UsersReviews />} />
            <Route path='/cabinet' element={<PersonalAccount />} >
              <Route path='child' />
              <Route path='record' />
            </Route>
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider >
  );
}

export default App;
