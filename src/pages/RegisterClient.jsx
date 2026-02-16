import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Phone, Mail, ChevronDown, Save, MapPin, Building } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const RegisterClient = () => {
    const navigate = useNavigate();

    return (
        <div style={{ color: 'white' }}>
            {/* Breadcrumb Navigation */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '2rem',
                fontSize: '0.875rem',
                color: '#92a4c9'
            }}>
                <span
                    onClick={() => navigate('/clients')}
                    style={{ cursor: 'pointer', color: '#92a4c9' }}
                >
                    Clientes
                </span>
                <span>/</span>
                <span style={{ color: '#D4AF37', fontWeight: 600 }}>Crear Nuevo Cliente</span>
            </div>

            {/* Page Header */}
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#FFFFFF' }}>
                    Crear Nuevo Cliente
                </h1>
                <p style={{ color: '#92a4c9', fontSize: '0.9375rem' }}>
                    Ingrese los datos para registrar un nuevo perfil en el sistema.
                </p>
            </header>

            {/* Form Card */}
            <Card style={{
                padding: '2rem',
                maxWidth: '900px',
                background: 'linear-gradient(135deg, #192233 0%, #1a2538 100%)',
                border: '1px solid #324467',
                borderRadius: '1rem'
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {/* Read Only ID */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#FFFFFF'
                        }}>
                            <Lock size={16} color="#6b7a92" />
                            ID de Sistema (Solo Lectura)
                        </label>
                        <input
                            type="text"
                            disabled
                            value="LC-2024-0012"
                            style={{
                                padding: '0.75rem 1rem',
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                border: '1px solid #324467',
                                borderRadius: '0.5rem',
                                color: '#6b7a92',
                                cursor: 'not-allowed',
                                fontSize: '0.875rem'
                            }}
                        />
                    </div>

                    {/* ID Number */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
                            Cédula / Identificación
                        </label>
                        <input
                            type="text"
                            placeholder="Ingrese el número de identificación"
                            style={{
                                padding: '0.75rem 1rem',
                                backgroundColor: '#0f1621',
                                border: '1px solid #324467',
                                borderRadius: '0.5rem',
                                color: 'white',
                                outline: 'none',
                                fontSize: '0.875rem'
                            }}
                        />
                    </div>

                    {/* Name */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
                            Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Nombres del cliente"
                            style={{
                                padding: '0.75rem 1rem',
                                backgroundColor: '#0f1621',
                                border: '1px solid #324467',
                                borderRadius: '0.5rem',
                                color: 'white',
                                outline: 'none',
                                fontSize: '0.875rem'
                            }}
                        />
                    </div>

                    {/* Last Name */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
                            Apellido
                        </label>
                        <input
                            type="text"
                            placeholder="Apellidos del cliente"
                            style={{
                                padding: '0.75rem 1rem',
                                backgroundColor: '#0f1621',
                                border: '1px solid #324467',
                                borderRadius: '0.5rem',
                                color: 'white',
                                outline: 'none',
                                fontSize: '0.875rem'
                            }}
                        />
                    </div>

                    {/* Phone */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
                            Celular
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Phone size={16} style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#D4AF37'
                            }} />
                            <input
                                type="text"
                                placeholder="+57 300 0000-0000"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 2.8rem',
                                    backgroundColor: '#0f1621',
                                    border: '1px solid #324467',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '0.875rem'
                                }}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
                            Correo Electrónico
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={16} style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#D4AF37'
                            }} />
                            <input
                                type="email"
                                placeholder="emplo@correo.com"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 2.8rem',
                                    backgroundColor: '#0f1621',
                                    border: '1px solid #324467',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '0.875rem'
                                }}
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
                            Dirección
                        </label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={16} style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#D4AF37'
                            }} />
                            <input
                                type="text"
                                placeholder="Dirección de residencia"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 2.8rem',
                                    backgroundColor: '#0f1621',
                                    border: '1px solid #324467',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '0.875rem'
                                }}
                            />
                        </div>
                    </div>

                    {/* City */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
                            Ciudad
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Building size={16} style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#D4AF37'
                            }} />
                            <input
                                type="text"
                                placeholder="Ciudad de residencia"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 2.8rem',
                                    backgroundColor: '#0f1621',
                                    border: '1px solid #324467',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '0.875rem'
                                }}
                            />
                        </div>
                    </div>

                    {/* Service Required */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: 'span 2' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
                            Servicio Requerido
                        </label>
                        <div style={{ position: 'relative' }}>
                            <select
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    backgroundColor: '#0f1621',
                                    border: '1px solid #324467',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none',
                                    appearance: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem'
                                }}
                            >
                                <option value="insolvencia">Insolvencia Económica</option>
                            </select>
                            <ChevronDown size={20} style={{
                                position: 'absolute',
                                right: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#6b7a92',
                                pointerEvents: 'none'
                            }} />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Action Buttons */}
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
                marginTop: '2rem',
                maxWidth: '900px'
            }}>
                <Button
                    variant="outline"
                    onClick={() => navigate('/clients')}
                    style={{
                        padding: '0.75rem 2rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        borderColor: '#D4AF37',
                        color: '#D4AF37'
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={() => navigate('/clients')}
                    style={{
                        padding: '0.75rem 2rem',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        backgroundColor: '#D4AF37',
                        color: '#0A2A4E',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: 'none'
                    }}
                >
                    <Save size={18} />
                    Guardar Cliente
                </Button>
            </div>
        </div>
    );
};

export default RegisterClient;
