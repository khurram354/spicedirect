export function verifyBearerToken(req) {
  const authHeader = req.headers.get('authorization') || '';
  const token = authHeader.replace('Bearer ', '');
console.log('token value is ',token)
console.log("env toke nis ", process.env.SYNC_SECRET_TOKEN)
  if (token !== process.env.SYNC_SECRET_TOKEN) {
    throw new Error('Unauthorized: Invalid token');
  }
}
