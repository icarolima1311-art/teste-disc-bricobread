// AQUI ESTÁ SEU CÓDIGO COPIADO
const firebaseConfig = {
    apiKey: "AIzaSyCyH4CIG08T4bPDmYd5N-5Q1FSyTCMX_6I",
    authDomain: "teste-disc-bricobread.firebaseapp.com",
    projectId: "teste-disc-bricobread",
    storageBucket: "teste-disc-bricobread.firebasestorage.app",
    messagingSenderId: "827161354543",
    appId: "1:827161354543:web:d92fc84518f507e5f601da"
};



// Inicialize o Firebase e o Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// O RESTO DO SEU CÓDIGO ABAIXO...

const homePage = document.getElementById('home-page');
const quizPage = document.getElementById('quiz-page');
const resultsPage = document.getElementById('results-page');
const infoForm = document.getElementById('info-form');
const quizForm = document.getElementById('quiz-form');
const questionsContainer = document.getElementById('questions-container');
const participantNameEl = document.getElementById('participant-name');
const profileTextEl = document.getElementById('profile-text');
const restartButton = document.getElementById('restart-button');

let userFullName = '';
let discChartInstance = null;

const discQuestions = [
    {
        question: "Eu sou uma pessoa...",
        options: [
            { text: "Decidida e direta", profile: "D" },
            { text: "Confiante e entusiasta", profile: "I" },
            { text: "Calma e constante", profile: "S" },
            { text: "Analítica e precisa", profile: "C" }
        ]
    },
    {
        question: "Quando me comunico, eu...",
        options: [
            { text: "Vou direto ao ponto", profile: "D" },
            { text: "Busco inspirar e motivar", profile: "I" },
            { text: "Escuto com atenção", profile: "S" },
            { text: "Presto atenção aos detalhes", profile: "C" }
        ]
    },
    {
        question: "Minha maior motivação é...",
        options: [
            { text: "Alcançar resultados e desafios", profile: "D" },
            { text: "Ser reconhecido e influenciar pessoas", profile: "I" },
            { text: "Sentir segurança e colaborar com a equipe", profile: "S" },
            { text: "Fazer o trabalho certo e com qualidade", profile: "C" }
        ]
    },
    {
        question: "Em um conflito, eu costumo...",
        options: [
            { text: "Confrontar a situação diretamente", profile: "D" },
            { text: "Tentar resolver de forma amigável", profile: "I" },
            { text: "Evitar o confronto para manter a harmonia", profile: "S" },
            { text: "Analisar os fatos antes de agir", profile: "C" }
        ]
    },
    {
        question: "Eu sou mais percebido como...",
        options: [
            { text: "Líder e dominador", profile: "D" },
            { text: "Comunicador e sociável", profile: "I" },
            { text: "Ponderado e cooperativo", profile: "S" },
            { text: "Disciplinado e detalhista", profile: "C" }
        ]
    },
    {
        question: "Meu ritmo de trabalho é...",
        options: [
            { text: "Rápido e focado em metas", profile: "D" },
            { text: "Dinâmico e voltado para a interação", profile: "I" },
            { text: "Estável e consistente", profile: "S" },
            { text: "Metódico e cuidadoso", profile: "C" }
        ]
    },
    {
        question: "Em uma equipe, eu prefiro...",
        options: [
            { text: "Assumir a liderança e tomar decisões", profile: "D" },
            { text: "Incentivar e manter o moral alto", profile: "I" },
            { text: "Ser um membro de apoio e colaboração", profile: "S" },
            { text: "Garantir a qualidade e os procedimentos", profile: "C" }
        ]
    },
    {
        question: "Eu lido com a mudança...",
        options: [
            { text: "Como um novo desafio", profile: "D" },
            { text: "De forma criativa e com entusiasmo", profile: "I" },
            { text: "Com certa resistência e cautela", profile: "S" },
            { text: "Analisando todas as variáveis e impactos", profile: "C" }
        ]
    },
    {
        question: "Na resolução de problemas, eu sou...",
        options: [
            { text: "Prático e resolvo rapidamente", profile: "D" },
            { text: "Criativo e busco soluções inovadoras", profile: "I" },
            { text: "Paciente e prefiro a abordagem em equipe", profile: "S" },
            { text: "Minucioso e busco a causa-raiz", profile: "C" }
        ]
    },
    {
        question: "O meu maior medo é...",
        options: [
            { text: "Perder o controle ou a autoridade", profile: "D" },
            { text: "Ser ignorado ou perder a influência", profile: "I" },
            { text: "Mudanças inesperadas ou a falta de segurança", profile: "S" },
            { text: "Cometer erros ou ser criticado por falhas", profile: "C" }
        ]
    },
    {
        question: "Para me sentir realizado, eu preciso de...",
        options: [
            { text: "Novos desafios e oportunidades de liderança", profile: "D" },
            { text: "Reconhecimento e interações sociais", profile: "I" },
            { text: "Segurança e um ambiente de trabalho estável", profile: "S" },
            { text: "Precisão e um trabalho de alta qualidade", profile: "C" }
        ]
    },
    {
        question: "Em uma reunião, eu sou mais propenso a...",
        options: [
            { text: "Falar e dirigir a discussão", profile: "D" },
            { text: "Fazer piadas e socializar", profile: "I" },
            { text: "Ouvir e dar apoio às ideias dos outros", profile: "S" },
            { text: "Focar na agenda e nos detalhes", profile: "C" }
        ]
    },
    {
        question: "Eu prefiro trabalhar em um ambiente...",
        options: [
            { text: "Focado em resultados e competitividade", profile: "D" },
            { text: "Colaborativo e com muitas interações", profile: "I" },
            { text: "Calmo, seguro e previsível", profile: "S" },
            { text: "Organizado e com regras claras", profile: "C" }
        ]
    },
    {
        question: "Meu ponto forte é...",
        options: [
            { text: "Atingir metas e superar obstáculos", profile: "D" },
            { text: "Persuadir e influenciar pessoas", profile: "I" },
            { text: "Manter a calma e a estabilidade", profile: "S" },
            { text: "Atenção aos detalhes e precisão", profile: "C" }
        ]
    },
    {
        question: "Eu me sinto mais à vontade quando...",
        options: [
            { text: "Estou no controle da situação", profile: "D" },
            { text: "Estou cercado de pessoas", profile: "I" },
            { text: "As coisas estão tranquilas e rotineiras", profile: "S" },
            { text: "Tudo está de acordo com as regras", profile: "C" }
        ]
    },
    {
        question: "O que mais me frustra é...",
        options: [
            { text: "A falta de progresso ou indecisão", profile: "D" },
            { text: "A falta de entusiasmo ou monotonia", profile: "I" },
            { text: "Ações agressivas ou falta de cooperação", profile: "S" },
            { text: "A falta de precisão ou desorganização", profile: "C" }
        ]
    },
    {
        question: "Minha forma de tomar decisões é...",
        options: [
            { text: "Rápida e assertiva", profile: "D" },
            { text: "Com base na intuição e sentimentos", profile: "I" },
            { text: "Lenta e com o consenso da equipe", profile: "S" },
            { text: "Baseada em fatos e dados", profile: "C" }
        ]
    },
    {
        question: "Eu valorizo a...",
        options: [
            { text: "Competência e eficiência", profile: "D" },
            { text: "Entusiasmo e otimismo", profile: "I" },
            { text: "Lealdade e cooperação", profile: "S" },
            { text: "Ordem e correção", profile: "C" }
        ]
    },
    {
        question: "Eu sou mais descrito como...",
        options: [
            { text: "Direto", profile: "D" },
            { text: "Alegre", profile: "I" },
            { text: "Calmo", profile: "S" },
            { text: "Preciso", profile: "C" }
        ]
    },
    {
        question: "Em projetos, eu foco em...",
        options: [
            { text: "Atingir o objetivo final rapidamente", profile: "D" },
            { text: "Gerar novas ideias e inspirar a equipe", profile: "I" },
            { text: "Garantir que todos se sintam confortáveis", profile: "S" },
            { text: "Seguir o plano e evitar erros", profile: "C" }
        ]
    },
    {
        question: "Meu maior erro seria...",
        options: [
            { text: "Não alcançar as metas", profile: "D" },
            { text: "Perder a atenção das pessoas", profile: "I" },
            { text: "Causar desarmonia no grupo", profile: "S" },
            { text: "Entregar um trabalho com falhas", profile: "C" }
        ]
    },
    {
        question: "Em feedback, eu prefiro...",
        options: [
            { text: "Feedback direto e objetivo", profile: "D" },
            { text: "Um feedback que me encoraje", profile: "I" },
            { text: "Um feedback gentil e compreensivo", profile: "S" },
            { text: "Feedback com dados e fatos detalhados", profile: "C" }
        ]
    },
    {
        question: "Eu me sinto mais seguro quando...",
        options: [
            { text: "Tenho autonomia para agir", profile: "D" },
            { text: "Sou parte de um grupo social", profile: "I" },
            { text: "Tenho uma rotina e previsibilidade", profile: "S" },
            { text: "O trabalho é bem planejado e estruturado", profile: "C" }
        ]
    },
    {
        question: "Em uma situação nova, eu...",
        options: [
            { text: "Tomo a iniciativa", profile: "D" },
            { text: "Me adapto e busco interagir", profile: "I" },
            { text: "Observo e me ajusto lentamente", profile: "S" },
            { text: "Pesquiso e me preparo", profile: "C" }
        ]
    },
    {
        question: "Eu sou mais influenciado por...",
        options: [
            { text: "Resultados e eficiência", profile: "D" },
            { text: "O carisma e a simpatia", profile: "I" },
            { text: "Relações de confiança e lealdade", profile: "S" },
            { text: "Fatos, dados e lógica", profile: "C" }
        ]
    },
    {
        question: "Minha maior necessidade é...",
        options: [
            { text: "Ter controle", profile: "D" },
            { text: "Ser reconhecido", profile: "I" },
            { text: "Ter estabilidade", profile: "S" },
            { text: "Estar correto", profile: "C" }
        ]
    }
];

// Função para renderizar as perguntas
function renderQuestions() {
    questionsContainer.innerHTML = '';
    discQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        q.options.forEach((opt, optIndex) => {
            const radioId = `q${index}_opt${optIndex}`;
            optionsDiv.innerHTML += `
                <label for="${radioId}">
                    <input type="radio" id="${radioId}" name="question${index}" value="${opt.profile}" required>
                    ${opt.text}
                </label>
            `;
        });
        questionDiv.appendChild(optionsDiv);
        questionsContainer.appendChild(questionDiv);
    });
}

// Lógica de navegação e formulários
infoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userFullName = document.getElementById('full-name').value;
    homePage.classList.remove('active');
    quizPage.classList.add('active');
    renderQuestions();
});

quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateResults();
    quizPage.classList.remove('active');
    resultsPage.classList.add('active');
});

restartButton.addEventListener('click', () => {
    resultsPage.classList.remove('active');
    homePage.classList.add('active');
    // Limpar campos
    document.getElementById('full-name').value = '';
    document.getElementById('email').value = '';
    quizForm.reset();
    if (discChartInstance) {
        discChartInstance.destroy();
    }
});

// Lógica de cálculo e exibição de resultados
function calculateResults() {
    const formData = new FormData(quizForm);
    const answers = {};
    for (const [key, value] of formData.entries()) {
        answers[key] = value;
    }

    const profiles = { 'D': 0, 'I': 0, 'S': 0, 'C': 0 };
    const totalQuestions = discQuestions.length;

    for (const key in answers) {
        const profile = answers[key];
        if (profiles.hasOwnProperty(profile)) {
            profiles[profile]++;
        }
    }

    displayResults(profiles);
    
    // NOVO: Chamada para a função que salva os dados no Firebase
    saveResultsToFirebase(profiles);
}

// NOVO: Função para salvar os resultados no Firebase
function saveResultsToFirebase(profiles) {
    const email = document.getElementById('email').value;
    const name = document.getElementById('full-name').value;
    const timestamp = new Date().toISOString();

    db.collection("resultadosDISC").add({
        nome: name,
        email: email,
        dominancia: profiles.D,
        influencia: profiles.I,
        estabilidade: profiles.S,
        conformidade: profiles.C,
        data: timestamp
    })
    .then((docRef) => {
        console.log("Documento salvo com ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Erro ao adicionar documento: ", error);
    });
}


function displayResults(profiles) {
    participantNameEl.textContent = `Resultado do Teste DISC - BricoBread de ${userFullName}`;

    const labels = ['Dominância (D)', 'Influência (I)', 'Estabilidade (S)', 'Conformidade (C)'];
    const data = [profiles.D, profiles.I, profiles.S, profiles.C];
    const backgroundColors = ['#a30000', '#2980b9', '#2ecc71', '#555'];

    const ctx = document.getElementById('disc-chart').getContext('2d');
    
    if (discChartInstance) {
        discChartInstance.destroy();
    }
    
    discChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Número de Respostas',
                data: data,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace(')', ', 0.5)')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 26,
                    title: {
                        display: true,
                        text: 'Número de Respostas'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    const predominantProfile = Object.keys(profiles).reduce((a, b) => profiles[a] > profiles[b] ? a : b);
    let profileDescription = '';
    switch (predominantProfile) {
        case 'D':
            profileDescription = `O seu perfil predominante é Dominância. Pessoas com este perfil tendem a ser diretas, orientadas para resultados e gostam de assumir o controle. São motivadas por desafios e por alcançar metas de forma rápida e eficiente.`;
            break;
        case 'I':
            profileDescription = `O seu perfil predominante é Influência. Você tende a ser extrovertido, comunicativo e persuasivo. É motivado por reconhecimento social e por influenciar positivamente as pessoas ao seu redor.`;
            break;
        case 'S':
            profileDescription = `O seu perfil predominante é Estabilidade. Este perfil se destaca pela calma, paciência e consistência. Você valoriza a segurança, a colaboração em equipe e prefere ambientes de trabalho estáveis e previsíveis.`;
            break;
        case 'C':
            profileDescription = `O seu perfil predominante é Conformidade. Você é uma pessoa analítica, detalhista e focada em qualidade. A sua motivação é fazer o trabalho de forma correta, seguindo procedimentos e buscando a precisão em tudo o que faz.`;
            break;
    }
    profileTextEl.innerHTML = profileDescription;
}