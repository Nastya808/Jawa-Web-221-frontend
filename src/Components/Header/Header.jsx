import { Link } from "react-router-dom";
import { useContext} from "react";
import AppContext from "../AppContext";
import Cart from "../Cart/Cart";

const Header = () => {
    const { user,cart } = useContext(AppContext);

    return (
        <header className="boxShadow" >
            <div className='header-logo'>

                Shop

            </div>

            <div className='user-info'>
                <span className="user-name">
                    Hello, {user?user.name:"You need to login or registration"}.
                </span>

                <Cart />
            </div>

            <div className='header-menu'>
                <Link to="/signup">Sign Up</Link>
                <Link to="/signin">Sign In</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/admin">Admin</Link>
            </div>
        </header>
    );
}

export default Header;