import { useFieldArray, useForm } from "react-hook-form";
import './App.css';

function App() {
  const { register, handleSubmit, control, formState: { errors }, watch } = useForm({
    defaultValues: { 
      name: '', dob: '', email: '', login: '', password: '', confirmPassword: '', city: '',
      extraEmails: [], phones: []
    }
  });

  const { fields: emailFields, append: appendEmail, remove: removeEmail } = useFieldArray({
    control, name: "extraEmails"
  });

  const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
    control, name: "phones"
  });

  const sendForm = (data) => {
    fetch("http://localhost:8080/Java_Web/home", { 
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(r => r.json())
    .then(j => console.log(j));
  };

  return (
    <form id='formRegistration' className="form-container" onSubmit={handleSubmit(sendForm)}>
      <h2>Register</h2>

      <input {...register("name", { required: "Name required" })} placeholder='Name *' />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register("dob", { required: "Date of birth required" })} type='date' placeholder='DOB *' />
      {errors.dob && <span>{errors.dob.message}</span>}

      <input {...register("city", { required: "City required" })} placeholder="City *" />
      {errors.city && <span>{errors.city.message}</span>}

      <input {...register("email", { required: "Email required" })} type='email' placeholder='Email *' />
      {errors.email && <span>{errors.email.message}</span>}

      <div>
        <label>Additional Emails:</label>
        {emailFields.map((item, index) => (
          <div key={item.id}>
            <input {...register(`extraEmails.${index}`)} placeholder="Extra Email" />
            <button type="button" onClick={() => removeEmail(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => appendEmail('')}>Add Email</button>
      </div>

      <div>
        <label>Phones:</label>
        {phoneFields.map((item, index) => (
          <div key={item.id}>
            <input {...register(`phones.${index}`)} placeholder="Phone" />
            <button type="button" onClick={() => removePhone(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => appendPhone('')}>Add Phone</button>
      </div>

      <input {...register("login", { required: "Login required" })} placeholder='Login *' />
      {errors.login && <span>{errors.login.message}</span>}

      <input {...register('password', { required: "Password required" })} type='password' placeholder='Password *' />
      {errors.password && <span>{errors.password.message}</span>}

      <input {...register('confirmPassword', { 
        required: "Confirm password required", 
        validate: value => value === watch('password') || "Passwords do not match"
      })} type='password' placeholder='Repeat password *' />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

      <button type="submit">Register</button>
    </form>
  );
}

export default App;
