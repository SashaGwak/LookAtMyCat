import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Main from "./Main";
import Login from './Login';

function Router() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/user/login" element={<Login />}></Route>
                <Route path="/user/signup" element={<Signup />}></Route>
            </Routes>
        </div>
    )
}
export default Router;