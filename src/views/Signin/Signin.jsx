import { useContext } from "react";
import { useForm } from "react-hook-form";
import AppContext from "../../Components/AppContext";
import { useNavigate } from "react-router-dom";
import DecodeJWT from "../../Services/DecodeJWT";


const decodeJWT = new DecodeJWT();

function Signin() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { email: '', password: '' }
    });

    const { setAccessToken, setUser, request, setRole } = useContext(AppContext);

    const sendForm = (data) => {

        let datac = data.email + ':' + data.password;
        let credentials = btoa(datac);
        request('/user', {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + credentials,
            },
        }).then(data => {
            setUser(data.user);
            setAccessToken(data.jwtToken);
            decodeJWT.jwtDecode(data.jwtToken);
            setRole(decodeJWT.getRole());
           
            if (decodeJWT.getRole() === "guest") {

                navigate('/profile');
            } else if (decodeJWT.getRole() === "admin") {
                navigate('/admin');
            }

            console.log(data);
        }).catch(console.log);

    }


    return (

        <form onSubmit={handleSubmit(sendForm)}>
            <input  {...register("email")} type='email' placeholder='Enter email *' />
            <input {...register('password')} type='password' placeholder='Enter password *' />
            <button>Sign in</button>
        </form>

    );

}


export default Signin;