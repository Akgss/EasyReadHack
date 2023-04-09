// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1KeHaRKifGhYr124Q3gXNZnvXdw66GLc",
authDomain: "easyreadlogin.firebaseapp.com",
projectId: "easyreadlogin",
storageBucket: "easyreadlogin.appspot.com",
messagingSenderId: "800885245577",
appId: "1:800885245577:web:b3e30ff43b040f991c6858"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);  

submitData.addEventListener('click', (e) => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    //sign up user
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
           
            // ... user.uid
            set(ref(database, 'users/' + user.uid), {
                email: email,
                password: password
            })
                .then(() => {
                    // Data saved successfully!
                    alert('user created successfully');
                    window.location.href = "login.html";

    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                   
                });
        })
        .catch((error) => {
            const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
        });

    // log in user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...

            // save log in details into real time database
            var lgDate = new Date();
            update(ref(database, 'users/' + user.uid), {
                last_login: lgDate,
            })
                .then(() => {
                    // Data saved successfully!
                    alert('user logged in successfully');
                    window.location.href = "signup.html";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    aler(errorMessage);
                   
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            aler(errorMessage);
        });

    // signOut(auth).then(() => {
    //        // Sign-out successful.
    // }).catch((error) => {
    //     // An error happened.
    // });
});