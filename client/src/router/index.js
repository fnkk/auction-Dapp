import 'dayjs/locale/zh-cn';
import { createBrowserRouter, Navigate } from "react-router-dom";
import Test from '../pages/test/index';
import Museum from '../pages/museum';
import Layout from '../layout';
import Auction from '../pages/auction';
import Homepage from '../pages/homepage';
import My from '../pages/my';
import AddNft from '../pages/others/addNft';
import TrackSource from '../pages/trackSource';
import Transfer from '../pages/others/transfer';
import AddSwap from '../pages/others/addSwap';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/homepage' />
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
        path: "/museum",
        element: <Museum />
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
      {
        path: "/addNft",
        element: <AddNft />
      },
      {
        path: "/transfer",
        element: <Transfer />
      },
      {
        path: "/addSwap",
        element: <AddSwap />
      },
    ]
  },
]);
export default router