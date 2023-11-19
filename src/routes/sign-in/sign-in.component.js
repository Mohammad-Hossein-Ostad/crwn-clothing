import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils.js';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocumentRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign-In page</h1>
      <button onClick={logGoogleUser}>Sign-in with Google</button>
    </div>
  );
};

export default SignIn;
