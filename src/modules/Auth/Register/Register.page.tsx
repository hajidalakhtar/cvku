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

const registerSchema = z.object({
  email: z.string().email('Email wajib diisi dengan format email yang benar'),
  password: z.string().min(6, 'Password wajib diisi dan minimal 6 karakter'),
  name: z.string().min(2, 'Nama wajib diisi dan minimal 2 karakter')
});

type RegisterSchemaType = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'loading' && status !== 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  const { control, handleSubmit } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema)
  });

  const [loadingRegister, setLoadingRegister] = useState(false);

  const onSubmit: SubmitHandler<RegisterSchemaType> = async(values) => {
    try {
      setLoadingRegister(true);
      // TODO: Replace with your register API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      setLoadingRegister(false);
      if (!response.ok) {
        toast.error('Register failed');
      } else {
        toast.success('Register successful');
        router.push('/');
      }
    } catch (error) {
      setLoadingRegister(false);
      console.error('Error registering:', error);
      toast.error('An error occurred while registering');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full xl:w-1/2">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <h2 className="mb-5  text-2xl font-bold text-black sm:text-title-xl2">
            Register
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <div className="relative">
                <InputForm
                  control={control}
                  name="name"
                  placeholder="Enter your name"
                  type="text"
                  label="Name"
                ></InputForm>
              </div>
            </div>

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
                {loadingRegister ? (<span className="loading loading-spinner loading-md"></span>) : 'Register'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
