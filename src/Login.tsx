import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./login.css";
import udh_img from "./assets/1.jpg";
import udh_img2 from "./assets/3.jpg";
import udh_img3 from "./assets/4.jpg";
import udh_logo from "./assets/logo.png";
import {
  MoonIcon as MoonIconSolid,
  SunIcon as SunIconSolid,
} from "@heroicons/react/24/solid";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const images = [udh_img2, udh_img, udh_img3];
  const [currentImg, setCurrentImg] = useState(0);
  const [sliding, setSliding] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setSliding(true);
      setTimeout(() => {
        setCurrentImg((prev) => (prev + 1) % images.length);
        setSliding(false);
      }, 800);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImg = (currentImg + 1) % images.length;

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const state = btoa(
      JSON.stringify({
        timestamp: Date.now(),
        origin: window.location.origin,
      })
    );

    window.open(
      `${API_URL}/auth/google?state=${encodeURIComponent(state)}`,
      "GoogleAuth",
      `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars=yes,status=1`
    );
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://lmsback.sistemasudh.com",
      ];

      if (!allowedOrigins.includes(event.origin)) {
        console.warn("Origen no permitido:", event.origin);
        return;
      }

      if (!event.data || typeof event.data !== "object") return;

      if (event.data.type === "google-auth-error") {
        alert("Error en la autenticación: " + (event.data.message || "Error desconocido"));
        return;
      }

      if (event.data.type === "google-auth-success") {
        const { token, usuario, datos_udh, foto, state } = event.data;

        if (!token || !usuario || !usuario.rol || !datos_udh) {
          alert("Datos de autenticación incompletos");
          return;
        }

        if (state) {
          try {
            const decodedState = JSON.parse(atob(state));
            const timeDiff = Date.now() - decodedState.timestamp;
            if (timeDiff > 5 * 60 * 1000) {
              alert("Sesión expirada, intenta nuevamente");
              return;
            }
          } catch (e) {
            console.warn("State inválido");
          }
        }

        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        localStorage.setItem("datos_udh", JSON.stringify(datos_udh));
        localStorage.setItem("foto", foto);
        localStorage.setItem("rol", usuario.rol);

        console.log("Guardado en localStorage:", {
          token,
          rol: usuario.rol,
          usuario,
        });

        login(token, usuario.rol);

        switch (usuario.rol?.toLowerCase()) {
          case "estudiante":
            navigate("/estudiante");
            break;
          case "docente":
            navigate("/docente");
            break;
          case "admin":
            navigate("/admin");
            break;
          default:
            navigate("/");
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [login, navigate]);

  return (
    <div className={`login-row-container${darkMode ? " dark" : ""}`}>
      {/* Columna imagen */}
      <div className="login-col-img">
        <div className={`login-logo-container${darkMode ? " dark" : ""}`}>
          <img src={udh_logo} alt="Logo_light" className="login-logo-img" />
        </div>
        <div className="login-bg-img">
          <div className="carousel-slide">
            <img
              src={images[currentImg]}
              alt={`Campus universitario ${currentImg + 1}`}
              className={`login-bg-img-real${darkMode ? " grayscale" : ""} slide-img`}
              style={{ left: 0, zIndex: 1 }}
            />
            {sliding && (
              <img
                src={images[nextImg]}
                alt={`Campus universitario ${nextImg + 1}`}
                className={`login-bg-img-real${darkMode ? " grayscale" : ""} slide-img`}
                style={{
                  left: sliding ? "-100%" : "0",
                  zIndex: 2,
                  animation: sliding ? "slideRight 0.8s forwards" : "none",
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Columna card */}
      <div className="login-col-card">
        <div className={`login-card${darkMode ? " dark" : ""}`}>
          <div className="login-card-borders">
            <div className="login-card-content">
              <h2 className="login-title">Iniciar sesión</h2>
              <p className="login-subtitle">
                Tu correo debe terminar en{" "}
                <span className="login-domain">@udh.edu.pe</span>
              </p>
              <button className="login-google-btn" onClick={handleGoogleLogin}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="login-google-icon"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                <span className="login-google-text">Acceder con Google</span>
              </button>
              <p className="login-help">
                ¿Necesitas ayuda?{" "}
                <a href="#" className="login-help-link">
                  Mira esta guía.
                </a>
              </p>
            </div>
            <div className="login-corner top-left"></div>
            <div className="login-corner bottom-right"></div>
          </div>
        </div>
        <button
          className="login-darkmode-btn-screen"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {darkMode ? (
            <SunIconSolid style={{ width: 24, height: 24 }} />
          ) : (
            <MoonIconSolid style={{ width: 24, height: 24 }} />
          )}
        </button>
      </div>
    </div>
  );
}

export default Login;
