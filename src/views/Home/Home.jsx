import { Link } from "react-router-dom";
export default function Home() {

    return (
        <dl>
            <Link to="/signup"><dt>Signup</dt></Link>
            <Link to="/signin"><dt>Sign in</dt></Link>
            <Link to="/profile"><dt>profile</dt></Link>
        </dl>


    );

}