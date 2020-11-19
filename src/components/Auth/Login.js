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
class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  hnadleSubmit = () => {
    console.log(this.state)
    if (this.isformvalid(this.state)) {
      this.setState({ loading: true, errors: [] })
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signeduser => {
          console.log(signeduser)
        })
        .catch(err => {
          console.log(err)
          this.setState({
            loading: false,
            errors: [err]
          })
        })
    }
  }
  isformvalid = ({ email, password }) => email && password
  displayerrors = (errors) => errors.map((err, i) => <p key={i} >{err.message}</p>)
  handleinputerror = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName)) ? "error" : ""
  }
  render() {
    const { email, password, errors, loading } = this.state
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
           Login to DevChat
        </Header>
          <Form size="large" onSubmit={this.hnadleSubmit}>
            <Segment stacked>
              <Form.Input className={this.handleinputerror(errors, "email")} fluid name="email" icon="mail" iconPosition="left" placeholder="Email Address" value={email} onChange={this.handleChange} type="email" />
              <Form.Input className={this.handleinputerror(errors, "password")} fluid name="password" icon="lock" iconPosition="left" placeholder="Password" value={password} onChange={this.handleChange} type="password" />
              <Button color="violet" disabled={loading} className={loading ? "loading" : ""} fluid size="large">Login</Button>
            </Segment>
          </Form>
          {
            errors.length > 0 && (
              <Message error>
                <h3>Error</h3>
                {this.displayerrors(errors)}
              </Message>)
          }
          <Message>Dont have a account? <Link to="/register">Register</Link></Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
