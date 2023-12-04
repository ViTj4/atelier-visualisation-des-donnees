import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth'

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body  // Le token ID de Google reçu du frontend
    const auth = getAuth()
    const credential = GoogleAuthProvider.credential(token)
    const userCredential = await signInWithCredential(auth, credential)



    res.status(200).json({ success: true, user: userCredential.user })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

module.exports.googleAuth = googleAuth
