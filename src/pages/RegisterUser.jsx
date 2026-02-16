import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Shield, Save, X, CreditCard, ChevronDown, CheckCircle, Loader2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const RegisterUser = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        celular: '',
        correo: '',
        password: '',
        rol: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simular envío de correo y proceso de registro
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setShowSuccessModal(true);
    };

    return (
        <div style={{ color: 'white', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                color: '#92a4c9'
            }}>
                <span onClick={() => navigate('/users')} style={{ cursor: 'pointer' }}>Usuarios / Roles</span>
                <span>›</span>
                <span style={{ color: '#D4AF37', fontWeight: 600 }}>Registrar Nuevo Usuario</span>
            </div>

            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Registrar Nuevo Usuario</h1>
                <p style={{ color: '#92a4c9', fontSize: '1rem' }}>
                    Ingrese los datos del nuevo miembro del equipo. Este registro permitirá el acceso inmediato al sistema con las credenciales proporcionadas.
                </p>
            </header>

            <Card style={{ padding: '2.5rem', background: '#111d2e', border: '1px solid #1e2d45' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        {/* Nombre */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'white' }}>Nombre</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ej: Juan"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.25rem 1rem 3.25rem',
                                        backgroundColor: '#0a1423',
                                        border: '1px solid #1e2d45',
                                        borderRadius: '0.5rem',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                        </div>
                        {/* Apellido */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'white' }}>Apellido</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                                <input
                                    type="text"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ej: Pérez"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.25rem 1rem 3.25rem',
                                        backgroundColor: '#0a1423',
                                        border: '1px solid #1e2d45',
                                        borderRadius: '0.5rem',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        {/* Cédula */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'white' }}>Cédula</label>
                            <div style={{ position: 'relative' }}>
                                <CreditCard size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                                <input
                                    type="text"
                                    name="cedula"
                                    value={formData.cedula}
                                    onChange={handleChange}
                                    required
                                    placeholder="Número de identificación"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.25rem 1rem 3.25rem',
                                        backgroundColor: '#0a1423',
                                        border: '1px solid #1e2d45',
                                        borderRadius: '0.5rem',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                        </div>
                        {/* Celular */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'white' }}>Número de Celular</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                                <input
                                    type="text"
                                    name="celular"
                                    value={formData.celular}
                                    onChange={handleChange}
                                    required
                                    placeholder="+57 300 000 0000"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.25rem 1rem 3.25rem',
                                        backgroundColor: '#0a1423',
                                        border: '1px solid #1e2d45',
                                        borderRadius: '0.5rem',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        {/* Correo Electrónico */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'white' }}>Correo Electrónico</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                                <input
                                    type="email"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    required
                                    placeholder="usuario@lexcontract.com"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.25rem 1rem 3.25rem',
                                        backgroundColor: '#0a1423',
                                        border: '1px solid #1e2d45',
                                        borderRadius: '0.5rem',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                        </div>
                        {/* Contraseña */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'white' }}>Contraseña</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.25rem 1rem 3.25rem',
                                        backgroundColor: '#0a1423',
                                        border: '1px solid #1e2d45',
                                        borderRadius: '0.5rem',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'white' }}>Asignar Rol</label>
                        <div style={{ position: 'relative' }}>
                            <Shield size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                            <select
                                name="rol"
                                value={formData.rol}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem 1.25rem 1rem 3.25rem',
                                    backgroundColor: '#0a1423',
                                    border: '1px solid #1e2d45',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    appearance: 'none'
                                }}
                            >
                                <option value="">Seleccionar rol</option>
                                <option value="abogado">Abogado</option>
                                <option value="administrador">Administrador</option>
                            </select>
                            <div style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'white', pointerEvents: 'none' }}>
                                <ChevronDown size={20} />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate('/users')}
                            style={{ padding: '0.875rem 2.5rem', fontSize: '1rem', fontWeight: 700, borderColor: '#1e2d45', color: 'white' }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                            style={{
                                padding: '0.875rem 2.5rem',
                                fontSize: '1rem',
                                fontWeight: 700,
                                backgroundColor: '#D4AF37',
                                color: '#000',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                opacity: isSubmitting ? 0.7 : 1,
                                cursor: isSubmitting ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Registrando...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Registrar Usuario
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Card>

            {/* Success Modal */}
            {showSuccessModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000
                }}>
                    <div style={{
                        backgroundColor: '#111d2e',
                        padding: '3rem',
                        borderRadius: '1.5rem',
                        border: '1px solid #1e2d45',
                        maxWidth: '500px',
                        width: '90%',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}>
                        <div style={{
                            color: '#22c55e',
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <CheckCircle size={48} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>¡Usuario Registrado!</h2>
                            <p style={{ color: '#92a4c9', lineHeight: 1.6 }}>
                                Se ha creado la cuenta de <strong>{formData.nombre} {formData.apellido}</strong> exitosamente.
                            </p>
                        </div>
                        <div style={{
                            backgroundColor: 'rgba(212, 175, 55, 0.05)',
                            border: '1px solid rgba(212, 175, 55, 0.1)',
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            width: '100%'
                        }}>
                            <Mail size={18} color="#D4AF37" />
                            <p style={{ fontSize: '0.875rem', color: '#D4AF37', margin: 0, textAlign: 'left' }}>
                                Se ha enviado un correo electrónico de bienvenida a: <br />
                                <strong style={{ color: 'white' }}>{formData.correo}</strong>
                            </p>
                        </div>
                        <Button
                            style={{ backgroundColor: '#D4AF37', color: '#000', width: '100%', padding: '1rem', fontWeight: 700 }}
                            onClick={() => navigate('/users')}
                        >
                            Volver a Usuarios
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterUser;
