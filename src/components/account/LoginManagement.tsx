import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../firebase';
import { User } from '../firebase/models';

type SignInMethod = {
  id: 'password' | 'google.com';
  provider?: string;
};

const SIGN_IN_METHODS: SignInMethod[] = [{ id: 'password' }, { id: 'google.com', provider: 'googleProvider' }];

type LoginManagementProps = {
  authUser: User | null;
};

const LoginManagement: React.FC<LoginManagementProps> = (props) => {
  const [state, setState] = useState<{ activeSignInMethods: string[]; error: { message: string } | null }>({
    activeSignInMethods: [],
    error: null,
  });
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    fetchSignInMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSignInMethods = () => {
    if (!props.authUser || !props.authUser.email) {
      return;
    }

    firebase?.auth
      .fetchSignInMethodsForEmail(props.authUser.email)
      .then((activeSignInMethods) => {
        setState({ ...state, activeSignInMethods, error: null });
      })
      .catch((error) => setState({ ...state, error }));
  };

  const defaultLoginLinkClickHandler = (password: string) => {
    if (!props.authUser || !props.authUser.email || firebase == null) {
      return;
    }

    const credential = firebase.getEmailCredential(props.authUser.email, password);

    firebase.auth.currentUser
      ?.linkWithCredential(credential)
      .then(fetchSignInMethods)
      .catch((error) => setState({ ...state, error }));
  };

  const socialLoginLinkClickHandler = (provider?: string) => {
    if (provider == null || firebase == null) {
      return;
    }

    let authProvider: firebase.auth.AuthProvider | null = null;
    switch (provider) {
      case 'googleProvider':
        authProvider = firebase.googleProvider;
        break;

      default:
        console.error(`unknown provider ${provider}`);
        break;
    }

    if (!authProvider) {
      return;
    }

    firebase?.auth.currentUser
      ?.linkWithPopup(authProvider)
      .then(fetchSignInMethods)
      .catch((error) => setState({ ...state, error }));
  };

  const unlinkClickHandler = (providerId: string) => {
    firebase?.auth.currentUser
      ?.unlink(providerId)
      .then(fetchSignInMethods)
      .catch((error) => setState({ ...state, error }));
  };

  const { activeSignInMethods, error } = state;

  return (
    <div>
      Sign In Mehtods:
      <ul>
        {SIGN_IN_METHODS.map((signInMethod) => {
          const onlyOneLeft = activeSignInMethods.length === 1;
          const isEnabled = activeSignInMethods.includes(signInMethod.id);

          return (
            <li key={signInMethod.id}>
              {signInMethod.id === 'password' ? (
                <DefaultLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={defaultLoginLinkClickHandler}
                  onUnlink={unlinkClickHandler}
                />
              ) : (
                <SocialLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={socialLoginLinkClickHandler}
                  onUnlink={unlinkClickHandler}
                />
              )}
            </li>
          );
        })}
      </ul>
      {error && error.message}
    </div>
  );
};

type LoginToggleProps = {
  onlyOneLeft: boolean;
  isEnabled: boolean;
  signInMethod: SignInMethod;
  onUnlink: (providerId: string) => void;
};

type SocialLoginToggleProps = LoginToggleProps & {
  onLink: (provider?: string) => void;
};

const SocialLoginToggle: React.FC<SocialLoginToggleProps> = (props) => {
  const { onlyOneLeft, isEnabled, signInMethod, onLink, onUnlink } = props;

  return isEnabled ? (
    <button
      type="button"
      onClick={() => {
        onUnlink(signInMethod.id);
      }}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.id}
    </button>
  ) : (
    <button
      type="button"
      onClick={() => {
        onLink(signInMethod.provider);
      }}
    >
      Link {signInMethod.id}
    </button>
  );
};

type DefaultLoginToggleProps = LoginToggleProps & {
  onLink: (password: string) => void;
};

const DefaultLoginToggle: React.FC<DefaultLoginToggleProps> = (props) => {
  const [state, setState] = useState({ passwordOne: '', passwordTwo: '' });
  const { onlyOneLeft, isEnabled, signInMethod, onLink, onUnlink } = props;

  const submitClickHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onLink(state.passwordOne);
    setState({ passwordOne: '', passwordTwo: '' });
  };

  const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const { passwordOne, passwordTwo } = state;
  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  return isEnabled ? (
    <button type="button" onClick={() => onUnlink(signInMethod.id)} disabled={onlyOneLeft}>
      Deactivate {signInMethod.id}
    </button>
  ) : (
    <form onSubmit={submitClickHandler}>
      <input name="passwordOne" value={passwordOne} onChange={changeHandler} type="password" placeholder="Password" />
      <input name="passwordTwo" value={passwordTwo} onChange={changeHandler} type="password" placeholder="Confirm Password" />

      <button disabled={isInvalid} type="submit">
        Link {signInMethod.id}
      </button>
    </form>
  );
};

export default LoginManagement;
