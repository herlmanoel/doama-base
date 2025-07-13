'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TEXTOS_PAGINA_LOGIN = {
  titulo: 'Entrar na sua conta',
  descricao: 'Digite seu e-mail abaixo para acessar a plataforma.',
  emailLabel: 'E-mail',
  emailPlaceholder: 'admin@gmail.com',
  senhaLabel: 'Senha',
  esqueciSenha: 'Esqueceu sua senha?',
  botaoEntrar: 'Entrar',
  botaoGoogle: 'Entrar com Google',
  semConta: 'Não tem uma conta?',
  criarConta: 'Cadastre-se',
  erroLogin: 'E-mail ou senha inválidos.'
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    });

    if (result?.error) {
      setError(TEXTOS_PAGINA_LOGIN.erroLogin);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{TEXTOS_PAGINA_LOGIN.titulo}</CardTitle>
          <CardDescription>{TEXTOS_PAGINA_LOGIN.descricao}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>{TEXTOS_PAGINA_LOGIN.emailLabel}</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder={TEXTOS_PAGINA_LOGIN.emailPlaceholder}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>
                    {TEXTOS_PAGINA_LOGIN.senhaLabel}
                  </Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='666666'
                />
              </div>
              {error && <p className='text-sm text-red-500'>{error}</p>}
              <div className='flex flex-col gap-3'>
                <Button type='submit' className='w-full'>
                  {TEXTOS_PAGINA_LOGIN.botaoEntrar}
                </Button>
              </div>
            </div>
            <div className='mt-4 text-center text-sm'>
              {TEXTOS_PAGINA_LOGIN.semConta}{' '}
              <a href='/login/register' className='underline underline-offset-4'>
                {TEXTOS_PAGINA_LOGIN.criarConta}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
