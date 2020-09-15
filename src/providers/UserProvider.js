import React, { Component, createContext } from 'react';
import { auth, createOrGetUserProfileDocument } from '../firebase';

const initialUserState = { user: null, loading: false };
export const UserContext = createContext(initialUserState);

class UserProvider extends Component {
  state = initialUserState;

  async componentDidMount() {
    //will be fired whenever you go from logged in to logged out stateor vice-versa
    auth.onAuthStateChanged( async (userAuth) => {
      console.log(userAuth);

      if (userAuth) {
        const userRef = await createOrGetUserProfileDocument(userAuth);

        console.log("USER REF", userRef);

        userRef.onSnapshot( snapshot => {
          console.log('snampshot', snapshot);
          console.log('snap shot data', snapshot.data);

          this.setState({
            user: {uid: snapshot.id, ...snapshot.data()}
          })
        })
      }
    });

    
  }
  

  render() {
    console.log(this.props);
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;