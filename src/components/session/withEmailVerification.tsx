import React, { useContext, useState } from 'react';
import { AuthContext } from './';
import { FirebaseContext } from '../firebase';

const withEmailVerification = <P extends {}>(WrappedComponent: React.FC<P>) => {
  const needsEmailVerification = (authUser: firebase.User | null) =>
    authUser && !authUser.emailVerified && authUser.providerData.map((provider) => provider?.providerId).includes('password');

  return (props: P) => {
    const firebase = useContext(FirebaseContext);
    const { authUser } = useContext(AuthContext);
    const [state, setState] = useState({ isSent: false });

    const sendEmailVerificationClickHandler = () => {
      firebase?.doSendEmailVerification()?.then(() => setState({ ...state, isSent: true }));
    };

    return needsEmailVerification(authUser) ? (
      <div>
        {state.isSent ? (
          <p>
            E-Mail confirmation sent: Check you E-Mails (Spam folder included) for a confirmation E-Mail. Refresh this page once you
            confirmed your E-Mail.
          </p>
        ) : (
          <p>Verify your E-Mail: Check you E-Mails (Spam folder included) for a confirmation E-Mail or send another confirmation E-Mail.</p>
        )}

        <button type="button" onClick={sendEmailVerificationClickHandler} disabled={state.isSent}>
          Send confirmation E-Mail
        </button>
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
  };
};

export default withEmailVerification;
