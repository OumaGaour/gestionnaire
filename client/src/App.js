import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Certificat from "./components/certificat/Certificat";
import Institut from "./components/institInfo/Institut";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import SignAdmin from "./components/SignAdmin";
import LoginAdmin from "./components/LoginAdmin";
import MainAdmin from "./components/MainAdmin";
import Edit from "./components/updateuser/Edit";
import Add from "./components/adduser/Add";
import Student from "./components/students/student";
import AdminCertificat from "./components/AdminCertificat/AdminCertificat";
import AddCer from "./components/addcertificat/AddCer";
import UpdateCer from "./components/updatecertificat/UpdateCer";




function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" exact element={<Main />} />
			<Route path="/mainAdmin" exact element ={<MainAdmin/>}/>
			<Route path="/student" exact element = {<Student/>}/>
			<Route path="/Add" exact element ={<Add/>}/>
			<Route path="/edit/:id" exact element ={<Edit/>}/>
			<Route path="/adminCertificat" exact element = {<AdminCertificat/>}/>
			<Route path="/addCer"  element = {<AddCer/>}/>
			<Route path="/updateCer"  element = {<UpdateCer/>}/>
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
			<Route path="/signAdmin" element={<SignAdmin />} />
            <Route path="/loginAdmin" element={<LoginAdmin />} />
			<Route path="/Certificat" exact element={<Certificat />} /> {/* Ajout de la route pour Personal */}
			<Route path="/Institut" exact element={<Institut />}/>
		</Routes>
	);
}

export default App;
