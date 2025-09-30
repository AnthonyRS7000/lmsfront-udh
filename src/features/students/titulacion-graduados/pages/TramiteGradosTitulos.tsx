import React, { useState } from 'react';
import '../css/TramiteGradosTitulos.css';
import '../../../../components/css/TituloPage.css';

const pdfPath = '/src/features/students/titulacion-graduados/comision de grados y titulos.pdf';

const TramiteGradosTitulos: React.FC = () => {
  const [showPdf, setShowPdf] = useState(false);

  return (
    <div className="tramites-root tramite-grados-root">
      <div className="titulo-page-container">
        <h2 className="titulo-page">Trámite de Grados  Títulos</h2>
      </div>

      <div className="tramites-card tramite-grados-card">
        <div className="tramites-card-header">
          <h3 style={{ margin: 0, fontWeight: 800, color: 'var(--title-color)' }}>TIPO DE TRÁMITE:</h3>
        </div>
        <div className="tramites-card-body">
          {!showPdf ? (
            <>
              <div style={{ marginBottom: 12 }}>
                <select className="carnet-select" defaultValue="">
                  <option value="">Seleccione..</option>
                  <option>DECLARAR APTO PARA SUSTENTACIÓN - TESIS</option>
                  <option>EMISIÓN DE TÍTULO</option>
                  <option>REGISTRO DE GRADOS</option>
                </select>
              </div>

              <hr />

              <div style={{ marginTop: 18, color: 'var(--muted)' }}>
                <h3 style={{ textAlign: 'center', fontWeight: 800 }}>UNIVERSIDAD DE HUÁNUCO</h3>
                <p style={{ textAlign: 'center', marginTop: 8, fontWeight: 700 }}>OFICINA DE MATRÍCULA Y REGISTROS ACADÉMICOS</p>
                <p style={{ textAlign: 'center', marginTop: 6 }}>CELULAR DE OFICINA 952071496</p>

                <div style={{ marginTop: 12 }}>
                  <p>Estimados alumnos para la emisión de sus documentos para la obtención del Grado Académico de Bachiller, deberán de realizar el siguiente procedimiento:</p>
                  <ol>
                    <li>Registrar en el sistema su fotografía actual tamaño carnet con fondo blanco y con ropa formal (terno)</li>
                    <li>Enviar el DNI escaneado solo la primera cara AMPLIADA, LEGIBLE Y VIGENTE a los siguientes correos institucionales, según su programa académico y modalidad de estudio, siendo los siguientes:</li>
                  </ol>

                  <ul>
                    <li>INGENIERÍA AMBIENTAL – TURISMO, HOTELERÍA Y GASTRONOMÍA – MARKETING Y NEGOCIOS INTERNACIONALES: luzmila.campos@udh.edu.pe</li>
                    <li>DERECHO Y CIENCIAS POLÍTICAS (Presencial): YESSICA.ESPINOZA@udh.edu.pe</li>
                    <li>INGENIERÍA CIVIL – CONTABILIDAD Y FINANZAS (Presencial): liang.luy@udh.edu.pe</li>
                    <li>...otros programas listados en el portal</li>
                  </ul>

                  <p>3. Debe de Comunicarse con la comisión de grados y títulos de su escuela.</p>
                  <p>
                    <a href="#" onClick={(e) => { e.preventDefault(); setShowPdf(true); }}>ABRIR DIRECTORIO DE LA COMISIÓN DE GRADOS Y TÍTULOS</a>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="pdf-viewer">
              <div className="pdf-controls">
                <a className="btn-primary" href={pdfPath} download>Descargar PDF</a>
                <button className="btn-secondary" onClick={() => setShowPdf(false)}>Cerrar</button>
              </div>
              <iframe title="Comisión de grados y títulos" src={pdfPath} className="pdf-iframe" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TramiteGradosTitulos;
