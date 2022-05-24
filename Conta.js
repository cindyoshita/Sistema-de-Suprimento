 let listaDeLogin = {
    "conta" : {
        "listaDeUsuario" : [{"usuario" : "abc", "senha" : "123"},{"usuario" : "def", "senha" : "456"}]
    }
};
let logado = false;

function checarLogin () {
    for (let i = 0; i < listaDeLogin.listaDeUsuario.lenght; i++){
            if (usuarios == listaDeLogin.listaDeUsuario.usuario && senha == listaDeLogin.listaDeUsuario.senha){
                logado = true
            }
    }
    if (logado)
    alert("usuario logado");
    else alert("falha ao logar");     
}