import Page from "./page";
import Root from "./root";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom';

  

 
  const router = createBrowserRouter(
    createRoutesFromChildren(
      /* Wrap this Root Route to create Router here */
      <Route path="/" element={ <Root/> }>
        <Route index element={ <Page /> } />
      </Route>
    )
  )


function App() {
  return (
    <RouterProvider router={router}/>
  );

}

export default App;
