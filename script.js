document.addEventListener('DOMContentLoaded', function() {
    // Ключи для localStorage
    const AUTH_KEY = 'auth_token';
    const USER_KEY = 'current_user';
    const REMEMBER_KEY = 'remember_me';
    const SAVED_LOGIN_KEY = 'saved_login';
    
    // Тестовый пользователь (можно заменить на свою логику)
    const TEST_USERS = [
        { login: 'admin', password: '123456' },
        { login: 'user', password: 'qwerty' },
        { login: 'test', password: 'test123' }
    ];
    
    // Проверить логин и пароль
    function checkCredentials(login, password) {
        return TEST_USERS.some(user => user.login === login && user.password === password);
    }
    
    // Показать сообщение
    function showMessage(text, isError = false) {
        const msg = document.getElementById('message');
        msg.textContent = text;
        msg.className = isError ? 'message error-message' : 'message success';
        setTimeout(() => msg.textContent = '', 3000);
    }
    
    // Очистить ошибки
    function clearErrors() {
        document.querySelectorAll('.error').forEach(el => el.textContent = '');
    }
    
    // Авторизовать пользователя
    function loginUser(login, remember) {
        // Сохраняем данные авторизации
        localStorage.setItem(AUTH_KEY, 'authenticated');
        localStorage.setItem(USER_KEY, login);
        
        // Если выбрано "Запомнить меня"
        if (remember) {
            localStorage.setItem(REMEMBER_KEY, 'true');
            localStorage.setItem(SAVED_LOGIN_KEY, login);
        } else {
            localStorage.removeItem(REMEMBER_KEY);
            localStorage.removeItem(SAVED_LOGIN_KEY);
        }
        
        // Редирект на страницу сообщений
        showMessage('Вход выполнен! Перенаправление...');
        setTimeout(() => {
            window.location.href = 'messages.html';
        }, 1000);
    }
    
    // Проверка автоавторизации
    function checkAutoLogin() {
        const savedLogin = localStorage.getItem(SAVED_LOGIN_KEY);
        const rememberMe = localStorage.getItem(REMEMBER_KEY);
        
        if (rememberMe === 'true' && savedLogin) {
            document.getElementById('login').value = savedLogin;
            document.getElementById('rememberMe').checked = true;
        }
    }
    
    // === ОБРАБОТКА ФОРМЫ ВХОДА ===
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        
        const login = document.getElementById('login').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Валидация
        if (!login) {
            document.getElementById('loginError').textContent = 'Логин обязателен';
            return;
        }
        
        if (!password) {
            document.getElementById('passwordError').textContent = 'Пароль обязателен';
            return;
        }
        
        // Проверка учетных данных
        if (checkCredentials(login, password)) {
            loginUser(login, rememberMe);
        } else {
            document.getElementById('passwordError').textContent = 'Неверный логин или пароль';
            showMessage('Ошибка входа. Проверьте данные.', true);
        }
    });
    
    // === ИНИЦИАЛИЗАЦИЯ ===
    checkAutoLogin();
    console.log('Форма входа готова!');
});
