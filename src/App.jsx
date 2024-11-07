import React, { useState } from 'react';
import './index.css'; 
import Logo from "../src/assets/Logo.png";
import CartelImage from "../src/assets/cartel.png"; 

const evaluarFraccion = (valor) => {
  if (valor.includes('/')) {
    const [numerador, denominador] = valor.split('/').map(Number);
    return numerador / denominador;
  }
  return Number(valor);
};

const App = () => {
  const [k, setK] = useState('1');
  const [a, setA] = useState('1');
  const [b, setB] = useState('0');
  const [c, setC] = useState('0');
  const [results, setResults] = useState({});
  const [mostrarCartel, setMostrarCartel] = useState(false); 
  const [cartelError, setCartelError] = useState(false); 

  const calcularResultados = () => {
    try {
      const kVal = evaluarFraccion(k);
      const aVal = evaluarFraccion(a);
      const bVal = evaluarFraccion(b);
      const cVal = evaluarFraccion(c);

   
      if (kVal === 0 || aVal <= 1 || aVal < 0) {
        setCartelError(true);
        return; 
      }

      const ordenadaAlOrigen = (kVal * Math.pow(aVal, bVal) + cVal).toFixed(2);  
      const asintota = cVal.toFixed(2);  
      const parOrdenado = { x: 0, y: (kVal * Math.pow(aVal, bVal) + cVal).toFixed(2) };

   
      let raices = null;
      if (aVal > 0 && aVal !== 1) {
        raices = calcularRaices(aVal, cVal);
      }

      setResults({
        ordenadaAlOrigen,
        asintota,
        parOrdenado,
        raices,
      });
      setCartelError(false);  
    } catch (error) {
      alert("Error en los parámetros ingresados. Asegúrate de que sean válidos.");
    }
  };

  const calcularRaices = (a, c) => {
   
    if (c > 0) {
      const raiz = Math.log(c) / Math.log(a);
      return { x: raiz.toFixed(2), y: c.toFixed(2) }; 
    }
    return null; 
  };

  const borrarDatos = () => {
    setK('1');
    setA('1');
    setB('0');
    setC('0');
    setResults({});
    setCartelError(false);  
  };

  const manejarClickTitulo = () => {
    setMostrarCartel(!mostrarCartel); 
  };

  return (
    <div className="main-container">
      <div className="side-container left">
        <p></p>
        <p><strong>Alumnas</strong></p>
        <p>Analuz Benavidez</p>
        <p>Alma Sorbera</p>
        <p>Carola Ricagni</p>
        <p>Ana Victoria Martinez</p>
        <p>Avril Duran</p>
        <p>Milena Nieto</p>
        <p>Uma Lubatti</p>
        <p>Paula Olariaga</p>
        <p></p>
        <p><strong>Profesores</strong></p>
        <p>Beatriz Brizuela</p>
        <p>Luciano Lugani</p>
      </div>

      <div className="container">
        <img src={Logo} alt="Logo" className="logo" />
        <h1 className="title" onClick={manejarClickTitulo} style={{ cursor: 'pointer' }}>
          <span className="underline">FUNCIÓN EXPONENCIAL</span> 
        </h1>
        {mostrarCartel && (
          <div className="cartel">
            <img src={CartelImage} alt="Descripción" className="cartel-image" />
            <p className="cartel-text">Se llama función exponencial de base a aquella cuya forma genérica es f(x) = ax, siendo a un número positivo distinto de 1. Por su propia definición, toda función exponencial tiene por dominio de definición el conjunto de los números reales R.</p>
            <button className="button-cerrar" onClick={() => setMostrarCartel(false)}>Cerrar</button>
          </div>
        )}
        
        {cartelError && (
          <div className="cartel-error">
            <p>¡Error! El valor de K no puede ser igual a 0, A no puede ser menor o igual a 1, ni negativo.</p>
            <button className="button-cerrar" onClick={() => setCartelError(false)}>Cerrar</button>
          </div>
        )}

        <div className="form-container">
          <div className="field">
            <label className="label">K "K≠0"</label>
            <div className="control">
              <input className="input" type="text" value={k} onChange={(e) => setK(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">A "A mayor 0 y A≠1"</label>
            <div className="control">
              <input className="input" type="text" value={a} onChange={(e) => setA(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">B "Representa el movimento horizontal."</label>
            <div className="control">
              <input className="input" type="text" value={b} onChange={(e) => setB(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">C "Representa el movimento vertical."</label>
            <div className="control">
              <input className="input" type="text" value={c} onChange={(e) => setC(e.target.value)} />
            </div>
          </div>
          <div className="control">
            <button className="button is-primary" onClick={calcularResultados}>Calcular</button>
            <button className="button is-light" onClick={borrarDatos} style={{ marginLeft: '1rem' }}>Borrar</button>
          </div>
        </div>

        {results.ordenadaAlOrigen !== undefined && (
          <div className="notification is-info">
            <p><strong>Ordenada al origen:</strong> {results.ordenadaAlOrigen}</p>
            <p><strong>Par ordenado en (0, y):</strong> (0, {results.parOrdenado.y})</p>
            <p><strong>Asintota horizontal:</strong> y = {results.asintota}</p>
            {results.raices && (
              <>
                <p><strong>Raíz de la ecuación:</strong> x = {results.raices.x}</p>
                <p><strong>Par ordenado de la raíz:</strong> ({results.raices.x}, {results.raices.y})</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
