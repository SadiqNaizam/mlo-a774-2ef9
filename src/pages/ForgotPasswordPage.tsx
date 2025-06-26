import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/AuthForm';

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        {/* 
          The AuthForm component handles all the logic for the forgot password form.
          We just need to pass the correct 'mode' prop.
          It internally uses Card, Label, Input, and Button from shadcn/ui.
        */}
        <AuthForm mode="forgot-password" />
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;