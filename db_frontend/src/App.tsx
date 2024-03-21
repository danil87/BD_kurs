import { Route, Routes } from 'react-router-dom';
import {
  Box,
  ThemeProvider
} from '@mui/material';
import Header from './components/Header/Header';
import Main from './page/Main/Main';
import Footer from './components/Footer/Footer';
import ClassSchedule from './page/ClassSchedule/ClassSchedule';
import UsersReviews from './page/UsersReviews/UsersReviews';
import PersonalAccount from './page/PersonalAccount/PersonalAccount';
import './App.css';
import { mainTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Box className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/schedule' element={<ClassSchedule />} />
          <Route path='/reviews' element={<UsersReviews />} />
          <Route path='/cabinet' element={<PersonalAccount />} />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider >
  );
}

export default App;
