import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Image Processor App</h1>
      <LoginLink>Sign in</LoginLink> <br />
      <RegisterLink>Sign up</RegisterLink> <br />
      <LogoutLink>Log out</LogoutLink>
    </div>
  );
};

export default HomePage;
