import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyATCxGlh3EtaZd8cgpPMIG_RsX1oQcHzK4",
  authDomain: "datavise.firebaseapp.com",
  projectId: "datavise",
  storageBucket: "datavise.appspot.com",
  messagingSenderId: "236942547768",
  appId: "1:236942547768:web:c8eb94b121c878536e7fcd"
}


const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};

export default app