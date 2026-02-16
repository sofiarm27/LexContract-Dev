import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText,
    Search,
    Calendar,
    ChevronDown,
    DollarSign,
    Upload,
    CloudIcon,
    Save,
    X,
    Briefcase,
    Trash2,
    Plus,
    Edit2,
    Download,
    Library
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Card from '../components/Card';
import Button from '../components/Button';

const RegisterContract = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pdfRef = useRef(null);

    // Modal state for clauses and saving template
    const [isClauseModalOpen, setIsClauseModalOpen] = useState(false);
    const [isSaveTemplateModalOpen, setIsSaveTemplateModalOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [clauseToDelete, setClauseToDelete] = useState(null);
    const [templateToSave, setTemplateToSave] = useState({ nombre: '', tipo: 'Insolvencia' });
    const [notification, setNotification] = useState(null);
    const [isVariableCatalogOpen, setIsVariableCatalogOpen] = useState(false);
    const [variableSearchTerm, setVariableSearchTerm] = useState('');

    // Mock Repository (Sync with LegalLibrary)
    const clauseRepository = [
        {
            id: 1,
            title: 'OBJETO DEL CONTRATO - INSOLVENCIA',
            content: 'LA EMPRESA se compromete a prestar servicios de asesoría jurídica especializada a EL CLIENTE, centrados en la gestión de [Área de Práctica] y representación ante autoridades competentes.',
            variables: ['Área de Práctica', 'Nombre Cliente', 'Representante Legal']
        },
        {
            id: 2,
            title: 'HONORARIOS Y PAGOS',
            content: 'Como contraprestación, EL CLIENTE pagará la suma de [Valor Honorarios] COP, la cual será cancelada en la modalidad de [Modalidad Pago]. En caso de mora, se aplicará una penalidad de [Valor Penalidad].',
            variables: ['Valor Honorarios', 'Modalidad Pago', 'Valor Penalidad', 'Fecha Inicio']
        },
        {
            id: 3,
            title: 'VIGENCIA Y PRÓRROGA',
            content: 'El presente contrato tendrá una vigencia que inicia el [Fecha Inicio] y finaliza el [Fecha Fin], pudiendo ser prorrogado por mutuo acuerdo escrito.',
            variables: ['Fecha Inicio', 'Fecha Fin', 'Ciudad Notificación']
        },
        {
            id: 101,
            title: 'RESPONSABILIDAD CIVIL',
            content: 'EL CONTRATISTA se obliga a responder por los daños y perjuicios que por su culpa o dolo se llegaren a causar a EL CONTRATANTE...',
            variables: ['Nombre Cliente']
        },
        {
            id: 102,
            title: 'CESIÓN Y SUBCONTRATACIÓN',
            content: 'EL CONTRATISTA no podrá ceder ni subcontratar total o parcialmente la ejecución del presente contrato sin autorización previa...',
            variables: []
        }
    ];

    const templatesRepository = [
        { id: 1, nombre: 'Contrato de Insolvencia Económica', tipo: 'Insolvencia', clauseIds: [1, 2, 3] },
        { id: 2, nombre: 'Acuerdo de Pago General', tipo: 'Prestación de Servicios', clauseIds: [2] },
        { id: 3, nombre: 'Contrato de Arrendamiento Comercial', tipo: 'Arrendamiento', clauseIds: [1, 3] }
    ];

    const globalVariablesCatalog = [
        { name: 'Nombre Cliente', category: 'Cliente', description: 'Nombre completo o razón social' },
        { name: 'DNI Cliente', category: 'Cliente', description: 'Documento de identidad o NIT' },
        { name: 'Dirección Cliente', category: 'Cliente', description: 'Domicilio contractual' },
        { name: 'Área de Práctica', category: 'Contrato', description: 'Especialidad jurídica' },
        { name: 'Costo Total', category: 'Costo', description: 'Valor total del contrato' },
        { name: 'Valor Honorarios', category: 'Costo', description: 'Monto de honorarios pactados' },
        { name: 'Fecha Inicio', category: 'Vigencia', description: 'Fecha de inicio de efectos' },
        { name: 'Fecha Fin', category: 'Vigencia', description: 'Fecha de terminación prevista' },
        { name: 'Ciudad Firma', category: 'Lugar', description: 'Ciudad donde se suscribe' },
        { name: 'Ciudad Notificación', category: 'Lugar', description: 'Ciudad para recibir avisos' },
        { name: 'Representante Legal', category: 'Interno', description: 'Abogado responsable' },
        { name: 'Modalidad Pago', category: 'Costo', description: 'Forma de pago (Único/Cuotas)' },
        { name: 'Valor Penalidad', category: 'Costo', description: 'Sanción por incumplimiento' },
        { name: 'Tasa Interés', category: 'Financiero', description: 'Interés de mora aplicable' },
        { name: 'Plazo Entrega', category: 'Servicios', description: 'Tiempo para entrega de resultados' }
    ];

    // Helper for notifications
    const showToast = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    // Simulate loading data from template
    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        const templateId = parseInt(params.get('template'));

        if (templateId) {
            const template = templatesRepository.find(t => t.id === templateId);
            if (template) {
                setFormData(prev => ({
                    ...prev,
                    titulo: template.nombre,
                    tipo: template.tipo,
                    areaPractica: template.tipo
                }));

                // Copy clauses from repository to contract (Instantiation)
                const instantiatedClauses = template.clauseIds.map(id => {
                    const repoClause = clauseRepository.find(c => c.id === id);
                    return {
                        ...repoClause,
                        id: Date.now() + Math.random(), // Unique instance ID
                        repoId: id, // Track origin for suggested variables
                        source: 'template' // Mark as template source
                    };
                });

                if (instantiatedClauses.length > 0) {
                    setClauses(instantiatedClauses);
                }

                showToast(`Plantilla "${template.nombre}" cargada con éxito`);
            }
        }
    }, [location]);

    const [formData, setFormData] = useState({
        titulo: '',
        cliente: '',
        tipo: 'Insolvencia Económica',
        fechaInicio: '',
        fechaFin: '',
        detalles: '',
        costoTotal: '0.00',
        areaPractica: 'Insolvencia Económica',
        valorHonorarios: '0.00',
        modalidadPago: 'Pago Único',
        valorPenalidad: '0.00',
        representanteLegal: 'ADMIN LEX',
        ciudadFirma: 'Bogotá D.C.',
        ciudadNotificacion: 'Bogotá D.C.',
        dniCliente: ''
    });

    const [paymentOption, setPaymentOption] = useState('unico');
    const [installments, setInstallments] = useState([
        { id: Date.now(), fecha: '', monto: '0.00' }
    ]);

    const [clauses, setClauses] = useState([
        { id: 1, title: 'OBJETO DEL CONTRATO', content: 'LA EMPRESA se compromete a prestar servicios de asesoría jurídica especializada a EL CLIENTE, centrados en la gestión de [Área de Práctica] y representación ante autoridades competentes.', variables: ['Área de Práctica', 'Nombre Cliente', 'Representante Legal', 'Ciudad Firma'], source: 'manual' },
        { id: 2, title: 'HONORARIOS Y PAGOS', content: 'Como contraprestación, EL CLIENTE pagará la suma de [Valor Honorarios] COP, la cual será cancelada en la modalidad de [Modalidad Pago]. En caso de mora, se aplicará una penalidad de [Valor Penalidad].', variables: ['Valor Honorarios', 'Modalidad Pago', 'Valor Penalidad', 'Fecha Inicio'], source: 'manual' },
        { id: 3, title: 'VIGENCIA', content: 'El presente contrato tendrá una vigencia que inicia el [Fecha Inicio] y finaliza el [Fecha Fin], pudiendo ser prorrogado por mutuo acuerdo escrito.', variables: ['Fecha Inicio', 'Fecha Fin', 'Ciudad Notificación'], source: 'manual' }
    ]);

    // Ref for tracking the active textarea and cursor position
    const activeTextareaRef = useRef(null);
    const [activeClauseId, setActiveClauseId] = useState(null);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addInstallment = () => {
        setInstallments([...installments, { id: Date.now(), fecha: '', monto: '0.00' }]);
    };

    const removeInstallment = (id) => {
        setInstallments(installments.filter(inst => inst.id !== id));
    };

    const updateInstallment = (id, field, value) => {
        setInstallments(installments.map(inst => inst.id === id ? { ...inst, [field]: value } : inst));
    };

    const addClause = () => {
        const newId = clauses.length > 0 ? Math.max(...clauses.map(c => c.id)) + 1 : 1;
        setClauses([...clauses, {
            id: newId,
            title: `CLÁUSULA NUEVA ${newId}`,
            content: '',
            variables: ['Nombre Cliente', 'Área de Práctica', 'Fecha Inicio'],
            source: 'manual'
        }]);
    };

    const handleDeleteClick = (clause) => {
        setClauseToDelete(clause);
        setShowDeleteModal(true);
    };

    const confirmDeleteClause = () => {
        setClauses(clauses.filter(c => c.id !== clauseToDelete.id));
        setShowDeleteModal(false);
        setClauseToDelete(null);
        showToast('Cláusula eliminada correctamente');
    };

    const updateClauseContent = (id, newContent) => {
        setClauses(clauses.map(c => c.id === id ? { ...c, content: newContent } : c));
    };

    // Helper to insert variable at cursor
    const insertVariable = (clauseId, variableName) => {
        const clause = clauses.find(c => c.id === clauseId);
        if (!clause) return;

        // Sync metadata: add to variables array if not present
        if (!clause.variables.includes(variableName)) {
            setClauses(clauses.map(c =>
                c.id === clauseId ? { ...c, variables: [...c.variables, variableName] } : c
            ));
        }

        if (!activeTextareaRef.current || activeClauseId !== clauseId) return;

        const textarea = activeTextareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = clause.content;
        const before = text.substring(0, start);
        const after = text.substring(end);
        const newText = `${before}[${variableName}]${after}`;

        updateClauseContent(clauseId, newText);

        setTimeout(() => {
            textarea.focus();
            const newPos = start + variableName.length + 2;
            textarea.setSelectionRange(newPos, newPos);
        }, 0);
    };

    const handleCatalogVariableSelect = (variableName) => {
        if (activeClauseId) {
            insertVariable(activeClauseId, variableName);
            setIsVariableCatalogOpen(false);
            setVariableSearchTerm('');
        }
    };

    // Helper to replace placeholders with live values
    const renderLiveContent = (content) => {
        let live = content;
        // Merge standard fields with any existing formData fields
        const mapping = {
            'Nombre Cliente': formData.cliente,
            'DNI Cliente': formData.dniCliente,
            'Área de Práctica': formData.areaPractica,
            'Representante Legal': formData.representanteLegal,
            'Ciudad Firma': formData.ciudadFirma,
            'Valor Honorarios': formData.valorHonorarios,
            'Modalidad Pago': paymentOption === 'unico' ? 'Pago Único' : 'Abonos',
            'Valor Penalidad': formData.valorPenalidad,
            'Fecha Inicio': formData.fechaInicio,
            'Fecha Fin': formData.fechaFin,
            'Ciudad Notificación': formData.ciudadNotificacion,
            // Include everything in formData to support dynamic fields
            ...formData
        };

        Object.keys(mapping).forEach(key => {
            const val = mapping[key];
            const regex = new RegExp(`\\[${key}\\]`, 'g');
            if (val && val !== '0.00' && val !== '') {
                live = live.replace(regex, val);
            }
        });
        return live;
    };

    const getFormVariables = () => {
        const foundVars = new Set();
        clauses.forEach(c => {
            const regex = /\[(.*?)\]/g;
            let match;
            while ((match = regex.exec(c.content)) !== null) {
                foundVars.add(match[1]);
            }
        });
        return Array.from(foundVars);
    };

    const standardFields = [
        'Nombre Cliente', 'DNI Cliente', 'Área de Práctica', 'Representante Legal',
        'Ciudad Firma', 'Valor Honorarios', 'Modalidad Pago', 'Valor Penalidad',
        'Fecha Inicio', 'Fecha Fin', 'Ciudad Notificación'
    ];

    const allDetectedVars = getFormVariables();
    const extraVars = allDetectedVars.filter(v => !standardFields.includes(v));

    const getMissingVariables = () => {
        const mapping = {
            'Nombre Cliente': formData.cliente,
            'DNI Cliente': formData.dniCliente,
            'Área de Práctica': formData.areaPractica,
            'Representante Legal': formData.representanteLegal,
            'Ciudad Firma': formData.ciudadFirma,
            'Valor Honorarios': formData.valorHonorarios,
            'Valor Penalidad': formData.valorPenalidad,
            'Fecha Inicio': formData.fechaInicio,
            'Fecha Fin': formData.fechaFin,
            'Ciudad Notificación': formData.ciudadNotificacion,
            ...formData
        };

        return allDetectedVars.filter(v =>
            v !== 'Modalidad Pago' && (mapping[v] === undefined || mapping[v] === '' || mapping[v] === '0.00')
        );
    };

    const missingVars = getMissingVariables();

    const exportToPDF = async () => {
        const element = pdfRef.current;
        if (!element) return;

        // Make it visible temporarily for rendering
        element.style.display = 'block';
        element.style.position = 'absolute';
        element.style.left = '-9999px';

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Contrato_${formData.cliente.replace(/\s+/g, '_') || 'Nuevo'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            element.style.display = 'none';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Saving contract...', { formData, clauses, installments });
        navigate('/contracts');
    };

    return (
        <div style={{ color: 'white', position: 'relative', paddingBottom: '4rem' }}>
            {/* Hidden PDF Template */}
            <div ref={pdfRef} style={{
                display: 'none',
                width: '210mm',
                padding: '25mm',
                backgroundColor: 'white',
                color: 'black',
                fontFamily: '"Times New Roman", Times, serif',
                lineHeight: '1.6'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '18pt', fontWeight: 'bold', margin: '0' }}>LEXCONTRACT</h1>
                    <p style={{ fontSize: '10pt', margin: '5px 0' }}>Soluciones Jurídicas Profesionales</p>
                    <div style={{ width: '100%', height: '2px', backgroundColor: 'black', margin: '15px 0' }}></div>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES
                    </h2>
                    <p style={{ fontSize: '12pt', fontWeight: 'bold' }}>No. 2026-{Math.floor(Math.random() * 1000)}</p>
                </div>

                <p style={{ textAlign: 'justify', fontSize: '11pt', marginBottom: '1.5rem' }}>
                    Entre los suscritos <strong>{formData.representanteLegal}</strong>, mayor de edad e identificado como representante de <strong>LEXCONTRACT</strong>, quien en adelante se denominará como EL CONTRATISTA, y <strong>{formData.cliente || '____________________'}</strong> identificado con documento No. <strong>{formData.dniCliente || '__________'}</strong>, quien en adelante se denominará EL CONTRATANTE, han convenido celebrar el presente contrato de prestación de servicios profesionales que se regulará por las cláusulas que a continuación se expresan:
                </p>

                {clauses.map((clause, idx) => (
                    <div key={clause.id} style={{ marginBottom: '1.5rem' }}>
                        <p style={{ textAlign: 'justify', fontSize: '11pt' }}>
                            <strong style={{ textTransform: 'uppercase' }}>
                                {idx === 0 ? 'PRIMERA. ' : idx === 1 ? 'SEGUNDA. ' : idx === 2 ? 'TERCERA. ' : 'CUARTA. '}
                                {clause.title}:
                            </strong> {renderLiveContent(clause.content)}
                        </p>
                    </div>
                ))}

                <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40mm' }}>
                    <div>
                        <div style={{ borderTop: '1px solid black', paddingTop: '5px' }}>
                            <p style={{ fontSize: '10pt', fontWeight: 'bold', margin: '0' }}>EL CONTRATANTE</p>
                            <p style={{ fontSize: '9pt', margin: '0' }}>CC/NIT: {formData.dniCliente || '__________'}</p>
                        </div>
                    </div>
                    <div>
                        <div style={{ borderTop: '1px solid black', paddingTop: '5px' }}>
                            <p style={{ fontSize: '10pt', fontWeight: 'bold', margin: '0' }}>EL CONTRATISTA</p>
                            <p style={{ fontSize: '9pt', margin: '0' }}>LEXCONTRACT</p>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '8pt', color: '#666' }}>
                    <p>Documento generado electrónicamente en {formData.ciudadFirma} - {new Date().toLocaleDateString()}</p>
                    <p>www.lexcontract.com</p>
                </div>
            </div>

            {/* UI Content */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '2rem',
                fontSize: '0.875rem',
                color: '#92a4c9'
            }}>
                <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Inicio</span>
                <span>›</span>
                <span onClick={() => navigate('/contracts')} style={{ cursor: 'pointer' }}>Contratos</span>
                <span>›</span>
                <span style={{ color: '#D4AF37', fontWeight: 600 }}>Crear Nuevo</span>
            </div>

            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#FFFFFF' }}>
                    Crear Nuevo Contrato
                </h1>
                <p style={{ color: '#92a4c9', fontSize: '1rem' }}>
                    Complete los detalles para la generación del nuevo acuerdo jurídico.
                </p>
            </header>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1200px' }}>

                <Card style={{
                    padding: '2rem',
                    background: 'linear-gradient(135deg, #0d1a2d 0%, #101e36 100%)',
                    border: '1px solid #1e2d45'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1.5rem',
                        color: '#D4AF37',
                        fontSize: '1rem',
                        fontWeight: 700
                    }}>
                        <Briefcase size={20} />
                        Información General
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc' }}>
                                Título del Contrato <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="text"
                                name="titulo"
                                required
                                value={formData.titulo}
                                onChange={handleFormChange}
                                placeholder="Ej: Contrato de Arrendamiento, Oficina Central"
                                style={{
                                    padding: '0.75rem 1rem',
                                    backgroundColor: '#0a1423',
                                    border: '1px solid #1e2d45',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '0.9375rem'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc' }}>
                                Cliente <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Search size={18} style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#475569'
                                }} />
                                <input
                                    type="text"
                                    name="cliente"
                                    required
                                    value={formData.cliente}
                                    onChange={handleFormChange}
                                    placeholder="Buscar cliente..."
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 2.8rem',
                                        backgroundColor: '#0a1423',
                                        border: '1px solid #1e2d45',
                                        borderRadius: '0.5rem',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '0.9375rem'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc' }}>
                                Identificación (DNI/CC) <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="text"
                                name="dniCliente"
                                required
                                value={formData.dniCliente}
                                onChange={handleFormChange}
                                placeholder="Ej: 1.090.XXX.XXX"
                                style={{
                                    padding: '0.75rem 1rem',
                                    backgroundColor: '#0a1423',
                                    border: '1px solid #1e2d45',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '0.9375rem'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc' }}>
                                Tipo de Contrato <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ position: 'relative' }}>
                                <select
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleFormChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        backgroundColor: '#0a1423',
                                        border: '1px solid #1e2d45',
                                        borderRadius: '0.5rem',
                                        color: 'white',
                                        outline: 'none',
                                        appearance: 'none',
                                        cursor: 'pointer',
                                        fontSize: '0.9375rem'
                                    }}
                                >
                                    <option value="Insolvencia Económica">Insolvencia Económica</option>
                                    <option value="Arrendamiento">Arrendamiento</option>
                                    <option value="Prestación de Servicios">Prestación de Servicios</option>
                                </select>
                                <ChevronDown size={20} style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#94a3b8',
                                    pointerEvents: 'none'
                                }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc' }}>
                                Vigencia: Fecha Inicio <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="date"
                                name="fechaInicio"
                                required
                                value={formData.fechaInicio}
                                onChange={handleFormChange}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    backgroundColor: '#0a1423',
                                    border: '1px solid #1e2d45',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>
                </Card>

                <Card style={{
                    padding: '2rem',
                    background: 'linear-gradient(135deg, #0d1a2d 0%, #101e36 100%)',
                    border: '1px solid #1e2d45'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1.5rem',
                        color: '#D4AF37',
                        fontSize: '1rem',
                        fontWeight: 700
                    }}>
                        <DollarSign size={20} />
                        Información de Costos y Pagos
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc' }}>
                                Costo Total del Proceso (COP)
                            </label>
                            <input
                                type="text"
                                name="costoTotal"
                                value={formData.costoTotal}
                                onChange={handleFormChange}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    backgroundColor: '#0a1423',
                                    border: '1px solid #1e2d45',
                                    borderRadius: '0.5rem',
                                    color: 'white'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc' }}>
                                Opción de Pago
                            </label>
                            <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                    <div
                                        onClick={() => setPaymentOption('unico')}
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            border: `2px solid ${paymentOption === 'unico' ? '#D4AF37' : '#475569'}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {paymentOption === 'unico' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#D4AF37' }} />}
                                    </div>
                                    <span style={{ fontSize: '0.9375rem', color: paymentOption === 'unico' ? 'white' : '#94a3b8' }}>Pago Único</span>
                                </label>

                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                    <div
                                        onClick={() => setPaymentOption('abonos')}
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            border: `2px solid ${paymentOption === 'abonos' ? '#D4AF37' : '#475569'}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {paymentOption === 'abonos' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#D4AF37' }} />}
                                    </div>
                                    <span style={{ fontSize: '0.9375rem', color: paymentOption === 'abonos' ? 'white' : '#94a3b8' }}>Abonos</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {paymentOption === 'abonos' && (
                        <div style={{
                            marginTop: '2rem',
                            paddingTop: '2rem',
                            borderTop: '1px solid #1e2d45',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>Desglose de Abonos / Cuotas</h4>
                                <Button
                                    type="button"
                                    onClick={addInstallment}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.75rem',
                                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                        color: '#D4AF37',
                                        border: '1px solid #D4AF37'
                                    }}
                                >
                                    <Plus size={14} /> Añadir Cuota
                                </Button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {installments.map((inst, index) => (
                                    <div key={inst.id} style={{
                                        display: 'grid',
                                        gridTemplateColumns: '40px 1fr 1fr 40px',
                                        gap: '1rem',
                                        alignItems: 'center',
                                        backgroundColor: '#0a1423',
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #1e2d45'
                                    }}>
                                        <div style={{ color: '#D4AF37', fontWeight: 800 }}>{index + 1}.</div>
                                        <div style={{ position: 'relative' }}>
                                            <Calendar size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                                            <input
                                                type="date"
                                                value={inst.fecha}
                                                onChange={(e) => updateInstallment(inst.id, 'fecha', e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.5rem 0.5rem 0.5rem 2.25rem',
                                                    backgroundColor: 'transparent',
                                                    border: '1px solid #1e2d45',
                                                    borderRadius: '0.375rem',
                                                    color: 'white',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>
                                        <div style={{ position: 'relative' }}>
                                            <DollarSign size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                                            <input
                                                type="text"
                                                value={inst.monto}
                                                onChange={(e) => updateInstallment(inst.id, 'monto', e.target.value)}
                                                placeholder="0.00"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.5rem 0.5rem 0.5rem 2.25rem',
                                                    backgroundColor: 'transparent',
                                                    border: '1px solid #1e2d45',
                                                    borderRadius: '0.375rem',
                                                    color: 'white',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeInstallment(inst.id)}
                                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Card>

                {/* Missing Data Validation Alert */}
                {missingVars.length > 0 && (
                    <Card style={{
                        padding: '1.5rem 2rem',
                        backgroundColor: 'rgba(239, 68, 68, 0.05)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        marginTop: '2rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ef4444', fontWeight: 700 }}>
                            <X size={20} />
                            Faltan datos en el formulario para completar las variables
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>
                            Los campos listados a continuación se encuentran en las secciones de <strong>Información del Cliente</strong>, <strong>Detalles del Contrato</strong> o <strong>Costos y Pagos</strong> superiores:
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {missingVars.map(v => (
                                <span key={v} style={{
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '1rem',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    border: '1px solid rgba(239, 68, 68, 0.2)'
                                }}>
                                    {v}
                                </span>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Dynamic Additional Fields Section */}
                {extraVars.length > 0 && (
                    <Card style={{
                        padding: '2rem',
                        background: 'linear-gradient(135deg, #0d1a2d 0%, #101e36 100%)',
                        border: '1px solid #1e2d45',
                        marginTop: '2rem'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1.5rem',
                            color: '#22c55e',
                            fontSize: '1rem',
                            fontWeight: 700
                        }}>
                            <Plus size={20} />
                            Campos Adicionales del Contrato
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                            A continuación se listan campos detectados en las cláusulas que requieren información adicional:
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            {extraVars.map(v => (
                                <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc' }}>
                                        {v} <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name={v}
                                        value={formData[v] || ''}
                                        onChange={handleFormChange}
                                        placeholder={`Escriba ${v.toLowerCase()}...`}
                                        style={{
                                            padding: '0.75rem 1rem',
                                            backgroundColor: '#0a1423',
                                            border: '1px solid #1e2d45',
                                            borderRadius: '0.5rem',
                                            color: 'white',
                                            outline: 'none',
                                            fontSize: '0.9375rem'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Clause Editor */}
                <div style={{ marginTop: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.25rem' }}>Editor de Cláusulas Personalizado</h2>
                            <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Gestione los bloques legales del documento.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Button variant="outline" type="button" onClick={exportToPDF} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(37, 99, 235, 0.1)', color: '#60a5fa', borderColor: '#2563eb' }}>
                                <Download size={18} />
                                Exportar a PDF
                            </Button>
                            <Button type="button" onClick={() => setIsSaveTemplateModalOpen(true)} style={{ backgroundColor: '#D4AF37', color: '#0a1423', border: 'none', fontWeight: 700 }}>
                                <Save size={18} />
                                Guardar como Plantilla
                            </Button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {clauses.map((clause, idx) => (
                            <div key={clause.id} style={{
                                background: 'linear-gradient(135deg, #0d1a2d 0%, #101e36 100%)',
                                borderRadius: '1rem',
                                border: '1px solid #1e2d45'
                            }}>
                                <div style={{
                                    padding: '1.25rem 2rem',
                                    backgroundColor: 'rgba(30, 45, 69, 0.3)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottom: '1px solid #1e2d45'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{
                                            backgroundColor: clause.source === 'template' ? 'rgba(34, 197, 94, 0.1)' : clause.source === 'library' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(212, 175, 55, 0.1)',
                                            color: clause.source === 'template' ? '#22c55e' : clause.source === 'library' ? '#60a5fa' : '#D4AF37',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}>
                                            {clause.source === 'template' ? 'PLANTILLA' : clause.source === 'library' ? 'BIBLIOTECA' : 'MANUAL'}
                                        </div>
                                        <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>
                                            <span style={{ color: '#D4AF37', marginRight: '0.5rem' }}>Cláusula {idx + 1}:</span>
                                            {clause.title}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                        <button type="button" onClick={() => handleDeleteClick(clause)} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                    </div>
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <textarea
                                        value={clause.content}
                                        onChange={(e) => updateClauseContent(clause.id, e.target.value)}
                                        onFocus={() => {
                                            activeTextareaRef.current = document.activeElement;
                                            setActiveClauseId(clause.id);
                                        }}
                                        style={{
                                            width: '100%',
                                            minHeight: '120px',
                                            backgroundColor: '#0a1423',
                                            border: '1px solid #1e2d45',
                                            borderRadius: '0.75rem',
                                            color: '#cbd5e1',
                                            padding: '1.5rem',
                                            fontSize: '1rem',
                                            lineHeight: 1.6,
                                            outline: 'none'
                                        }}
                                    />

                                    <div style={{
                                        padding: '1.5rem',
                                        backgroundColor: 'rgba(10, 20, 35, 0.3)',
                                        borderRadius: '0.75rem',
                                        border: '1px dashed #1e2d45',
                                        marginTop: '1.5rem',
                                        marginBottom: '1.5rem'
                                    }}>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>VISTA PREVIA</span>
                                        <p style={{ color: '#94a3b8', fontSize: '0.9375rem', lineHeight: 1.7 }}>
                                            {renderLiveContent(clause.content)}
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                        {clause.variables.map(v => {
                                            const repoItem = clauseRepository.find(rc => rc.id === clause.repoId);
                                            const isSuggested = repoItem?.variables.includes(v);

                                            return (
                                                <button
                                                    key={v}
                                                    type="button"
                                                    onClick={() => insertVariable(clause.id, v)}
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        backgroundColor: isSuggested ? 'rgba(37, 99, 235, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                                                        border: `1px solid ${isSuggested ? 'rgba(37, 99, 235, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                                                        borderRadius: '0.5rem',
                                                        color: isSuggested ? '#60a5fa' : '#22c55e',
                                                        fontSize: '0.8125rem',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.4rem'
                                                    }}
                                                >
                                                    [{v}]
                                                </button>
                                            );
                                        })}

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setActiveClauseId(clause.id);
                                                setIsVariableCatalogOpen(true);
                                            }}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: 'rgba(71, 85, 105, 0.2)',
                                                border: '1px solid rgba(71, 85, 105, 0.4)',
                                                borderRadius: '0.5rem',
                                                color: '#94a3b8',
                                                fontSize: '0.8125rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            <Plus size={14} /> Variables
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <Button
                                type="button"
                                onClick={addClause}
                                style={{
                                    padding: '3rem',
                                    backgroundColor: 'rgba(255,255,255,0.02)',
                                    border: '2px dashed #1e2d45',
                                    borderRadius: '1rem',
                                    color: '#475569',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    cursor: 'pointer',
                                    flex: 1
                                }}
                            >
                                <Plus size={32} />
                                <span style={{ fontWeight: 700 }}>Añadir Nueva Cláusula</span>
                            </Button>

                            <button
                                type="button"
                                onClick={() => setIsClauseModalOpen(true)}
                                style={{
                                    padding: '3rem',
                                    backgroundColor: 'rgba(212, 175, 55, 0.05)',
                                    border: '2px dashed rgba(212, 175, 55, 0.3)',
                                    borderRadius: '1rem',
                                    color: '#D4AF37',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    cursor: 'pointer',
                                    flex: 1
                                }}
                            >
                                <Library size={32} />
                                <span style={{ fontWeight: 700 }}>Insertar Cláusula Reservada</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem',
                    marginTop: '2rem',
                    paddingBottom: '2rem'
                }}>
                    <Button onClick={() => navigate('/contracts')} variant="outline" style={{ padding: '0.75rem 2.5rem', color: 'white', borderColor: '#1e2d45' }}>
                        Cancelar
                    </Button>
                    <Button type="button" onClick={exportToPDF} style={{ padding: '0.75rem 2.5rem', backgroundColor: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem', border: 'none' }}>
                        <Download size={20} />
                        Exportar a PDF
                    </Button>
                    <Button type="submit" style={{ padding: '0.75rem 2.5rem', backgroundColor: '#D4AF37', color: '#0a1423', display: 'flex', alignItems: 'center', gap: '0.75rem', border: 'none' }}>
                        <Save size={20} />
                        Guardar Contrato
                    </Button>
                </div>
            </form>

            {/* Clause Selection Modal */}
            {isClauseModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }}>
                    <Card style={{
                        width: '100%',
                        maxWidth: '700px',
                        maxHeight: '80vh',
                        padding: '0',
                        overflow: 'hidden',
                        border: '1px solid #1e2d45',
                        background: '#0d1a2d'
                    }}>
                        <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid #1e2d45', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(30, 45, 69, 0.3)' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-gold)' }}>Repositorio de Cláusulas</h3>
                            <button onClick={() => setIsClauseModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>
                        <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {clauseRepository.map(repo => (
                                <div
                                    key={repo.id}
                                    onClick={() => {
                                        const newId = Date.now() + Math.random();
                                        setClauses([...clauses, {
                                            ...repo,
                                            id: newId,
                                            source: 'library'
                                        }]);
                                        setIsClauseModalOpen(false);
                                        showToast(`Cláusula "${repo.title}" insertada`);
                                    }}
                                    style={{
                                        padding: '1.5rem',
                                        backgroundColor: '#0a1423',
                                        borderRadius: '0.75rem',
                                        border: '1px solid #1e2d45',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s ease'
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.borderColor = '#D4AF37'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.borderColor = '#1e2d45'; }}
                                >
                                    <h5 style={{ color: 'white', fontWeight: 700, marginBottom: '0.5rem' }}>{repo.title}</h5>
                                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.5 }}>{repo.content}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {/* Save as Template Modal */}
            {isSaveTemplateModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ width: '400px', padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Guardar como Plantilla</h2>
                            <button onClick={() => setIsSaveTemplateModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Nombre de la Plantilla</label>
                                <input
                                    type="text"
                                    value={templateToSave.nombre}
                                    onChange={(e) => setTemplateToSave({ ...templateToSave, nombre: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0a1423', border: '1px solid #1e2d45', borderRadius: '0.5rem', color: 'white' }}
                                    placeholder="Ej: Contrato de Arrendamiento VIP"
                                />
                            </div>
                            <Button onClick={handleSaveAsTemplate} style={{ backgroundColor: '#D4AF37', color: '#000', marginTop: '1rem' }}>
                                <Save size={18} />
                                Confirmar y Guardar
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
                            ¿Estás seguro de que deseas eliminar la cláusula <span style={{ color: '#D4AF37', fontWeight: 600 }}>{clauseToDelete?.title}</span>? Esta acción no se puede deshacer.
                        </p>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '1rem'
                        }}>
                            <button
                                type="button"
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
                                type="button"
                                onClick={confirmDeleteClause}
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

            {/* Notification Toast */}
            {notification && (
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    backgroundColor: '#1e2d45',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #D4AF37',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    <Save size={18} style={{ color: '#D4AF37' }} />
                    {notification}
                </div>
            )}
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
            {/* Global Variable Catalog Modal */}
            {isVariableCatalogOpen && (
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
                    zIndex: 3000,
                    padding: '2rem'
                }}>
                    <div style={{
                        backgroundColor: '#0d1a2d',
                        width: '100%',
                        maxWidth: '500px',
                        maxHeight: '80vh',
                        borderRadius: '1.25rem',
                        border: '1px solid #1e2d45',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}>
                        <div style={{
                            padding: '1.5rem 2rem',
                            borderBottom: '1px solid #1e2d45',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'rgba(30, 45, 69, 0.3)'
                        }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#D4AF37' }}>Catálogo de Variables</h3>
                            <button onClick={() => setIsVariableCatalogOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #1e2d45' }}>
                            <div style={{ position: 'relative' }}>
                                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                                <input
                                    type="text"
                                    placeholder="Buscar variable..."
                                    value={variableSearchTerm}
                                    onChange={(e) => setVariableSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 2.8rem',
                                        backgroundColor: '#0a1423',
                                        border: '1px solid #1e2d45',
                                        borderRadius: '0.5rem',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ padding: '1rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {globalVariablesCatalog
                                .filter(v => v.name.toLowerCase().includes(variableSearchTerm.toLowerCase()) || v.category.toLowerCase().includes(variableSearchTerm.toLowerCase()))
                                .map(v => (
                                    <div
                                        key={v.name}
                                        onClick={() => handleCatalogVariableSelect(v.name)}
                                        style={{
                                            padding: '1rem',
                                            borderRadius: '0.75rem',
                                            backgroundColor: 'rgba(30, 45, 69, 0.4)',
                                            border: '1px solid transparent',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                        onMouseOver={(e) => { e.currentTarget.style.borderColor = '#22c55e'; e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.05)'; }}
                                        onMouseOut={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.backgroundColor = 'rgba(30, 45, 69, 0.4)'; }}
                                    >
                                        <div>
                                            <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9375rem' }}>{v.name}</div>
                                            <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{v.description}</div>
                                        </div>
                                        <div style={{
                                            fontSize: '0.625rem',
                                            fontWeight: 800,
                                            padding: '0.2rem 0.5rem',
                                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                            color: '#60a5fa',
                                            borderRadius: '0.25rem',
                                            textTransform: 'uppercase'
                                        }}>
                                            {v.category}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterContract;
