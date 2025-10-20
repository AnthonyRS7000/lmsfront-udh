import React from "react";
import TituloPage from "../../../components/pages/TituloPage";
import CardItems from "../../../components/pages/CardItems";
import { ArrowRightCircleIcon, PlayIcon } from "@heroicons/react/24/solid";
import "../css/BibliotecasVirtuales.css";

import MacroDigital from "../../../assets/macro_digital.png";
import Eni from "../../../assets/logo-eni.png";
import Digitalia from "../../../assets/logo_digitalia2.jpg";
import DialnetPlus from "../../../assets/logo_dialnet3.jpg";
import AccesoLibre from "../../../assets/logo_accesolibre.jpg";
import ScienciaDirect from "../../../assets/sciencedirect.png";
import ManualModerno from "../../../assets/manual-moderno.png";
import EBooks from "../../../assets/ebooks7-24.png";
import { BookmarkIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const BibliotecasVirtuales = () => {
    const cardData = [
        {
        title: "Biblioteca Virtual",
        image: MacroDigital,
        description: "*Validar con tu correo institucional @udh.edu.pe",
        buttons: [
            { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => alert("Ingresar") },
            { text: "Tutorial", icon: <PlayIcon />, onClick: () => alert("Tutorial") },
        ],
        footerText: (
            <>
                Para reportar problemas comuníquese a:{" "}
                <div className="card-items-footer-text-div">
                    <a className="card-items-footer-text-a" href="http://sibi.udh.edu.pe/soporte.jpg" target="_blank" rel="noopener noreferrer">
                    <Cog6ToothIcon style={{ width: "20px", height: "20px"}} />
                    SOPORTE
                    </a>
                    <a className="card-items-footer-text-a" href="https://sites.google.com/udh.edu.pe/macro-udh" target="_blank" rel="noopener noreferrer">
                    <BookmarkIcon style={{ width: "20px", height: "20px"}} />
                    GUÍA ONLINE
                    </a>
                </div>
            </>
        ),
        },
        {
        title: "Biblioteca Virtual",
        image: Digitalia,
        description: "Regístrate con tu correo institucional para ingresar",
        buttons: [
            { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => alert("Aquí") },
        ],
        footerText: (
            <>
                Para reportar problemas comuníquese a:{" "}
                <div className="card-items-footer-text-div">
                    <a className="card-items-footer-text-a" href="http://sibi.udh.edu.pe/soporte.jpg" target="_blank" rel="noopener noreferrer">
                    <Cog6ToothIcon style={{ width: "20px", height: "20px"}} />
                    SOPORTE
                    </a>
                </div>
            </>
        ),
        },
        {
        title: "Biblioteca Virtual",
        image: DialnetPlus,
        description: "Regístrate con tu correo institucional para ingresar",
        buttons: [
            { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => alert("Aquí") },
        ],
        footerText: (
            <>
                Para reportar problemas comuníquese a:{" "}
                <div className="card-items-footer-text-div">
                    <a className="card-items-footer-text-a" href="http://sibi.udh.edu.pe/soporte.jpg" target="_blank" rel="noopener noreferrer">
                    <Cog6ToothIcon style={{ width: "20px", height: "20px"}} />
                    SOPORTE
                    </a>
                </div>
            </>
        ),
        },
        {
        title: "Biblioteca Virtual: ENI Training",
        image: Eni,
        description: "Regístrate con tu correo institucional para ingresar",
        buttons: [
            { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => alert("Aquí") },
        ],
        },
        {
        title: "Bibliotecas de Acceso Libre",
        image: AccesoLibre,
        description: "Regístrate con tu correo institucional para ingresar",
        buttons: [
            { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => alert("Aquí") },
        ],
        },
        {
        title: "ScienciaDirect",
        image: ScienciaDirect,
        description: "Regístrate con tu correo institucional para ingresar",
        buttons: [
            { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => alert("Aquí") },
        ],
        },
        {
        title: "Biblioteca Virtual",
        image: ManualModerno,
        description: "Regístrate con tu correo institucional para ingresar",
        buttons: [
            { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => alert("Aquí") },
        ],
        },
        {
        title: "Biblioteca Virtual",
        image: EBooks,
        description: "Regístrate con tu correo institucional para ingresar",
        buttons: [
            { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => alert("Aquí") },
        ],
        },
    ];

    return (
        <div className="bibliotecas-virtuales-container">
        {/* Título */}
        <TituloPage titulo="Bibliotecas Virtuales" />

        {/* Card principal */}
            <div className="bibliotecas-card-items">
            {cardData.map((card, index) => (
                <CardItems
                key={index}
                title={card.title}
                image={card.image}
                description={card.description}
                buttons={card.buttons}
                footerText={card.footerText}
                />
            ))}
            </div>
        </div>
    );
};

export default BibliotecasVirtuales;