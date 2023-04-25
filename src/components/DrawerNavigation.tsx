import { Link } from 'react-router-dom'
import '../sass/components/drawer.component.scss'
import { navigation } from '../utils/routes'

const DrwaerNavigation = () => {
    return (
        <div className="drawer">
            {
                navigation.map((nav, index) => (
                    <div key={index} className="drawer__item">
                        <i className={nav.icon}></i> <Link to={nav.path}>{nav.name}</Link>
                    </div>
                ))
            }
        </div>
    )

}

export default DrwaerNavigation