import firebase from 'react-native-firebase';
import {AsyncStorage} from 'react-native';

export async function getDataByIdRequest(parameters, data) {
  const stationData = await AsyncStorage.getItem('stationData');
  let stationId = JSON.parse(stationData).id;
  const listener = firebase
    .database()
    .ref(parameters.collection + '')
    .orderByChild(parameters.child + '')
    .equalTo(stationId)
    .on('value', snapshot => {
      data({data: snapshot.val() || {}});
    });
}
 
export function getAllDataRequest(collection, data) {
  const listener = firebase
    .database()
    .ref(collection + '')
    .on('value', snapshot => {
      data({data: snapshot.val() || {}});
    });
}

export async function addDataRequest(collection, data) {
  const ref = firebase.database().ref(collection + '');
  const key = ref.push().key;
  data.id = key;
  await ref
    .child(key)
    .update(data)
    .then()
    .catch(error => {
      throw error;
    });
}

export async function setDataRequest(collection, data) {
  await firebase
    .database()
    .ref(collection + '')
    .set(data)
    .then(() => {
      console.log('set success');
    })
    .catch(error => {
      throw error;
    });
}

export async function deleteRequest(collection, data) {
  await firebase
    .database()
    .ref(collection + '' + data.id)
    .remove()
    .then()
    .catch(error => {
      throw error;
    });
}
export async function updateRequest(collection, data) {
  let id = data.id;
  delete data.id;
  await firebase
    .database()
    .ref(collection + '' + id)
    .update(data)
    .then()
    .catch(error => {
      throw error;
    });
}
