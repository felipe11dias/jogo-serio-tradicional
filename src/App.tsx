import { RouterProvider } from "react-router-dom";
import Router from './router/router';

function App() {
  return (
    <div className='max-w-[1440px] mx-auto'>
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
