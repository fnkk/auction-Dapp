import 'dayjs/locale/zh-cn';
import { createBrowserRouter, Navigate } from "react-router-dom";
import Test from '../pages/test/index';
import Layout from '../layout';
import Auction from '../pages/auction';
import Homepage from '../pages/homepage';
import My from '../pages/my';
import TrackSource from '../pages/trackSource';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/test' />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/test",
        element: <Test />
      },
      {
        path: "/auction",
        element: <Auction />
      },
      {
        path: "/homepage",
        element: <Homepage />
      },
      {
        path: "/trackSource",
        element: <TrackSource />
      },
      {
        path: "/my",
        element: <My />
      },
    ]
  },

]);
export default router