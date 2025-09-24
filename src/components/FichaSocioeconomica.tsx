import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FichaSocioeconomica.css';

const initial = {
  direccionTipo: 'Jirón', direccionTexto: 'Jr Independencia',
  ciclo: 'X',
  emergenciaNombre: 'Juan Perez', emergenciaTelefono: '929413199',
  documentoTipo: 'DNI', documentoNumero: '70304569', ubigeo: '110802',
  fechaNacimiento: '1999-10-21', edad: '21',
  // fecha desglosada para selects día/mes/año
  fechaDia: '21', fechaMes: '10', fechaAnio: '1999',
  lugarNacimiento: 'JUNÍN', departamento: 'NINGUNO', provincia: 'CHANCHAMAYO', distrito: 'SAN RAMON',
  tiempoResidencia: '4', tiempoUnidad: 'Años', sexo: 'Masculino',
  estadoCivil: 'Soltero', seguroHos: 'Ninguno', correo: 'lunaet20@gmail.com', telefonoPersonal: '929413199',
  esMadre: 'No', hijos: '0', discapacidad: 'Ninguno'
  ,
  // Sección B
  colegioProcedenciaTipo: 'Estatal', nombreColegio: 'Aurelio Cárdenas', departamentoColegio: 'NINGUNO', modalidadIngreso: 'Examen de Admisión',
  aspectoInfluencia: 'Prestigio de la Universidad de Huánuco', medioDifusion: 'Internet', semestreIngreso: '2020-2', turnoEstudio: 'Mañana'
  ,
  // Sección C - Económicas
  trabajaUd: 'NO', tipoTrabajo: 'Estatal', empresaTrabajo: '', ingresoPromedioFamiliar: '1200', quienFinancia: 'Mi madre', dondeTomaAlimento: 'Pensión'
  ,
  // Sección D - Vivienda
  serviciosVivienda: { agua: true, telefono: true, computadora: true, desague: true, internet: true, energia: true, tvCable: false }, regimenTenencia: 'Alquilada', tipoVivienda: 'Ninguno'
  ,
  // Sección F - Aptitudes
  aptitudes: {
    ningunoDeporte: true,
    voley: false,
    natacion: false,
    futbol: false,
    tennis: false,
    ciclismo: false,
    basquet: false,
    atletismo: false,
    otrosDeporte: false,
    ningunoClub: true,
    deportivoClub: false,
    religiosoClub: false,
    culturalClub: false,
    artisticoClub: false,
    grupoUDH: 'Ninguno'
  }
  ,
  // Sección G - Etnica
  etnica: {
    grupo: 'd) No sabe/no responde.',
    detalle: 'Ninguno',
    hablaLengua: 'c) No sabe/no responde',
    lengua: 'Ninguno'
  }
};

const FichaSocioeconomica: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(initial);
  // local displayed date input (dd/mm/yyyy) to support typing with auto-slashes
  const [dateInput, setDateInput] = useState(() => {
    const iso = initial.fechaNacimiento;
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
  });

  useEffect(() => {
    // keep displayed input in sync if state.fechaNacimiento is changed elsewhere
    const iso = (state as any).fechaNacimiento;
    if (!iso) return;
    const parts = String(iso).split('-');
    if (parts.length === 3) {
      const [y, m, d] = parts;
      const disp = `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
      setDateInput(disp);
    }
  }, [state.fechaNacimiento]);

  const onChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setState(prev => ({ ...prev, [k]: e.target.value }));
  };

  

  const onToggleServicio = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, serviciosVivienda: { ...prev.serviciosVivienda, [key]: e.target.checked } }));
  };

  const onToggleAptitud = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, aptitudes: { ...prev.aptitudes, [key]: e.target.checked } } as any));
  };

  const onChangeAptitud = (k: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(prev => ({ ...prev, aptitudes: { ...prev.aptitudes, [k]: e.target.value } } as any));
  };

  const onChangeEtnica = (k: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(prev => ({ ...prev, etnica: { ...prev.etnica, [k]: e.target.value } } as any));
  };

  const guardar = () => {
    localStorage.setItem('ficha_socioeconomica', JSON.stringify(state));
    alert('Ficha guardada (simulado)');
  };

  // theme is controlled globally in the app's topbar; no local toggle here

  return (
    <div className={`ficha-root`}>
      <div className="ficha-container">

        <div className="ficha-panel-outer">
          <div className="ficha-header-blue">
            
            <div className="title-big">Ficha Socioeconómica</div>
          </div>

          

          <div className="ficha-banner-yellow">POR FAVOR COMPLETE SU FICHA SOCIOECONOMICA PARA QUE PUEDA ACCEDER AL SISTEMA.</div>

          <div className="ficha-panel">
            <div className="ficha-row-table header-row">
              <div className="col-a">A</div>
              <div className="col-main">
                <div className="meta">Ficha Número: <strong>894491</strong></div>
                <h3>Información Personal</h3>
              </div>
            </div>

            <form className="legacy-table">
              {/* Row 1 */}
              <div className="legacy-row row-1">
                <div className="cell index">1</div>
                <div className="cell label">Dirección</div>
                <div className="cell field">
                  <select value={state.direccionTipo} onChange={onChange('direccionTipo')}>
                    <option>Jirón</option>
                    <option>Avenida</option>
                    <option>Urbanización</option>
                  </select>
                  <input value={state.direccionTexto} onChange={onChange('direccionTexto')} />
                </div>
                <div className="cell label">Ciclo</div>
                <div className="cell field"><select value={state.ciclo} onChange={onChange('ciclo')}><option>X</option><option>1</option></select></div>
              </div>

              {/* Row 2 */}
              <div className="legacy-row">
                <div className="cell index">2</div>
                <div className="cell label">En caso de emergencia:</div>
                <div className="cell field"><label className="muted-label">Nombre de la persona(emergencia):</label><input value={state.emergenciaNombre} onChange={onChange('emergenciaNombre')} /></div>
                <div className="cell label">Teléfono (emergencia)</div>
                <div className="cell field"><input value={state.emergenciaTelefono} onChange={onChange('emergenciaTelefono')} /></div>
              </div>

              {/* Row 3 */}
              <div className="legacy-row">
                <div className="cell index">3</div>
                <div className="cell label">Doc. de Identificación</div>
                <div className="cell field"><label className="muted-label">Tipo de Documento Id:</label><select value={state.documentoTipo} onChange={onChange('documentoTipo')}><option>DNI</option><option>CE</option></select></div>
                <div className="cell field"><label className="muted-label">UBIGEO DNI:</label><input value={state.ubigeo} onChange={onChange('ubigeo')} /></div>
                <div className="cell field"><label className="muted-label">N° de Documento</label><input value={state.documentoNumero} onChange={onChange('documentoNumero')} /></div>
              </div>

              {/* Row 4 */}
              <div className="legacy-row">
                <div className="cell index">4</div>
                <div className="cell label">Fecha de Nacimiento</div>
                <div className="cell field">
                  <input
                    placeholder="dd/mm/yyyy"
                    value={dateInput}
                    onChange={(e) => {
                      let v = e.target.value;
                      // keep only digits and limit to 8 digits
                      const digits = v.replace(/\D/g, '').slice(0, 8);
                      const dd = digits.slice(0, 2);
                      const mm = digits.slice(2, 4);
                      const yyyy = digits.slice(4, 8);
                      let out = dd;
                      if (mm) out += '/' + mm;
                      if (yyyy) out += '/' + yyyy;
                      setDateInput(out);

                      // when full date entered, validate ranges and sync to state
                      if (digits.length === 8) {
                        const dayN = parseInt(dd, 10);
                        const monN = parseInt(mm, 10);
                        const yearN = parseInt(yyyy, 10);
                        const validDay = dayN >= 1 && dayN <= 31;
                        const validMon = monN >= 1 && monN <= 12;
                        const validYear = yearN >= 1900 && yearN <= 2100;
                        if (validDay && validMon && validYear) {
                          const iso = `${String(yearN).padStart(4, '0')}-${String(monN).padStart(2, '0')}-${String(dayN).padStart(2, '0')}`;
                          setState((prev: any) => ({ ...prev, fechaNacimiento: iso, fechaDia: String(dayN).padStart(2, '0'), fechaMes: String(monN).padStart(2, '0'), fechaAnio: String(yearN) }));
                        } else {
                          // invalid date - don't sync full state; keep input for user to correct
                        }
                      } else {
                        // partial or cleared - don't overwrite fechaNacimiento until full
                        if (!out) {
                          setState((prev: any) => ({ ...prev, fechaNacimiento: '', fechaDia: '', fechaMes: '', fechaAnio: '' }));
                        }
                      }
                    }}
                  />
                </div>
                <div className="cell label">Edad</div>
                <div className="cell field"><select value={state.edad} onChange={onChange('edad')}><option>21</option><option>22</option></select></div>
              </div>

              {/* Row 5 */}
              <div className="legacy-row row-lugar">
                <div className="cell index">5</div>
                <div className="cell label">Lugar de Nacimiento</div>
                <div className="cell field">
                  <div className="muted-label">Departamento</div>
                  <select value={state.departamento} onChange={onChange('departamento')}>
                    <option>NINGUNO</option>
                    <option>JUNÍN</option>
                  </select>
                  <div className="selected-display" aria-live="polite">{state.departamento}</div>
                </div>
                <div className="cell field">
                  <div className="muted-label">Provincia</div>
                  <select value={state.provincia} onChange={onChange('provincia')}>
                    <option>&lt;Seleccione&gt;</option>
                    <option>CHANCHAMAYO</option>
                  </select>
                  <div className="selected-display" aria-live="polite">{state.provincia}</div>
                </div>
                <div className="cell field">
                  <div className="muted-label">Distrito</div>
                  <select value={state.distrito} onChange={onChange('distrito')}>
                    <option>Ninguno</option>
                    <option>SAN RAMON</option>
                  </select>
                  <div className="selected-display" aria-live="polite">{state.distrito}</div>
                </div>
              </div>

              {/* Row 6 */}
              <div className="legacy-row">
                <div className="cell index">6</div>
                <div className="cell label">Tiempo que radica en esta Ciudad</div>
                <div className="cell field">
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input value={state.tiempoResidencia} onChange={onChange('tiempoResidencia')} style={{ maxWidth: 100 }} />
                    <select value={state.tiempoUnidad} onChange={onChange('tiempoUnidad')} style={{ maxWidth: 110 }}>
                      <option>Años</option>
                    </select>
                  </div>
                </div>
                <div className="cell label">Sexo</div>
                <div className="cell field"><select value={state.sexo} onChange={onChange('sexo')}><option>Masculino</option><option>Femenino</option></select></div>
              </div>

              {/* Row 7 */}
              <div className="legacy-row">
                <div className="cell index">7</div>
                <div className="cell label">Est. Civil</div>
                <div className="cell field"><select value={state.estadoCivil} onChange={onChange('estadoCivil')}><option>Soltero</option><option>Casado</option></select></div>
                <div className="cell label">Seguro Hos.</div>
                <div className="cell field"><select value={state.seguroHos} onChange={onChange('seguroHos')}><option>Ninguno</option><option>ESSALUD</option></select></div>
              </div>

              {/* Row 8 */}
              <div className="legacy-row">
                <div className="cell index">8</div>
                <div className="cell label">Correo Electronico</div>
                <div className="cell field"><input value={state.correo} onChange={onChange('correo')} /></div>
                <div className="cell label">Teléfono Personal :</div>
                <div className="cell field"><input value={state.telefonoPersonal} onChange={onChange('telefonoPersonal')} /></div>
              </div>

              {/* Row 9 */}
              <div className="legacy-row">
                <div className="cell index">9</div>
                <div className="cell label">¿Usted es madre?</div>
                <div className="cell field"><select value={state.esMadre} onChange={onChange('esMadre')}><option>No</option><option>Sí</option></select></div>
                <div className="cell label">¿Cuántos hijos tiene?</div>
                <div className="cell field"><select value={state.hijos} onChange={onChange('hijos')}><option>0</option><option>1</option></select></div>
              </div>

              {/* Row 10 */}
              <div className="legacy-row">
                <div className="cell index">10</div>
                <div className="cell label">¿Tiene alguna discapacidad?</div>
                <div className="cell field">&nbsp;</div>
                <div className="cell label">&nbsp;</div>
                <div className="cell field"><select value={state.discapacidad} onChange={onChange('discapacidad')}><option>Ninguno</option><option>Visual</option></select></div>
              </div>
            </form>
          </div>

          {/* Sección B - Características Académicas (panel independiente) */}
          <div className="ficha-panel ficha-panel-b" style={{ marginTop: 14 }}>
            <div className="ficha-row-table header-row">
              <div className="col-a">B</div>
              <div className="col-main">
                <h3>Características Académicas</h3>
              </div>
            </div>

            <form className="legacy-table" aria-label="Caracteristicas Academicas">
              <div className="legacy-row">
                <div className="cell index">1</div>
                <div className="cell label">Colegio de Procedencia</div>
                <div className="cell field">
                  <select value={state.colegioProcedenciaTipo} onChange={onChange('colegioProcedenciaTipo')}>
                    <option>Estatal</option>
                    <option>Particular</option>
                  </select>
                </div>
                <div className="cell label">Nombre Colegio</div>
                <div className="cell field"><input value={state.nombreColegio} onChange={onChange('nombreColegio')} /></div>
              </div>

              <div className="legacy-row">
                <div className="cell index">2</div>
                <div className="cell label">Departamento Colegio</div>
                <div className="cell field"><select value={state.departamentoColegio} onChange={onChange('departamentoColegio')}><option>NINGUNO</option></select></div>
                <div className="cell label">Modalidad de Ingreso</div>
                <div className="cell field"><select value={state.modalidadIngreso} onChange={onChange('modalidadIngreso')}><option>Examen de Admisión</option></select></div>
              </div>

              <div className="legacy-row">
                <div className="cell index">3</div>
                <div className="cell label">¿Qué aspecto influyó para que elija usted a la Universidad de Huánuco?</div>
                <div className="cell field"><select value={state.aspectoInfluencia} onChange={onChange('aspectoInfluencia')}><option>Prestigio de la Universidad de Huánuco</option></select></div>
                <div className="cell label">&nbsp;</div>
                <div className="cell field">&nbsp;</div>
              </div>

              <div className="legacy-row">
                <div className="cell index">4</div>
                <div className="cell label">Medio de difusión por el que se enteró de la UDH</div>
                <div className="cell field"><select value={state.medioDifusion} onChange={onChange('medioDifusion')}><option>Internet</option></select></div>
                <div className="cell label">&nbsp;</div>
                <div className="cell field">&nbsp;</div>
              </div>

              <div className="legacy-row">
                <div className="cell index">5</div>
                <div className="cell label">Semestre de ingreso a la UDH</div>
                <div className="cell field"><select value={state.semestreIngreso} onChange={onChange('semestreIngreso')}><option>2020-2</option></select></div>
                <div className="cell label">Turno de Estudio</div>
                <div className="cell field"><select value={state.turnoEstudio} onChange={onChange('turnoEstudio')}><option>Mañana</option><option>Tarde</option></select></div>
              </div>

            </form>
          </div>

          {/* Sección C - Características Económicas */}
          <div className="ficha-panel ficha-panel-b" style={{ marginTop: 14 }}>
            <div className="ficha-row-table header-row">
              <div className="col-a">C</div>
              <div className="col-main">
                <h3>Características Económicas</h3>
              </div>
            </div>

            <form className="legacy-table" aria-label="Caracteristicas Economicas">
              <div className="legacy-row">
                <div className="cell index">1</div>
                <div className="cell label">¿Trabaja Ud?</div>
                <div className="cell field"><select value={state.trabajaUd} onChange={onChange('trabajaUd')}><option>NO</option><option>SI</option></select></div>
                <div className="cell label">Tipo Trabajo</div>
                <div className="cell field"><select value={state.tipoTrabajo} onChange={onChange('tipoTrabajo')}><option>Estatal</option><option>Privado</option></select></div>
              </div>

              <div className="legacy-row">
                <div className="cell index">2</div>
                <div className="cell label">Ingreso Promedio Mensual (Familiar)</div>
                <div className="cell field"><input value={state.ingresoPromedioFamiliar} onChange={onChange('ingresoPromedioFamiliar')} /></div>
                <div className="cell label">Turno Trabajo :</div>
                <div className="cell field"><select value={state.turnoEstudio} onChange={onChange('turnoEstudio')}><option>Ninguno</option><option>Mañana</option></select></div>
              </div>

              <div className="legacy-row">
                <div className="cell index">3</div>
                <div className="cell label">Quien financia sus estudios</div>
                <div className="cell field"><input value={state.quienFinancia} onChange={onChange('quienFinancia')} /></div>
                <div className="cell label">Donde toma su alimento?</div>
                <div className="cell field"><select value={state.dondeTomaAlimento} onChange={onChange('dondeTomaAlimento')}><option>Pensión</option><option>Comedor</option></select></div>
              </div>
            </form>
          </div>

          {/* Sección D - Vivienda */}
          <div className="ficha-panel ficha-panel-b" style={{ marginTop: 14 }}>
            <div className="ficha-row-table header-row">
              <div className="col-a">D</div>
              <div className="col-main">
                <h3>Características de su Vivienda</h3>
              </div>
            </div>

            <form className="legacy-table" aria-label="Caracteristicas Vivienda">
              <div className="legacy-row">
                <div className="cell index">1</div>
                <div className="cell label">Servicios con que dispone su vivienda</div>
                <div className="cell field">
                  <label><input type="checkbox" checked={state.serviciosVivienda.agua} onChange={onToggleServicio('agua')} /> Agua</label>
                  <label style={{ marginLeft:12 }}><input type="checkbox" checked={state.serviciosVivienda.telefono} onChange={onToggleServicio('telefono')} /> Telefono</label>
                  <label style={{ marginLeft:12 }}><input type="checkbox" checked={state.serviciosVivienda.computadora} onChange={onToggleServicio('computadora')} /> Computadora</label>
                </div>
                <div className="cell field">
                  <label><input type="checkbox" checked={state.serviciosVivienda.desague} onChange={onToggleServicio('desague')} /> Desagüe</label>
                  <label style={{ marginLeft:12 }}><input type="checkbox" checked={state.serviciosVivienda.internet} onChange={onToggleServicio('internet')} /> Internet</label>
                </div>
                <div className="cell field">
                  <label><input type="checkbox" checked={state.serviciosVivienda.energia} onChange={onToggleServicio('energia')} /> Energía electrica</label>
                  <label style={{ marginLeft:12 }}><input type="checkbox" checked={state.serviciosVivienda.tvCable} onChange={onToggleServicio('tvCable')} /> Tv por Cable</label>
                </div>
              </div>

              <div className="legacy-row">
                <div className="cell index">2</div>
                <div className="cell label">Régimen de Tenencia de la Vivienda</div>
                <div className="cell field"><select value={state.regimenTenencia} onChange={onChange('regimenTenencia')}><option>Alquilada</option><option>Propia</option></select></div>
                <div className="cell label">Tipo de Vivienda</div>
                <div className="cell field"><select value={state.tipoVivienda} onChange={onChange('tipoVivienda')}><option>Ninguno</option><option>Casa</option></select></div>
              </div>
            </form>
          </div>

          {/* Sección E - Características Parentales */}
          <div className="ficha-panel ficha-panel-b" style={{ marginTop: 14 }}>
            <div className="ficha-row-table header-row">
              <div className="col-a">E</div>
              <div className="col-main">
                <h3>Características Parentales</h3>
              </div>
            </div>

            <form className="legacy-table" aria-label="Caracteristicas Parentales">
              <div className="legacy-row">
                <div className="cell index">1</div>
                <div className="cell label">¿Viven sus padres?</div>
                <div className="cell field">
                  <label style={{ marginRight: 12 }}><input type="checkbox" checked={true} readOnly /> Padre</label>
                  <label><input type="checkbox" checked={true} readOnly /> Madre</label>
                </div>
                <div className="cell label">&nbsp;</div>
                <div className="cell field">&nbsp;</div>
              </div>

              <div className="legacy-row">
                <div className="cell index">2</div>
                <div className="cell label">Información del Padre</div>
                <div className="cell field">
                  <div className="muted-label">Edad del padre (si vive)</div>
                  <input value={state.emergenciaTelefono /* placeholder binding, adjust if model fields added */} onChange={() => {}} />
                </div>
                <div className="cell label">Grado de Instrucción</div>
                <div className="cell field"><select><option>Primaria Incompleta</option><option>Secundaria Completa</option><option>Secundaria Incompleta</option><option>Superior</option></select></div>
              </div>

              <div className="legacy-row">
                <div className="cell index">3</div>
                <div className="cell label">Información de la Madre</div>
                <div className="cell field">
                  <div className="muted-label">Edad de la madre (si vive)</div>
                  <input value={state.emergenciaNombre /* placeholder binding, adjust if model fields added */} onChange={() => {}} />
                </div>
                <div className="cell label">Grado de Instrucción</div>
                <div className="cell field"><select><option>Primaria Incompleta</option><option>Secundaria Incompleta</option><option>Secundaria Completa</option><option>Superior</option></select></div>
              </div>
            </form>
          </div>

          {/* Sección F - Aptitudes Personales */}
          <div className="ficha-panel ficha-panel-b" style={{ marginTop: 14 }}>
            <div className="ficha-row-table header-row">
              <div className="col-a">F</div>
              <div className="col-main">
                <h3>Aptitudes Personales</h3>
              </div>
            </div>

            <form className="legacy-table" aria-label="Aptitudes Personales">
              <div className="legacy-row">
                <div className="cell index">1</div>
                <div className="cell label">Tipo de Actividad deportiva que practica</div>
                <div className="cell field">
                  <label><input type="checkbox" checked={state.aptitudes.ningunoDeporte} onChange={onToggleAptitud('ningunoDeporte')} /> Ninguno</label>
                  <label style={{ marginLeft:12 }}><input type="checkbox" checked={state.aptitudes.voley} onChange={onToggleAptitud('voley')} /> Vóley</label>
                  <label style={{ marginLeft:12 }}><input type="checkbox" checked={state.aptitudes.natacion} onChange={onToggleAptitud('natacion')} /> Natación</label>
                </div>
                <div className="cell field">
                  <label><input type="checkbox" checked={state.aptitudes.futbol} onChange={onToggleAptitud('futbol')} /> Futbol</label>
                  <label style={{ marginLeft:12 }}><input type="checkbox" checked={state.aptitudes.tennis} onChange={onToggleAptitud('tennis')} /> Tennis</label>
                  <label style={{ marginLeft:12 }}><input type="checkbox" checked={state.aptitudes.ciclismo} onChange={onToggleAptitud('ciclismo')} /> Ciclismo</label>
                </div>
                <div className="cell field">
                  <label><input type="checkbox" checked={state.aptitudes.basquet} onChange={onToggleAptitud('basquet')} /> Básquet</label>
                  <label style={{ marginLeft:12 }}><input type="checkbox" checked={state.aptitudes.atletismo} onChange={onToggleAptitud('atletismo')} /> Atletismo</label>
                  <label style={{ marginLeft:12 }}><input type="checkbox" checked={state.aptitudes.otrosDeporte} onChange={onToggleAptitud('otrosDeporte')} /> Otros</label>
                </div>
              </div>

              <div className="legacy-row">
                <div className="cell index">2</div>
                <div className="cell label">¿Pertenece usted a algún tipo de club?</div>
                <div className="cell field">
                  <label><input type="checkbox" checked={state.aptitudes.ningunoClub} onChange={onToggleAptitud('ningunoClub')} /> Ninguno</label>
                  <label style={{ marginLeft:12 }}><input type="checkbox" checked={state.aptitudes.deportivoClub} onChange={onToggleAptitud('deportivoClub')} /> Deportivo</label>
                  <label style={{ marginLeft:12 }}><input type="checkbox" checked={state.aptitudes.religiosoClub} onChange={onToggleAptitud('religiosoClub')} /> Religioso</label>
                </div>
                <div className="cell field">
                  <label><input type="checkbox" checked={state.aptitudes.culturalClub} onChange={onToggleAptitud('culturalClub')} /> Cultural</label>
                  <label style={{ marginLeft:12 }}><input type="checkbox" checked={state.aptitudes.artisticoClub} onChange={onToggleAptitud('artisticoClub')} /> Artístico</label>
                </div>
              </div>

              <div className="legacy-row">
                <div className="cell index">3</div>
                <div className="cell label">¿Le gustaría pertenecer a algun grupo de La Universidad?</div>
                <div className="cell field" style={{ gridColumn: '3 / 6' }}>
                  <select value={state.aptitudes.grupoUDH} onChange={onChangeAptitud('grupoUDH')}>
                    <option>Ninguno</option>
                    <option>Deportivo</option>
                    <option>Cultural</option>
                    <option>Artístico</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* Sección G - Variable Étnica */}
          <div className="ficha-panel ficha-panel-b" style={{ marginTop: 14 }}>
            <div className="ficha-row-table header-row">
              <div className="col-a">G</div>
              <div className="col-main">
                <h3>Variable Étnica <span style={{ background: 'yellow', color: 'red', padding: '0 6px', marginLeft: 8 }}>NUEVO</span></h3>
              </div>
            </div>

            <form className="legacy-table" aria-label="Variable Etnica">
              <div className="legacy-row">
                <div className="cell index">1</div>
                <div className="cell label">Grupo étnico en el que se autoidentifica:</div>
                <div className="cell field">
                  <select value={state.etnica.grupo} onChange={onChangeEtnica('grupo')}>
                    <option>d) No sabe/no responde.</option>
                    <option>a) Indígena</option>
                    <option>b) Afrodescendiente</option>
                  </select>
                </div>
              </div>

              <div className="legacy-row">
                <div className="cell index">2</div>
                <div className="cell label">Detalle étnico (sólo si seleccionó la opcion a):</div>
                <div className="cell field"><select value={state.etnica.detalle} onChange={onChangeEtnica('detalle')}><option>Ninguno (Ninguno)</option><option>Quechua</option></select></div>
              </div>

              <div className="legacy-row">
                <div className="cell index">3</div>
                <div className="cell label">¿Habla alguna lengua indígena u originaria?:</div>
                <div className="cell field"><select value={state.etnica.hablaLengua} onChange={onChangeEtnica('hablaLengua')}><option>c) No sabe/no responde</option><option>a) Sí</option><option>b) No</option></select></div>
              </div>

              <div className="legacy-row">
                <div className="cell index">4</div>
                <div className="cell label">Lengua étnica u originaria(sólo si seleccionó la opción a):</div>
                <div className="cell field"><select value={state.etnica.lengua} onChange={onChangeEtnica('lengua')}><option>Ninguno (Ninguno)</option><option>Quechua</option></select></div>
              </div>

              <div className="legacy-row">
                <div className="cell index">&nbsp;</div>
                <div className="cell label">&nbsp;</div>
                <div className="cell field" style={{ gridColumn: '3 / 6' }}>Fecha de registro: {new Date().toLocaleString()}</div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="actions">
                <button type="button" className="btn-primary" onClick={guardar}>Guardar</button>
                <button type="button" className="btn-secondary" onClick={() => navigate('/estudiante/perfil')}>Volver al perfil</button>
      </div>

      {/* Declaración y botones de guardado */}
      <div style={{ textAlign: 'center', marginTop: 18 }}>
        <div style={{ color: '#c2185b', fontSize: 20, fontWeight: 600 }}>Declaro bajo juramento que los datos que he consignado son veraces, sujetandome a las normas de la Universidad en el caso de comprobarse lo contrario.</div>
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', gap: 40 }}>
          <button type="button" className="aceptar-btn" onClick={guardar} aria-label="Aceptar">
            <div className="icon-save">💾</div>
            <div>ACEPTAR</div>
          </button>
          <button type="button" className="cancelar-btn" onClick={() => navigate('/estudiante/perfil')} aria-label="Cancelar">
            <div className="icon-cancel">❌</div>
            <div>CANCELAR</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FichaSocioeconomica;
