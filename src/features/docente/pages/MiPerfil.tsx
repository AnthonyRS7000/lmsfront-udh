import React from "react";
import "../css/MiPerfil.css";
import Card from "../../../components/pages/Card";
import ButtonPrincipal from "../../../components/pages/ButtonPrincipal";
import { ArrowRightIcon, PlayIcon, Cog6ToothIcon, AtSymbolIcon, EnvelopeIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import LogoGmail from "../../../assets/logo-gmail.png"
import LogoSoporte from "../../../assets/soporte.png"

const MiPerfil: React.FC = () => {
  const userData = {
    name: "JUAN CARLOS RIVERA ROSEL",
    phone: "962768282",
    email: "juan.rivera@udh.edu.pe",
    dni: "40149677",
  };

  return (
    <div className="mi-perfil-container">
      {/* Header */}
      <div className="mi-perfil-header">
        <img
          src="/images/profile-placeholder.png"
          alt="Foto de perfil"
          className="mi-perfil-avatar"
        />
        <div className="mi-perfil-info">
          <h2 className="mi-perfil-name">{userData.name}</h2>
          <p className="mi-perfil-phone">{userData.phone}</p>
        </div>
      </div>

      {/* Cards */}
      <div className="mi-perfil-cards">
        {/* Card de Correo */}
        <Card className="mi-perfil-card">
          <h3 className="mi-perfil-card-title">Correo</h3>
          <div className="mi-perfil-card-content">
            <img
              src={LogoGmail}
              alt="Correo"
              className="mi-perfil-card-icon"
            />
            <p className="mi-perfil-card-email">
              <EnvelopeIcon style={{ width: 20, height: 20 }} />
                {userData.email}
            </p>
            <p className="mi-perfil-card-dni">
              <IdentificationIcon style={{ width: 20, height: 20 }} />
              {userData.dni}
            </p>
            <div className="mi-perfil-card-alert">
              Aviso: Su DNI es la contraseña por defecto, deberá cambiar la contraseña bajo responsabilidad.
            </div>
          </div>
          <div className="mi-perfil-card-buttons">
            <ButtonPrincipal
              icon={<ArrowRightIcon />}
              text="Ingresar"
              onClick={() =>
                window.open(
                  "https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&hd=udh.edu.pe&sacu=1&flowName=GlifWebSignIn&flowEntry=AddSession",
                  "_blank"
                )
              }
            />
            <ButtonPrincipal
              icon={<PlayIcon />}
              text="Videotutorial"
              onClick={() =>
                window.open("https://www.youtube.com/watch?v=6a4FOB0z1xs", "_blank")
              }
            />
          </div>
        </Card>

        {/* Card de Soporte */}
        <Card className="mi-perfil-card">
          <h3 className="mi-perfil-card-title">Soporte</h3>
          <div className="mi-perfil-card-content">
            <img
              src={LogoSoporte}
              alt="Soporte"
              className="mi-perfil-card-icon"
            />
            <p className="mi-perfil-card-support-text">
              Para reportar problemas comuníquese a:
            </p>
            <p className="mi-perfil-card-support-email">
              <a href="mailto:ccomputo@udh.edu.pe">ccomputo@udh.edu.pe</a>
            </p>
          </div>
          <div className="mi-perfil-card-buttons">
            <ButtonPrincipal
              icon={<Cog6ToothIcon />}
              text="Reportar Problema"
              onClick={() => alert("Reportar Problema")}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MiPerfil;