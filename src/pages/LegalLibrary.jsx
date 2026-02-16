import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText,
    Search,
    Plus,
    Edit2,
    Trash2,
    Shield,
    X,
    Save,
    User,
    ChevronRight,
    Library
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const LegalLibrary = () => {
    const navigate = useNavigate();
    const [userRole] = useState('Administrador'); // Hardcoded for demo
    const [activeTab, setActiveTab] = useState('templates'); // 'templates' or 'clauses'

    // Templates State
    const [templates, setTemplates] = useState([
        { id: 1, nombre: 'Contrato de Insolvencia Económica', tipo: 'Insolvencia', ultimaMod: '2026-02-10', autor: 'Admin Lex', clauseIds: [1, 2, 3] },
        { id: 2, nombre: 'Acuerdo de Pago General', tipo: 'Financiero', ultimaMod: '2026-02-05', autor: 'Elena Sterling', clauseIds: [2] },
        { id: 3, nombre: 'Contrato de Arrendamiento Comercial', tipo: 'Civil', ultimaMod: '2026-01-20', autor: 'Admin Lex', clauseIds: [1, 3] },
        { id: 4, nombre: 'Prestación de Servicios Técnicos', tipo: 'Servicios', ultimaMod: '2026-01-15', autor: 'Alejandro Vance', clauseIds: [] },
    ]);

    // Clauses State (JSONB implementation: content with placeholders + variables[])
    const [clauses, setClauses] = useState([
        {
            id: 1,
            titulo: 'Objeto del Contrato - Insolvencia',
            contenido: 'LA EMPRESA se compromete a prestar servicios de asesoría jurídica especializada a EL CLIENTE, centrados en la gestión de [Área de Práctica] y representación ante autoridades competentes.',
            variables: ['Área de Práctica', 'Nombre Cliente', 'Representante Legal'],
            tipo: 'Insolvencia',
            estado: 'Activa',
            fecha: '2026-02-10',
            autor: 'Admin Lex'
        },
        {
            id: 2,
            titulo: 'Honorarios y Pagos Standard',
            contenido: 'Como contraprestación, EL CLIENTE pagará la suma de [Valor Honorarios] USD, la cual será cancelada en la modalidad de [Modalidad Pago]. En caso de mora, se aplicará una penalidad de [Valor Penalidad].',
            variables: ['Valor Honorarios', 'Modalidad Pago', 'Valor Penalidad', 'Fecha Inicio'],
            tipo: 'Financiero',
            estado: 'Activa',
            fecha: '2026-02-05',
            autor: 'Elena Sterling'
        },
        {
            id: 3,
            titulo: 'Vigencia y Prórroga',
            contenido: 'El presente contrato tendrá una vigencia que inicia el [Fecha Inicio] y finaliza el [Fecha Fin], pudiendo ser prorrogado por mutuo acuerdo escrito.',
            variables: ['Fecha Inicio', 'Fecha Fin', 'Ciudad Notificación'],
            tipo: 'General',
            estado: 'Inactiva',
            fecha: '2026-01-20',
            autor: 'Admin Lex'
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [newItem, setNewItem] = useState({
        nombre: '',
        titulo: '',
        contenido: '',
        tipo: 'General',
        estado: 'Activa',
        autor: 'Admin Lex',
        clauseIds: [],
        variables: []
    });

    const isAdmin = userRole === 'Administrador';

    const filteredTemplates = templates.filter(t =>
        t.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredClauses = clauses.filter(c =>
        c.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.contenido.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setNewItem({ ...item });
        } else {
            setEditingItem(null);
            setNewItem({
                nombre: '',
                titulo: '',
                contenido: '',
                tipo: activeTab === 'templates' ? 'Civil' : 'General',
                estado: 'Activa',
                autor: 'Admin Lex',
                clauseIds: [],
                variables: []
            });
        }
        setIsModalOpen(true);
    };

    const toggleClauseInTemplate = (clauseId) => {
        setNewItem(prev => {
            const currentIds = prev.clauseIds || [];
            if (currentIds.includes(clauseId)) {
                return { ...prev, clauseIds: currentIds.filter(id => id !== clauseId) };
            } else {
                return { ...prev, clauseIds: [...currentIds, clauseId] };
            }
        });
    };

    const handleSave = () => {
        const today = new Date().toISOString().split('T')[0];
        if (activeTab === 'templates') {
            if (editingItem) {
                setTemplates(templates.map(t => t.id === editingItem.id ? { ...newItem, id: t.id, ultimaMod: today } : t));
            } else {
                setTemplates([...templates, { ...newItem, id: Date.now(), ultimaMod: today }]);
            }
        } else {
            if (editingItem) {
                setClauses(clauses.map(c => c.id === editingItem.id ? { ...newItem, id: c.id, fecha: today } : c));
            } else {
                setClauses([...clauses, { ...newItem, id: Date.now(), fecha: today }]);
            }
        }
        setIsModalOpen(false);
    };

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!itemToDelete) return;

        if (activeTab === 'templates') {
            setTemplates(templates.filter(t => t.id !== itemToDelete.id));
        } else {
            setClauses(clauses.filter(c => c.id !== itemToDelete.id));
        }
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    return (
        <div style={{ color: 'white' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '2rem',
                fontSize: '0.875rem',
                color: '#92a4c9'
            }}>
                <span onClick={() => navigate('/contracts')} style={{ cursor: 'pointer' }}>Contratos</span>
                <span>›</span>
                <span style={{ color: '#D4AF37', fontWeight: 600 }}>Biblioteca Legal</span>
            </div>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>Biblioteca Legal</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Gestione y seleccione plantillas o cláusulas predefinidas para sus contratos.</p>
                </div>
                {isAdmin && (
                    <Button onClick={() => handleOpenModal()} style={{ backgroundColor: '#D4AF37', color: '#000', border: 'none' }}>
                        <Plus size={18} />
                        Nueva {activeTab === 'templates' ? 'Plantilla' : 'Cláusula'}
                    </Button>
                )}
            </header>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid #1e2d45' }}>
                <button
                    onClick={() => { setActiveTab('templates'); setSearchTerm(''); }}
                    style={{
                        padding: '1rem 0.5rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: activeTab === 'templates' ? '#D4AF37' : '#94a3b8',
                        fontWeight: activeTab === 'templates' ? 700 : 500,
                        borderBottom: activeTab === 'templates' ? '2px solid #D4AF37' : 'none',
                        cursor: 'pointer'
                    }}
                >
                    PLANTILLAS
                </button>
                <button
                    onClick={() => { setActiveTab('clauses'); setSearchTerm(''); }}
                    style={{
                        padding: '1rem 0.5rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: activeTab === 'clauses' ? '#D4AF37' : '#94a3b8',
                        fontWeight: activeTab === 'clauses' ? 700 : 500,
                        borderBottom: activeTab === 'clauses' ? '2px solid #D4AF37' : 'none',
                        cursor: 'pointer'
                    }}
                >
                    CLÁUSULAS
                </button>
            </div>

            <Card style={{ padding: '0' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                        <input
                            type="text"
                            placeholder={`Buscar ${activeTab === 'templates' ? 'plantillas' : 'cláusulas'}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                                <th style={{ padding: '1.25rem 1.5rem' }}>{activeTab === 'templates' ? 'Nombre' : 'Título'}</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Tipo</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>{activeTab === 'templates' ? 'Modificación' : 'Estado'}</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Autor</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(activeTab === 'templates' ? filteredTemplates : filteredClauses).map((item) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ color: '#D4AF37' }}>
                                                {activeTab === 'templates' ? <FileText size={20} /> : <Library size={20} />}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{activeTab === 'templates' ? item.nombre : item.titulo}</div>
                                                {activeTab === 'clauses' && (
                                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {item.contenido}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <span style={{ color: '#60a5fa' }}>{item.tipo}</span>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        {activeTab === 'templates' ? item.ultimaMod : (
                                            <span style={{
                                                padding: '0.25rem 0.625rem',
                                                borderRadius: '1rem',
                                                fontSize: '0.75rem',
                                                backgroundColor: item.estado === 'Activa' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: item.estado === 'Activa' ? '#22c55e' : '#ef4444'
                                            }}>
                                                {item.estado}
                                            </span>
                                        )}
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', color: '#94a3b8' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <User size={14} />
                                            {item.autor}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                            {activeTab === 'templates' ? (
                                                <Button
                                                    onClick={() => navigate(`/contracts/register?template=${item.id}`)}
                                                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem' }}
                                                >
                                                    Usar
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => navigate(`/contracts/register?clause=${item.id}`)}
                                                    variant="outline"
                                                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', color: '#D4AF37', borderColor: '#D4AF37' }}
                                                >
                                                    Insertar
                                                </Button>
                                            )}
                                            {isAdmin && (
                                                <>
                                                    <button onClick={() => handleOpenModal(item)} style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer' }}><Edit2 size={16} /></button>
                                                    <button onClick={() => handleDeleteClick(item)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Unified Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ width: '500px', padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                                {editingItem ? 'Editar' : 'Nueva'} {activeTab === 'templates' ? 'Plantilla' : 'Cláusula'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                    {activeTab === 'templates' ? 'Nombre de Plantilla' : 'Título de Cláusula'}
                                </label>
                                <input
                                    type="text"
                                    value={activeTab === 'templates' ? newItem.nombre : newItem.titulo}
                                    onChange={(e) => setNewItem(activeTab === 'templates' ? { ...newItem, nombre: e.target.value } : { ...newItem, titulo: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0a1423', border: '1px solid #1e2d45', borderRadius: '0.5rem', color: 'white' }}
                                />
                            </div>
                            {activeTab === 'clauses' && (
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Contenido Legal</label>
                                    <textarea
                                        value={newItem.contenido}
                                        onChange={(e) => setNewItem({ ...newItem, contenido: e.target.value })}
                                        style={{ width: '100%', minHeight: '150px', padding: '0.75rem', backgroundColor: '#0a1423', border: '1px solid #1e2d45', borderRadius: '0.5rem', color: 'white' }}
                                    />
                                </div>
                            )}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Tipo</label>
                                    <select
                                        value={newItem.tipo}
                                        onChange={(e) => setNewItem({ ...newItem, tipo: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0a1423', border: '1px solid #1e2d45', borderRadius: '0.5rem', color: 'white' }}
                                    >
                                        <option value="General">General</option>
                                        <option value="Insolvencia">Insolvencia</option>
                                        <option value="Financiero">Financiero</option>
                                        <option value="Civil">Civil</option>
                                    </select>
                                </div>
                                {activeTab === 'clauses' && (
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Estado</label>
                                        <select
                                            value={newItem.estado}
                                            onChange={(e) => setNewItem({ ...newItem, estado: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0a1423', border: '1px solid #1e2d45', borderRadius: '0.5rem', color: 'white' }}
                                        >
                                            <option value="Activa">Activa</option>
                                            <option value="Inactiva">Inactiva</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                            {activeTab === 'templates' && (
                                <div style={{ borderTop: '1px solid #1e2d45', paddingTop: '1rem', marginTop: '0.5rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', color: '#D4AF37' }}>
                                        Cláusulas de la Plantilla ({newItem.clauseIds?.length || 0})
                                    </label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '150px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                                        {clauses.map(clause => (
                                            <div
                                                key={clause.id}
                                                onClick={() => toggleClauseInTemplate(clause.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.75rem',
                                                    padding: '0.6rem 0.8rem',
                                                    backgroundColor: newItem.clauseIds?.includes(clause.id) ? 'rgba(212, 175, 55, 0.1)' : '#0a1423',
                                                    border: `1px solid ${newItem.clauseIds?.includes(clause.id) ? '#D4AF37' : '#1e2d45'}`,
                                                    borderRadius: '0.5rem',
                                                    cursor: 'pointer',
                                                    fontSize: '0.8125rem',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                <div style={{
                                                    width: '16px',
                                                    height: '16px',
                                                    borderRadius: '4px',
                                                    border: '1px solid #D4AF37',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: newItem.clauseIds?.includes(clause.id) ? '#D4AF37' : 'transparent'
                                                }}>
                                                    {newItem.clauseIds?.includes(clause.id) && <X size={12} color="#000" />}
                                                </div>
                                                <span style={{ color: newItem.clauseIds?.includes(clause.id) ? 'white' : '#94a3b8', flex: 1 }}>{clause.titulo}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <Button onClick={handleSave} style={{ backgroundColor: '#D4AF37', color: '#000', marginTop: '1rem' }}>
                                <Save size={18} />
                                {editingItem ? 'Actualizar' : 'Guardar'}
                            </Button>
                        </div>
                    </Card>
                </div>
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
                            ¿Estás seguro de que deseas eliminar {activeTab === 'templates' ? 'la plantilla' : 'la cláusula'} <span style={{ color: '#D4AF37', fontWeight: 600 }}>{itemToDelete?.nombre || itemToDelete?.titulo}</span>? Esta acción no se puede deshacer.
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

export default LegalLibrary;
