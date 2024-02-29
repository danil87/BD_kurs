import AuthorizationButton from '../AuthorizationButton/AuthorizationButton';
import { createTheme, alpha, getContrastRatio } from '@mui/material';
import './MainImg.css'

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff"
        },
        secondary: {
            main: "#fff",
            light: alpha('#fff', 0.5),
            dark: alpha('#fff', 0.9),
            contrastText: getContrastRatio('#fff', '#fff') > 4.5 ? '#fff' : '#111',
        }
    }
  })

function MainImg() {
    return (
        <div className="MainImg">
            <img className="MainImg_img" src="https://mp6.siedlce.pl/wp/wp-content/uploads/2021/03/baner2.jpg" alt="d" />
            <div className='MainImg__description circle blue'>
                <h2>Радуга - мир развития и веселья!</h2>
                <p className='MainImg__Text1'>
                Текст раздела 1 Текст раздела 1 Текст раздела 1 Текст раздела 1 Текст раздела 1 Текст раздела 1 Текст раздела 1 Текст раздела 1 Текст раздела 1 
                </p>
                <AuthorizationButton theme={theme} color="#1d7cfb" />
            </div>
            <div className='circle red' />
            <div className='circle green' />
            <div className='circle yellow' />
        </div>
    )
}

export default MainImg;