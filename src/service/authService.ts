
export const getToken = () : string | null => {
  const auth: string | null = localStorage.getItem('auth') != null ? JSON.parse(localStorage.getItem('auth') || 'null')?.access_token as string : null;
  return auth;
}