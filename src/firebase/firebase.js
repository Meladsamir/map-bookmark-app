import { initializeApp } from "firebase/app";
import { nowTime, getDurationByMill } from "../util/datetimeUtil";
import { BlockTimeInMill } from "../util/helper"; 
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  orderBy,
  where,
  addDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { useEffect } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyAwZ4W13u9iDRfahhKcvep6li0UzBAZYMc",
  authDomain: "map-bookmark-ka.firebaseapp.com",
  projectId: "map-bookmark-ka",
  storageBucket: "map-bookmark-ka.appspot.com",
  messagingSenderId: "119252932602",
  appId: "1:119252932602:web:aea599a8955d3d0aa5b643"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true
  } catch (err) {
    switch (err.message) {
      case 'Firebase: Error (auth/wrong-password).':
        alert("wrong password")
        await HandleFailedLoginLogs(email)
        break;
      case 'Firebase: Error (auth/user-not-found).':
        alert("wrong email")
        break;
      default:
        break;
    }
    return false
  }
};

const CheckIsBlocked = async (email) => {
  const q = query(collection(db, "usersLogs"), orderBy("time", "desc"), where("email", "==", email));
  const userLogsDoc = await getDocs(q);
  const now = nowTime()

  if (userLogsDoc.docs.length > 2) {
    const lastFailedTime = userLogsDoc.docs[0].data().time
    const duration = BlockTimeInMill-getDurationByMill(lastFailedTime)
    if (duration > 1){ return duration}
    else{
      console.log(userLogsDoc.docs)

    const y= await userLogsDoc.forEach(item => {
       deleteDoc(doc(db, "usersLogs",item.id ));         
      });
    }
  }
  return 0
}

const HandleFailedLoginLogs = async (email) => {
  const now = nowTime()
  await addDoc(collection(db, "usersLogs"), {
    email,
    time: now
  });
}
const getBookmarks=async(email)=>{
  const q = query(collection(db, "bookmarks"), where("email", "==", email));
  const bookmarksDocs = await getDocs(q);
  return bookmarksDocs.docs
}
const addBookmark = async (bookmark, email) => {
  try {
    await addDoc(collection(db, "bookmarks"), {
      email,
      ...bookmark
    });
    return true
  } catch (err) {
    console.log(err.message)
    return false
  }
}
const registerWithEmailAndPassword = async (username, email, password) => {
  try {
    const q = query(collection(db, "users"), where("username", "==", username));
    const userDoc = await getDocs(q);
    if (userDoc.docs.length === 0) {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username,
        email,
      });
      return true
    } else {
      alert("username is already registered")
    }
  } catch (err) {
    switch (err.message) {
      case 'Firebase: Error (auth/email-already-in-use).':
        alert ("email already in use")
      break;
    default:
      break;
    }
    return false
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  CheckIsBlocked,
  getBookmarks,
  addBookmark,
  logout,
};