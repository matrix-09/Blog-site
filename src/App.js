import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Display from './display/display';
import Blogs from './home/home';
import Root from './Root';
function App() {
const routerObj=createBrowserRouter([
  {
    path:'/',
    element:<Root/>,
    children:[
      {
        path:'/',
        element:<Display/>
      },
      {
        path:'/blogs',
        element:<Blogs/>
      }
    ]
  }
])

  return (
    <div className="App">
      <RouterProvider router={routerObj}/>
    </div>
  );
}

export default App;
