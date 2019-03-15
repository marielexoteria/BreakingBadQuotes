import React, { useState, useEffect} from 'react';
import axios from 'axios';

function Frase({frase}) { //haciendo destructuring para extraer lo que se quiere mostrar del resultado de la consulta al API
    return (
        <div className="frase">
            <h1>{frase.quote}</h1>
            <p>- {frase.author}</p>
        </div>
    )
}


function App() {
    const [frase, obtenerFrase] = useState({});
    
    const consultarAPI = async () => {
      const resultado = await axios('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
      //console.log(resultado.data[0]);
      //agregando el resultado de la API al state (similar a this.setState)
      obtenerFrase(resultado.data[0]);
  }

    //consulta a una RestAPI
    useEffect( //hace un componentDidMount y un componentDidUpdate
        () => {
            consultarAPI()
        }, [] //se le pone un arreglo vacío como dependencia para que solamente haga la llamada a la API una vez; si se le quita el arreglo vacío, hará el llamado infinitamente
    )
    
    return (
        <div className="contenedor">
            <Frase 
                frase = {frase}
            />
            <button onClick={consultarAPI}>Generar Nueva Frase</button>
        </div>
    )
}

export default App;
