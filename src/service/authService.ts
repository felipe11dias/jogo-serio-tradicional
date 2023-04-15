export const CheckToken = (): string | null => {
  console.log(localStorage.getItem('access_token'))
    return localStorage.getItem('access_token') || null;
}