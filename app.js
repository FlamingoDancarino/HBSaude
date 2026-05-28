// ==========================================
// CONFIGURAÇÕES E BANCO DE DADOS SIMULADO
// ==========================================

// Lista de Médicos/Profissionais por Especialidade, CRM, Valor e Turno
const professionals = [
  { name: "Dr. Henrique Barros", specialty: "Cardiologia", crm: "CRM 45892-SP", price: 250, desc: "Especialista em cardiologia clínica e arritmias cardíacas.", shift: "morning" },
  { name: "Dra. Camila Rodrigues", specialty: "Cardiologia", crm: "CRM 98563-SP", price: 250, desc: "Especialista em cardiologia preventiva e exames gráficos.", shift: "afternoon" },
  { name: "Dr. Roberto Martins", specialty: "Pediatria", crm: "CRM 33621-SP", price: 220, desc: "Acompanhamento infantil geral, crescimento e neonatologia.", shift: "morning" },
  { name: "Dra. Sofia Mendes", specialty: "Pediatria", crm: "CRM 77482-SP", price: 220, desc: "Pediatra especialista em desenvolvimento e nutrição infantil.", shift: "afternoon" },
  { name: "Dr. Maurício Neves", specialty: "Ortopedia", crm: "CRM 11452-SP", price: 240, desc: "Ortopedista especializado em traumatologia e lesões no joelho.", shift: "morning" },
  { name: "Dra. Letícia Costa", specialty: "Ortopedia", crm: "CRM 88965-SP", price: 240, desc: "Foco em reabilitação ortopédica, coluna e cirurgias minimamente invasivas.", shift: "afternoon" },
  { name: "Dr. Felipe Nogueira", specialty: "Dermatologia", crm: "CRM 55698-SP", price: 280, desc: "Dermatologia clínica, controle de acne e detecção de câncer de pele.", shift: "morning" },
  { name: "Dra. Cláudia Lima", specialty: "Dermatologia", crm: "CRM 22485-SP", price: 280, desc: "Especialista em dermatologia estética e correção de cicatrizes.", shift: "afternoon" },
  { name: "Dra. Patrícia Silveira", specialty: "Ginecologia", crm: "CRM 99512-SP", price: 260, desc: "Ginecologia preventiva, exames de rotina e obstetrícia de baixo risco.", shift: "morning" },
  { name: "Dra. Mariana Souza", specialty: "Ginecologia", crm: "CRM 44785-SP", price: 260, desc: "Acompanhamento gestacional de alto risco e climatério.", shift: "afternoon" },
  { name: "Dr. Thiago Santos", specialty: "Clínica Geral", crm: "CRM 66321-SP", price: 180, desc: "Atendimento clínico geral, check-up anual e medicina preventiva.", shift: "morning" },
  { name: "Dra. Luciana Fonseca", specialty: "Clínica Geral", crm: "CRM 88741-SP", price: 180, desc: "Saúde da família, controle de hipertensão e diabetes.", shift: "afternoon" }
];

// Horários Padrão de Atendimento
const standardWorkHours = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

// Carregar dados salvos no navegador (localStorage)
let users = JSON.parse(localStorage.getItem('hbsaude_users')) || [];
let appointments = JSON.parse(localStorage.getItem('hbsaude_appointments')) || [];
let currentUser = JSON.parse(localStorage.getItem('hbsaude_current_user')) || null;

// ==========================================
// ELEMENTOS DO DOM (MAPEAMENTO)
// ==========================================

// Seções (Telas) da SPA
const views = {
  home: document.getElementById('view-home'),
  auth: document.getElementById('view-auth'),
  dashboard: document.getElementById('view-dashboard')
};

// Menus de Navegação
const menuLoggedOut = document.getElementById('menu-logged-out');
const menuLoggedIn = document.getElementById('menu-logged-in');
const userDisplayName = document.getElementById('user-display-name');
const userAvatar = document.getElementById('user-avatar');

// Botões de Navegação e Header
const navLogo = document.getElementById('nav-logo');
const navLinkDashboard = document.getElementById('nav-link-dashboard');
const btnNavLogin = document.getElementById('btn-nav-login');
const btnNavRegister = document.getElementById('btn-nav-register');
const btnNavLogout = document.getElementById('btn-nav-logout');
const footerLinkHome = document.querySelector('.footer-link-home');

// Elementos da Tela Home
const heroBtnStart = document.getElementById('hero-btn-start');
const heroBtnRegister = document.getElementById('hero-btn-register');

// Formulários e Abas de Autenticação (Login / Cadastro)
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const formLogin = document.getElementById('form-login');
const formRegister = document.getElementById('form-register');
const authGlobalMessage = document.getElementById('auth-global-message');

// Formulário de Agendamento (Dashboard)
const formBooking = document.getElementById('form-booking');
const bookingSpecialty = document.getElementById('booking-specialty');
const bookingDate = document.getElementById('booking-date');
const bookingTime = document.getElementById('booking-time');
const timeSlotsContainer = document.getElementById('time-slots-container');
const assignedDoctorContainer = document.getElementById('assigned-doctor-container');
const bookingGlobalMessage = document.getElementById('booking-global-message');
const appointmentsList = document.getElementById('appointments-list');
const appointmentsCount = document.getElementById('appointments-count');

// ==========================================
// CONTROLE DE NAVEGAÇÃO DA SPA (ROTEADOR)
// ==========================================

function navigateTo(viewName) {
  // Ocultar todas as seções
  Object.values(views).forEach(view => view.classList.remove('active'));
  
  // Exibir a seção desejada
  if (views[viewName]) {
    views[viewName].classList.add('active');
  }

  // Atualizar a classe ativa nos links do menu
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-target') === viewName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Limpar mensagens globais ao mudar de tela
  authGlobalMessage.style.display = 'none';
  bookingGlobalMessage.style.display = 'none';
  
  // Rolar para o topo da página suavemente
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Configuração inicial do menu baseado no estado do Login
function updateAuthUI() {
  if (currentUser) {
    menuLoggedOut.style.display = 'none';
    menuLoggedIn.style.display = 'flex';
    userDisplayName.textContent = currentUser.name.split(' ')[0]; // Exibe apenas primeiro nome
    userAvatar.textContent = currentUser.name.charAt(0).toUpperCase(); // Primeira letra
    
    // Atualiza a listagem de agendamentos no painel do usuário
    renderAppointments();
  } else {
    menuLoggedOut.style.display = 'flex';
    menuLoggedIn.style.display = 'none';
  }
}

// Configurar a data mínima do calendário de agendamento (somente a partir de amanhã)
function setupMinBookingDate() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  
  bookingDate.min = `${yyyy}-${mm}-${dd}`;
}

// ==========================================
// SISTEMA DE CADASTRO E LOGIN (AUTENTICAÇÃO)
// ==========================================

// Trocar entre as abas de Login e Cadastro
function switchAuthTab(activeTab) {
  authGlobalMessage.style.display = 'none';
  if (activeTab === 'login') {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    formLogin.classList.add('active');
    formRegister.classList.remove('active');
  } else {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    formRegister.classList.add('active');
    formLogin.classList.remove('active');
  }
}

// Validação de E-mail
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validação de CPF (Simplificada para fins acadêmicos - aceita com pontuação ou apenas números)
function validateCPF(cpf) {
  const cleanCpf = cpf.replace(/[^\d]/g, '');
  return cleanCpf.length === 11;
}

// Lógica do Cadastro
formRegister.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const nameInput = document.getElementById('register-name');
  const emailInput = document.getElementById('register-email');
  const passwordInput = document.getElementById('register-password');
  const cpfInput = document.getElementById('register-cpf');
  
  let isValid = true;
  
  // Validar Nome
  if (nameInput.value.trim() === '') {
    showInputError(nameInput, 'feedback-register-name');
    isValid = false;
  } else {
    hideInputError(nameInput, 'feedback-register-name');
  }
  
  // Validar E-mail
  if (!validateEmail(emailInput.value.trim())) {
    showInputError(emailInput, 'feedback-register-email');
    isValid = false;
  } else if (users.some(user => user.email === emailInput.value.trim())) {
    showInputError(emailInput, 'feedback-register-email', 'Este e-mail já está cadastrado');
    isValid = false;
  } else {
    hideInputError(emailInput, 'feedback-register-email');
  }
  
  // Validar Senha
  if (passwordInput.value.length < 6) {
    showInputError(passwordInput, 'feedback-register-password');
    isValid = false;
  } else {
    hideInputError(passwordInput, 'feedback-register-password');
  }
  
  // Validar CPF
  if (!validateCPF(cpfInput.value)) {
    showInputError(cpfInput, 'feedback-register-cpf');
    isValid = false;
  } else {
    hideInputError(cpfInput, 'feedback-register-cpf');
  }
  
  if (isValid) {
    // Adicionar novo usuário ao "banco"
    const newUser = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value, // Acadêmico: em produção utilizaria hash
      cpf: cpfInput.value.replace(/[^\d]/g, '')
    };
    
    users.push(newUser);
    localStorage.setItem('hbsaude_users', JSON.stringify(users));
    
    // Feedback de Sucesso
    showGlobalMessage('Cadastro realizado com sucesso! Faça login para agendar.', 'success');
    
    // Limpar formulário e mudar para aba de login
    formRegister.reset();
    setTimeout(() => {
      switchAuthTab('login');
      document.getElementById('login-email').value = newUser.email;
    }, 1500);
  }
});

// Lógica de Login
formLogin.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  
  let isValid = true;
  
  if (!validateEmail(emailInput.value.trim())) {
    showInputError(emailInput, 'feedback-login-email');
    isValid = false;
  } else {
    hideInputError(emailInput, 'feedback-login-email');
  }
  
  if (passwordInput.value.length < 6) {
    showInputError(passwordInput, 'feedback-login-password');
    isValid = false;
  } else {
    hideInputError(passwordInput, 'feedback-login-password');
  }
  
  if (isValid) {
    const user = users.find(u => u.email === emailInput.value.trim() && u.password === passwordInput.value);
    
    if (user) {
      // Salvar usuário logado na sessão
      currentUser = user;
      localStorage.setItem('hbsaude_current_user', JSON.stringify(currentUser));
      
      updateAuthUI();
      formLogin.reset();
      
      showGlobalMessage('Login realizado com sucesso! Redirecionando...', 'success');
      
      setTimeout(() => {
        navigateTo('dashboard');
      }, 1000);
    } else {
      showGlobalMessage('E-mail ou senha incorretos.', 'error');
    }
  }
});

// Helpers de validação visual
function showInputError(inputEl, feedbackId, customMessage) {
  inputEl.style.borderColor = 'var(--secondary-color)';
  const feedbackEl = document.getElementById(feedbackId);
  if (feedbackEl) {
    if (customMessage) feedbackEl.textContent = customMessage;
    feedbackEl.classList.add('error');
  }
}

function hideInputError(inputEl, feedbackId) {
  inputEl.style.borderColor = 'var(--border-color)';
  const feedbackEl = document.getElementById(feedbackId);
  if (feedbackEl) {
    feedbackEl.classList.remove('error');
  }
}

function showGlobalMessage(message, type) {
  authGlobalMessage.textContent = message;
  authGlobalMessage.className = `global-message ${type}`;
  authGlobalMessage.style.display = 'block';
}

// Lógica de Logout (Sair)
function logout() {
  currentUser = null;
  localStorage.removeItem('hbsaude_current_user');
  updateAuthUI();
  navigateTo('home');
}

// ==========================================
// FLUXO DE AGENDAMENTO DE CONSULTAS
// ==========================================

// Limpar slots, data e médico designado se a especialidade mudar
bookingSpecialty.addEventListener('change', function() {
  resetTimeSlotsSelection();
});

// Eventos que provocam a atualização dos horários
bookingDate.addEventListener('change', checkAndRenderTimeSlots);

function resetTimeSlotsSelection() {
  bookingTime.value = '';
  assignedDoctorContainer.innerHTML = '';
  assignedDoctorContainer.style.display = 'none';
  timeSlotsContainer.innerHTML = `
    <div style="grid-column: span 3; text-align: center; font-size: 0.85rem; color: var(--text-muted); padding: 0.5rem 0;">
      Selecione especialidade e data primeiro
    </div>
  `;
}

// Retorna qual turno pertence um determinado horário
function getShiftByHour(hourStr) {
  const hourVal = parseInt(hourStr.split(':')[0], 10);
  return hourVal < 12 ? 'morning' : 'afternoon';
}

// Retorna o profissional escalado para uma especialidade e horário (turno)
function getAssignedProfessional(specialty, hourStr) {
  const shift = getShiftByHour(hourStr);
  return professionals.find(p => p.specialty === specialty && p.shift === shift) || null;
}

function checkAndRenderTimeSlots() {
  const specialty = bookingSpecialty.value;
  const dateStr = bookingDate.value;
  const feedbackDate = document.getElementById('feedback-booking-date');
  
  if (!specialty || !dateStr) {
    resetTimeSlotsSelection();
    return;
  }
  
  const selectedDate = new Date(dateStr + 'T00:00:00'); // Trata timezone local
  const dayOfWeek = selectedDate.getDay(); // 0 = Domingo, 6 = Sábado
  
  // Validação de final de semana
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    feedbackDate.textContent = 'O HBSaúde atende consultas eletivas apenas de Segunda a Sexta-feira';
    feedbackDate.classList.add('error');
    bookingDate.style.borderColor = 'var(--secondary-color)';
    resetTimeSlotsSelection();
    return;
  } else {
    feedbackDate.classList.remove('error');
    bookingDate.style.borderColor = 'var(--border-color)';
  }
  
  // Limpar seleção anterior e médico anterior ao mudar a data
  bookingTime.value = '';
  assignedDoctorContainer.innerHTML = '';
  assignedDoctorContainer.style.display = 'none';
  
  // Renderizar os botões de horário
  timeSlotsContainer.innerHTML = '';
  
  standardWorkHours.forEach(hour => {
    // Achar profissional escalado para este horário
    const assignedProf = getAssignedProfessional(specialty, hour);
    
    const slotBtn = document.createElement('button');
    slotBtn.type = 'button';
    slotBtn.className = 'time-slot-btn';
    slotBtn.textContent = hour;
    
    if (!assignedProf) {
      // Se não há médico escalado para este turno, desabilita
      slotBtn.classList.add('disabled');
      slotBtn.title = 'Sem profissional disponível';
      timeSlotsContainer.appendChild(slotBtn);
      return;
    }
    
    // Buscar horários que já foram agendados para este médico específico nesta data
    const isBooked = appointments.some(app => app.doctor === assignedProf.name && app.date === dateStr && app.time === hour);
    
    // Se o horário já está agendado, desabilita
    if (isBooked) {
      slotBtn.classList.add('disabled');
      slotBtn.title = 'Horário Ocupado';
    } else {
      slotBtn.addEventListener('click', function() {
        // Remover seleção anterior
        document.querySelectorAll('.time-slot-btn').forEach(btn => btn.classList.remove('selected'));
        
        // Selecionar este
        slotBtn.classList.add('selected');
        bookingTime.value = hour;
        
        // Esconder erro de horário
        document.getElementById('feedback-booking-time').style.display = 'none';
        
        // Exibir dinamicamente o médico designado
        displayAssignedDoctor(assignedProf);
      });
    }
    
    timeSlotsContainer.appendChild(slotBtn);
  });
}

// Exibe na tela os dados do médico designado (vinculado ao horário/turno)
function displayAssignedDoctor(prof) {
  assignedDoctorContainer.innerHTML = `
    <div class="assigned-doctor-header">Profissional Designado</div>
    <div class="assigned-doctor-profile">
      <div class="assigned-doctor-avatar">${prof.name.charAt(0)}</div>
      <div class="assigned-doctor-meta">
        <div class="assigned-doctor-name">${prof.name}</div>
        <div class="assigned-doctor-crm">${prof.crm}</div>
      </div>
    </div>
    <div class="assigned-doctor-details">
      <span class="assigned-doctor-price-label">Valor da Consulta (Coparticipação):</span>
      <span class="assigned-doctor-price">R$ ${prof.price.toFixed(2).replace('.', ',')}</span>
    </div>
    <div class="assigned-doctor-desc">${prof.desc}</div>
  `;
  assignedDoctorContainer.style.display = 'flex';
}

// Submissão do agendamento
formBooking.addEventListener('submit', function(e) {
  e.preventDefault();
  
  let isValid = true;
  const feedbackTime = document.getElementById('feedback-booking-time');
  const dateStr = bookingDate.value;
  
  if (!bookingSpecialty.value) isValid = false;
  
  // Validar data
  if (!dateStr) {
    const feedbackDate = document.getElementById('feedback-booking-date');
    feedbackDate.textContent = 'Por favor, escolha uma data';
    feedbackDate.classList.add('error');
    bookingDate.style.borderColor = 'var(--secondary-color)';
    isValid = false;
  }
  
  // Validar Horário
  if (!bookingTime.value) {
    feedbackTime.style.display = 'block';
    isValid = false;
  } else {
    feedbackTime.style.display = 'none';
  }
  
  if (isValid) {
    // Obter dados do profissional designado para o horário escolhido
    const assignedProf = getAssignedProfessional(bookingSpecialty.value, bookingTime.value);
    
    if (!assignedProf) {
      alert('Erro ao designar o profissional. Tente selecionar outro horário.');
      return;
    }
    
    // Criar novo agendamento contendo médico, especialidade e o valor (PAGAMENTO no Banco de Dados)
    const newAppointment = {
      id: 'app_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      userEmail: currentUser.email,
      specialty: bookingSpecialty.value,
      doctor: assignedProf.name,
      crm: assignedProf.crm,
      price: assignedProf.price,
      date: dateStr,
      time: bookingTime.value
    };
    
    // Adicionar aos agendamentos locais
    appointments.push(newAppointment);
    localStorage.setItem('hbsaude_appointments', JSON.stringify(appointments));
    
    // Feedback visual
    bookingGlobalMessage.textContent = 'Consulta agendada com sucesso!';
    bookingGlobalMessage.className = 'global-message success';
    bookingGlobalMessage.style.display = 'block';
    
    // Resetar formulário
    formBooking.reset();
    resetTimeSlotsSelection();
    
    // Recarregar os agendamentos na tela
    renderAppointments();
    
    // Limpar mensagem após 3 segundos
    setTimeout(() => {
      bookingGlobalMessage.style.display = 'none';
    }, 3000);
  }
});

// Renderizar lista de agendamentos ativos na tela
function renderAppointments() {
  if (!currentUser) return;
  
  // Filtrar agendamentos do usuário logado
  const myAppointments = appointments.filter(app => app.userEmail === currentUser.email);
  
  // Ordenar por data e depois por hora
  myAppointments.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });
  
  // Atualizar contador
  appointmentsCount.textContent = myAppointments.length;
  
  if (myAppointments.length === 0) {
    appointmentsList.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/></svg>
        <h3>Nenhuma consulta agendada</h3>
        <p>Utilize o formulário ao lado para agendar seu primeiro atendimento médico.</p>
      </div>
    `;
    return;
  }
  
  appointmentsList.innerHTML = '';
  
  myAppointments.forEach(app => {
    // Formatar data para exibição PT-BR (DD/MM/AAAA)
    const [year, month, day] = app.date.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    
    const card = document.createElement('div');
    card.className = 'appointment-card';
    card.setAttribute('data-id', app.id);
    
    // Valor formatado para real (ex: R$ 250,00)
    const formattedPrice = app.price ? `R$ ${app.price.toFixed(2).replace('.', ',')}` : 'Cortesia';
    
    card.innerHTML = `
      <div class="appointment-info">
        <span class="appointment-specialty">${app.specialty} • ${formattedPrice}</span>
        <h3 class="appointment-doctor">${app.doctor}</h3>
        <div class="appointment-datetime">
          <div class="datetime-item">
            <svg viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>
            <span>${formattedDate}</span>
          </div>
          <div class="datetime-item">
            <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            <span>${app.time}</span>
          </div>
        </div>
      </div>
      <button class="btn-cancel-appointment" onclick="cancelAppointment('${app.id}')">Cancelar Consulta</button>
    `;
    
    appointmentsList.appendChild(card);
  });
}

// Lógica de cancelamento exposta de forma global para funcionar com o onclick em linha
window.cancelAppointment = function(id) {
  if (confirm('Tem certeza de que deseja cancelar este agendamento?')) {
    const cardEl = document.querySelector(`.appointment-card[data-id="${id}"]`);
    
    if (cardEl) {
      // Efeito de saída animado
      cardEl.style.transform = 'scale(0.95)';
      cardEl.style.opacity = '0';
      
      setTimeout(() => {
        // Remover da lista interna e atualizar o localStorage
        appointments = appointments.filter(app => app.id !== id);
        localStorage.setItem('hbsaude_appointments', JSON.stringify(appointments));
        
        // Se a tela de agendamento estava sendo visualizada, recarrega horários possíveis
        checkAndRenderTimeSlots();
        
        // Re-renderizar lista
        renderAppointments();
      }, 3000 * 0.1); // aguarda o término da animação do CSS (300ms)
    }
  }
};

// ==========================================
// CONFIGURAÇÕES DE EVENTOS DE CLIQUE E INICIALIZAÇÃO
// ==========================================

// Configurar navegação no logo e links
navLogo.addEventListener('click', () => navigateTo('home'));
footerLinkHome.addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo('home');
});

// Eventos de clique nas navegações
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = this.getAttribute('data-target');
    
    // Se tentar acessar o painel e não estiver logado, redireciona para login
    if (target === 'dashboard' && !currentUser) {
      switchAuthTab('login');
      navigateTo('auth');
    } else {
      navigateTo(target);
    }
  });
});

// Cliques nos botões do header
btnNavLogin.addEventListener('click', () => {
  switchAuthTab('login');
  navigateTo('auth');
});

btnNavRegister.addEventListener('click', () => {
  switchAuthTab('register');
  navigateTo('auth');
});

btnNavLogout.addEventListener('click', logout);

// Cliques nas abas da tela de autenticação
tabLogin.addEventListener('click', () => switchAuthTab('login'));
tabRegister.addEventListener('click', () => switchAuthTab('register'));

// Cliques nas ações da Home Page (CTA)
heroBtnStart.addEventListener('click', () => {
  if (currentUser) {
    navigateTo('dashboard');
  } else {
    switchAuthTab('login');
    navigateTo('auth');
  }
});

heroBtnRegister.addEventListener('click', () => {
  switchAuthTab('register');
  navigateTo('auth');
});

// Inicialização Geral do Site
window.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
  setupMinBookingDate();
});
