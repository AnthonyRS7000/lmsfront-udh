import React from "react";
import "../css/CarpetasDigitales.css";
import ButtonPrincipal from "../../../components/pages/ButtonPrincipal";
import { ArrowTopRightOnSquareIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import Card from "../../../components/pages/Card";

const CarpetasDigitales: React.FC = () => {
    return (
        <div className="carpetas-digitales-container">
            <Card className="carpetas-digitales-card">
                {/* Header */}
                <div className="carpetas-digitales-header">
                <div>
                    <h1 className="carpetas-digitales-title">Carpetas Digitales</h1>
                    <p className="carpetas-digitales-subtitle">
                    Accede a tu repositorio de documentos y archivos importantes de la universidad.
                    </p>
                </div>
                <ButtonPrincipal
                    icon={<ArrowTopRightOnSquareIcon />}
                    text="Ver los Documentos"
                    onClick={() =>
                    window.open("http://www.udh.edu.pe/websauh/CarpetaDigital.aspx", "_blank")
                    }
                />
                </div>
                
                {/* Footer */}
                <div className="carpetas-digitales-footer">
                <InformationCircleIcon className="carpetas-digitales-footer-icon" />
                <p>
                    Al hacer clic en el enlace, serás redirigido a una nueva pestaña donde podrás visualizar todods los archivos digitales.
                </p>
                </div>
            </Card>
        </div>
    );
};

export default CarpetasDigitales;