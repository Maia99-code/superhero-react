import { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [superheroes, setSuperheroes] = useState([]);
  const [header, setHeader] = useState("Registro de Superhéroes");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (formData.name.length < 4)
      newErrors.name = "El nombre debe tener al menos 4 caracteres";
    if (formData.lastName.length < 4)
      newErrors.lastName = "El apellido debe tener al menos 4 caracteres";
    if (formData.email.length < 10)
      newErrors.email = "El correo electrónico es muy corto";
    if (formData.password.length < 12)
      newErrors.password = "La contraseña debe tener al menos 12 caracteres";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuperheroes([...superheroes, formData]);
      setFormData({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setHeader("Super-héroes Registrados");
    }
  };

  return (
    <div className="App">
      <h1>{header}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit">Crear Superhéroe</button>
      </form>

      <div className="superheroes-list">
        {superheroes.map((hero, index) => (
          <div key={index} className="superhero">
            <h3>
              {hero.name} {hero.lastName}
            </h3>
            <p>Email: {hero.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
