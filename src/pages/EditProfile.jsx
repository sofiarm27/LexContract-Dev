import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Save, X, Camera } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const EditProfile = () => {
    const navigate = useNavigate();

    return (
        <div style={{ color: 'white', maxWidth: '700px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Editar Mi Perfil</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Actualice sus datos personales y profesionales.</p>
            </header>

            <Card style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '2rem', fontWeight: 800 }}>
                            AL
                        </div>
                        <button style={{ position: 'absolute', bottom: '0', right: '0', backgroundColor: 'var(--accent-gold)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', cursor: 'pointer' }}>
                            <Camera size={16} />
                        </button>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>Click para cambiar avatar</p>
                </div>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Nombre</label>
                            <input type="text" defaultValue="Admin Lex" style={{ padding: '0.875rem 1rem', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white', outline: 'none' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Apellido</label>
                            <input type="text" defaultValue="Contract" style={{ padding: '0.875rem 1rem', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white', outline: 'none' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Correo Electrónico</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-gold)' }} />
                            <input type="email" defaultValue="admin@lexcontract.com" style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 2.8rem', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white', outline: 'none' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Celular</label>
                        <div style={{ position: 'relative' }}>
                            <Phone size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-gold)' }} />
                            <input type="text" defaultValue="+57 300 000 0000" style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 2.8rem', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white', outline: 'none' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Biografía Profesional</label>
                        <textarea
                            rows="4"
                            defaultValue="Responsable de la supervisión global de contratos y gestión de usuarios dentro de la plataforma LexContract."
                            style={{ padding: '0.875rem 1rem', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white', outline: 'none', resize: 'vertical' }}
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                        <Button variant="outline" onClick={() => navigate('/profile')}>
                            <X size={18} />
                            Descartar Cambios
                        </Button>
                        <Button variant="primary" onClick={() => navigate('/profile')}>
                            <Save size={18} />
                            Guardar Cambios
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default EditProfile;
