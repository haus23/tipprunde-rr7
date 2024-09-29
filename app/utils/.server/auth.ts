import { redirect } from 'react-router';

export async function requireAdmin(request: Request) {
  throw redirect('/login');
}
