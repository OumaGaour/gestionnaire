import React, { useEffect, useState } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import axios from "axios";
import '../Main/style.css';
import styles from '../Singup/styles.module.css';
const Institut = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Rediriger vers la page de connexion après la déconnexion
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
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

    return (
        <div>
            <input type="checkbox" id="menu-toggle" />
            <div className="sidebar">
                <div className="side-header">
                    <h3>L<span>ogo</span></h3>
                </div>
                
                <div className="side-content">
                    <div className="profile">
                        <div className="profile-img bg-img" style={{backgroundImage: `url(img/user.jpg)`}}></div>
                        <h4>{userData ? `${userData.firstName} ${userData.lastName}` : ''}</h4>
                        <small>Art Director</small>
                    </div>
    
                    <div className="side-menu">
                        <ul>
                            <li>
                                <Link to= "/" >
                                    <span className="las la-home"></span>
                                    <small>Personal Informations</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Institut" className="active">
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
            <header>
                    <div className={styles.main_container}>
                    <nav className={`${styles.navbar}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <button className={`${styles.green_btn}`} style={{ marginLeft: 'auto' }} onClick={handleLogout}>
        Logout
    </button>
</nav>
		            </div>
                </header>
            <div style={{
        width: '40%',
        height: '50%',
        position: 'absolute',
        top: '50%',
        left: '57%',
        transform: 'translate(-50%, -50%)',
    }}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Institution Informations</h1>
                        <input
                            type="text"
                            placeholder="adress"
                            name="adress"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="phone"
                            placeholder="phone"
                            name="phone"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="position"
                            name="position"
                            onChange={handleChange}
                            value={data.password}
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
};
export default Institut;