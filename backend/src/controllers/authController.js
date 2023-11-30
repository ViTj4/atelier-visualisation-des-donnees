import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

const googleSignIn = async (req, res) => {
  try {
    const { token } = req.body;
    const auth = getAuth();
    const credential = GoogleAuthProvider.credential(token);
    const userCredential = await signInWithCredential(auth, credential);

    res.status(200).json({ success: true, user: userCredential.user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export { googleSignIn };
