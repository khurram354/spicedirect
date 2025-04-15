export const dynamic = "force-dynamic";
import {redirect} from 'next/navigation';
import TokenHandler from '@/utils/tokenHandler';
import TermsConditions from '@/components/adminlayout/terms&conditioncom/TermsConditions';
import call_api from '@/helper/Api';
const page = async() => {
  const token = await TokenHandler();
  if(token !== "admin_account") {
    redirect('/admin');
    return null;
  }
  async function getallterms () {
    const resp = await call_api.getallterms();
    if (resp.success) {return resp.termsconditions}return []
  }
  const allTerms = await getallterms();
  return (
    <div><TermsConditions allTerms = {allTerms}/></div>
  )
}
export default page