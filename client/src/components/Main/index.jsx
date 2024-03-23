/*import styles from "./styles.module.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>fakebook</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
};

export default Main;*/

import React, { useEffect, useState } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from '../Singup/styles.module.css';
import './style.css';

function Dashboard() {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Rediriger vers la page de connexion après la déconnexion
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users";
            const response = await axios.post(url, data);
            navigate("/login");
            console.log(response.data.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };
    const location = useLocation();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const firstName = queryParams.get('firstName');
        const lastName = queryParams.get('lastName');
        setUserData({ firstName, lastName });
    }, [location]);
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input type="checkbox" id="menu-toggle" />
            <div className="sidebar">
                <div className="side-header">
                    <h3>L<span>ogo</span></h3>
                </div>
                
                <div className="side-content">
                    <div className="profile">
                        <div className="profile-img bg-img" style={{ backgroundImage: `url(${image})` }}>
                            <input type="file" onChange={handleImageChange} />
                            {image && (
                                <div>
                                    <img src={image} alt="Uploaded" />
                                </div>
                            )}
                        </div>

                        
                        
                        <h4>{userData ? `${userData.firstName} ${userData.lastName}` : ''}</h4>
                        <small>Student</small>
                    </div>
    
                    <div className="side-menu">
                        <ul>
                            <li>
                                <a href="/" className="active">
                                    <span className="las la-home"></span>
                                    <small>Personal Informations</small>
                                </a>
                            </li>
                            <li>
                                <Link to="/Institut">
                                    <span className="las la-user-alt"></span>
                                    <small>Institution Informations</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Certificat">
                                    <span className="las la-home"></span>
                                    <small>Certificat</small>
                                </Link>
                            </li>
                            <li>
                                <a href="/">
                                    <span className="las la-clipboard-list"></span>
                                    <small>Others</small>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="main-content">
                <header>
                    <div className={styles.main_container}>
                    <nav className={`${styles.navbar}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <button className={`${styles.green_btn}`} style={{ marginLeft: 'auto' }} onClick={handleLogout}>
        Logout
    </button>
</nav>
		            </div>
                </header>
                
                <main>
                    <div className="page-header">
                        <h2>Name of student</h2>
                        <h3>Email</h3>
                        <h3>Public Key</h3>
                    </div>    
                </main>
            </div>
            <div style={{
        width: '40%',
        height: '50%',
        position: 'absolute',
        top: '60%',
        left: '55%',
        transform: 'translate(-50%, -50%)',
    }}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Personal Informations</h1>
                        <input
                            type="text"
                            placeholder="User ID"
                            name="id"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firsname"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lasttName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="date"
                            placeholder="Birthday"
                            name="birth"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Edit
                        </button>
                    </form>
                </div>
        </div>
    );
}

export default Dashboard;
