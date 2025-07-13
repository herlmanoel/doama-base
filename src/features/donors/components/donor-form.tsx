'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Donor } from '@/constants/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSearchParams } from 'next/navigation';

const personalSchema = z.object({
  registrationDate: z.date().optional(),
  fullName: z.string().min(3, 'Nome completo é obrigatório (mínimo 3 caracteres).'),
  dateOfBirth: z.date({ required_error: 'Data de nascimento é obrigatória.' }),
  profession: z.string().min(3, 'Profissão é obrigatória (mínimo 3 caracteres).'),
  address: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  referencePoint: z.string().optional(),
  landline: z.string().regex(/^\d{10,11}$/, 'Telefone fixo é obrigatório e deve ter 10 ou 11 dígitos.'),
  mobile: z.string().regex(/^\d{10,11}$/, 'Celular é obrigatório e deve ter 10 ou 11 dígitos.'),
});

const medicalSchema = z.object({
  prenatalCare: z.string().optional(),
  doctorName: z.string().optional(),
  gestationalAge: z.string().optional(),
  birthType: z.enum(['normal', 'cesarean'], { required_error: 'Tipo de parto é obrigatório: "normal" ou "cesarean".' }),
  birthDate: z.date({ required_error: 'Data do parto é obrigatória.' }),
  complications: z.string().optional(),
});

const testsSchema = z.object({
  vdrl: z.enum(['reagente', 'nao-reagente'], { required_error: 'VDRL é obrigatório: "reagente" ou "nao-reagente".' }),
  hbsag: z.enum(['positivo', 'negativo']),
  ftaAbs: z.enum(['positivo', 'negativo']),
  hiv: z.enum(['positivo', 'negativo'], { required_error: 'HIV é obrigatório: "positivo" ou "negativo".' }),
  transfusion: z.enum(['sim', 'nao'], { required_error: 'Transfusão é obrigatória: "sim" ou "nao".' }),
});

const lifestyleSchema = z.object({
  tattoo: z.enum(['sim', 'nao'], { required_error: 'Tatuagem é obrigatória: "sim" ou "nao".' }),
  tattooDetails: z.string().optional(),
  piercing: z.enum(['sim', 'nao'], { required_error: 'Piercing é obrigatório: "sim" ou "nao".' }),
  piercingDetails: z.string().optional(),
  smoker: z.enum(['sim', 'nao'], { required_error: 'Tabagista é obrigatório: "sim" ou "nao".' }),
  alcohol: z.enum(['sim', 'nao'], { required_error: 'Álcool é obrigatório: "sim" ou "nao".' }),
  drugs: z.enum(['sim', 'nao'], { required_error: 'Drogas é obrigatório: "sim" ou "nao".' }),
  drugDetails: z.string().optional(),
});

const formSchema = personalSchema.merge(medicalSchema).merge(testsSchema).merge(lifestyleSchema);

export default function DonorForm({
  initialData,
  pageTitle
}: {
  initialData?: Donor | null;
  pageTitle: string;
}) {
  const searchParams = useSearchParams();
  const donorId = searchParams.get('id');

  // Mock function to simulate fetching donor data
  const fetchDonorData = async (id: string): Promise<Donor | null> => {
    // In a real application, you would fetch data from an API
    console.log(`Simulating fetch for donor ID: ${id}`);
    // Return a mock donor for demonstration
    return {
      id: Number(id),
      registrationDate: new Date('2023-01-15').toISOString(),
      fullName: 'Maria da Silva',
      dateOfBirth: new Date('1990-05-20').toISOString(),
      profession: 'Engenheira',
      address: 'Rua Exemplo, 123',
      city: 'São Paulo',
      neighborhood: 'Centro',
      referencePoint: 'Próximo à praça',
      landline: '1130001234',
      mobile: '11987654321',
      prenatalCare: 'Realizou todas as consultas',
      doctorName: 'Dr. João',
      gestationalAge: '38 semanas',
      birthType: 'normal',
      birthDate: new Date('2023-09-01').toISOString(),
      complications: 'Nenhuma',
      vdrl: 'nao-reagente',
      hbsag: 'negativo',
      ftaAbs: 'negativo',
      hiv: 'negativo',
      transfusion: 'sim',
      tattoo: 'sim',
      tattooDetails: 'Tatuagem no braço',
      piercing: 'sim',
      piercingDetails: '',
      smoker: 'nao',
      alcohol: 'nao',
      drugs: 'nao',
      drugDetails: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  };

  useEffect(() => {
    if (donorId) {
      fetchDonorData(donorId).then(data => {
        if (data) {
          form.reset({
            ...data,
            registrationDate: new Date(data.registrationDate),
            dateOfBirth: new Date(data.dateOfBirth),
            birthDate: new Date(data.birthDate),
          });
        }
      });
    }
  }, [donorId]);
  const [currentTab, setCurrentTab] = useState('personal');
  const [progress, setProgress] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      registrationDate: initialData?.registrationDate ? new Date(initialData.registrationDate) : new Date(),
      dateOfBirth: initialData?.dateOfBirth ? new Date(initialData.dateOfBirth) : undefined,
      birthDate: initialData?.birthDate ? new Date(initialData.birthDate) : undefined,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      let currentSchema;
      switch (currentTab) {
        case 'personal':
          currentSchema = personalSchema;
          break;
        case 'medical':
          currentSchema = medicalSchema;
          break;
        case 'tests':
          currentSchema = testsSchema;
          break;
        case 'lifestyle':
          currentSchema = lifestyleSchema;
          break;
        default:
          currentSchema = formSchema;
      }

      const totalFields = Object.keys(currentSchema.shape).length;
      const filledFields = Object.keys(currentSchema.shape).filter(key => {
        const fieldValue = (value as any)[key];
        if (typeof fieldValue === 'boolean') {
          return true; // Booleans are always "filled" if present
        }
        return Boolean(fieldValue);
      }).length;
      setProgress((filledFields / totalFields) * 100);

      if (typeof window !== 'undefined') {
        localStorage.setItem('donor-form', JSON.stringify(value));
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, currentTab]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('donor-form');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Convert date strings back to Date objects
        if (parsedData.registrationDate) parsedData.registrationDate = new Date(parsedData.registrationDate);
        if (parsedData.dateOfBirth) parsedData.dateOfBirth = new Date(parsedData.dateOfBirth);
        if (parsedData.birthDate) parsedData.birthDate = new Date(parsedData.birthDate);
        form.reset(parsedData);
      }
    }
  }, []);

  const handleNext = async () => {
    const tabs = ['personal', 'medical', 'tests', 'lifestyle'];
    const currentTabIndex = tabs.indexOf(currentTab);
    const nextTab = tabs[currentTabIndex + 1];

    let schema;
    switch (currentTab) {
      case 'personal': schema = personalSchema; break;
      case 'medical': schema = medicalSchema; break;
      case 'tests': schema = testsSchema; break;
      default: schema = lifestyleSchema;
    }

    const isValid = await form.trigger(Object.keys(schema.shape) as any);
    if (isValid && nextTab) {
      setCurrentTab(nextTab);
    }
  };

  const handleBack = () => {
    const tabs = ['personal', 'medical', 'tests', 'lifestyle'];
    const currentTabIndex = tabs.indexOf(currentTab);
    const prevTab = tabs[currentTabIndex - 1];
    if (prevTab) {
      setCurrentTab(prevTab);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('donor-form');
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">{pageTitle}</CardTitle>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList>
                <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
                <TabsTrigger value="medical">Dados Médicos</TabsTrigger>
                <TabsTrigger value="tests">Exames</TabsTrigger>
                <TabsTrigger value="lifestyle">Estilo de Vida</TabsTrigger>
              </TabsList>
              <TabsContent value="personal">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* <FormField control={form.control} name="registrationDate" render={({ field }) => (<FormItem><FormLabel required>Data de Cadastro</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={'outline'} className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>{field.value ? format(field.value, 'PPP') : <span>Escolha uma data</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date('1900-01-01')} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>)} /> */}
                  <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel required>Nome Completo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="dateOfBirth" render={({ field }) => (<FormItem><FormLabel required>Data de Nascimento</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={'outline'} className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>{field.value ? format(field.value, 'dd/MM/yyyy')  : <span>Escolha uma data</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date('1900-01-01')} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="profession" render={({ field }) => (<FormItem><FormLabel required>Profissão</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="address" render={({ field }) => (<FormItem><FormLabel>Endereço Completo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="city" render={({ field }) => (<FormItem><FormLabel>Cidade</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="neighborhood" render={({ field }) => (<FormItem><FormLabel>Bairro</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="referencePoint" render={({ field }) => (<FormItem><FormLabel>Ponto de Referência</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="landline" render={({ field }) => (<FormItem><FormLabel required>Telefone Fixo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="mobile" render={({ field }) => (<FormItem><FormLabel required>Celular</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
              </TabsContent>
              <TabsContent value="medical">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField control={form.control} name="prenatalCare" render={({ field }) => (<FormItem><FormLabel>Pré-natal</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="doctorName" render={({ field }) => (<FormItem><FormLabel>Nome do Médico</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="gestationalAge" render={({ field }) => (<FormItem><FormLabel>Idade Gestacional</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="birthType" render={({ field }) => (<FormItem><FormLabel required>Tipo de Parto</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4"><FormItem><FormControl><RadioGroupItem value="normal" />Normal</FormControl></FormItem><FormItem><FormControl><RadioGroupItem value="cesarean" />Cesárea</FormControl></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="birthDate" render={({ field }) => (<FormItem><FormLabel required>Data do Parto</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={'outline'} className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>{field.value ? format(field.value, 'PPP') : <span>Escolha uma data</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date('2020-01-01')} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="complications" render={({ field }) => (<FormItem><FormLabel>Intercorrências</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
              </TabsContent>
              <TabsContent value="tests">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField control={form.control} name="vdrl" render={({ field }) => (<FormItem><FormLabel required>VDRL</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4"><FormItem><FormControl><RadioGroupItem value="reagente" />Reagente</FormControl></FormItem><FormItem><FormControl><RadioGroupItem value="nao-reagente" />Não Reagente</FormControl></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="hbsag" render={({ field }) => (<FormItem><FormLabel>HBsAg</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4"><FormItem><FormControl><RadioGroupItem value="positive" />Positivo</FormControl></FormItem><FormItem><FormControl><RadioGroupItem value="negativo" />Negativo</FormControl></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="ftaAbs" render={({ field }) => (<FormItem><FormLabel>FTA-ABS</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4"><FormItem><FormControl><RadioGroupItem value="positive" />Positivo</FormControl></FormItem><FormItem><FormControl><RadioGroupItem value="negative" />Negativo</FormControl></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="hiv" render={({ field }) => (<FormItem><FormLabel required>HIV</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4"><FormItem><FormControl><RadioGroupItem value="positive" />Positivo</FormControl></FormItem><FormItem><FormControl><RadioGroupItem value="negative" />Negativo</FormControl></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="transfusion" render={({ field }) => (<FormItem><FormLabel required>Transfusão</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4"><FormItem><FormControl><RadioGroupItem value="sim" />Sim</FormControl></FormItem><FormItem><FormControl><RadioGroupItem value="nao" />Não</FormControl></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>)} />
                </div>
              </TabsContent>
              <TabsContent value="lifestyle">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField control={form.control} name="tattoo" render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Tatuagem</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                          <FormItem>
                            <FormControl><RadioGroupItem value="sim" />Sim</FormControl>
                          </FormItem>
                          <FormItem>
                            <FormControl><RadioGroupItem value="nao" />Não</FormControl>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="tattooDetails" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detalhes sobre tatuagem</FormLabel>
                      <FormControl><Textarea {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="piercing" render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Piercing</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                          <FormItem>
                            <FormControl><RadioGroupItem value="sim" />Sim</FormControl>
                          </FormItem>
                          <FormItem>
                            <FormControl><RadioGroupItem value="nao" />Não</FormControl>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="piercingDetails" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detalhes sobre piercing</FormLabel>
                      <FormControl><Textarea {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="smoker" render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Tabagista (fuma?)</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                          <FormItem>
                            <FormControl><RadioGroupItem value="sim" />Sim</FormControl>
                          </FormItem>
                          <FormItem>
                            <FormControl><RadioGroupItem value="nao" />Não</FormControl>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="alcohol" render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Álcool</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                          <FormItem>
                            <FormControl><RadioGroupItem value="sim" />Sim</FormControl>
                          </FormItem>
                          <FormItem>
                            <FormControl><RadioGroupItem value="nao" />Não</FormControl>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="drugs" render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Drogas</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                          <FormItem>
                            <FormControl><RadioGroupItem value="sim" />Sim</FormControl>
                          </FormItem>
                          <FormItem>
                            <FormControl><RadioGroupItem value="nao" />Não</FormControl>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="drugDetails" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detalhes sobre uso de drogas</FormLabel>
                      <FormControl><Textarea {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-between">
              {currentTab !== 'personal' && <Button onClick={handleBack}>Voltar</Button>}
              {currentTab !== 'lifestyle' ? <Button onClick={handleNext}>Próximo</Button> : <Button type="submit">Cadastrar Doadora</Button>}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}