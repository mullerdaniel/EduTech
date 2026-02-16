const trocaDeTema = document.getElementById("toggleTema");
const themeIcon = trocaDeTema.querySelector("img"); 

function atualizarIcone(isDark) {
    if (isDark) {
        themeIcon.setAttribute("src", "/images/sun.svg");
        themeIcon.setAttribute("alt", "Logo do Sol - Tema Claro");
    } else {
        themeIcon.setAttribute("src", "/images/moon.svg");
        themeIcon.setAttribute("alt", "Logo da Lua - Tema Escuro");
    }
}

if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("dark-mode");
    atualizarIcone(true);
}

trocaDeTema.addEventListener("click", function(event) {
    event.preventDefault();
    
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("tema", isDark ? "escuro" : "claro");
    
    atualizarIcone(isDark);
});