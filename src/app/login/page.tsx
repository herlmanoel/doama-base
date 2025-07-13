
import { LoginForm } from '@/components/login-form';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Page() {
  return (
    <div className="grid h-svh lg:grid-cols-2">
      <ScrollArea className="h-full">
        <div className="flex min-h-svh flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                D
              </div>
              Doama
            </a>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Coluna com imagem fixa */}
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/assets/img/img-login-doacao.avif"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
