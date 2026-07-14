export const api = window.location.hostname === "localhost" || window.location.hostname === "192.168.0.251"
    ? "http://localhost:5050"
    : "https://figutld.onrender.com";