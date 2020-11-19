import firebase from 'firebase';
import React from 'react';
import { Dropdown, Grid, Header, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux'
class UserPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }
    componentDidMount() {
        console.log(this.props.currentuser)
        this.setState({ user: this.props.currentuser })
    }
    dropdownOptions = () => {
        return ([
            {
                key: 1,
                text: <span>Signed in as <strong>{this.state.user && this.state.user.displayName}</strong></span>,
                disabled: true
            },
            {
                key: 2,
                text: <span>Change Avatar</span>
            },
            {
                key: 3,
                text: <span onClick={() => this.handleSignout()}>Sign Out</span>
            }
        ])
    }
    handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => console.log('signout'))
    }
    render() {
        return (
            <Grid style={{
                background: '#4c3c4c'
            }}>
                <Grid.Column>
                    <Grid.Row style={{
                        padding: '1.2em',
                        margin: 0
                    }}>
                        <Header inverted floated='left' as='h2'>
                            <Icon name='code' />
                            <Header.Content> DevChat</Header.Content>
                        </Header>
                    </Grid.Row>

                    <Header style={{
                        padding: '0.25em'
                    }}
                        as='h4'
                        inverted
                    >
                        <Dropdown
                            trigger={
                                <span>
                                    <Image src={this.state.user && this.state.user.photoURL} spaced='right' avatar />
                                    {this.state.user && this.state.user.displayName}</span>
                            }
                            options={this.dropdownOptions()}
                        />
                    </Header>
                </Grid.Column>
            </Grid >);
    }
}
const mapStateToProps = (state) => ({
    currentuser: state.user.currentuser
})
export default connect(mapStateToProps)(UserPanel);