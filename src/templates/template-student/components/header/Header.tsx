 
import {Link}  from 'react-router-dom';

interface HeaderProps {
  bg: string
  variant: string
}

export default function Header(props: HeaderProps) {
  return (

    <header className='py-6 mb-12 border-b'>
    <div className='container mx-auto flex justify-between items-center'>
      <Link to="#home">    </Link>
      <div className='flex items-center gap-6'>
        <Link to="#home" className='hover:text-blue-900' >Home</Link>
        <Link to="#features" className='bg-blue-800 text-white px-4 py-3 rounded-lg transition' >Features</Link>
        <Link to="#pricing" className='bg-blue-800 text-white px-4 py-3 rounded-lg transition' >Pricing</Link>
      </div>
    </div>
  </header>

 
  )
}
