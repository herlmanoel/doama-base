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

const TEXTOS_PAGINA_LOGIN = {
  titulo: 'Entrar na sua conta',
  descricao: 'Digite seu e-mail abaixo para acessar a plataforma.',
  emailLabel: 'E-mail',
  emailPlaceholder: 'seu@email.com',
  senhaLabel: 'Senha',
  esqueciSenha: 'Esqueceu sua senha?',
  botaoEntrar: 'Entrar',
  botaoGoogle: 'Entrar com Google',
  semConta: 'Não tem uma conta?',
  criarConta: 'Cadastre-se'
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{TEXTOS_PAGINA_LOGIN.titulo}</CardTitle>
          <CardDescription>{TEXTOS_PAGINA_LOGIN.descricao}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>{TEXTOS_PAGINA_LOGIN.emailLabel}</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder={TEXTOS_PAGINA_LOGIN.emailPlaceholder}
                  required
                />
              </div>
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>
                    {TEXTOS_PAGINA_LOGIN.senhaLabel}
                  </Label>
                  <a
                    href='#'
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                  >
                    {TEXTOS_PAGINA_LOGIN.esqueciSenha}
                  </a>
                </div>
                <Input id='password' type='password' required />
              </div>
              <div className='flex flex-col gap-3'>
                <Button type='submit' className='w-full'>
                  {TEXTOS_PAGINA_LOGIN.botaoEntrar}
                </Button>
              </div>
            </div>
            <div className='mt-4 text-center text-sm'>
              {TEXTOS_PAGINA_LOGIN.semConta}{' '}
              <a href='#' className='underline underline-offset-4'>
                {TEXTOS_PAGINA_LOGIN.criarConta}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
