import React from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase"
import md5 from "md5";
class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    userRef: firebase.database().ref("users")
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  isformvalid = () => {
    let error
    if (this.isformempty(this.state)) {
      error = { message: "Fill in all fields" }
      this.setState({ errors: [error] })
      console.log([error])
      //thorw error
      return false
    } else if (!this.passwordmatch(this.state)) {
      error = { message: "Password invalid" }
      this.setState({ errors: [error] })
      console.log(this.state.errors.message + "this is the pass error ")
      //throw error
      return false
    } else {
      return true
    }
  }
  isformempty = ({ username, email, password, passwordConfirmation }) => {
    return !username.length || !email.length || !password.length || !passwordConfirmation.length
  }
  passwordmatch = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false
    } else {
      return true
    }
  }
  hnadleSubmit = () => {
    if (this.isformvalid()) {
      this.setState({ errors: [], loading: true })
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createduser => {
          console.log(createduser);
          console.log("this is the user created");
          createduser.user.updateProfile({
            displayName: this.state.username,
            photoURL: `http://gravatar.com/avatar/${md5(createduser.user.email)}?d=identicon`
          })
            .then(() => {
              this.setState({ loading: false });
              this.saveuser(createduser).then(() => {
                console.log("user saved")
              })
            })
            .catch(err => {
              console.error(err);
              this.setState({ errors: [err], loading: false })
            })
        })
        .catch(err => {
          this.setState({ errors: [err], loading: false })
          console.error(err + "crated again with same creds")
        })
    }
  }
  saveuser = createduser => {
    return this.state.userRef.child(createduser.user.uid).set({
      name: createduser.user.displayName,
      avatar: createduser.user.photoURL
    })
  }
  displayerrors = (errors) => errors.map((err, i) => <p key={i} >{err.message}</p>)
  handleinputerror = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName)) ? "error" : ""
  }
  render() {
    const { username, email, password, passwordConfirmation, errors, loading } = this.state
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
           Register for DevChat
        </Header>
          <Form size="large" onSubmit={this.hnadleSubmit}>
            <Segment stacked>
              <Form.Input fluid name="username" icon="user" iconPosition="left" placeholder="Username" value={username} onChange={this.handleChange} type="text" />
              <Form.Input className={this.handleinputerror(errors, "email")} fluid name="email" icon="mail" iconPosition="left" placeholder="Email Address" value={email} onChange={this.handleChange} type="email" />
              <Form.Input className={this.handleinputerror(errors, "password")} fluid name="password" icon="lock" iconPosition="left" placeholder="Password" value={password} onChange={this.handleChange} type="password" />
              <Form.Input className={this.handleinputerror(errors, "password")} fluid name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Password Confirmation" value={passwordConfirmation} onChange={this.handleChange} type="password" />
              <Button color="orange" disabled={loading} className={loading ? "loading" : ""} fluid size="large">Submit</Button>
            </Segment>
          </Form>
          {
            errors.length > 0 && (
              <Message error>
                <h3>Error</h3>
                {this.displayerrors(errors)}
              </Message>)
          }
          <Message>Already a user? <Link to="/login">Login</Link></Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
