import React, { useState } from "react";
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { 
  UserGroupIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ShieldCheckIcon,
  ClockIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  // Íconos minimalistas para perfiles
  CommandLineIcon,
  CogIcon,
  AcademicCapIcon,
  UserIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/outline";
import "../css/perfiles.css";

// Componente para renderizar íconos minimalistas
const IconoPerfil = ({ tipo, className = "" }: { tipo: string; className?: string }) => {
  const iconProps = { className: `w-5 h-5 ${className}` };
  
  switch (tipo) {
    case "super-admin":
      return <CommandLineIcon {...iconProps} />;
    case "admin":
      return <CogIcon {...iconProps} />;
    case "coordinador":
      return <AcademicCapIcon {...iconProps} />;
    case "docente":
      return <BookOpenIcon {...iconProps} />;
    case "estudiante":
      return <UserIcon {...iconProps} />;
    case "secretaria":
      return <ClipboardDocumentListIcon {...iconProps} />;
    case "soporte":
      return <WrenchScrewdriverIcon {...iconProps} />;
    default:
      return <UserIcon {...iconProps} />;
  }
};

interface Permiso {
  modulo: string;
  acciones: string[];
}

interface Perfil {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
  usuariosAsignados: number;
  fechaCreacion: Date;
  fechaModificacion: Date;
  permisos: Permiso[];
  color: string;
  icono: string;
}

const permisosDisponibles: Permiso[] = [
  { modulo: "Usuarios", acciones: ["crear", "leer", "actualizar", "eliminar"] },
  { modulo: "Cursos", acciones: ["crear", "leer", "actualizar", "eliminar", "matricular"] },
  { modulo: "Calificaciones", acciones: ["crear", "leer", "actualizar"] },
  { modulo: "Reportes", acciones: ["generar", "exportar", "ver"] },
  { modulo: "Sistema", acciones: ["configurar", "backup", "logs"] },
];

const opcionesPerfil = [
  { 
    nombre: "Super Administrador", 
    descripcion: "Acceso total al sistema con todos los permisos",
    color: "#dc2626",
    icono: "super-admin",
    permisos: permisosDisponibles
  },
  { 
    nombre: "Administrador", 
    descripcion: "Gestión completa de usuarios y configuración",
    color: "#2563eb",
    icono: "admin",
    permisos: [
      { modulo: "Usuarios", acciones: ["crear", "leer", "actualizar", "eliminar"] },
      { modulo: "Cursos", acciones: ["leer", "actualizar"] },
      { modulo: "Reportes", acciones: ["generar", "exportar", "ver"] }
    ]
  },
  { 
    nombre: "Coordinador Académico", 
    descripcion: "Supervisión de procesos académicos y docentes",
    color: "#059669",
    icono: "coordinador",
    permisos: [
      { modulo: "Cursos", acciones: ["crear", "leer", "actualizar", "matricular"] },
      { modulo: "Calificaciones", acciones: ["leer", "actualizar"] },
      { modulo: "Reportes", acciones: ["generar", "ver"] }
    ]
  },
  { 
    nombre: "Docente", 
    descripcion: "Gestión de cursos asignados y calificaciones",
    color: "#7c3aed",
    icono: "docente",
    permisos: [
      { modulo: "Cursos", acciones: ["leer", "actualizar"] },
      { modulo: "Calificaciones", acciones: ["crear", "leer", "actualizar"] }
    ]
  },
  { 
    nombre: "Estudiante", 
    descripcion: "Acceso a cursos matriculados y materiales",
    color: "#0891b2",
    icono: "estudiante",
    permisos: [
      { modulo: "Cursos", acciones: ["leer"] },
      { modulo: "Calificaciones", acciones: ["leer"] }
    ]
  },
  { 
    nombre: "Secretaría Académica", 
    descripcion: "Gestión de matrículas y registros académicos",
    color: "#ea580c",
    icono: "secretaria",
    permisos: [
      { modulo: "Usuarios", acciones: ["crear", "leer", "actualizar"] },
      { modulo: "Cursos", acciones: ["leer", "matricular"] },
      { modulo: "Reportes", acciones: ["generar", "ver"] }
    ]
  },
  { 
    nombre: "Soporte Técnico", 
    descripcion: "Mantenimiento y soporte del sistema",
    color: "#6b7280",
    icono: "soporte",
    permisos: [
      { modulo: "Sistema", acciones: ["configurar", "backup", "logs"] },
      { modulo: "Usuarios", acciones: ["leer", "actualizar"] }
    ]
  }
];

const Perfiles: React.FC = () => {
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [nuevoPerfil, setNuevoPerfil] = useState<Partial<Perfil>>({
    nombre: "",
    descripcion: "",
    permisos: [],
    color: "#2563eb",
    icono: "estudiante",
    usuariosAsignados: 0
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [perfilEditandoId, setPerfilEditandoId] = useState<number | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarPermisos, setMostrarPermisos] = useState(false);
  const [filtroActivo, setFiltroActivo] = useState<string>("todos");
  const [busqueda, setBusqueda] = useState("");
  const [perfilSeleccionado, setPerfilSeleccionado] = useState<Perfil | null>(null);

  const [nextId, setNextId] = useState(5); // Contador para IDs secuenciales

  // Simulación de datos iniciales
  useState(() => {
    const perfilesIniciales: Perfil[] = [
      {
        id: 1,
        nombre: "Super Administrador",
        descripcion: "Acceso total al sistema",
        activo: true,
        usuariosAsignados: 2,
        fechaCreacion: new Date('2024-01-15'),
        fechaModificacion: new Date('2024-09-01'),
        permisos: permisosDisponibles,
        color: "#dc2626",
        icono: "super-admin"
      },
      {
        id: 2,
        nombre: "Docente",
        descripcion: "Gestión de cursos y calificaciones",
        activo: true,
        usuariosAsignados: 45,
        fechaCreacion: new Date('2024-02-20'),
        fechaModificacion: new Date('2024-08-15'),
        permisos: [
          { modulo: "Cursos", acciones: ["leer", "actualizar"] },
          { modulo: "Calificaciones", acciones: ["crear", "leer", "actualizar"] }
        ],
        color: "#7c3aed",
        icono: "docente"
      },
      {
        id: 3,
        nombre: "Estudiante",
        descripcion: "Acceso a cursos y materiales",
        activo: true,
        usuariosAsignados: 1250,
        fechaCreacion: new Date('2024-01-10'),
        fechaModificacion: new Date('2024-07-30'),
        permisos: [
          { modulo: "Cursos", acciones: ["leer"] },
          { modulo: "Calificaciones", acciones: ["leer"] }
        ],
        color: "#0891b2",
        icono: "estudiante"
      }
    ];
    setPerfiles(perfilesIniciales);
  });

  // Estadísticas calculadas
  const estadisticas = {
    totalPerfiles: perfiles.length,
    perfilesActivos: perfiles.filter(p => p.activo).length,
    totalUsuarios: perfiles.reduce((sum, p) => sum + p.usuariosAsignados, 0),
    perfilMasUsado: perfiles.reduce((max, p) => p.usuariosAsignados > max.usuariosAsignados ? p : max, perfiles[0])
  };

  // Filtros y búsqueda
  const perfilesFiltrados = perfiles.filter(perfil => {
    const cumpleFiltro = filtroActivo === "todos" || 
                        (filtroActivo === "activos" && perfil.activo) ||
                        (filtroActivo === "inactivos" && !perfil.activo);
    const cumpleBusqueda = perfil.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          perfil.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleFiltro && cumpleBusqueda;
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "nombre") {
      const seleccionado = opcionesPerfil.find(p => p.nombre === value);
      if (seleccionado) {
        setNuevoPerfil({
          ...nuevoPerfil,
          nombre: seleccionado.nombre,
          descripcion: seleccionado.descripcion,
          permisos: seleccionado.permisos,
          color: seleccionado.color,
          icono: seleccionado.icono
        });
      }
    } else {
      setNuevoPerfil({
        ...nuevoPerfil,
        [name]: value
      });
    }
  };

  const handleAgregarPerfil = () => {
    if (!nuevoPerfil.nombre || !nuevoPerfil.descripcion) {
      Swal.fire("Completa todos los campos", "", "warning");
      return;
    }

    const existe = perfiles.some(p => p.nombre === nuevoPerfil.nombre && p.id !== perfilEditandoId);
    if (existe) {
      Swal.fire("Ya existe un perfil con ese nombre", "", "error");
      return;
    }

    if (modoEdicion && perfilEditandoId !== null) {
      const actualizados = perfiles.map(p =>
        p.id === perfilEditandoId 
          ? { 
              ...p, 
              ...nuevoPerfil,
              fechaModificacion: new Date()
            } as Perfil
          : p
      );
      setPerfiles(actualizados);
      Swal.fire("¡Actualizado!", "El perfil ha sido actualizado correctamente", "success");
      setModoEdicion(false);
      setPerfilEditandoId(null);
    } else {
      const nuevo: Perfil = {
        id: nextId, // ID secuencial más amigable
        ...nuevoPerfil,
        activo: true,
        usuariosAsignados: 0,
        fechaCreacion: new Date(),
        fechaModificacion: new Date()
      } as Perfil;
      setPerfiles([...perfiles, nuevo]);
      setNextId(nextId + 1); // Incrementar para el siguiente perfil
      Swal.fire("¡Creado!", "El perfil ha sido creado correctamente", "success");
    }

    setNuevoPerfil({
      nombre: "",
      descripcion: "",
      permisos: [],
      color: "#2563eb",
      icono: "estudiante",
      usuariosAsignados: 0
    });
    setMostrarModal(false);
  };

  const handleEditar = (id: number) => {
    const perfil = perfiles.find(p => p.id === id);
    if (!perfil) return;
    setNuevoPerfil(perfil);
    setModoEdicion(true);
    setPerfilEditandoId(id);
    setMostrarModal(true);
  };

  const handleEliminar = (id: number) => {
    const perfil = perfiles.find(p => p.id === id);
    if (!perfil) return;

    if (perfil.usuariosAsignados > 0) {
      Swal.fire({
        title: "No se puede eliminar",
        text: `Este perfil tiene ${perfil.usuariosAsignados} usuarios asignados. Reasígnalos primero.`,
        icon: "error"
      });
      return;
    }

    Swal.fire({
      title: "¿Eliminar este perfil?",
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setPerfiles(perfiles.filter(p => p.id !== id));
        Swal.fire("¡Eliminado!", "El perfil ha sido eliminado", "success");
      }
    });
  };

  const toggleEstado = (id: number) => {
    const actualizados = perfiles.map(p =>
      p.id === id ? { ...p, activo: !p.activo, fechaModificacion: new Date() } : p
    );
    setPerfiles(actualizados);
    
    const perfil = perfiles.find(p => p.id === id);
    const nuevoEstado = perfil ? !perfil.activo : false;
    
    Swal.fire(
      nuevoEstado ? "¡Activado!" : "¡Desactivado!",
      `El perfil ha sido ${nuevoEstado ? "activado" : "desactivado"}`,
      "success"
    );
  };

  const verPermisos = (perfil: Perfil) => {
    setPerfilSeleccionado(perfil);
    setMostrarPermisos(true);
  };

  const exportarPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Título
      doc.setFontSize(20);
      doc.setTextColor(59, 130, 246); // Azul
      doc.text('Gestión de Perfiles - LMS UDH', 20, 20);
      
      // Fecha
      doc.setFontSize(12);
      doc.setTextColor(107, 114, 128); // Gris
      doc.text(`Generado: ${new Date().toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`, 20, 30);
      
      // Estadísticas
      doc.setFontSize(14);
      doc.setTextColor(31, 41, 55); // Negro
      doc.text('Resumen Ejecutivo:', 20, 45);
      
      doc.setFontSize(11);
      doc.text(`• Total de perfiles: ${estadisticas.totalPerfiles}`, 25, 55);
      doc.text(`• Perfiles activos: ${estadisticas.perfilesActivos}`, 25, 62);
      doc.text(`• Total de usuarios: ${estadisticas.totalUsuarios}`, 25, 69);
      doc.text(`• Perfil más usado: ${estadisticas.perfilMasUsado?.nombre || 'N/A'}`, 25, 76);
      
      // Preparar datos de la tabla
      const tableData = perfiles.map(p => [
        p.nombre,
        p.descripcion.length > 40 ? p.descripcion.substring(0, 40) + '...' : p.descripcion,
        p.activo ? 'Activo' : 'Inactivo',
        p.usuariosAsignados.toString(),
        p.fechaCreacion.toLocaleDateString('es-PE'),
        p.fechaModificacion.toLocaleDateString('es-PE')
      ]);
      
      // Crear tabla con autoTable
      if (typeof (doc as any).autoTable === 'function') {
        (doc as any).autoTable({
          head: [['Nombre', 'Descripción', 'Estado', 'Usuarios', 'F. Creación', 'F. Modificación']],
          body: tableData,
          startY: 85,
          styles: { 
            fontSize: 9,
            cellPadding: 3,
            overflow: 'linebreak',
            halign: 'left'
          },
          headStyles: { 
            fillColor: [57, 180, 158],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 10
          },
          columnStyles: {
            0: { cellWidth: 25 }, // Nombre
            1: { cellWidth: 50 }, // Descripción  
            2: { cellWidth: 20 }, // Estado
            3: { cellWidth: 20 }, // Usuarios
            4: { cellWidth: 25 }, // F. Creación
            5: { cellWidth: 25 }  // F. Modificación
          },
          alternateRowStyles: { fillColor: [249, 250, 251] },
          tableLineColor: [229, 231, 235],
          tableLineWidth: 0.1,
          margin: { top: 85, left: 20, right: 20 }
        });
      } else {
        // Fallback si autoTable no está disponible
        let yPosition = 85;
        doc.setFontSize(10);
        doc.text('DATOS DE PERFILES:', 20, yPosition);
        yPosition += 10;
        
        perfiles.forEach((perfil, index) => {
          doc.text(`${index + 1}. ${perfil.nombre} - ${perfil.activo ? 'Activo' : 'Inactivo'} - ${perfil.usuariosAsignados} usuarios`, 25, yPosition);
          yPosition += 7;
          
          // Nueva página si es necesario
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
        });
      }
      
      // Pie de página
      const totalPages = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(156, 163, 175);
        doc.text(`Página ${i} de ${totalPages}`, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 10);
        doc.text('LMS UDH - Sistema de Gestión de Aprendizaje', 20, doc.internal.pageSize.height - 10);
      }
      
      // Guardar archivo
      const fecha = new Date().toISOString().split('T')[0];
      doc.save(`perfiles-sistema-${fecha}.pdf`);
      
      // Mostrar éxito
      Swal.fire({
        title: "¡Exportado!",
        text: "El reporte PDF ha sido descargado correctamente",
        icon: "success",
        timer: 3000,
        showConfirmButton: false
      });
      
    } catch (error) {
      console.error('Error al generar PDF:', error);
      Swal.fire({
        title: "Error al exportar",
        text: "Hubo un problema al generar el PDF. Inténtalo de nuevo.",
        icon: "error"
      });
    }
  };

  return (
    <div className="perfiles-container">
      {/* HEADER CON ESTADÍSTICAS */}
      <div className="perfiles-header">
        <div className="header-title-section">
          <h1 className="perfiles-title">
            <UserGroupIcon className="title-icon" />
            Gestión de Perfiles
          </h1>
          <p className="perfiles-subtitle">
            Administra los roles y permisos del sistema
          </p>
        </div>
        
        <div className="header-actions">
          <button 
            className="btn btn-export"
            onClick={exportarPDF}
          >
            <ArrowDownTrayIcon className="btn-icon" />
            Exportar PDF
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setModoEdicion(false);
              setNuevoPerfil({
                nombre: "",
                descripcion: "",
                permisos: [],
                color: "#2563eb",
                icono: "estudiante",
                usuariosAsignados: 0
              });
              setMostrarModal(true);
            }}
          >
            <PlusIcon className="btn-icon" />
            Nuevo Perfil
          </button>
        </div>
      </div>

      {/* ESTADÍSTICAS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-blue">
            <UserGroupIcon />
          </div>
          <div className="stat-info">
            <h3>{estadisticas.totalPerfiles}</h3>
            <p>Total Perfiles</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-green">
            <CheckCircleIcon />
          </div>
          <div className="stat-info">
            <h3>{estadisticas.perfilesActivos}</h3>
            <p>Perfiles Activos</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-orange">
            <UsersIcon />
          </div>
          <div className="stat-info">
            <h3>{estadisticas.totalUsuarios}</h3>
            <p>Usuarios Totales</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-purple">
            <ShieldCheckIcon />
          </div>
          <div className="stat-info">
            <h3>{estadisticas.perfilMasUsado?.nombre || 'N/A'}</h3>
            <p>Perfil Más Usado</p>
          </div>
        </div>
      </div>

      {/* CONTROLES DE FILTRO Y BÚSQUEDA */}
      <div className="controls-section">
        <div className="search-box">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="text"
            placeholder="Buscar perfiles..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filtroActivo === "todos" ? "active" : ""}`}
            onClick={() => setFiltroActivo("todos")}
          >
            Todos ({perfiles.length})
          </button>
          <button
            className={`filter-btn ${filtroActivo === "activos" ? "active" : ""}`}
            onClick={() => setFiltroActivo("activos")}
          >
            <CheckCircleIcon className="filter-icon" />
            Activos ({estadisticas.perfilesActivos})
          </button>
          <button
            className={`filter-btn ${filtroActivo === "inactivos" ? "active" : ""}`}
            onClick={() => setFiltroActivo("inactivos")}
          >
            <XCircleIcon className="filter-icon" />
            Inactivos ({estadisticas.totalPerfiles - estadisticas.perfilesActivos})
          </button>
        </div>
      </div>

      {/* TABLA DE PERFILES */}
      <div className="table-container">
        <table className="perfiles-table">
          <thead>
            <tr>
              <th>Perfil</th>
              <th>Descripción</th>
              <th>Usuarios</th>
              <th>Estado</th>
              <th>Última Modificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {perfilesFiltrados.map((perfil) => (
              <tr key={perfil.id} className={perfil.activo ? "active" : "inactive"}>
                <td>
                  <div className="perfil-cell">
                    <div 
                      className="perfil-badge"
                      style={{ backgroundColor: perfil.color }}
                    >
                      <IconoPerfil tipo={perfil.icono} />
                    </div>
                    <div className="perfil-info">
                      <span className="perfil-nombre">{perfil.nombre}</span>
                      <span className="perfil-id">#{perfil.id}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="perfil-descripcion">{perfil.descripcion}</span>
                </td>
                <td>
                  <div className="usuarios-cell">
                    <span className="usuarios-count">{perfil.usuariosAsignados}</span>
                    <span className="usuarios-label">usuarios</span>
                  </div>
                </td>
                <td>
                  <button
                    className={`status-badge ${perfil.activo ? "active" : "inactive"}`}
                    onClick={() => toggleEstado(perfil.id)}
                  >
                    {perfil.activo ? (
                      <>
                        <CheckCircleIcon className="status-icon" />
                        Activo
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="status-icon" />
                        Inactivo
                      </>
                    )}
                  </button>
                </td>
                <td>
                  <div className="fecha-cell">
                    <ClockIcon className="fecha-icon" />
                    <span>{perfil.fechaModificacion.toLocaleDateString('es-PE')}</span>
                  </div>
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="action-btn view"
                      onClick={() => verPermisos(perfil)}
                      title="Ver permisos"
                    >
                      <EyeIcon className="action-icon" />
                      <span className="action-text">Ver</span>
                    </button>
                    <button
                      className="action-btn edit"
                      onClick={() => handleEditar(perfil.id)}
                      title="Editar perfil"
                    >
                      <PencilIcon className="action-icon" />
                      <span className="action-text">Editar</span>
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleEliminar(perfil.id)}
                      title="Eliminar perfil"
                      disabled={perfil.usuariosAsignados > 0}
                    >
                      <TrashIcon className="action-icon" />
                      <span className="action-text">Eliminar</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {perfilesFiltrados.length === 0 && (
          <div className="empty-state">
            <UserGroupIcon className="empty-icon" />
            <h3>No se encontraron perfiles</h3>
            <p>No hay perfiles que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>

      {/* MODAL DE FORMULARIO */}
      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modoEdicion ? "Editar Perfil" : "Nuevo Perfil"}</h3>
              <button 
                className="modal-close"
                onClick={() => setMostrarModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombre del perfil:</label>
                  <select 
                    name="nombre" 
                    value={nuevoPerfil.nombre || ""} 
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Selecciona un perfil</option>
                    {opcionesPerfil.map((op, idx) => (
                      <option key={idx} value={op.nombre}>
                        {op.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Color del perfil:</label>
                  <input
                    type="color"
                    name="color"
                    value={nuevoPerfil.color || "#2563eb"}
                    onChange={handleChange}
                    className="form-input color-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Descripción:</label>
                <textarea 
                  name="descripcion" 
                  value={nuevoPerfil.descripcion || ""} 
                  onChange={handleChange}
                  className="form-input"
                  rows={3}
                  placeholder="Describe las funciones de este perfil..."
                />
              </div>

              {nuevoPerfil.permisos && nuevoPerfil.permisos.length > 0 && (
                <div className="permisos-preview">
                  <h4>Permisos asignados:</h4>
                  <div className="permisos-list">
                    {nuevoPerfil.permisos.map((permiso, idx) => (
                      <div key={idx} className="permiso-item">
                        <span className="modulo-name">{permiso.modulo}:</span>
                        <div className="acciones-list">
                          {permiso.acciones.map((accion, accIdx) => (
                            <span key={accIdx} className="accion-tag">{accion}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleAgregarPerfil}
              >
                {modoEdicion ? "Actualizar" : "Crear"} Perfil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE PERMISOS */}
      {mostrarPermisos && perfilSeleccionado && (
        <div className="modal-overlay" onClick={() => setMostrarPermisos(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <span style={{color: perfilSeleccionado.color}}>
                  <IconoPerfil tipo={perfilSeleccionado.icono} />
                </span>
                Permisos: {perfilSeleccionado.nombre}
              </h3>
              <button 
                className="modal-close"
                onClick={() => setMostrarPermisos(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="permisos-detail">
                {perfilSeleccionado.permisos.map((permiso, idx) => (
                  <div key={idx} className="modulo-section">
                    <h4 className="modulo-title">{permiso.modulo}</h4>
                    <div className="acciones-grid">
                      {["crear", "leer", "actualizar", "eliminar", "matricular", "generar", "exportar", "ver", "configurar", "backup", "logs"].map(accion => (
                        <div 
                          key={accion} 
                          className={`accion-item ${permiso.acciones.includes(accion) ? "granted" : "denied"}`}
                        >
                          <span className="accion-icon">
                            {permiso.acciones.includes(accion) ? "✓" : "✗"}
                          </span>
                          <span className="accion-name">{accion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setMostrarPermisos(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfiles;
