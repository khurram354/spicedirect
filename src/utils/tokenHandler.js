import { cookies } from "next/headers";
import jwt from 'jsonwebtoken' 
const TokenHandler = async() => {
  try {
    const cookieStore = await cookies();
    const dataCookies = cookieStore.get('sdwtkn')?.value || '';
    let token = '';
    if(dataCookies !== '') {
      const tokenValue = jwt.verify(dataCookies, process.env.JWT_SECRET);
      token = tokenValue.status;
    };
    return token;
  } catch (error) {
    if(error.name === 'TokenExpiredError') {
      console.log('token expired')
      return 'token has expired'
    }else{
      console.log(error)
      return 'invalid token'
    }
    
  }
}
export default TokenHandler