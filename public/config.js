const host = window.location.hostname;

export const api =
    host === "localhost" ||
    host === "192.168.0.175" ||
    host === "192.168.0.251"
        ? "http://localhost:5050"
        : "https://figutld.onrender.com";