'use client';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Donor } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle } from 'lucide-react';
import { CellAction } from './cell-action';
import { PRENATAL_EXAM_OPTIONS } from './options';

export const columns: ColumnDef<Donor>[] = [
  {
    id: 'fullName',
    accessorKey: 'fullName',
    header: ({ column }: { column: Column<Donor, unknown> }) => (
      <DataTableColumnHeader column={column} title='Nome completo' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Donor['fullName']>()}</div>,
    meta: {
      label: 'Nome completo',
      placeholder: 'Buscar doadoras...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'email',
    header: 'E-mail'
  },
  {
    accessorKey: 'phone',
    header: 'Telefone'
  },
  {
    id: 'prenatalExam',
    accessorKey: 'prenatalExam',
    header: ({ column }: { column: Column<Donor, unknown> }) => (
      <DataTableColumnHeader column={column} title='Exame pré-natal' />
    ),
    cell: ({ cell }) => {
      const hasExam = cell.getValue<Donor['prenatalCare']>();
      const Icon = hasExam ? CheckCircle2 : XCircle;
      const variant = hasExam ? 'default' : 'destructive';

      return (
        <Badge variant={variant} className='capitalize'>
          <Icon className='mr-2' />
          {hasExam ? 'Sim' : 'Não'}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'Exame pré-natal',
      variant: 'multiSelect',
      options: PRENATAL_EXAM_OPTIONS
    }
  },
  {
    accessorKey: 'created_at',
    header: 'Criado em'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
