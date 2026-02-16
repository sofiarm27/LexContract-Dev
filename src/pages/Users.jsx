import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Filter,
    Edit2,
    UserX,
    Unlock,
    UserPlus,
    Briefcase,
    Users as UsersIcon,
    X,
    Save,
    Lock as LockIcon,
    Shield,
    Mail,
    User as UserIcon
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const Users = () => {
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({ nombre: '', correo: '', rol: '', estado: '' });

    const [usersData, setUsersData] = useState([
        { id: 1, nombre: 'Juan Pérez', correo: 'jperez@lexcontract.com', rol: 'Abogado', estado: 'Activo', contratos: 12, cedula: '1.234.567.890', celular: '+57 300 123 4567' },
        { id: 2, nombre: 'María García', correo: 'mgarcia@lexcontract.com', rol: 'Administrador', estado: 'Activo', contratos: 45, cedula: '52.987.654', celular: '+57 320 087 6543' },
        { id: 3, nombre: 'Carlos Ruiz', correo: 'cruiz@lexcontract.com', rol: 'Abogado', estado: 'Bloqueado', contratos: 8, motivo: 'Intentos fallidos', cedula: '1.010.555.222', celular: '+57 315 555 2222' },
        { id: 4, nombre: 'Elena Torres', correo: 'etorres@lexcontract.com', rol: 'Facilitador', estado: 'Inactivo', contratos: 4, cedula: '32.111.333', celular: '+57 300 111 3333' },
    ]);

    const openEditModal = (user) => {
        setSelectedUser(user);
        setEditForm({ ...user });
        setIsEditModalOpen(true);
    };

    const openBlockModal = (user) => {
        setSelectedUser(user);
        setIsBlockModalOpen(true);
    };

    const openDetailModal = (user) => {
        setSelectedUser(user);
        setIsDetailModalOpen(true);
    };

    const closeModal = () => {
        setIsEditModalOpen(false);
        setIsBlockModalOpen(false);
        setIsDetailModalOpen(false);
        setSelectedUser(null);
    };

    const toggleUserStatus = (id) => {
        setUsersData(usersData.map(user =>
            user.id === id
                ? { ...user, estado: user.estado === 'Bloqueado' ? 'Activo' : 'Bloqueado', motivo: user.estado === 'Bloqueado' ? null : 'Bloqueo manual por Adm.' }
                : user
        ));
        closeModal();
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = () => {
        setUsersData(usersData.map(u => u.id === editForm.id ? editForm : u));
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    // --- Modal Component ---
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
                maxWidth: '550px',
                borderRadius: '1rem',
                border: '1px solid #1e2d45',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
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
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>
                <div style={{ padding: '2rem' }}>
                    {children}
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ color: 'white' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>Gestión de Usuarios y Roles</h1>
                    <p style={{ color: '#92a4c9' }}>Administre los permisos y roles de los miembros de su equipo legal y administrativo.</p>
                </div>
                <Button onClick={() => navigate('/users/register')} style={{ backgroundColor: '#D4AF37', color: '#000', border: 'none' }}>
                    <UserPlus size={18} />
                    Registrar Usuario
                </Button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <Card style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: '#0d1a2d', border: '1px solid #1e2d45' }}>
                    <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', padding: '1rem', borderRadius: '1rem', color: '#D4AF37' }}>
                        <Briefcase size={28} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Total Abogados</p>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>24</h3>
                    </div>
                </Card>
                <Card style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: '#0d1a2d', border: '1px solid #1e2d45' }}>
                    <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '1rem', color: '#60a5fa' }}>
                        <UsersIcon size={28} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Total Administrativos</p>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>12</h3>
                    </div>
                </Card>
            </div>

            <Card style={{ padding: '0', background: '#0d1a2d', border: '1px solid #1e2d45' }}>
                <div style={{ padding: '1.5rem', display: 'flex', gap: '1rem', borderBottom: '1px solid #1e2d45' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por usuario, nombre, correo o rol..."
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 3rem',
                                backgroundColor: '#0a1423',
                                border: '1px solid #1e2d45',
                                borderRadius: '0.5rem',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <select style={{ padding: '0.75rem 1rem', backgroundColor: '#0a1423', border: '1px solid #1e2d45', borderRadius: '0.5rem', color: 'white', outline: 'none', cursor: 'pointer' }}>
                        <option>Rol: Todos</option>
                        <option>Abogado</option>
                        <option>Administrador</option>
                    </select>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #1e2d45', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Usuario</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Rol de Sistema</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Contratos Asoc.</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Estado</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData.map((user) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #1e2d45', fontSize: '0.875rem' }}>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ backgroundColor: '#D4AF37', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 700 }}>
                                                {user.nombre.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div
                                                    onClick={() => openDetailModal(user)}
                                                    style={{
                                                        fontWeight: 600,
                                                        cursor: 'pointer',
                                                        transition: 'color 0.2s'
                                                    }}
                                                    onMouseOver={(e) => e.target.style.color = '#D4AF37'}
                                                    onMouseOut={(e) => e.target.style.color = 'white'}
                                                >
                                                    {user.nombre}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{user.correo}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <span style={{ color: 'white' }}>{user.rol}</span>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>{user.contratos} contrato(s)</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.625rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            backgroundColor: user.estado === 'Activo' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: user.estado === 'Activo' ? '#22c55e' : '#ef4444'
                                        }}>
                                            {user.estado}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                                            <button
                                                onClick={() => openEditModal(user)}
                                                style={{ background: 'rgba(212, 175, 55, 0.1)', border: 'none', color: '#D4AF37', cursor: 'pointer', padding: '0.4rem', borderRadius: '0.375rem' }}
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => openBlockModal(user)}
                                                style={{
                                                    background: user.estado === 'Bloqueado' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                                                    border: 'none',
                                                    color: user.estado === 'Bloqueado' ? '#ef4444' : '#22c55e',
                                                    cursor: 'pointer',
                                                    padding: '0.4rem',
                                                    borderRadius: '0.375rem'
                                                }}
                                            >
                                                {user.estado === 'Bloqueado' ? <LockIcon size={16} /> : <Unlock size={16} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* --- Modals Implementation --- */}

            {isEditModalOpen && selectedUser && (
                <Modal title="Editar Perfil de Usuario" onClose={closeModal}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Nombre Completo</label>
                            <div style={{ position: 'relative' }}>
                                <UserIcon size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                                <input
                                    name="nombre"
                                    value={editForm.nombre}
                                    onChange={handleEditChange}
                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', backgroundColor: '#0a1423', border: '1px solid #1e2d45', borderRadius: '0.5rem', color: 'white', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Correo Electrónico</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                                <input
                                    name="correo"
                                    value={editForm.correo}
                                    onChange={handleEditChange}
                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', backgroundColor: '#0a1423', border: '1px solid #1e2d45', borderRadius: '0.5rem', color: 'white', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Rol de Sistema</label>
                                <div style={{ position: 'relative' }}>
                                    <Shield size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                                    <select
                                        name="rol"
                                        value={editForm.rol}
                                        onChange={handleEditChange}
                                        style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', backgroundColor: '#0a1423', border: '1px solid #1e2d45', borderRadius: '0.5rem', color: 'white', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                                    >
                                        <option value="Abogado">Abogado</option>
                                        <option value="Administrador">Administrador</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Estado de Cuenta</label>
                                <div style={{ position: 'relative' }}>
                                    <Filter size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                                    <select
                                        name="estado"
                                        value={editForm.estado}
                                        onChange={handleEditChange}
                                        style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', backgroundColor: '#0a1423', border: '1px solid #1e2d45', borderRadius: '0.5rem', color: 'white', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                                    >
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                        <option value="Bloqueado">Bloqueado</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <Button variant="outline" onClick={closeModal} style={{ borderColor: '#1e2d45', color: 'white' }}>Cancelar</Button>
                            <Button style={{ backgroundColor: '#D4AF37', color: '#000', border: 'none' }} onClick={handleSaveEdit}>
                                <Save size={18} />
                                Guardar Cambios
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* User Details Modal */}
            {isDetailModalOpen && selectedUser && (
                <Modal title="Información Detallada del Usuario" onClose={closeModal}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid #1e2d45', paddingBottom: '1.5rem' }}>
                            <div style={{
                                backgroundColor: '#D4AF37',
                                width: '64px',
                                height: '64px',
                                borderRadius: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#000',
                                fontSize: '1.5rem',
                                fontWeight: 800
                            }}>
                                <UserIcon size={32} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'white' }}>{selectedUser.nombre}</h4>
                                <div style={{ color: '#D4AF37', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                    <Shield size={14} />
                                    {selectedUser.rol}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.75rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FilterIcon size={14} /> Identificación
                                </label>
                                <div style={{ fontSize: '1rem', color: '#f8fafc' }}>{selectedUser.cedula || 'No registrada'}</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.75rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Briefcase size={14} /> ID Usuario
                                </label>
                                <div style={{ fontSize: '1rem', color: '#f8fafc' }}>#{String(selectedUser.id).padStart(4, '0')}</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.75rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <UsersIcon size={14} /> Celular
                                </label>
                                <div style={{ fontSize: '1rem', color: '#f8fafc' }}>{selectedUser.celular || 'No registrado'}</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.75rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Mail size={14} /> Email
                                </label>
                                <div style={{ fontSize: '1rem', color: '#f8fafc' }}>{selectedUser.correo}</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.75rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Estado</label>
                                <span style={{
                                    padding: '0.25rem 0.625rem',
                                    borderRadius: '1rem',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    width: 'fit-content',
                                    backgroundColor: selectedUser.estado === 'Activo' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: selectedUser.estado === 'Activo' ? '#22c55e' : '#ef4444'
                                }}>
                                    {selectedUser.estado}
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.75rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Contratos</label>
                                <div style={{ fontSize: '1rem', color: '#f8fafc' }}>{selectedUser.contratos} expedientes</div>
                            </div>
                        </div>

                        {selectedUser.motivo && (
                            <div style={{
                                padding: '1rem',
                                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                                border: '1px solid rgba(239, 68, 68, 0.1)',
                                borderRadius: '0.5rem'
                            }}>
                                <label style={{ fontSize: '0.725rem', color: '#ef4444', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '0.25rem' }}>Razones de Bloqueo:</label>
                                <p style={{ margin: 0, fontSize: '0.875rem', color: '#94a3b8' }}>{selectedUser.motivo}</p>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                            <Button style={{ backgroundColor: '#1e2d45', color: 'white' }} onClick={closeModal}>Cerrar Perfil</Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Block/Unlock Modal */}
            {isBlockModalOpen && selectedUser && (
                <Modal title={selectedUser.estado === 'Bloqueado' ? 'Desbloquear Acceso' : 'Bloquear Acceso'} onClose={closeModal}>
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            backgroundColor: selectedUser.estado === 'Bloqueado' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            color: selectedUser.estado === 'Bloqueado' ? '#22c55e' : '#ef4444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto'
                        }}>
                            {selectedUser.estado === 'Bloqueado' ? <Unlock size={32} /> : <LockIcon size={32} />}
                        </div>

                        <div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                ¿Desea {selectedUser.estado === 'Bloqueado' ? 'restaurar' : 'restringir'} el acceso?
                            </h4>
                            <p style={{ color: '#94a3b8', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                                Está a punto de {selectedUser.estado === 'Bloqueado' ? 'habilitar' : 'bloquear'} la cuenta de <strong>{selectedUser.nombre}</strong>.
                                {selectedUser.estado !== 'Bloqueado' && ' El usuario no podrá iniciar sesión hasta que se restablezca su acceso.'}
                            </p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                            <Button variant="outline" onClick={closeModal} style={{ borderColor: '#1e2d45', color: 'white' }}>Ignorar</Button>
                            <Button
                                onClick={() => toggleUserStatus(selectedUser.id)}
                                style={{
                                    backgroundColor: selectedUser.estado === 'Bloqueado' ? '#22c55e' : '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    fontWeight: 700
                                }}
                            >
                                Confirmar Acción
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Users;
