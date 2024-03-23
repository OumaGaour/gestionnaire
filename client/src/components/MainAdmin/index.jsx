import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from '../SignAdmin/styles.module.css';


function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/loginAdmin");
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
                        <small>Admin</small>
                    </div>
                    <div className="side-menu">
                        <ul>
                            <li>
                                <a href="/mainAdmin" className="active">
                                    <span className="las la-home"></span>
                                    <small>Dashboard</small>
                                </a>
                            </li>
                            <li>
                                <Link to="/student">
                                    <span className="las la-user-alt"></span>
                                    <small>Students</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/adminCertificat">
                                    <span className="las la-home"></span>
                                    <small>Certificats</small>
                                </Link>
                            </li>
                            <li>
                                <a href="/">
                                    <span className="las la-clipboard-list"></span>
                                    <small>Verify Certificat</small>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <span className="las la-clipboard-list"></span>
                                    <small>Manage</small>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <span className="las la-clipboard-list"></span>
                                    <small>others</small>
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
            </div>
    </div>
    );
}

export default Dashboard;
