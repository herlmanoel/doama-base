
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const TEXTOS_PAGINA_ESQUECI_SENHA = {
  titulo: 'Esqueceu sua senha?',
  descricao: 'Digite seu e-mail, CPF e telefone para recuperar sua senha.',
  emailLabel: 'E-mail',
  emailPlaceholder: 'seu@email.com',
  cpfLabel: 'CPF',
  cpfPlaceholder: 'Somente números',
  phoneLabel: 'Telefone',
  phonePlaceholder: 'Somente números',
  botaoRecuperar: 'Recuperar Senha',
  mensagemSucesso: 'Essa é sua nova senha:',
  erroValidacao: 'Dados inválidos. Verifique seu e-mail, CPF e telefone.',
  voltarLogin: 'Voltar para o Login'
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNewPassword('');

    // Simulação de validação e geração de senha
    if (email === 'test@example.com' && cpf === '12345678900' && phone === '11987654321') {
      const generatedPassword = Math.random().toString(36).slice(-8); // Gera uma senha aleatória
      setNewPassword(generatedPassword);
    } else {
      setError(TEXTOS_PAGINA_ESQUECI_SENHA.erroValidacao);
    }
  };

  return (
    <div className='w-full max-w-md'>
      <Card>
        <CardHeader>
          <CardTitle>{TEXTOS_PAGINA_ESQUECI_SENHA.titulo}</CardTitle>
          <CardDescription>{TEXTOS_PAGINA_ESQUECI_SENHA.descricao}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRecoverPassword}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>{TEXTOS_PAGINA_ESQUECI_SENHA.emailLabel}</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder={TEXTOS_PAGINA_ESQUECI_SENHA.emailPlaceholder}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='cpf'>{TEXTOS_PAGINA_ESQUECI_SENHA.cpfLabel}</Label>
                <Input
                  id='cpf'
                  type='text'
                  placeholder={TEXTOS_PAGINA_ESQUECI_SENHA.cpfPlaceholder}
                  required
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='phone'>{TEXTOS_PAGINA_ESQUECI_SENHA.phoneLabel}</Label>
                <Input
                  id='phone'
                  type='text'
                  placeholder={TEXTOS_PAGINA_ESQUECI_SENHA.phonePlaceholder}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              {error && <p className='text-sm text-red-500'>{error}</p>}
              {newPassword && (
                <div className='text-center'>
                  <p className='text-sm font-medium'>{TEXTOS_PAGINA_ESQUECI_SENHA.mensagemSucesso}</p>
                  <p className='text-lg font-bold text-primary'>{newPassword}</p>
                </div>
              )}
              <div className='flex flex-col gap-3'>
                <Button type='submit' className='w-full'>
                  {TEXTOS_PAGINA_ESQUECI_SENHA.botaoRecuperar}
                </Button>
              </div>
            </div>
            <div className='mt-4 text-center text-sm'>
              <a href='/login' className='underline underline-offset-4'>
                {TEXTOS_PAGINA_ESQUECI_SENHA.voltarLogin}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
