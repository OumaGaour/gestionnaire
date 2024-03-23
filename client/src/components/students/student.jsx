import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../SignAdmin/styles.module.css';
import toast from "react-hot-toast";
import "./user.css";

function Student() {
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
    const [users, setUsers] = useState([]);

  useEffect(()=>{

    const fetchData = async()=>{
        const response = await axios.get("http://localhost:8080/api/getall");
        setUsers(response.data);
    }

    fetchData();

  },[])

  const deleteUser = async(userId) =>{
      await axios.delete(`http://localhost:8080/api/delete/${userId}`)
      .then((respones)=>{
        setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
        toast.success(respones.data.msg, {position: 'top-right'})
      })
      .catch((error) =>{
        console.log(error);
      })
  }
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
                                <a href="/mainAdmin" >
                                    <span className="las la-home"></span>
                                    <small>Dashboard</small>
                                </a>
                            </li>
                            <li>
                                <Link to="/student" className="active">
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
            <div className='userTable'>
        <Link to={"/add"} className='addButton'>Add Student</Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>Student name</th>
                    <th>Student Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index)=>{
                        return(
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.fname} {user.lname}</td>
                            <td>{user.email}</td>
                            <td className='actionButtons'>
                                <button onClick={()=> deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                                <Link to={`/edit/`+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                            </td>
                        </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
    </div>
    </div>
    );
}

export default Student;
