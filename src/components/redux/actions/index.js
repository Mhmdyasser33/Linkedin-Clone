import {signInWithPopup , onAuthStateChanged, } from 'firebase/auth'
import { signOut } from 'firebase/auth'
import {provider , auth, storage, db}from '../../../firebase'
import * as actions from './actionCreators'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, orderBy, query , onSnapshot } from 'firebase/firestore'
// handle sign in operation
 export const signInWithFirebase = () =>{
   return (dispatch) =>{
    signInWithPopup(auth ,provider)
     .then((postInfo) =>{
      dispatch(actions.addUser(postInfo.user))
     }).catch((error) =>{
    alert(error.message) ;
    console.log(error.message);
     })
   }
}
// handle userAuthentication
export const handleUserAuth = () =>{
  return (dispatch) =>{
    onAuthStateChanged(auth , async (user) =>{
     if(user){
       dispatch(actions.addUser(user))
     }
    })
  }
}
// handle signOut operation
export const logOutFromFirebase = () =>{
   return (dispatch) =>{
     auth.signOut()
     .then(() => {
    dispatch(actions.addUser(null))
     }).catch((error) =>{
      alert(error.message)
     })
   }
}

export const postArticleWithFirebase = (payload) => {
  return (dispatch) => {
    dispatch(actions.setLoading(true));
    if (payload.image) {
      const storageRef = ref(storage, `images/${payload.image.name}`);
      const uploadRef = uploadBytesResumable(storageRef, payload.image);
      uploadRef.on(
        "state_changed",
        (snapshot) => {
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadRef.snapshot.ref).then((downloadURl) => {
            const collRef = collection(db, "articles");
            addDoc(collRef, {
              actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              comments: 0,
              video: payload.video,
              description: payload.description,
              shareImg: downloadURl,
            });
          });
          dispatch(actions.setLoading(false));
        }
      );
    } else if (payload.video) {
      const collRef = collection(db, "articles");
      addDoc(collRef, {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        comments: 0,
        video: payload.video,
        description: payload.description,
        shareImg: payload.image,
      });
      dispatch(actions.setLoading(false));
    } else {
      const collRef = collection(db, "articles");
      addDoc(collRef, {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        comments: 0,
        video: payload.video,
        description: payload.description,
        shareImg: payload.image,
      });
    }
    dispatch(actions.setLoading(false));
  };
}
export const getPosts = () => {
  return (dispatch) => {
    let payload;
    const collRef = collection(db, "articles");
    const orderedRef = query(collRef, orderBy("actor.date", "desc"));
    onSnapshot(orderedRef, (snapshot) => {
      payload = snapshot.docs.map((doc) => doc.data());
      dispatch(actions.AddArticle(payload));
    });
  };
}