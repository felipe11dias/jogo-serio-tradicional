import { BrowserRouter, RouterProvider } from "react-router-dom";
import Router from './router/router';

function App() {
  return (
    <BrowserRouter>
      <RouterProvider router={Router} />
    </BrowserRouter>
  );
}

export default App;
