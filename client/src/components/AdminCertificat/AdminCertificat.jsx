import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../SignAdmin/styles.module.css';
import toast from "react-hot-toast";
import "./user.css";

function AdminCertificat() {
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
    const inputRef = useRef();

    const [selectedFiles, setSelectedFiles] = useState(() => {
        // Récupérer les fichiers sélectionnés à partir du stockage local lors de l'initialisation
        const storedFiles = JSON.parse(localStorage.getItem('selectedFiles'));
        return storedFiles || [];
    });

    // Enregistrer les fichiers sélectionnés dans le stockage local à chaque mise à jour
    useEffect(() => {
        localStorage.setItem('selectedFiles', JSON.stringify(selectedFiles));
    }, [selectedFiles]);

    // Handle the change event when files are selected
    const handleOnChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            // Convert FileList to an array
            const filesArray = Array.from(event.target.files);
            // Ajouter de nouveaux fichiers à la liste existante des fichiers sélectionnés
            setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, ...filesArray]);
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    const removeFile = (fileName) => {
        const updatedFiles = selectedFiles.filter(file => file.name !== fileName);
        setSelectedFiles(updatedFiles);
    };

    const uploadFiles = async () => {
        // Créer un nouvel objet FormData
        const formData = new FormData();

        // Ajouter chaque fichier sélectionné à l'objet FormData
        selectedFiles.forEach(file => {
            formData.append('files', file);
        });

        // Envoyer l'objet FormData au serveur en utilisant axios ou fetch
        try {
            const response = await axios.post('http://localhost:8080/api/apload', formData);
            // Gérer la réponse de succès
            console.log('Files uploaded successfully:', response.data);
        } catch (error) {
            // Gérer l'erreur
            console.error('Error uploading files:', error);
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
                                <a href="/mainAdmin" >
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
                                <Link to="/adminCertificat" className="active">
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
            <div>
            <input
                    type="file"
                    ref={inputRef}
                    onChange={handleOnChange}
                    style={{ display: "none" }}
                    multiple // Permet de sélectionner plusieurs fichiers
                />

                {/* Button to trigger the file input dialog */}
                <button className="file-btn" onClick={onChooseFile}>
                    Upload Files
                </button>

                {/* Display selected files */}
                {selectedFiles.length > 0 && (
                    <div>
                        {selectedFiles.map((file, index) => (
                            <div className="selected-file" key={index}>
                                <p>{file.name}</p>
                                <button onClick={() => removeFile(file.name)}>
                                    <span className="material-symbols-rounded">delete</span>
                                </button>
                            </div>
                        ))}
                        <button onClick={uploadFiles}>Upload All</button>
                    </div>
                )}
    </div>
    </div>
    );
}

export default AdminCertificat;
