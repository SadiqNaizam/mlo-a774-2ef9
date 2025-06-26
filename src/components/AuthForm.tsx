import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import SocialLoginButtons from '@/components/SocialLoginButtons'; // Assuming this component exists

// Define validation schemas
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

const signUpSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

// Union of schemas for type inference
const formSchema = z.union([loginSchema, signUpSchema, forgotPasswordSchema]);
type FormValues = z.infer<typeof formSchema>;

// Props definition
interface AuthFormProps {
  mode: 'login' | 'signup' | 'forgot-password';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  console.log(`AuthForm loaded in ${mode} mode.`);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Determine schema based on mode
  const currentSchema = 
    mode === 'login' ? loginSchema :
    mode === 'signup' ? signUpSchema :
    forgotPasswordSchema;

  const form = useForm<FormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  // Reset form when mode changes
  useEffect(() => {
    form.reset();
  }, [mode, form]);

  const onSubmit = (values: FormValues) => {
    setIsLoading(true);
    console.log('Form submitted with values:', values);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'login' || mode === 'signup') {
        toast({
          title: "Success!",
          description: mode === 'login' ? "You've been logged in successfully." : "Your account has been created.",
        });
        navigate('/dashboard');
      } else if (mode === 'forgot-password') {
        toast({
          title: "Check your email",
          description: "A password reset link has been sent to your email address.",
        });
      }
    }, 1500);
  };

  const formContent = {
    login: {
      title: 'Welcome Back!',
      description: 'Sign in to continue to SwiftLogin.',
      buttonText: 'Login',
    },
    signup: {
      title: 'Create an Account',
      description: 'Get started with SwiftLogin in seconds.',
      buttonText: 'Create Account',
    },
    'forgot-password': {
      title: 'Forgot Password?',
      description: "Enter your email and we'll send you a reset link.",
      buttonText: 'Send Reset Link',
    },
  };

  const { title, description, buttonText } = formContent[mode];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {mode === 'signup' && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="John Doe" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {mode !== 'login' || (
                 <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="you@example.com" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {(mode === 'login' || mode === 'signup') && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Password</FormLabel>
                      {mode === 'login' && (
                        <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                          Forgot?
                        </Link>
                      )}
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
             {mode === 'forgot-password' && (
                 <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="you@example.com" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}


            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Processing...' : buttonText}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </Form>
        {(mode === 'login' || mode === 'signup') && (
            <>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>
                <SocialLoginButtons />
            </>
        )}
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        {mode === 'login' && (
          <p className="text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link to="/sign-up" className="font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        )}
        {mode === 'signup' && (
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link to="/" className="font-semibold text-primary hover:underline">
              Login
            </Link>
          </p>
        )}
        {mode === 'forgot-password' && (
          <p className="text-muted-foreground">
            Remembered your password?{' '}
            <Link to="/" className="font-semibold text-primary hover:underline">
              Login
            </Link>
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthForm;