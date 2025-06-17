import {useState} from 'react';
import formSteps from './formData.jsx'
import {jsPDF} from "jspdf";

    function Form({onClose, onComplete}) {
     const [currentStep, setCurrentStep] = useState(0);
     const [formData, setFormData] = useState({});

     const step = formSteps[currentStep];
     const lastStep = currentStep === formSteps.length - 1;

     const handleInputField = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
     };

     const handleSubmit = (e) => {
        e.preventDefault();

       if (lastStep){
        onComplete(formData);
       } else {
        setCurrentStep(currentStep + 1);
       }
     }

     return (
        <form onSubmit={handleSubmit} id='form'>
            <h2>{step.title}</h2>

            {step.fields.map((field, index)=>{

                return (
                    <div key={index} className="allInputs">
                        <label htmlFor={field.label}>{field.name}</label>
                    
                        <input type={field.type}
                        id={field.label}
                        name={field.label}
                        value={formData[field.label] || ''}
                        onChange={(e)=> handleInputField(field.label, e.target.value)}
                        placeholder = {field.name}
                         />
                    </div>
                );
            })}

            <div>
                {currentStep > 0 && (
                    <button 
                    type='button'
                    onClick={()=> setCurrentStep(currentStep - 1)}
                    className='toBackButton'
                    >
                        Voltar
                    </button>
                ) }

                <button type='submit' className='nextButton'>
                {lastStep ? 'Finalizar' : 'Próximo'}
                </button>

                <button type='button' onClick={onClose} className='closeButton'>
                Fechar
                </button>
            </div>
        </form>
     );
    }

    export default function FormGeneralFunction(){
        const [showForm, setShowForm] = useState(false);
        const [curriculumData, setCurriculumData] = useState(null);

        const handleOpenOrClose = (data) => {
            setCurriculumData(data);
            setShowForm(false);
        };

        const downloadPDF = ()=>{
            const doc = new jsPDF();

            let y = 20;
            const height = 5;

            //Formatação, cores, etccc
            doc.setTextColor(44, 62, 80);
            doc.setFillColor(245, 247, 250);
            doc.setDrawColor(200, 200, 200);
            doc.addFont("Roboto-Regular.ttf", "Roboto");
            doc.setFont("Roboto");
            

            //título do currículo
            doc.setFontSize(20);
            doc.text("Currículo Profissional", 105, y, null, null, 'center');
            y += 25;

            //Dados pessoais 
            doc.setFontSize(16);
            doc.text(`Nome: ${curriculumData.name} ${curriculumData.surname}`, 10, y);
            y += 10;
            doc.text(`Idade: ${curriculumData.age}`, 10, y);
            y += 10;

            //Dados de contato 
            doc.text(`Contato: ${curriculumData.phone}`, 10, y);
            y += 10;
            doc.text(`Email: ${curriculumData.email}`, 10, y)
            y += 10;

            //Objetivos pessoais
            doc.setFontSize(14);
            doc.text("Objetivo:", 10, y);
            y += 10;

            doc.setFontSize(12);
            const objetivoLine = doc.splitTextToSize(curriculumData.obj, 180);
            doc.text(objetivoLine, 10, y);
            y += objetivoLine.length * height + 5;
            

            //Formações gerais 
            doc.setFontSize(14);
            doc.text("Graduações e cursos:", 10, y);
            y += 10;
            doc.setFontSize(12);
            doc.text(`${curriculumData.study1 && curriculumData.study1 || ''}`, 10, y);
            y += 10;
            doc.text(`${curriculumData.study2 && curriculumData.study2 || ''}`, 10, y);
            y += 10;
            doc.text(`${curriculumData.study3 && curriculumData.study3 || ''}`, 10, y);
            y += 10;

            //Experiência 
            doc.setFontSize(14);
            doc.text("Experiências anteriores:", 10, y);
            y += 10;
            doc.setFontSize(12);
            doc.text(`${curriculumData.xp1 && curriculumData.xp1 || ''}`, 10, y);
            y += 10;
            doc.text(`${curriculumData.xp2 && curriculumData.xp2 || ''}`, 10, y);
            y += 10;
            doc.text(`${curriculumData.xp3 && curriculumData.xp3 || ''}`, 10, y);
            y += 10;

            //Idiomas
            doc.setFontSize(14);
            doc.text("Idiomas:", 10, y);
            y += 10;
            doc.setFontSize(12);
            doc.text(`${curriculumData.lang1 && curriculumData.lang1 || ''}`, 10, y);
            y += 10;
            doc.text(`${curriculumData.lang2 && curriculumData.lang2 || ''}`, 10, y);
            y += 10;
            doc.text(`${curriculumData.lang3 && curriculumData.lang3 || ''}`, 10, y);
            y += 10;

            //Habilidades
            doc.setFontSize(14);
            doc.text("Habilidades:", 10, y);
            y += 10;
            doc.setFontSize(12);
            const highlightLine = doc.splitTextToSize(curriculumData.highlight, 180);
            doc.text(highlightLine, 10, y);
            y += highlightLine.length * height + 5;

            doc.save("curriculo.pdf");
        };

        return (
            <>
            <div id='getStartedButton'>
                {!showForm && !curriculumData && (
                    <button onClick={() => setShowForm(true)} className='getStartedButton'>Get Started!</button>
                )}
            </div>

            {showForm && (
                <div id='form' >
                    <Form onClose={()=> {
                        setShowForm(false);
                    }} 
                        onComplete={handleOpenOrClose}
                    />
                </div>
            )}


            {curriculumData && (
                    <div className="resume-preview">
                    <h2>Pré-visualização dos dados</h2>
                    
                    <div className="resume-content">
                        <h3>Dados Pessoais</h3>
                        <p><strong>Nome:</strong> {curriculumData.name} {curriculumData.surname}</p>
                        <p><strong>Idade:</strong> {curriculumData.age}</p>
                        
                        <h3>Contato</h3>
                        <p><strong>Telefone:</strong> {curriculumData.phone}</p>
                        <p><strong>Email:</strong> {curriculumData.email}</p>
                        
                        <h3>Objetivo</h3>
                        <p>{curriculumData.obj}</p>
                        
                        <h3>Formação</h3>
                        <ul>
                            {curriculumData.study1 && <li>{curriculumData.study1}</li>}
                            {curriculumData.study2 && <li>{curriculumData.study2}</li>}
                            {curriculumData.study3 && <li>{curriculumData.study3}</li>}
                        </ul>
                        
                        <h3>Experiência</h3>
                        <ul>
                            {curriculumData.xp1 && <li>{curriculumData.xp1}</li>}
                            {curriculumData.xp2 && <li>{curriculumData.xp2}</li>}
                            {curriculumData.xp3 && <li>{curriculumData.xp3}</li>}
                        </ul>
                        
                        <h3>Idiomas</h3>
                        <ul>
                            {curriculumData.lang1 && <li>{curriculumData.lang1}</li>}
                            {curriculumData.lang2 && <li>{curriculumData.lang2}</li>}
                            {curriculumData.lang3 && <li>{curriculumData.lang3}</li>}
                        </ul>
                        
                        <h3>Habilidades</h3>
                        <p>{curriculumData.highlight}</p>
                    </div>
                    
                    <button onClick={() => setCurriculumData(null)} id='editAgain'>Editar Novamente</button>
                    <button onClick={downloadPDF} id="downloadBtn">Download PDF Formatado</button>
                </div>
            )}

            </>
        
        )

    }