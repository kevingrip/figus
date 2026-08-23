const host = window.location.hostname;

export const api =
    host === "localhost" ||
    host === "127.0.0.1"
        ? "http://localhost:5050"
        : host === "192.168.0.251"
            ? "http://192.168.0.251:5050"
            : "https://figutld.onrender.com";