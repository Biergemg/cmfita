/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, '../messages/en.json');
const esPath = path.join(__dirname, '../messages/es.json');

const enData = {
    "Index": {
        "title": "Industrial Infrastructure Execution",
        "description": "Technical execution for industrial and institutional projects."
    },
    "Navbar": {
        "capabilities": "Capabilities",
        "projects": "Projects",
        "methodology": "Methodology",
        "model": "Team Model"
    },
    "Footer": {
        "description": "Execution company specialized in the fabrication, installation, and construction of industrial and institutional infrastructure.",
        "contact": "Contact",
        "quickLinks": "Quick Links",
        "capabilities": "Technical Capabilities",
        "projects": "Project Experience",
        "methodology": "Execution Methodology"
    },
    "Hero": {
        "headline": "Execution of industrial and institutional infrastructure based on client engineering.",
        "subheadline": "We execute high-complexity structural infrastructure and civil projects strictly according to the architecture and engineering specifications provided by the client.",
        "cta": "Request Execution Proposal",
        "explore": "Explore Capabilities",
        "ctaProposal": "Request Technical Proposal",
        "ctaWhatsapp": "Contact via WhatsApp"
    },
    "Overview": {
        "title": "Execution based on client engineering",
        "description1": "Construcción y Mantenimientos FITA is an execution company specialized in the fabrication, installation, and construction of industrial and institutional infrastructure.",
        "description2": "Engineering and architectural design are provided by the client or their engineering firm. FITA executes projects strictly according to those specifications.",
        "stats": {}
    },
    "Institutional": {
        "standardsTitle": "Execution Standards",
        "standardsDesc": "Industrial infrastructure execution demands operational discipline, technical control, and strict compliance with specifications. FITA executes each project following the technical standards defined by the client, ensuring that fabrication, installation, and verification processes align with established engineering documents.",
        "sectorsTitle": "Infrastructure Sectors",
        "sectorsDesc": "FITA executes projects across various industrial and institutional environments, adapting our field teams and operational processes to the specific technical standards of each sector.",
        "collabTitle": "Collaboration with Client Engineering",
        "collabDesc": "In industrial infrastructure projects, engineering is the starting point. FITA collaborates directly with the client's engineering teams or external engineering firms, executing infrastructure according to the blueprints, technical specifications, and operational standards defined for the project."
    },
    "Model": {
        "title": "Operational Team Model",
        "subtitle": "Each project requires different technical capabilities.",
        "description1": "For this reason, FITA structures its field teams based on the specific requirements of each project, integrating qualified personnel experienced in the disciplines required by the scope of work.",
        "description2": "This operational model allows flexible execution capacity while ensuring that each project is executed by specialists aligned with the client's technical standards. Each project defines the team that executes it.",
        "badge": "Operational Structure"
    },
    "Capabilities": {
        "title": "Global Execution Capabilities",
        "subtitle": "Technical delivery for industrial, energy, and institutional infrastructure.",
        "items": [
            { "title": "Structural fabrication", "description": "Fabrication of structural steel components according to engineering drawings." },
            { "title": "Structural installation", "description": "Assembly and installation of structural steel infrastructure." },
            { "title": "Surface preparation and protective coating systems", "description": "Industrial surface preparation and application of technical protective coatings." },
            { "title": "Structural maintenance and reinforcement", "description": "Corrective structural maintenance and reinforcement of existing infrastructure." },
            { "title": "Electrical infrastructure installation (construction phase)", "description": "Installation of conduit, electrical channeling, cable pulling, termination and connection of wiring during construction. These works occur before systems are energized." },
            { "title": "Technical and institutional infrastructure construction", "description": "Execution of civil infrastructure such as sports courts, domed structures, classrooms, guardhouses, sidewalks and institutional buildings according to architectural plans provided by the client." }
        ]
    },
    "Projects": {
        "title": "Infrastructure Execution Experience",
        "subtitle": "A track record of critical infrastructure delivery",
        "items": [
            { "title": "Replacement of suspended structural flooring", "description": "Replacement of suspended structural flooring in offshore infrastructure." },
            { "title": "Fabrication and installation of modular structural steel components", "description": "Fabrication and installation of modular structural steel components." },
            { "title": "Surface preparation and protective coating systems", "description": "Surface preparation and protective coating systems applied to exposed infrastructure." },
            { "title": "Structural protection systems", "description": "Structural protection systems installed for pipeline infrastructure." },
            { "title": "Technical coating systems", "description": "Technical coating systems applied to helipad surfaces." },
            { "title": "Construction of institutional infrastructure", "description": "Construction of institutional infrastructure including classrooms, sports courts, domed structures, guardhouses and sidewalks based on client architectural plans." }
        ]
    },
    "Safety": {
        "title": "Execution Protocols",
        "subtitle": "Methodical compliance with client standards",
        "items": [
            { "title": "Safety Requirements", "description": "Compliance with safety requirements defined by the client." },
            { "title": "Quality Verification", "description": "Quality verification through inspection and dimensional control." },
            { "title": "Environmental Compliance", "description": "Environmental compliance procedures during execution." }
        ]
    },
    "Methodology": {
        "title": "Execution Discipline",
        "subtitle": "Systematic execution workflow for critical projects",
        "steps": [
            { "title": "Project evaluation", "description": "Site assessment and evaluation of client engineering requirements." },
            { "title": "Technical planning", "description": "Definition of schedules and resources." },
            { "title": "Fabrication and preparation", "description": "Fabrication in yard or workshop and initial preparation." },
            { "title": "Site installation", "description": "Structural erection and execution of works." },
            { "title": "Quality verification", "description": "Inspections and dimensional checks." },
            { "title": "Project completion and documentation", "description": "Final handover and documentation." }
        ]
    },
    "Procurement": {
        "title": "Procurement Ready",
        "description": "FITA S.A. de C.V. maintains clear financial and operational standards, prepared to integrate seamlessly into corporate supply chains as a qualified execution company.",
        "bullet1": "Regulatory and fiscal compliance",
        "bullet2": "Operational procedures aligned with industrial standards",
        "bullet3": "Financial and operational stability"
    },
    "Contact": {
        "title": "Execution Proposals",
        "subtitle": "Contact our team for evaluations and execution proposals based on your engineering docs.",
        "directContact": "Direct Contact",
        "engineerLabel": "Engineer",
        "phoneLabel": "Phone / WhatsApp",
        "emailLabel": "Email",
        "name": "Ing. Gustavo Bierge",
        "phone": "+52 833 518 1171",
        "email": "cmfitasadecv@gmail.com",
        "ctaProposal": "Request Technical Proposal",
        "ctaWhatsapp": "Contact via WhatsApp"
    }
};

const esData = {
    "Index": {
        "title": "Ejecución de Infraestructura Industrial",
        "description": "Ejecución técnica para proyectos industriales e institucionales."
    },
    "Navbar": {
        "capabilities": "Capacidades",
        "projects": "Proyectos",
        "methodology": "Metodología",
        "model": "Modelo Operativo"
    },
    "Footer": {
        "description": "Empresa de ejecución especializada en la fabricación, instalación y construcción de infraestructura industrial e institucional.",
        "contact": "Contacto",
        "quickLinks": "Enlaces Rápidos",
        "capabilities": "Capacidades Técnicas",
        "projects": "Experiencia en Proyectos",
        "methodology": "Metodología"
    },
    "Hero": {
        "headline": "Ejecución de infraestructura industrial e institucional basada en la ingeniería del cliente.",
        "subheadline": "Ejecutamos proyectos de infraestructura estructural y civil estrictamente de acuerdo con las especificaciones de ingeniería y arquitectura proporcionadas por el cliente.",
        "cta": "Solicitar Propuesta",
        "explore": "Explorar Capacidades",
        "ctaProposal": "Solicitar propuesta técnica",
        "ctaWhatsapp": "Contactar por WhatsApp"
    },
    "Overview": {
        "title": "Ejecución basada en ingeniería del cliente",
        "description1": "Construcción y Mantenimientos FITA es una empresa de ejecución especializada en la fabricación, instalación y construcción de infraestructura industrial e institucional.",
        "description2": "El diseño de ingeniería y arquitectura es proporcionado por el cliente o su firma de ingeniería. FITA ejecuta los proyectos estrictamente de acuerdo con esas especificaciones.",
        "stats": {}
    },
    "Institutional": {
        "standardsTitle": "Estándares de Ejecución",
        "standardsDesc": "La ejecución de infraestructura industrial exige disciplina operativa, control técnico y cumplimiento estricto de especificaciones. FITA ejecuta cada proyecto siguiendo los estándares técnicos definidos por el cliente, asegurando que los procesos de fabricación, instalación y verificación se alineen con los requisitos establecidos en los documentos de ingeniería.",
        "sectorsTitle": "Sectores de Infraestructura",
        "sectorsDesc": "FITA ejecuta proyectos en distintos entornos industriales e institucionales, adaptando sus equipos de trabajo y procesos operativos a los estándares técnicos específicos de cada sector.",
        "collabTitle": "Colaboración con Ingeniería del Cliente",
        "collabDesc": "En proyectos de infraestructura industrial, la ingeniería es el punto de partida. FITA colabora directamente con los equipos de ingeniería del cliente o con firmas de ingeniería externas, ejecutando la infraestructura conforme a los planos, especificaciones técnicas y estándares operativos definidos en el proyecto."
    },
    "Model": {
        "title": "Modelo de Equipo Operativo",
        "subtitle": "Cada proyecto requiere diferentes capacidades técnicas.",
        "description1": "Por esta razón, FITA estructura sus equipos de campo de acuerdo con los requisitos de cada proyecto, integrando personal calificado con experiencia en las disciplinas necesarias para el alcance del trabajo.",
        "description2": "Este modelo operativo permite flexibilidad de ejecución mientras garantiza que cada proyecto sea ejecutado por especialistas alineados con los estándares técnicos del cliente. Cada proyecto define el equipo que lo ejecuta.",
        "badge": "Estructura Operativa"
    },
    "Capabilities": {
        "title": "Capacidades Globales de Ejecución",
        "subtitle": "Entrega técnica para infraestructura industrial, energética e institucional.",
        "items": [
            { "title": "Fabricación estructural", "description": "Fabricación de componentes de acero estructural conforme a planos de ingeniería." },
            { "title": "Instalación estructural", "description": "Montaje e instalación de infraestructura de acero estructural." },
            { "title": "Preparación de superficies y sistemas de recubrimiento protector", "description": "Preparación de superficies industriales y aplicación de recubrimientos protectores técnicos." },
            { "title": "Mantenimiento y refuerzo estructural", "description": "Mantenimiento correctivo y refuerzo de infraestructura estructural existente." },
            { "title": "Instalación de infraestructura eléctrica (fase de construcción)", "description": "Instalación de conduit, canalización eléctrica, tendido de cable, terminación y conexión de cableado durante la construcción. Estos trabajos se realizan antes de que los sistemas sean energizados." },
            { "title": "Construcción de infraestructura técnica e institucional", "description": "Ejecución de infraestructura civil como aulas, canchas deportivas, estructuras abovedadas, casetas de vigilancia, banquetas y edificios institucionales conforme a planos arquitectónicos proporcionados por el cliente." }
        ]
    },
    "Projects": {
        "title": "Experiencia en ejecución de infraestructura",
        "subtitle": "Histórico sustentable de entrega de infraestructura crítica",
        "items": [
            { "title": "Reemplazo de pisos estructurales suspendidos", "description": "Reemplazo de pisos estructurales suspendidos en infraestructura costa afuera." },
            { "title": "Fabricación e instalación de componentes modulares", "description": "Fabricación e instalación de componentes modulares de acero estructural." },
            { "title": "Preparación de superficies y aplicación de recubrimientos protectores", "description": "Preparación de superficies y aplicación de recubrimientos protectores en infraestructura expuesta." },
            { "title": "Sistemas de protección estructural", "description": "Sistemas de protección estructural instalados para infraestructura de ductos." },
            { "title": "Sistemas de recubrimiento técnico", "description": "Sistemas de recubrimiento técnico aplicados a superficies de helipuertos." },
            { "title": "Construcción de infraestructura institucional", "description": "Construcción de infraestructura institucional incluyendo aulas, canchas deportivas, estructuras abovedadas, casetas de vigilancia y banquetas basadas en planos arquitectónicos del cliente." }
        ]
    },
    "Safety": {
        "title": "Protocolos de Ejecución",
        "subtitle": "Cumplimiento metódico con estándares del cliente",
        "items": [
            { "title": "Requisitos de Seguridad", "description": "Cumplimiento con los requisitos de seguridad definidos por el cliente." },
            { "title": "Verificación de Calidad", "description": "Verificación de calidad mediante inspección y control dimensional." },
            { "title": "Cumplimiento Ambiental", "description": "Procedimientos de cumplimiento ambiental durante la ejecución." }
        ]
    },
    "Methodology": {
        "title": "Disciplina de Ejecución",
        "subtitle": "Flujo de trabajo de ejecución sistemático para proyectos críticos",
        "steps": [
            { "title": "Evaluación del proyecto", "description": "Evaluación del sitio y de los requisitos de ingeniería del cliente." },
            { "title": "Planificación técnica", "description": "Definición de cronogramas y recursos." },
            { "title": "Fabricación y preparación", "description": "Fabricación en patio o taller y preparación inicial." },
            { "title": "Instalación en sitio", "description": "Montaje estructural y ejecución de obra." },
            { "title": "Verificación de calidad", "description": "Inspección y controles dimensionales." },
            { "title": "Finalización y documentación", "description": "Entrega del proyecto y documentación final." }
        ]
    },
    "Procurement": {
        "title": "Lista para Licitaciones",
        "description": "FITA S.A. de C.V. mantiene claros estándares financieros y operativos, preparada para integrarse en cadenas de suministro corporativas como empresa de ejecución calificada.",
        "bullet1": "Cumplimiento normativo y fiscal.",
        "bullet2": "Procedimientos operativos alineados con estándares industriales.",
        "bullet3": "Estabilidad financiera y operativa."
    },
    "Contact": {
        "title": "Propuestas de Ejecución",
        "subtitle": "Contacte a nuestro equipo para evaluaciones y propuestas de ejecución basadas en sus especificaciones de ingeniería.",
        "directContact": "Contacto directo",
        "engineerLabel": "Ingeniero",
        "phoneLabel": "Teléfono / WhatsApp",
        "emailLabel": "Correo electrónico",
        "name": "Ing. Gustavo Bierge",
        "phone": "+52 833 518 1171",
        "email": "cmfitasadecv@gmail.com",
        "ctaProposal": "Solicitar propuesta técnica",
        "ctaWhatsapp": "Contactar por WhatsApp"
    }
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));

console.log('Translations successfully updated to reflect EXACT verbatim validation script.');
