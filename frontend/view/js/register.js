//import validarCPF from './validateCPF.js';

// /view/js/register.js
const registerForm = document.getElementById('registerForm');
const notificationContainer = document.getElementById('notification-container');

registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    limparNotificacoes();

    let valid = true;

    const nome = document.getElementById('reg_name').value.trim();
    if (!nome) {
        criarNotificacao('Preencha o campo Nome completo.', 'error');
        valid = false;
    }

    const userName = document.getElementById('reg_usrName').value.trim();
    if (!userName) {
        criarNotificacao('Preencha o campo de UserName.', 'error');
        valid = false;
    }

    const email = document.getElementById('reg_email').value.trim();
    if (!email) {
        criarNotificacao('Preencha o campo Email.', 'error');
        valid = false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            criarNotificacao('Email inválido.', 'error');
            valid = false;
        }
    }

    const password = document.getElementById('reg_password').value;
    if (!password) {
        criarNotificacao('Preencha o campo Senha.', 'error');
        valid = false;
    }

    const confirmPassword = document.getElementById('reg_confirm_password').value;
    if (password !== confirmPassword) {
        criarNotificacao('As senhas não coincidem.', 'error');
        valid = false;
    }

    if (!valid) return;

    // Note: backend espera campo 'password' (JSON) — mapeado para 'senha' no model Java
    const data = { nome, userName, email, password };

    fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(async (response) => {
        const body = await response.json().catch(() => null);
        if (response.ok) {
            criarNotificacao('Registro realizado com sucesso!', 'success');
            setTimeout(() => { window.location.href = '../templates/login.html'; }, 900);
        } else {
            const msg = body && (body.message || body.error) ? (body.message || body.error) : (body ? JSON.stringify(body) : response.statusText);
            criarNotificacao('Erro no registro: ' + msg, 'error');
        }
    })
    .catch((error) => {
        console.error('Erro ao fazer a requisição:', error);
        criarNotificacao('Erro ao se conectar ao servidor. Tente novamente.', 'error');
    });
});

function criarNotificacao(message, type) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    if (type) notification.classList.add(type);
    notification.textContent = message;
    notificationContainer.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

function limparNotificacoes() {
    notificationContainer.innerHTML = '';
}


