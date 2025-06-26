import React from 'react';
import AuthForm from '@/components/AuthForm';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const LoginPage: React.FC = () => {
  console.log('LoginPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <AuthForm mode="login" />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;