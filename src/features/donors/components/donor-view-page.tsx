import { Donor } from '@/constants/data';
import { notFound } from 'next/navigation';
import DonorForm from './donor-form';
import { fakeDonors } from '@/constants/mock-api';

type TDonorViewPageProps = {
  donorId: string;
};

export default async function DonorViewPage({ donorId }: TDonorViewPageProps) {
  let donor = null;
  let pageTitle = 'Cadastro de Doadora';

  if (donorId !== 'new') {
    const data = await fakeDonors.getDonorById(Number(donorId));
    donor = data.donor as Donor;
    if (!donor) {
      notFound();
    }
    pageTitle = `Edição de Doadora: ${donor.fullName}`;
  }

  return <DonorForm initialData={donor} pageTitle={pageTitle} />;
}
