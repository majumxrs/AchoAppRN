import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {
    const [logado, setLogado] = useState(true);
    const [error, setError] = useState(false);
    const[ novaObservacao, setNovaObservacao ] = useState( false ); 
    async function Login(email, senha) {

        if (email != "" && senha != "") {
            await fetch('http://10.139.75.8:5251/swagger/index.html', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                //metodo de login
                body: JSON.stringify({
                    username: email,
                    password: senha
                })
            })
            //PEGA AS INFORMAÇÕES DO JEITO QUE A API DEVOLVE
                .then(res => (res.ok == true) ? res.json() : false)
                .then(json => {
                    setLogado((json.token) ? true : false);
                    setError((json.token) ? false : true);
                }
                )
                .catch(err => setError(true))
        } else {
            setError(true)
        }
    }

    return (
        <AuthContext.Provider value={{ logado: logado, Login, error: error, novaObservacao:novaObservacao, setNovaObservacao, }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;