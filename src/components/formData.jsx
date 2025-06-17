const formSteps =   [
    {
        id: 1, 
        title: "Dados pessoais:",
        fields:[
            {name: "Nome", label: "name", type: "text"},
            {name: "Sobrenome", label: "surname", type:"text"},
            {name: "Idade", label: "age", type: "number"}
        ]
    },
    {
        id:2,
        title: "Contato",
        fields: [
            {name: "Telefone:", label: "phone", type: "tel"},
            {name: "Email:", label: "email", type: "email"}
        ]
    },
    {
        id: 3,
        title: "Objetivo:",
        fields:[
            {name: "Objetivos", label: "obj", type:"text"},
        ]
    },
    {
        id:4,
        title: "Formação:",
        fields:[
            {name: "Formação 1", label: "study1", type: "text"},
            {name: "Formação 2", label: "study2", type: "text"},
            {name: "Formação 3", label: "study3", type: "text"}
        ]
    },
    {
        id:5,
        title: "Experiência:",
        fields:[
            {name: "Experiência 1", label: "xp1", type: "text"},
            {name: "Experiência 2", label: "xp2", type: "text"},
            {name: "Experiência 3", label: "xp3", type: "text"}
        ]
    },
    {
        id:6, 
        title: "Idiomas:",
        fields:[
            {name: "Idioma 1", label: "lang1", type: "text"},
            {name: "Idioma 2", label: "lang2", type: "text"},
            {name: "Idioma 3", label: "lang3", type: "text"}
        ]
    },
    {
        id:7,
        title: "Habilidades",
        fields:[
            {name: "Habilidades", label: "highlight", type: "text"}
        ]
    }
]

export default formSteps;