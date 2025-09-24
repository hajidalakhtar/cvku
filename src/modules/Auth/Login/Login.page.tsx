'use client';

import InputForm from '@/packages/components/FormGroup/input';
import { Button } from '@/packages/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email wajib diisi dengan format email yang benar'),
  password: z.string().min(6, 'Password wajib diisi dan minimal 6 karakter')
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'loading' && status !== 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  const { control, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema)
  });

  const [loadingLogin, setLoadingLogin] = useState(false);

  const onSubmit: SubmitHandler<LoginSchemaType> = async(values) => {
    try {
      setLoadingLogin(true);
      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      });
      setLoadingLogin(false);
      if (response?.error) {
        toast.error('Login failed');
      } else {
        toast.success('Login successful');
        router.push('/');
      }
    } catch (error) {
      setLoadingLogin(false);
      console.error('Error signing in:', error);
      toast.error('An error occurred while signing in');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full xl:w-1/2">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <h2 className="mb-5  text-2xl font-bold text-black sm:text-title-xl2">
            Sign In
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <div className="relative">
                <InputForm
                  control={control}
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  label="Email"
                ></InputForm>
              </div>
            </div>

            <div className="mb-6">
              <InputForm
                control={control}
                type="password"
                name="password"
                placeholder="Enter your password"
                label="Password"
              ></InputForm>
            </div>

            <div className="mb-5">
              <Button
                variant="default"
                type="submit"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              >
                {loadingLogin ? (<span className="loading loading-spinner loading-md"></span>) : 'Sign In'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
