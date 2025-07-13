'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { InfoIcon, UserPlus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const formSchema = z.object({
  firstName: z.string().min(1, 'Nome é obrigatório.').min(3, 'Nome deve ter no mínimo 3 caracteres.'),
  lastName: z.string().min(1, 'Sobrenome é obrigatório.').min(3, 'Sobrenome deve ter no mínimo 3 caracteres.'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF inválido. Deve conter 11 dígitos numéricos.'),
  phone: z.string().regex(/^\d{10,11}$/, 'Telefone inválido. Deve conter 10 ou 11 dígitos numéricos.'),
  email: z.string().email('E-mail inválido.'),
  position: z.string().min(1, 'Cargo é obrigatório.'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres.'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, { message: 'Você deve aceitar os termos e condições.' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem.',
  path: ['confirmPassword'],
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      cpf: '',
      phone: '',
      email: '',
      position: '',
      password: '',
      confirmPassword: '',
      acceptTerms: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the data to your backend API
    // For now, just log it.
  }

  return (
    <div className="space-y-4">
      <div className="text-left mb-4">
        <h1 className="text-2xl font-bold">Cadastro de Nova Conta</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu primeiro nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Sobrenome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu sobrenome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>CPF</FormLabel>
                <FormControl>
                  <Input placeholder="Somente números" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="Seu telefone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="Seu e-mail corporativo ou pessoal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Cargo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um cargo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="manager">Gerente</SelectItem>
                    <SelectItem value="employee">Funcionário</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Crie uma senha segura" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Repita sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Eu concordo com os termos e condições
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            <UserPlus className="mr-2 h-4 w-4" /> Criar conta
          </Button>
        </form>
      </Form>
    </div>
  );
}