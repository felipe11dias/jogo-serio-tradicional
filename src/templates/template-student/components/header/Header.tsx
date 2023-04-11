 
import {Link}  from 'react-router-dom';

 

export default function () {
  return (

    <header className='py-6 mb-12  bg-backgroundColorPrimary'>
    <div className='container sm:flex-col md:flex-row lg:flex-row xl:flex-row mx-auto flex justify-between items-center bg-backgroundColorPrimary'>
      <div><Link className='w-full my-5 py-2 px-2 hover:text-white text-gray-400 font-semibold rounded-lg text-3xl' to="#home">Home</Link></div>
      <div className='flex items-center gap-6'>
   
        <Link to="#features" className='w-full my-5 py-2 px-2 hover:text-white text-gray-400 font-semibold rounded-lg text-xl' >Features</Link>
        <Link to="#features" className='w-full my-5 py-2 px-2 hover:text-white text-gray-400 font-semibold rounded-lg text-xl' >Features</Link>
        <Link to="#features" className='w-full my-5 py-2 px-2 hover:text-white text-gray-400 font-semibold rounded-lg text-xl' >Features</Link>
   
      </div>
    </div>
  </header>
  
  )
}
