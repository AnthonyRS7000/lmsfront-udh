import React from 'react';
import '../css/TramiteSeguimiento.css';

const TramiteSeguimiento: React.FC = () => {
	return (
		<div className="tramites-root tramite-seguimiento-root">
			<h2 className="tramites-title tramite-seguimiento-title">SEGUIMIENTO DE TRÁMITE</h2>

			<div className="tramites-card tramite-seguimiento-card">
				<div className="tramites-card-header">
					<h3 style={{ margin: 0, fontWeight: 800, color: 'var(--title-color)' }}>Seleccione el Nº de Expediente:</h3>
				</div>
				<div className="tramites-card-body">
					<div style={{ marginBottom: 12 }}>
						<select className="carnet-select" defaultValue="">
							<option value="">Seleccione..</option>
							<option>272377-0000001061 | LIBROS DE INGLES SERV. AL PUB.</option>
							<option>540067-0000002186 | CARTA DE PRESENTACION (PLAN 2021)</option>
							<option>541987-0000002244 | DESIGNACIÓN DEL DOCENTE ASESOR PARA LA TESIS</option>
							<option>551828-0000002991 | DESIGNACION DE JURADOS PARA LA REV. DEL TRABAJO DE INV. (TESIS)</option>
							<option>560869-0000004101 | LLEVAR CURSO DIRIGIDO</option>
							<option>272377-0000001061 | LIBROS DE INGLES SERV. AL PUB.</option>
							<option>540067-0000002186 | CARTA DE PRESENTACION (PLAN 2021)</option>
							<option>541987-0000002244 | DESIGNACIÓN DEL DOCENTE ASESOR PARA LA TESIS</option>
							<option>551828-0000002991 | DESIGNACION DE JURADOS PARA LA REV. DEL TRABAJO DE INV. (TESIS)</option>
							<option>560869-0000004101 | LLEVAR CURSO DIRIGIDO</option>
						</select>
					</div>

					<hr />

					{/* Área vacía inicialmente, como en el ejemplo: sólo select visible hasta interacción */}
				</div>
			</div>
		</div>
	);
};

export default TramiteSeguimiento;

