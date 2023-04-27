import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';


const Footer = () => {
  return <footer className='flex sm:flex-col md:flex-row  lg:flex-row xl:flex-row justify-between items-center py-6 bg-backgroundColorPrimary'>
    <div className='container mx-auto'>
    <p className="w-full  text-textColorFH font-semibold rounded-lg text-xl">© Copyright 2023 - Todos os direitos reservados para - TCC Felipe</p>
    </div>
    <div className='flex flex-row mx-2 '>
           <div className=' rounded-full py-2 px-2 transition duration-300 ease-in-out hover:scale-125 hover:bg-hoverColorFooter hover:cursor-pointer'>
          <a href='https://github.com/felipe11dias' target='_blank'>
             <AiFillGithub className='ease-in duration-300' size="2rem" color='white' />
            </a>
           </div>
           <div className=' rounded-full py-2 px-2 transition duration-300 ease-in-out hover:scale-125 hover:bg-hoverColorFooter hover:cursor-pointer'>
          <a href='https://www.linkedin.com/in/felipe-dias-mac-dowell-255578193/' target='_blank'>
             <AiFillLinkedin className='ease-in duration-300' size="2rem" color='white' />
            </a>
           </div>
    </div>
  </footer>;
};

export default Footer;

