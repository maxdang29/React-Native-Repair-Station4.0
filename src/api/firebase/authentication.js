// import firebase from 'react-native-firebase';

// export async function loginRequest(user) {
//   let result;
//   await firebase
//     .auth()
//     .signInWithEmailAndPassword(user.email, user.password)
//     .then(response => {
//       result = true;
//     })
//     .catch(error => {
//       throw error;
//     });
//   return result;
// }

// export async function logOutRequest() {
//   await firebase
//     .auth()
//     .signOut()
//     .then()
//     .catch(error => {
//       throw error;
//     });
// }

// async function addAuthentication(user) {
//   await firebase
//     .database()
//     .ref('stations/')
//     .push(user)
//     .catch(error => {
//       throw error;
//     });
// }

// export async function registerRequest(user) {
//   await firebase
//     .auth()
//     .createUserWithEmailAndPassword(user.email, user.password)
//     .then(data => {
//       user.stationId = data.user.uid;
//       user.status = false;
//       addAuthentication(user);
//     })
//     .catch(error => {
//       throw error;
//     });
// }
