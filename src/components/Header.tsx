import { useDispatch } from 'react-redux';
import logo from '../assets/logo.jpeg';
import '../sass/components/header.component.scss';

const Header = () => {

    const dispatch = useDispatch();

    const logout = () => {
        console.log('logout')
        dispatch({
            type: 'SET_USER',
            payload: null
        })
    }

    return (
        <header>
            <nav>
                <img src={logo} alt="logo" height='50px' />
                <i onClick={(e) => {e.preventDefault();logout()}} className="fa fa-sign-out"></i>
            </nav>
        </header>
    );
};

export default Header;