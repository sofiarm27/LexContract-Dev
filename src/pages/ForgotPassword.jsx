import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import logo from '../assets/logo.png';

const ForgotPassword = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#101622',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            color: '#FFFFFF',
            fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px', // Reducido para ser más compacto
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {/* Brand Logo - Circular Emblem with Text */}
                <div
                    onClick={() => navigate('/')}
                    style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                >
                    {/* Circular Emblem Logo */}
                    <img
                        src={logo}
                        alt="LexContract Logo"
                        style={{
                            width: '70px',
                            height: '70px',
                            objectFit: 'contain'
                        }}
                    />
                    {/* Text Branding */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.5px', margin: 0, color: '#FFFFFF', lineHeight: 1 }}>lexContract</h1>
                        <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '1.8px', margin: 0, color: '#D4AF37', textTransform: 'uppercase', lineHeight: 1 }}>Seguridad Blindada & Justicia</p>
                    </div>
                </div>

                {/* Card Content */}
                <Card style={{
                    width: '100%',
                    padding: '2.5rem 2rem',
                    backgroundColor: '#192233',
                    borderRadius: '1.25rem',
                    border: '1px solid #324467',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>¿Problemas al acceder?</h2>
                    <p style={{ color: '#92a4c9', fontSize: '0.925rem', fontWeight: 500, lineHeight: 1.6, marginBottom: '2rem' }}>
                        Te enviaremos instrucciones para restablecer tu contraseña.
                    </p>

                    <form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'left' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF' }}>Correo electrónico o teléfono</label>
                            <input
                                type="text"
                                placeholder="Escribe tu dato de contacto"
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1.125rem',
                                    backgroundColor: '#101622',
                                    border: '1px solid #324467',
                                    borderRadius: '0.75rem',
                                    color: '#FFFFFF',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#D4AF37';
                                    e.target.style.boxShadow = '0 0 0 2px rgba(212, 175, 55, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#324467';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        <Button
                            type="button"
                            style={{
                                padding: '1rem',
                                fontSize: '1rem',
                                fontWeight: 700,
                                backgroundColor: '#D4AF37',
                                color: '#0A2A4E',
                                borderRadius: '0.75rem',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            Enviar instrucciones
                        </Button>
                    </form>
                </Card>

                {/* Back Link */}
                <div style={{ marginTop: '2.5rem' }}>
                    <span
                        onClick={() => navigate('/login')}
                        style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', borderBottom: '1.5px solid #FFFFFF', paddingBottom: '2px' }}
                    >
                        Volver al inicio de sesión
                    </span>
                </div>
            </div>

            {/* Footer */}
            <footer style={{ marginTop: 'auto', padding: '2rem 0', color: '#92a4c9', fontSize: '0.8rem' }}>
                <p>© 2024 LexContract. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default ForgotPassword;
