// Dados da aplicação
const appData = {
  "lessons": [
    {
      "id": 1,
      "title": "Como Criar Senhas Fortes",
      "content": "Uma senha forte deve ter: pelo menos 8 caracteres, letras maiúsculas e minúsculas, números e símbolos. Nunca use dados pessoais como aniversário ou nome.",
      "tips": ["Use frases que você lembra", "Troque algumas letras por números", "Adicione símbolos como ! ou @"],
      "quiz": {
        "question": "Qual senha é mais segura?",
        "options": ["123456", "MinhaData1960", "Meu@Gato#Verde2024", "maria123"],
        "correct": 2
      }
    },
    {
      "id": 2,
      "title": "Identificar Emails Suspeitos",
      "content": "Cuidado com emails que: pedem dados pessoais urgentemente, têm muitos erros de português, vêm de remetentes desconhecidos ou prometem prêmios fáceis.",
      "tips": ["Verifique o remetente", "Não clique em links suspeitos", "Bancos nunca pedem dados por email"],
      "quiz": {
        "question": "O que fazer ao receber email suspeito?",
        "options": ["Clicar no link para ver", "Responder com seus dados", "Deletar sem abrir", "Encaminhar para amigos"],
        "correct": 2
      }
    },
    {
      "id": 3,
      "title": "Golpes Comuns (Pix e Empréstimos)",
      "content": "Criminosos criam urgência falsa: 'Faça o Pix agora ou perderá a promoção!'. Bancos verdadeiros nunca oferecem empréstimos por telefone ou WhatsApp.",
      "tips": ["Sempre confirme com o banco", "Desconfie de ofertas 'imperdíveis'", "Nunca faça Pix para desconhecidos"],
      "quiz": {
        "question": "Alguém liga oferecendo empréstimo fácil. O que fazer?",
        "options": ["Aceitar rapidamente", "Pedir mais informações pelo telefone", "Desligar e procurar o banco pessoalmente", "Dar CPF para consulta"],
        "correct": 2
      }
    },
    {
      "id": 4,
      "title": "Redes Sociais Seguras",
      "content": "Configure sua privacidade: aceite apenas pessoas conhecidas, não compartilhe informações pessoais públicas como endereço ou telefone.",
      "tips": ["Perfil privado sempre", "Cuidado com fotos de documentos", "Não aceite estranhos"],
      "quiz": {
        "question": "É seguro postar foto do seu RG nas redes sociais?",
        "options": ["Sim, se for para comprovar idade", "Sim, com a foto tapando alguns dados", "Não, nunca poste documentos", "Só no Facebook"],
        "correct": 2
      }
    },
    {
      "id": 5,
      "title": "Compras Online Seguras",
      "content": "Compre apenas em sites conhecidos, verifique se tem 'https://' no endereço, leia avaliações de outros compradores.",
      "tips": ["Sites com 'https' são mais seguros", "Prefira cartões a débito", "Guarde comprovantes"],
      "quiz": {
        "question": "Como identificar um site seguro para compras?",
        "options": ["Pelo preço baixo", "Pela aparência bonita", "Pelo 'https' no endereço", "Pelas cores"],
        "correct": 2
      }
    },
    {
      "id": 6,
      "title": "Proteção de Dados Pessoais",
      "content": "Seus dados pessoais são valiosos. Não forneça CPF, RG ou dados bancários por telefone, email ou WhatsApp para desconhecidos.",
      "tips": ["CPF é como chave da casa", "Dados bancários são confidenciais", "Desconfie de pedidos urgentes"],
      "quiz": {
        "question": "Quando é seguro fornecer seu CPF?",
        "options": ["Por telefone para qualquer empresa", "Por WhatsApp quando pedem", "Apenas pessoalmente em locais confiáveis", "Por email sempre"],
        "correct": 2
      }
    }
  ],
  "contacts": [
    {"name": "Procon", "phone": "151", "description": "Para denunciar golpes"},
    {"name": "Delegacia Virtual", "phone": "197", "description": "Crimes na internet"},
    {"name": "Central de Atendimento", "phone": "180", "description": "Violência contra idoso"}
  ],
  "tips": [
    {"title": "Nunca forneça senhas", "description": "Ninguém deve pedir sua senha por telefone ou email"},
    {"title": "Confirme antes de pagar", "description": "Sempre confirme com familiares antes de fazer transferências"},
    {"title": "Atualize seus aplicativos", "description": "Mantenha apps bancários sempre atualizados"},
    {"title": "Desconfie de urgência", "description": "Golpistas sempre criam pressão de tempo"},
    {"title": "Use apenas Wi-Fi seguro", "description": "Evite redes públicas para acessar bancos"},
    {"title": "Verifique sempre o remetente", "description": "Confirme se emails são realmente da empresa"}
  ]
};

// Variáveis globais
let currentSection = 'home';
let currentQuizQuestion = 0;
let quizScore = 0;
let quizQuestions = [];

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadLessons();
    loadEmergencyContacts();
    loadQuickTips();
    setupQuiz();
});

// Navegação entre seções
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav__button');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove classe ativa de todos os botões
            navButtons.forEach(btn => btn.classList.remove('nav__button--active'));
            
            // Adiciona classe ativa ao botão clicado
            this.classList.add('nav__button--active');
            
            // Esconde todas as seções
            sections.forEach(section => section.classList.remove('section--active'));
            
            // Mostra a seção selecionada
            document.getElementById(targetSection).classList.add('section--active');
            
            currentSection = targetSection;
        });
    });
}

// Carregar lições
function loadLessons() {
    const lessonsContainer = document.getElementById('lessons-list');
    
    appData.lessons.forEach(lesson => {
        const lessonCard = document.createElement('div');
        lessonCard.className = 'lesson-card';
        lessonCard.setAttribute('data-lesson-id', lesson.id);
        
        lessonCard.innerHTML = `
            <h3 class="lesson-card__title">${lesson.title}</h3>
            <p class="lesson-card__content">${lesson.content}</p>
        `;
        
        lessonCard.addEventListener('click', () => showLessonDetail(lesson));
        lessonsContainer.appendChild(lessonCard);
    });
}

// Mostrar detalhes da lição
function showLessonDetail(lesson) {
    const lessonsListElement = document.getElementById('lessons-list');
    const lessonDetailElement = document.getElementById('lesson-detail');
    const lessonContentElement = document.getElementById('lesson-content');
    
    lessonsListElement.classList.add('hidden');
    lessonDetailElement.classList.remove('hidden');
    
    lessonContentElement.innerHTML = `
        <div class="lesson-content">
            <h3>${lesson.title}</h3>
            <p>${lesson.content}</p>
            
            <div class="lesson-tips">
                <h4>💡 Dicas Importantes:</h4>
                <ul>
                    ${lesson.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
            
            <div class="lesson-quiz">
                <h4>🧠 Teste seu aprendizado:</h4>
                <div class="quiz-question">
                    <h5>${lesson.quiz.question}</h5>
                    <div class="quiz-options">
                        ${lesson.quiz.options.map((option, index) => `
                            <button class="quiz-option" data-option="${index}">
                                ${index + 1}. ${option}
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div id="lesson-quiz-feedback" class="quiz-feedback hidden"></div>
            </div>
        </div>
    `;
    
    // Adicionar event listeners para o quiz da lição
    const quizOptions = lessonContentElement.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedIndex = parseInt(this.getAttribute('data-option'));
            handleLessonQuizAnswer(lesson, selectedIndex, quizOptions);
        });
    });
    
    // Botão voltar
    document.getElementById('back-to-lessons').addEventListener('click', function() {
        lessonDetailElement.classList.add('hidden');
        lessonsListElement.classList.remove('hidden');
    });
}

// Lidar com resposta do quiz da lição
function handleLessonQuizAnswer(lesson, selectedIndex, options) {
    const feedbackElement = document.getElementById('lesson-quiz-feedback');
    const isCorrect = selectedIndex === lesson.quiz.correct;
    
    // Destacar opções
    options.forEach((option, index) => {
        if (index === lesson.quiz.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
        option.disabled = true;
    });
    
    // Mostrar feedback
    feedbackElement.classList.remove('hidden');
    feedbackElement.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    
    if (isCorrect) {
        feedbackElement.innerHTML = `
            <strong>✅ Parabéns! Resposta correta!</strong><br>
            Você demonstrou que entendeu essa lição de segurança digital.
        `;
    } else {
        feedbackElement.innerHTML = `
            <strong>❌ Resposta incorreta.</strong><br>
            A resposta correta é: <strong>${lesson.quiz.options[lesson.quiz.correct]}</strong><br>
            Releia a lição para entender melhor.
        `;
    }
}

// Configurar quiz principal
function setupQuiz() {
    // Criar perguntas do quiz principal baseadas nas lições
    quizQuestions = appData.lessons.map(lesson => ({
        question: lesson.quiz.question,
        options: lesson.quiz.options,
        correct: lesson.quiz.correct,
        explanation: `Esta pergunta é sobre: ${lesson.title}`
    }));
    
    // Adicionar perguntas extras
    quizQuestions.push(
        {
            question: "Qual é a primeira coisa a fazer se suspeitar de um golpe?",
            options: ["Enviar dinheiro rapidamente", "Manter a calma e não fornecer mais dados", "Ignorar completamente", "Contar para vizinhos"],
            correct: 1,
            explanation: "Manter a calma é essencial para tomar decisões corretas."
        },
        {
            question: "É seguro usar Wi-Fi público para acessar o banco?",
            options: ["Sim, sempre", "Só se for rápido", "Nunca é recomendado", "Apenas em shoppings"],
            correct: 2,
            explanation: "Wi-Fi público pode ser interceptado por criminosos."
        },
        {
            question: "Como verificar se um site é seguro?",
            options: ["Pela cor do site", "Pelo https:// no endereço", "Pelo preço dos produtos", "Pelo tamanho das letras"],
            correct: 1,
            explanation: "O https:// indica que o site tem certificado de segurança."
        },
        {
            question: "O que fazer antes de fazer uma transferência Pix?",
            options: ["Fazer rapidamente", "Confirmar com familiares se for valor alto", "Não é necessário confirmar", "Só fazer à noite"],
            correct: 1,
            explanation: "Sempre confirme transações importantes com pessoas de confiança."
        }
    );
    
    document.getElementById('start-quiz').addEventListener('click', startQuiz);
    document.getElementById('next-question').addEventListener('click', nextQuestion);
    document.getElementById('restart-quiz').addEventListener('click', restartQuiz);
}

// Iniciar quiz
function startQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    
    document.getElementById('quiz-intro').classList.add('hidden');
    document.getElementById('quiz-content').classList.remove('hidden');
    
    showQuizQuestion();
}

// Mostrar pergunta do quiz
function showQuizQuestion() {
    const question = quizQuestions[currentQuizQuestion];
    const questionElement = document.getElementById('quiz-question');
    const questionNumberElement = document.getElementById('quiz-question-number');
    const progressElement = document.getElementById('progress-fill');
    
    questionNumberElement.textContent = `Pergunta ${currentQuizQuestion + 1} de ${quizQuestions.length}`;
    progressElement.style.width = `${((currentQuizQuestion + 1) / quizQuestions.length) * 100}%`;
    
    questionElement.innerHTML = `
        <h3>${question.question}</h3>
        <div class="quiz-options">
            ${question.options.map((option, index) => `
                <button class="quiz-option" data-option="${index}">
                    ${index + 1}. ${option}
                </button>
            `).join('')}
        </div>
    `;
    
    // Adicionar event listeners
    const options = questionElement.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            const selectedIndex = parseInt(this.getAttribute('data-option'));
            handleQuizAnswer(selectedIndex, options);
        });
    });
    
    // Esconder feedback e botão next
    document.getElementById('quiz-feedback').classList.add('hidden');
    document.getElementById('next-question').classList.add('hidden');
}

// Lidar com resposta do quiz
function handleQuizAnswer(selectedIndex, options) {
    const question = quizQuestions[currentQuizQuestion];
    const isCorrect = selectedIndex === question.correct;
    const feedbackElement = document.getElementById('quiz-feedback');
    
    if (isCorrect) {
        quizScore++;
    }
    
    // Destacar opções
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
        option.disabled = true;
    });
    
    // Mostrar feedback
    feedbackElement.classList.remove('hidden');
    feedbackElement.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    
    if (isCorrect) {
        feedbackElement.innerHTML = `
            <strong>✅ Parabéns! Resposta correta!</strong><br>
            ${question.explanation}
        `;
    } else {
        feedbackElement.innerHTML = `
            <strong>❌ Resposta incorreta.</strong><br>
            A resposta correta é: <strong>${question.options[question.correct]}</strong><br>
            ${question.explanation}
        `;
    }
    
    // Mostrar botão next
    document.getElementById('next-question').classList.remove('hidden');
}

// Próxima pergunta
function nextQuestion() {
    currentQuizQuestion++;
    
    if (currentQuizQuestion < quizQuestions.length) {
        showQuizQuestion();
    } else {
        showQuizResults();
    }
}

// Mostrar resultados do quiz
function showQuizResults() {
    document.getElementById('quiz-content').classList.add('hidden');
    document.getElementById('quiz-results').classList.remove('hidden');
    
    const scoreElement = document.getElementById('quiz-score');
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    
    let message = '';
    if (percentage >= 80) {
        message = '🎉 Excelente! Você está bem preparado para navegar com segurança!';
    } else if (percentage >= 60) {
        message = '👍 Bom trabalho! Continue praticando para melhorar ainda mais.';
    } else {
        message = '📚 Continue estudando! Revise as lições para melhorar sua segurança digital.';
    }
    
    scoreElement.innerHTML = `
        <div>Sua pontuação: ${quizScore}/${quizQuestions.length}</div>
        <div>Percentual: ${percentage}%</div>
        <p style="margin-top: 20px; font-size: 18px;">${message}</p>
    `;
}

// Reiniciar quiz
function restartQuiz() {
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('quiz-intro').classList.remove('hidden');
}

// Carregar contatos de emergência
function loadEmergencyContacts() {
    const contactsContainer = document.getElementById('emergency-contacts');
    
    appData.contacts.forEach(contact => {
        const contactCard = document.createElement('div');
        contactCard.className = 'contact-card';
        
        contactCard.innerHTML = `
            <div class="contact-info">
                <h4>${contact.name}</h4>
                <p>${contact.description}</p>
            </div>
            <div class="contact-phone">${contact.phone}</div>
        `;
        
        contactsContainer.appendChild(contactCard);
    });
}

// Carregar dicas rápidas
function loadQuickTips() {
    const tipsContainer = document.getElementById('quick-tips');
    
    appData.tips.forEach(tip => {
        const tipCard = document.createElement('div');
        tipCard.className = 'tip-card';
        
        tipCard.innerHTML = `
            <h3>💡 ${tip.title}</h3>
            <p>${tip.description}</p>
        `;
        
        tipsContainer.appendChild(tipCard);
    });
}