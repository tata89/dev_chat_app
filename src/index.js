import React from "react";
import ReactDOM, { render } from "react-dom";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Spinner from "./components/spinner"
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import firebase from "../src/firebase"
import { Provider, connect } from "react-redux"
import { setUser, clearUser } from "./actions/index"
import store from "./store"
class Root extends React.Component {
  componentDidMount() {
    console.log(this.props.isloading)
    console.log(store)
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.props.setUser(user)
          this.props.history.push("/")
        } else {
          this.props.clearUser()
          this.props.history.push("/login")
        }
      })
  }
  render() {
    return this.props.isloading ? <Spinner /> : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    )
  }
};
const mapStateToProps = (state) => ({
  isloading: state.user.isloading
});
const RootWithAuth = withRouter(connect(mapStateToProps, { setUser, clearUser })(Root))
ReactDOM.render(<Provider store={store}><Router><RootWithAuth /></Router></Provider>, document.getElementById("root"));
