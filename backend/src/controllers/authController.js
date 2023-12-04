import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth'
import { httpReturnCodes } from '../constant'

const googleSignIn = async (req, res) => {
  try {
    const { token } = req.body
    const auth = getAuth()
    const credential = GoogleAuthProvider.credential(token)
    const userCredential = await signInWithCredential(auth, credential)

    res.status(httpReturnCodes.OK).json({ success: true, user: userCredential.user })
  } catch (error) {
    res.status(httpReturnCodes.BAD_REQUEST).json({ success: false, message: error.message })
  }
}

export { googleSignIn }
