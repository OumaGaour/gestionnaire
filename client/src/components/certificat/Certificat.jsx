import React, { useEffect, useState } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import '../Main/style.css';
import styles from '../Singup/styles.module.css';
const Certificat = () => {
    const location = useLocation();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const firstName = queryParams.get('firstName');
        const lastName = queryParams.get('lastName');
        setUserData({ firstName, lastName });
    }, [location]);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Rediriger vers la page de connexion après la déconnexion
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
                                <Link to="/Institut" >
                                    <span className="las la-user-alt"></span>
                                    <small>Institution Informations</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Certificat" className="active">
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
                    <header>
                    <div className={styles.main_container}>
                    <nav className={`${styles.navbar}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <button className={`${styles.green_btn}`} style={{ marginLeft: 'auto' }} onClick={handleLogout}>
        Logout
    </button>
</nav>
		            </div>
                </header>
                </div>
            </div>
        </div>
    );
};
export default Certificat;