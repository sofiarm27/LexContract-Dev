import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Filter,
    Edit2,
    Eye,
    Plus,
    ChevronDown,
    X,
    Save,
    Download,
    FileText,
    User,
    Calendar,
    Briefcase,
    Trash2
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const Contracts = () => {
    const navigate = useNavigate();
    const contractsData = [
        { id: 'CONT-2024-001', cliente: 'TechSolutions S.A.', abogado: 'Alejandro Vance', estado: 'TERMINADO', tipo: 'Insolvencia Económica', color: '#22c55e', fecha: '12/02/2026', total: '1,500' },
        { id: 'CONT-2024-002', cliente: 'García & Asociados', abogado: 'Elena Sterling', estado: 'TERMINADO', tipo: 'Insolvencia Económica', color: '#22c55e', fecha: '10/02/2026', total: '2,300' },
        { id: 'CONT-2024-003', cliente: 'Startup Ventures', abogado: 'Alejandro Vance', estado: 'BORRADOR', tipo: 'Insolvencia Económica', color: '#9ca3af', fecha: '05/02/2026', total: '900' },
        { id: 'CONT-2024-004', cliente: 'Global Logistics', abogado: 'Elena Sterling', estado: 'VENCIDO', tipo: 'Insolvencia Económica', color: '#ef4444', fecha: '01/01/2026', total: '3,500' },
    ];

    const [selectedContract, setSelectedContract] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [contractToDelete, setContractToDelete] = useState(null);
    const [contracts, setContracts] = useState(contractsData);

    const openEditModal = (contract) => {
        setSelectedContract(contract);
        setIsEditModalOpen(true);
    };

    const openPreviewModal = (contract) => {
        setSelectedContract(contract);
        setIsPreviewModalOpen(true);
    };

    const closeModal = () => {
        setIsEditModalOpen(false);
        setIsPreviewModalOpen(false);
        setSelectedContract(null);
    };

    const handleDeleteClick = (contract) => {
        setContractToDelete(contract);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!contractToDelete) return;
        setContracts(contracts.filter(c => c.id !== contractToDelete.id));
        setShowDeleteModal(false);
        setContractToDelete(null);
    };

    // --- Modal Components ---
    const Modal = ({ title, onClose, children }) => (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
        }}>
            <div style={{
                backgroundColor: '#0d1a2d',
                width: '100%',
                maxWidth: title === 'Vista Previa de Contrato' ? '900px' : '600px',
                maxHeight: '90vh',
                borderRadius: '1rem',
                border: '1px solid #1e2d45',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                overflow: 'hidden'
            }}>
                <div style={{
                    padding: '1.25rem 2rem',
                    borderBottom: '1px solid #1e2d45',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(30, 45, 69, 0.3)'
                }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#D4AF37' }}>{title}</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}>
                        <X size={24} />
                    </button>
                </div>
                <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
                    {children}
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ color: 'white' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>Gestión de Contratos</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Visualice, filtre y gestione sus contratos legales asignados.</p>
                </div>
                <Button onClick={() => setIsSelectionModalOpen(true)}>
                    <Plus size={18} />
                    Crear Nuevo Contrato
                </Button>
            </header>

            <Card style={{ padding: '0' }}>
                {/* Complex Filter Bar */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                type="text"
                                placeholder="Buscar por Cliente o ID..."
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 3rem',
                                    backgroundColor: 'var(--bg-input)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <select style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white', outline: 'none', cursor: 'pointer' }}>
                                <option value="">Abogado: Todos</option>
                                <option value="alejandro">Alejandro Vance</option>
                                <option value="elena">Elena Sterling</option>
                                <option value="admin">ADMIN LEX</option>
                            </select>
                            <select style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white', outline: 'none', cursor: 'pointer' }}>
                                <option value="">Estado: Todos</option>
                                <option value="vencido">Vencido</option>
                                <option value="borrador">Borrador</option>
                                <option value="terminado">Terminado</option>
                            </select>
                            <select style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white', outline: 'none', cursor: 'pointer' }}>
                                <option>Insolvencia Económica</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                                <th style={{ padding: '1.25rem 1.5rem' }}>ID</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Cliente</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Abogado</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Estado</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Tipo de Contrato</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contracts.map((contract) => (
                                <tr key={contract.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                                    <td style={{ padding: '1rem 1.5rem', color: 'var(--accent-gold)' }}>{contract.id}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ backgroundColor: '#2563eb', width: '24px', height: '24px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.625rem', fontWeight: 800 }}>
                                                {contract.cliente.substring(0, 2).toUpperCase()}
                                            </div>
                                            {contract.cliente}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>{contract.abogado}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.625rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            backgroundColor: `${contract.color}15`,
                                            color: contract.color
                                        }}>
                                            {contract.estado}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>{contract.tipo}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                                            <button
                                                onClick={() => openPreviewModal(contract)}
                                                style={{ background: 'rgba(59, 130, 246, 0.1)', border: 'none', color: '#60a5fa', cursor: 'pointer', padding: '0.4rem', borderRadius: '0.375rem', display: 'flex' }}
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => openEditModal(contract)}
                                                style={{ background: 'rgba(212, 175, 55, 0.1)', border: 'none', color: '#D4AF37', cursor: 'pointer', padding: '0.4rem', borderRadius: '0.375rem', display: 'flex' }}
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(contract)}
                                                style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.4rem', borderRadius: '0.375rem', display: 'flex' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>Mostrando 1 a 4 de 124 contratos</span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button style={{ background: 'none', border: '1px solid var(--border-color)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{'<'}</button>
                        <button style={{ background: 'none', border: '1px solid var(--border-color)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{'>'}</button>
                    </div>
                </div>
            </Card>

            {/* --- Modals Implementation --- */}

            {/* Edit Modal */}
            {isEditModalOpen && selectedContract && (
                <Modal title="Editar Información de Contrato" onClose={closeModal}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>ID del Contrato</label>
                                <input readOnly value={selectedContract.id} style={{ padding: '0.75rem', backgroundColor: '#0a1423', border: '1px solid #1e2d45', borderRadius: '0.5rem', color: '#475569', outline: 'none' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Estado</label>
                                <select defaultValue={selectedContract.estado.toLowerCase()} style={{ padding: '0.75rem', backgroundColor: '#0a1423', border: '1px solid #1e2d45', borderRadius: '0.5rem', color: 'white', outline: 'none' }}>
                                    <option value="borrador">Borrador</option>
                                    <option value="terminado">Terminado</option>
                                    <option value="vencido">Vencido</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Cliente</label>
                            <div style={{ position: 'relative' }}>
                                <User size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                                <input defaultValue={selectedContract.cliente} style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', backgroundColor: '#0a1423', border: '1px solid #1e2d45', borderRadius: '0.5rem', color: 'white', outline: 'none' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Abogado Asignado</label>
                            <select defaultValue={selectedContract.abogado} style={{ padding: '0.75rem', backgroundColor: '#0a1423', border: '1px solid #1e2d45', borderRadius: '0.5rem', color: 'white', outline: 'none' }}>
                                <option>Alejandro Vance</option>
                                <option>Elena Sterling</option>
                                <option>ADMIN LEX</option>
                            </select>
                        </div>

                        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <Button variant="outline" onClick={closeModal} style={{ borderColor: '#1e2d45', color: 'white' }}>Cancelar</Button>
                            <Button onClick={() => { alert('¡Actualizado!'); closeModal(); }} style={{ backgroundColor: '#D4AF37', color: '#0a1423', border: 'none' }}>
                                <Save size={18} />
                                Guardar Cambios
                            </Button>
                        </div>

                        <div style={{ borderTop: '1px solid #1e2d45', marginTop: '1rem', paddingTop: '1rem', textAlign: 'center' }}>
                            <button
                                onClick={() => navigate('/contracts/register')}
                                style={{ background: 'none', border: 'none', color: '#D4AF37', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.875rem' }}
                            >
                                Ir al Editor de Cláusulas Avanzado →
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Preview Modal */}
            {isPreviewModalOpen && selectedContract && (
                <Modal title="Vista Previa de Contrato" onClose={closeModal}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '3rem',
                        color: 'black',
                        fontFamily: '"Times New Roman", Times, serif',
                        borderRadius: '0.5rem',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ margin: 0, fontSize: '20pt', fontWeight: 800 }}>LEXCONTRACT</h2>
                            <p style={{ margin: '5px 0', fontSize: '10pt', color: '#666' }}>SOLUCIONES JURÍDICAS Y FINANCIERAS</p>
                            <div style={{ height: '2px', backgroundColor: 'black', margin: '20px auto', width: '100%' }}></div>
                        </div>

                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <h3 style={{ textTransform: 'uppercase', fontSize: '14pt', fontWeight: 700 }}>
                                CONTRATO DE PRESTACIÓN DE SERVICIOS
                            </h3>
                            <p style={{ fontSize: '12pt', fontWeight: 700 }}>No. {selectedContract.id}</p>
                        </div>

                        <p style={{ textAlign: 'justify', lineHeight: 1.8, fontSize: '11pt' }}>
                            Entre los suscritos <strong>ADMIN LEX</strong>, actuando en representación de <strong>LEXCONTRACT</strong>, y el señor(a) <strong>{selectedContract.cliente}</strong>, mayor de edad, se celebra el presente contrato de consultoría técnica bajo la modalidad de <strong>{selectedContract.tipo}</strong>, el cual se regirá por las siguientes condiciones:
                        </p>

                        <div style={{ marginTop: '2rem' }}>
                            <p style={{ textAlign: 'justify', lineHeight: 1.8, fontSize: '11pt' }}>
                                <strong>PRIMERA. OBJETO:</strong> LA EMPRESA se compromete a prestar servicios de asesoría jurídica especializada a EL CLIENTE, centrados en la gestión integral de trámites ante las autoridades competentes.
                            </p>
                            <p style={{ textAlign: 'justify', lineHeight: 1.8, fontSize: '11pt', marginTop: '1rem' }}>
                                <strong>SEGUNDA. HONORARIOS:</strong> El valor total acordado para la ejecución de este contrato es de <strong> USD {selectedContract.total}</strong>, pagaderos según la modalidad acordada en el registro principal.
                            </p>
                            <p style={{ textAlign: 'justify', lineHeight: 1.8, fontSize: '11pt', marginTop: '1rem' }}>
                                <strong>TERCERA. VIGENCIA:</strong> Este acuerdo entra en vigor a partir del <strong>{selectedContract.fecha}</strong> y se mantendrá vigente hasta el cumplimiento del objetivo contractual.
                            </p>
                        </div>

                        <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ borderTop: '1px solid black', width: '200px', margin: '0 auto', paddingTop: '10px' }}>
                                    <strong>EL CONTRATANTE</strong>
                                    <p style={{ fontSize: '9pt', margin: 0 }}>ID: {selectedContract.cliente.substring(0, 3)}XXXXXXXX</p>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ borderTop: '1px solid black', width: '200px', margin: '0 auto', paddingTop: '10px' }}>
                                    <strong>EL CONTRATISTA</strong>
                                    <p style={{ fontSize: '9pt', margin: 0 }}>LEXCONTRACT LEGAL</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem', textAlign: 'center', fontSize: '8pt', color: '#999' }}>
                            Generado el {selectedContract.fecha} • www.lexcontract.com
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <Button style={{ backgroundColor: '#22c55e', color: 'white', border: 'none' }}>
                            <Download size={18} />
                            Descargar Ahora
                        </Button>
                        <Button variant="outline" onClick={closeModal} style={{ borderColor: '#1e2d45', color: 'white' }}>Cerrar</Button>
                    </div>
                </Modal>
            )}
            {/* Selection Modal */}
            {isSelectionModalOpen && (
                <Modal title="Nuevo Contrato: Seleccione Método" onClose={() => setIsSelectionModalOpen(false)}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
                        <div
                            onClick={() => navigate('/contracts/templates')}
                            style={{
                                padding: '2rem',
                                border: '1px solid #1e2d45',
                                borderRadius: '1rem',
                                background: 'rgba(30, 45, 69, 0.4)',
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#1e2d45'; e.currentTarget.style.transform = 'none'; }}
                        >
                            <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FileText size={32} />
                            </div>
                            <div>
                                <h4 style={{ color: 'white', fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>Desde Plantilla</h4>
                                <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Use modelos pre-construidos para mayor velocidad.</p>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/contracts/register')}
                            style={{
                                padding: '2rem',
                                border: '1px solid #1e2d45',
                                borderRadius: '1rem',
                                background: 'rgba(30, 45, 69, 0.4)',
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#60a5fa'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#1e2d45'; e.currentTarget.style.transform = 'none'; }}
                        >
                            <div style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)', color: '#60a5fa', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Edit2 size={32} />
                            </div>
                            <div>
                                <h4 style={{ color: 'white', fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>Manual</h4>
                                <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Escriba el contrato desde cero con total libertad.</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    backdropFilter: 'blur(5px)'
                }}>
                    <div style={{
                        backgroundColor: '#0f1621',
                        border: '1px solid #324467',
                        borderRadius: '1.25rem',
                        padding: '2.5rem',
                        width: '420px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
                    }}>
                        <h2 style={{
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            marginBottom: '1rem',
                            textAlign: 'left'
                        }}>
                            Confirmar Eliminación
                        </h2>
                        <p style={{
                            color: '#92a4c9',
                            fontSize: '0.9375rem',
                            lineHeight: 1.6,
                            marginBottom: '2rem'
                        }}>
                            ¿Estás seguro de que deseas eliminar el contrato <span style={{ color: '#D4AF37', fontWeight: 600 }}>{contractToDelete?.id}</span> de <span style={{ color: '#D4AF37', fontWeight: 600 }}>{contractToDelete?.cliente}</span>? Esta acción no se puede deshacer.
                        </p>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '1rem'
                        }}>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: 'rgba(30, 41, 59, 0.5)',
                                    border: '1px solid #1e2d45',
                                    borderRadius: '0.75rem',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#ef4444',
                                    border: 'none',
                                    borderRadius: '0.75rem',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contracts;
