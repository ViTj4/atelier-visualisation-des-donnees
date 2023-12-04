import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Accueil from "./views/Accueil";
import { Erreur } from "./views/Erreur";
import Ague from "./views/Ague";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />}></Route>
          <Route path="/ague" element={<Ague />}></Route>
          <Route path="*" element={<Erreur />}></Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;