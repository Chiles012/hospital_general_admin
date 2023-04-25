import { useDispatch } from 'react-redux';
import '../sass/components/header.component.scss';

const Header = () => {

    const dispatch = useDispatch();

    const logout = () => {
        dispatch({
            type: 'SET_USER',
            payload: null
        })
    }

    return (
        <header>
            <nav>
                <h1>Logo</h1>
                <i onClick={(e) => {e.preventDefault();logout()}} className="fa fa-sign-out"></i>
            </nav>
        </header>
    );
};

export default Header;