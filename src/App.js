import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [temperaturaInicial, setTemperaturaInicial] = useState();
  const [mostrarSimulacion, setMostrarSimulacion] = useState(false);
  const [temporal, setTemporal] = useState("");
  const [margaritas, setMargaritas] = useState([]);
  const [negras, setNegras] = useState(0);
  const [blancas, setBlancas] = useState(0);

  const HandlerInput = (event) => setTemperaturaInicial(event?.target?.value);

  useEffect(() => {

    if(margaritas.length < 1000 ){
      setTimeout(() => {
        let element = document.getElementById('triggerClose');
        element.click();   
      }, 500)
    }

  },[margaritas])

  
  const continuar = () => {

    setMostrarSimulacion(true);

    let margaritaNegra= {tipo:"N"};
    let margaritaBlanca= {tipo:"B"};
    let changeMargaritas = [];
   

    if(temperaturaInicial != undefined) {
    
      if(temperaturaInicial < 24 ){

        if(blancas > 10){
          setTemperaturaInicial(27);
        }
        else{
          setTemperaturaInicial(temperaturaInicial);
        }
       
        setTemporal("Deben crecer las margaritas negras");

        if(((margaritas.length) % 7 === 1) || ((margaritas.length) % 10 === 0)){

          if(blancas > 10){
            setTemperaturaInicial(27);
          }
          else{
            setTemperaturaInicial(temperaturaInicial);
          }
          changeMargaritas = [
            ...margaritas,
            margaritaBlanca
          ]

        }
        else{ 
          changeMargaritas = [
            ...margaritas,
            margaritaNegra
          ]

        }

        setMargaritas(changeMargaritas);

      }

      else if (temperaturaInicial >= 24 && temperaturaInicial <= 30) {

        setTemporal("Deben crecer las negras igual que las blancas");


        if(negras > 45 && blancas < 60){
          setTemperaturaInicial(50);
        }
        else{
          setTemperaturaInicial(temperaturaInicial);
        }

        if((margaritas.length)%5 == 1){
          changeMargaritas = [
            ...margaritas,
            margaritaNegra, 
            margaritaNegra
  
          ];

        }
        else if ((margaritas.length)%7 == 0){ 
          changeMargaritas = [
            ...margaritas,
            margaritaBlanca, 
            margaritaBlanca
  
          ];
        }
        else{
          changeMargaritas = [
            ...margaritas,
            margaritaBlanca, 
            margaritaNegra
  
          ];
        }
        
        setMargaritas(changeMargaritas);
      }

      else {

        if(blancas > 60){
          setTemperaturaInicial(28);
        }
        else{
          setTemperaturaInicial(temperaturaInicial);
        }
        
        setTemporal("Deben crecer las margaritas blancas");

        if(((margaritas.length) % 7 === 1) || ((margaritas.length) % 10 === 0)){
          changeMargaritas = [
            ...margaritas,
            margaritaNegra
          ];
        }
        else{ 
          changeMargaritas = [
            ...margaritas,
            margaritaBlanca
          ];
        }

        setMargaritas(changeMargaritas);

      }

    }

    const arrayNegras = margaritas.filter(margarita => margarita.tipo === "N");
    const arrayBlancas = margaritas.filter(margarita => margarita.tipo === "B");

    setNegras(arrayNegras.length);
    setBlancas(arrayBlancas.length);


  }

  const limpiar = () => {
    alert("Ha finalizado el proceso de simulación")
    setTemperaturaInicial();
    setMostrarSimulacion(false);
    setMargaritas([]);
    setTemporal("");
  }

  return (

    <>
      <div className="App">
        <div className="titleApp">El mundo de las margaritas</div>

        <div className="containerHeader">
          <input
            type="number"
            name="Temperatura"
            className="input"
            placeholder="Ingrese la temperatura"
            onChange={(e) => HandlerInput(e)}
          />

          <button className="button" onClick={continuar} id="triggerClose">
            Simular 
          </button>

          <button className="button" onClick={limpiar}>
            Finalizar
          </button>

          <div className="containerTemperatura"> 
            <div className="label">Temperatura del planeta</div>
            <div className="valor">{temperaturaInicial}</div>
          </div>
          <div className="containerTemperatura"> 
            <div className="label">Margaritas Negras</div>
            <div className="valor">{negras}</div>
          </div>
          <div className="containerTemperatura"> 
            <div className="label">Margaritas Blancas</div>
            <div className="valor">{blancas}</div>
          </div>
        </div>
        <div className="line"></div>
      </div>

      {mostrarSimulacion && (
        <div className="containerSimulacion">
          <div className="tituloSimulacion">SIMULACIÓN</div>
          <div className="textSimulacion">{temporal}</div>

          <div style={{width:"1000px", marginTop:"250px"}}>
            {margaritas.map((margarita) => {
              return (
                <>
                  {margarita.tipo === "N" && (
                    <img
                      alt="MN"
                      src="https://png.vector.me/files/images/1/7/177244/black_flower_plant.jpg"
                      className="img"
                    />
                  )}
                  {margarita.tipo === "B" && (
                    <img
                      alt="MB"
                      src="https://e7.pngegg.com/pngimages/389/266/png-clipart-flower-black-and-white-yellow-daisy-s-purple-white.png"
                      className="img"
                    />
                  )}
                </>
              )
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
