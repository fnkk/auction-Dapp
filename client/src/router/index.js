import { ConfigProvider } from 'antd';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN'
import {
  createBrowserRouter,
} from "react-router-dom";
import Test from '../pages/test/index' 
import Demo from '../components/Demo/index'
const router = createBrowserRouter([
    {
        path: "/main",
        element: <Test/>
      },
    {
        path: "/996",
        element: <Demo></Demo>
      },
]);
export default router