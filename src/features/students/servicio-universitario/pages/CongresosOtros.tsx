import React from 'react';
import '../css/CongresosOtros.css';

const CongresosOtros: React.FC = () => {
	return (
		<div className="congresos-otros-root">
			<h2 className="congresos-otros-title">Congresos, Conferencias Y Talleres</h2>

			<div className="congresos-otros-card">
				<div className="tramites-card-header">
					<h3 style={{ margin: 0, fontWeight: 800, color: 'var(--title-color)' }}>Seleccione una opción</h3>
				</div>
				<div className="tramites-card-body">
					<div style={{ marginBottom: 12 }}>
						<select className="carnet-select" defaultValue="">
							<option value="">Seleccione...</option>
							<option>AUTENTICACIÓN</option>
							<option>BÚSQUEDA Y CERTIFICACIÓN DE COPIA DE DIPLOMA</option>
							<option>BÚSQUEDA Y COPIA DE DOCUMENTO SIMPLE</option>
							<option>CERTIFICACIÓN DE DOCUMENTOS ORIGINALES(Para Apostillado u otro)</option>
							<option>CERTIFICADO CONGRESO DE SISTEMAS</option>
							<option>DUPLICADO DE DIPLOMA</option>
							<option>ENTREGA EXTEMPORANEA DE DIPLOMA</option>
							<option>EXAMEN DE UBICACION</option>
							<option>HISTORIAL ACADEMICO - EXPEDIDO POR MATRICULA</option>
							<option>INSCRIPCION A LA PLATAFORMA TURNITIN</option>
							<option>INSCRIPCIÓN CURSO DE INGLES SERV. AL PUB.</option>
							<option>LIBROS DE INGLES SERV. AL PUB.</option>
							<option>RETIRO DEL CURSO DE INGLES</option>
							<option>USO DE LA PLATAFORMA PARA EL CURSO DE IDIOMA INGLES</option>
							<option>USO DE LA PLATAFORMA PARA EL CURSO DE IDIOMA PORTUGUES</option>
							<option>HORARIO Y PROGRAMACION DE ACTIVIDADES</option>
							<option>INSCRIPCION A TALLERES</option>
							<option>CERTIFICADO DE PARTICIPACIÓN</option>
							<option>INSCRIPCIÓN AL CONGRESO</option>
							<option>OTROS SERVICIOS ACADEMICOS</option>
						</select>
					</div>

					<hr />

					{/* Initially empty area (matches image: only select visible until user interacts) */}
				</div>
			</div>
		</div>
	);
};

export default CongresosOtros;


