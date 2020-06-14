type User = {
  uid: string;
  email: string | null;
  username: string;
  roles: Partial<{ ADMIN: string }>;
  emailVerified: boolean;
  providerData: (firebase.UserInfo | null)[];
};

export default User;
