import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3cfBRmQfXnP_LtxmbsL60SZVp94BX94g",
  authDomain: "instagram-clone-7d084.firebaseapp.com",
  projectId: "instagram-clone-7d084",
  storageBucket: "instagram-clone-7d084.appspot.com",
  messagingSenderId: "504541265537",
  appId: "1:504541265537:web:3a3662af9fe94a08599780",
  measurementId: "G-CZWEB6M02X",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
