import { useFieldArray, useForm } from "react-hook-form";
import './App.css';

function App() {
  const { register, handleSubmit, control, formState: { errors }, watch } = useForm({
    defaultValues: { 
      name: '', 
      dob: '', 
      email: '', 
      login: '', 
      password: '', 
      confirmPassword: '', 
      city: '',
      extraEmail: [] 
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "extraEmail"
  });

  const sendForm = (data) => {
    fetch("http://localhost:8080/Java_Web/home", { 
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(r => r.json())
    .then(j => console.log(j));
  }

  return (
    <form id='formRegistration' className="form-container" onSubmit={handleSubmit(sendForm)}>
      <h2>Register</h2>

      <div className="input-group">
        <input {...register("name", { 
          required: "Name required", 
          pattern: { value: /^[a-zA-Z]{5,20}$/, message: "Only letters, min 5, max 20" }
        })} type="text" placeholder='Enter name *' />
        {errors.name && <span className="error-text">{errors.name.message}</span>}
      </div>

      <div className="input-group">
        <input {...register('dob', { required: "Date of birth required" })} type='date' placeholder='Enter date of birth *' />
        {errors.dob && <span className="error-text">{errors.dob.message}</span>}
      </div>

      <div className="input-group">
        <input {...register("city", { 
          required: "City required", 
          pattern: { value: /^[A-ZА-Я][a-zа-я\s-]{1,30}$/, message: "First letter uppercase, min 2" }
        })} type="text" placeholder="Enter city" />
        {errors.city && <span className="error-text">{errors.city.message}</span>}
      </div>

      <div className="input-group">
        <input {...register("email", { 
          required: "Email required", 
          pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "example@domain.com" }
        })} type='email' placeholder='Enter email *' />
        {errors.email && <span className="error-text">{errors.email.message}</span>}
      </div>


      <div className="input-group">
        <input {...register("login", { 
          required: "Login required", 
          pattern: { value: /^[a-zA-Z0-9._%+-]{5,20}$/, message: "Letters, numbers, (. _ % + -), min 5 max 20" }
        })} type='text' placeholder='Enter Login *' />
        {errors.login && <span className="error-text">{errors.login.message}</span>}
      </div>

      <div className="input-group">
        <input {...register('password', { 
          required: "Password required", 
          pattern: { value: /^[a-zA-Z0-9._%+-]{5,20}$/, message: "Letters, numbers, (. _ % + -), min 5 max 20" }
        })} type='password' placeholder='Enter password *' />
        {errors.password && <span className="error-text">{errors.password.message}</span>}
      </div>

      <div className="input-group">
        <input {...register('confirmPassword', { 
          required: "Confirm password required", 
          validate: (value) => value === watch('password') || "Passwords do not match"
        })} type='password' placeholder='Repeat password *' />
        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword.message}</span>}
      </div>

      <button type="submit" className="btn-submit">Register</button>
    </form>
  );
}

export default App;
