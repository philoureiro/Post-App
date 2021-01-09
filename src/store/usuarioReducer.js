//Configurações do estado atual do usuário, os valores a baixo 
//setado no começo por padrão
const INITIAL_STATE = {
    usuarioEmail: '',
    usuarioLogado: false
};

function usuarioReducer(state = INITIAL_STATE, action) { //receba uma acao e escolhe o tipo
    
    switch (action.type) {
        case 'LOGIN':
            return { ...state, usuarioLogado: true, usuarioEmail: action.usuarioEmail }//carrega todos os atributos do objeto, mas altera os valores, indicando que o usuario está logado no sistema

        case 'LOGOUT':
            return { ...state, usuarioLogado: false, usuarioEmail: null } //retorna false e nulo, para caso não esteja logado

        default:
            return state; //Caso queira consultar
    }

}

export default usuarioReducer; 