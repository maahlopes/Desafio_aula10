const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value;
    const mensagemErro = document.getElementById("mensagemErro");
    const botao = formLogin.querySelector('button[type="submit"]');

    mensagemErro.textContent = "";
    botao.disabled = true;

    try {
        const resposta = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify({ usuario, senha })
        });

        const resultado = await resposta.json();

        if (resposta.ok && resultado.sucesso) {
            window.location.href = "/cadastro";
        } else {
            mensagemErro.textContent =
                resultado.erro || "Usuário ou senha incorretos.";
        }

    } catch (erro) {
        mensagemErro.textContent =
            "Não foi possível conectar ao servidor.";
    } finally {
        botao.disabled = false;
    }
});