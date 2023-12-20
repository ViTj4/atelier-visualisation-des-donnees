import React from 'react'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import googleSignIn from '../services/googleAuth'

export const Erreur = () => {
  const handleClick = () => {
    // signInWithPopup(auth, provider)
  
    signInWithPopup(googleSignIn()).then( data => {
      console.log(data.user.email)
    })

  // axios.get('http://localhost:3000/')
  // .then(response => {
  //   // Traitement des données de réponse
  //   console.log(response.data);
  // })
  // .catch(error => {
  //   // Gestion des erreurs
  //   console.error('Erreur lors de la requête GET:', error);
  // });
  
}
  return (
    <div>
      <h1>TouT Casser</h1>
      <button onClick={ () => handleClick()}>google</button>
    </div>
  )
}
