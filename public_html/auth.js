import { getToken, setToken, isAuthenticated, clearToken } from './auth.js';

// Check if user is authenticated before allowing access to "Place an Order"
if (!isAuthenticated() && window.location.pathname.includes("placeanorder.html")) {
    window.location.href = "login.html?redirect=placeanorder.html";
}

// On login
setToken(response.token);

// On logout
clearToken();
