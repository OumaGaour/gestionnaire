import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography"; 
import axios from "axios"; 
import '../Main/style.css';
import styles from '../Singup/styles.module.css';

const useStyles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: { width: 250 },
    [theme.breakpoints.down("sm")]: { width: 200 }
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
      padding: `${theme.spacing(2)}px`
    },
    minHeight: "75vh",
    maxWidth: "95%",
    margin: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing(4)}px ${theme.spacing(8)}px ${theme.spacing(3)}px`
  }
});

function Certificat({ classes }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    organization: "Ibn Zohr",
    coursename: "",
    assignedOn: null,
    duration: 0,
    emailId: "",
    certificateId: ""
  });
  const [currentState, setCurrentState] = useState("normal");

  const handleChange = name => event => {
    setFormData({
      ...formData,
      [name]: event.target.value
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    setCurrentState("load");

    axios
      .post("http://localhost:8080/api/generate", { 
        candidateName: formData.firstname,
        courseName: formData.coursename,
        orgName: formData.organization,
        assignDate: formData.assignedOn,
        duration: formData.duration,
        emailId: formData.emailId
      })
      .then(response => {
        if (response.data && response.data.certificateId) {
          setFormData({
            ...formData,
            certificateId: response.data.certificateId
          });
          setCurrentState("validate");
        } else {
          setCurrentState("error");
        }
      })
      .catch(error => {
        console.error("Error generating certificate:", error);
        setCurrentState("error");
      });
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
                <Link to="/Institut">
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
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Typography variant="h3" color="inherit">
              Certificate Generation Form
            </Typography>
            <form
              className={classes.container}
              autoComplete="off"
              onSubmit={handleFormSubmit}
            >
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="firstname"
                  label="First Name"
                  className={classes.textField}
                  value={formData.firstname}
                  onChange={handleChange("firstname")}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  required
                  id="lastname"
                  label="Last Name"
                  className={classes.textField}
                  value={formData.lastname}
                  onChange={handleChange("lastname")}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="organization"
                  label="Organization"
                  className={classes.textField}
                  defaultValue={formData.organization}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    readOnly: true
                  }}
                />
                <TextField
                  required
                  id="certified-for"
                  label="Certified For"
                  helperText="Any course name or skill for which the certificate is being given."
                  placeholder="Degree, skill or award.."
                  className={classes.textField}
                  defaultValue={formData.coursename}
                  onChange={handleChange("coursename")}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="assigned-date"
                  label="Assigned Date"
                  type="date"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange("assignedOn")}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  required
                  id="duration"
                  label="Duration"
                  helperText="Duration to be provided in years"
                  value={formData.duration}
                  onChange={handleChange("duration")}
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="email"
                  label="Email"
                  className={classes.textField}
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                  value={formData.emailId}
                  onChange={handleChange("emailId")}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <div className="container" style={{ marginBottom: "15px" }}>
                  <button
                    className={`animatedButton ${currentState}`}
                    type="submit"
                    style={{ fontSize: "1.5rem", padding: "10px 20px" }}
                  />
                </div>
                {currentState === "validate" && (
                  <div>
                    Certificate generated with id {formData.certificateId}
                  </div>
                )}
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

Certificat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Certificat);

