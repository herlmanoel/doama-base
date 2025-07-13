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
      <DataTableColumnHeader column={column} title='Full Name' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Donor['fullName']>()}</div>,
    meta: {
      label: 'Full Name',
      placeholder: 'Search donors...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    id: 'prenatalExam',
    accessorKey: 'prenatalExam',
    header: ({ column }: { column: Column<Donor, unknown> }) => (
      <DataTableColumnHeader column={column} title='Prenatal Exam' />
    ),
    cell: ({ cell }) => {
      const hasExam = cell.getValue<Donor['prenatalCare']>();
      const Icon = hasExam ? CheckCircle2 : XCircle;
      const variant = hasExam ? 'default' : 'destructive';

      return (
        <Badge variant={variant} className='capitalize'>
          <Icon className='mr-2' />
          {hasExam ? 'Yes' : 'No'}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'Prenatal Exam',
      variant: 'multiSelect',
      options: PRENATAL_EXAM_OPTIONS
    }
  },
  {
    accessorKey: 'created_at',
    header: 'Created At'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
