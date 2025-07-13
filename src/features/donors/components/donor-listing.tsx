import { Donor } from '@/constants/data';
import { fakeDonors } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DonorTable } from './donor-tables';
import { columns } from './donor-tables/columns';

type DonorListingPage = {};
// O argumento do tipo '"prenatalExam"' não é atribuível ao parâmetro do tipo '"page" | "perPage" | "name" | "gender" | "category"'.ts(2345)
export default async function DonorListingPage({}: DonorListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name'); // fullName
  const pageLimit = searchParamsCache.get('perPage');
  const prenatalExam = searchParamsCache.get('category');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(prenatalExam && { prenatalExam: prenatalExam })
  };

  const data = await fakeDonors.getDonors(filters);
  const totalDonors = data.total_donors;
  const donors: Donor[] = data.donors;

  return (
    <DonorTable data={donors} totalItems={totalDonors} columns={columns} />
  );
}
