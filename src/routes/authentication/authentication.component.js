import SignInForm from '../../components/sign-in-form/sign-in-form.component.js';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component.js';

import './authentication.styles.scss';

const Authentication = () => (
  <div className="authentication-container">
    <SignInForm />
    <SignUpForm />
  </div>
);

export default Authentication;
