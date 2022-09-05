
import { useState } from 'react';
import './App.css';
import Dados from './dados.json';

function App() {
  const [city, setCity] = useState("Panambi");
  const [weatherForecast, setWeatherForecast] = useState(null);
   
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  let json = [Dados]
    let valor1 = document.getElementById("valor1");
    let valor2 = document.getElementById("valor2");
    valor1 = parseInt(valor1.value);
    valor2 = parseInt(valor2.value);
    let arr = [];
    arr.push([valor1, valor2]);

    let filtro = json.filter(AchaValor);

    function AchaValor(value) {
        if ((value[0] === arr[0][0] && value[1] === arr[0][1])) {
            return value;
        }
    }
    document.getElementById("resultado").innerHTML = filtro;
    document.getElementById('valor1').value='';
    document.getElementById('valor2').value='';
    filtro = 0;
    arr = 0;

  const handleSearch = () => {
    fetch (
      `http://api.weatherapi.com/v1/current.json?key=e751ea9cf5bc4fcbbb3225428211810&q=${city}&lang=pt`
    ).then((response) => {
      if(response.status == 200){
        return response.json()
      }
    })
    .then((data) => {
      setWeatherForecast(data)
    });
  };
  return ( 
    <div class="container">
      <nav>PCE</nav>
        <main><h1>Historico meteorologico</h1>
         <label>
                Pesquisar Data: <br/>
                   <input id="valor1" type="date" name="valor1" data-rules="required|min=4" />
                 Pesquisar Hora:<br/>
                <input  id="valor2" type="time" name="valor2" data-rules="required|min=4" />
                <button onclick="myFunction(valor1, valor2)"> Ok </button>
          </label>
        </main>
        <div id="sidebar"> Buscar
         <label>
           <input type="text" name="name"
          onChange={handleChange}
          placeholder='Pesquise a cidade'
          value={city}/>
        </label>
        <button onClick={handleSearch}> Ok </button>
        {weatherForecast ? (
          <div>
          <div>
            <h3>Tempo Atual: {weatherForecast.current.condition.text}</h3>
            <img src={weatherForecast.current.condition.icon} />
            <p>Data e horas: {weatherForecast.location.localtime}</p>
            <p>Estado: {weatherForecast.location.region}</p>
            <p> Temperatura : {weatherForecast.current.temp_c} °C</p>
            <p> umidade do Ar:{weatherForecast.current.humidity}</p>
           </div>
          </div>
          ) :null }
      </div> 
      <div id="content1" class="temperatura"> Temperatura </div>
      <div id="content2" class="Umidade"> Umidade </div>
      <div id="content3" class="Chuva"> Chuva </div>
      <footer>Footer</footer>
    </div>  
  );
};
export default App;