import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import DonorViewPage from '@/features/donors/components/donor-view-page';

export const metadata = {
  title: 'Dashboard : Visualização de Doadora'
};

type PageProps = { params: Promise<{ id: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <DonorViewPage donorId={params.id} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
