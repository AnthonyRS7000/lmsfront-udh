import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import udh_img from './assets/1.jpg';
import udh_img1 from './assets/2.jpg';
import udh_img2 from './assets/3.jpg';
import udh_logo from './assets/logo.png';
import { ArrowPathIcon, ArrowRightEndOnRectangleIcon, IdentificationIcon, KeyIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { MoonIcon as MoonIconSolid, SunIcon as SunIconSolid } from '@heroicons/react/24/solid';

function Login() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const images = [udh_img, udh_img1, udh_img2]; // Array de imágenes
  const [currentImg, setCurrentImg] = useState(0);
  const [sliding, setSliding] = useState(false);
  
  // Estado del formulario
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [dni, setDni] = useState('12345678');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaResult, setCaptchaResult] = useState<number | null>(null);


  // Validación de errores
  const [errorUsuario, setErrorUsuario] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorDni, setErrorDni] = useState('');
  const [errorCaptcha, setErrorCaptcha] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion(`${a} + ${b}`);
    setCaptchaResult(a + b);
    setCaptchaAnswer('');
  };  

  
  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setSliding(true);
      setTimeout(() => {
        setCurrentImg((prev) => (prev + 1) % images.length);
        setSliding(false);
      }, 800); // Duración de la animación
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImg = (currentImg + 1) % images.length;

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    setErrorUsuario('');
    setErrorPassword('');
    setErrorDni('');
    setErrorCaptcha('');

    if (!usuario) {
      setErrorUsuario('El usuario es obligatorio');
      hasError = true;
    }
    if (!password) {
      setErrorPassword('La contraseña es obligatoria');
      hasError = true;
    }
    if (!dni || dni.length !== 8) {
      setErrorDni('El DNI debe tener 8 dígitos');
      hasError = true;
    }
    if (parseInt(captchaAnswer) !== captchaResult) {
      setErrorCaptcha('Captcha incorrecto');
      hasError = true;
      generateCaptcha();
    }

    if (hasError) {
      generateCaptcha();
      return;
    }

    // Si llegas aquí, todo está validado
    if (usuario === "1" && password === "1") {
      navigate("/administrativo");
    } else if (usuario === "2" && password === "2") {
      navigate("/estudiate");
    } else if (usuario === "3" && password === "3") {
      navigate("/docente");
    } else if (usuario === "4" && password === "4") {
      navigate("/escuela");
    } else if (usuario === "5" && password === "5") {
      navigate("/facultad");
    } else {
      /*
      if (usuario === "1" && password !== "1") {
        setErrorPassword('Contraseña incorrecta');
        hasError = true;
      }
      if (usuario === "1" && dni !== "1") {
        setErrorDni('DNI incorrecto');
        hasError = true;
      }
      
      if (hasError) return;
      */
      
      alert('Usuario o contraseña incorrectos');
    }
    generateCaptcha();
  };

  return (
    <div className={`login-row-container${darkMode ? ' dark' : ''}`}>
      {/* Columna imagen */}
      <div className="login-col-img">
        <div className={`login-logo-container${darkMode ? ' dark' : ''}`}>
          <img src={udh_logo} alt="Logo_light" className="login-logo-img" />
        </div>
        <div className="login-bg-img">
          <div className="carousel-slide">
            {/* Imagen actual, siempre fija */}
            <img
              src={images[currentImg]}
              alt={`Campus universitario ${currentImg + 1}`}
              className={`login-bg-img-real${darkMode ? ' grayscale' : ''} slide-img`}
              style={{ left: 0, zIndex: 1 }}
            />
            {/* Imagen siguiente, solo aparece cuando sliding es true */}
            {sliding && (
              <img
                src={images[nextImg]}
                alt={`Campus universitario ${nextImg + 1}`}
                className={`login-bg-img-real${darkMode ? ' grayscale' : ''} slide-img `}
                style={{ left: sliding ? '-100%' : '0',
                  zIndex: 2,
                  animation: sliding ? 'slideRight 0.8s forwards' : 'none'}}
              />
            )}
          </div>
        </div>
      </div>
      {/* Columna card */}
      <div className="login-col-card">
        <div className={`login-card${darkMode ? ' dark' : ''}`}>
          <div className="login-card-borders">
            <div className="login-card-content">
              <h2 className="login-title">
                Iniciar sesión
              </h2>
              
              <form onSubmit={handleSubmit} className="login-form" method='post'>
                <div className="login-input-container">
                  <UserIcon className="login-input-icon" />
                  <input
                    type="text"
                    placeholder="Usuario UDH"
                    className="login-input"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
                {errorUsuario && <div className="login-error">{errorUsuario}</div>}
                
                <div className="login-input-container">
                  <LockClosedIcon  className="login-input-icon" />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errorPassword && <div className="login-error">{errorPassword}</div>}

                <div className="login-input-container">
                  <IdentificationIcon className="login-input-icon" />
                  <input
                    type="text"
                    placeholder="DNI"
                    className="login-input"
                    value={dni}
                    onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))} // solo números
                    maxLength={8}
                  />
                </div>
                {errorDni && <div className="login-error">{errorDni}</div>}
                
                <div className="login-captcha">
                  <label style={{ marginTop: 12, textAlign: 'center', fontSize: '1.5rem', color: '#374151' }}>{captchaQuestion} = ?</label>
                  <div className="login-captcha-group">
                    <div className="login-input-container">
                      <KeyIcon className="login-input-icon" />
                      <input
                        type="text"
                        placeholder="Respuesta"
                        className="login-input"
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                    <button type="button" onClick={generateCaptcha} className="login-captcha-refresh" >
                      <ArrowPathIcon style={{ width: 20, height: 20 }} />
                    </button>
                  </div>
                  {errorCaptcha && <div className="login-error">{errorCaptcha}</div>}

                </div>
                <button type="submit" className="login-submit-btn">
                  <ArrowRightEndOnRectangleIcon  style={{ position: "relative",width: 24, height: 24, marginRight: 8 }} />
                  Acceder
                </button>
              </form>
              {/*
              <p className="login-subtitle">
                Tu correo debe terminar en{" "}
                <span className="login-domain">@udh.edu.pe</span>
              </p>
              <button className="login-google-btn" onClick={handleGoogleLogin}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="login-google-icon"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                <span className="login-google-text">
                  Acceder con Google
                </span>
              </button>
              <p className="login-help">
                ¿Necesitas ayuda?{" "}
                <a href="#" className="login-help-link">Mira esta guía.</a>
              </p>*/}
            </div>
            {/* Bordes decorativos */}
            <div className="login-corner top-left"></div>
            <div className="login-corner bottom-right"></div>
          </div>
        </div>
        {/* Botón modo oscuro en la pantalla */}
        <button className="login-darkmode-btn-screen" onClick={() => setDarkMode(!darkMode)} title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}>
          {darkMode ? (
            // Icono de sol (modo claro)
            <SunIconSolid style={{ width: 24, height: 24 }} />
          ) : (
            // Icono de luna (modo oscuro)
            <MoonIconSolid style={{ width: 24, height: 24 }} />

          )}
        </button>
      </div>
    </div>
  )
}

export default Login
