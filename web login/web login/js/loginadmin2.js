import { auth } from "./firebase.js"
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js"

window.login = function(){

const email = document.getElementById("email").value
const password = document.getElementById("password").value

signInWithEmailAndPassword(auth,email,password)

.then(()=>{
window.location.href="dashboard.html"
})

.catch((error)=>{
alert("Login gagal: " + error.message)
})

}

import { signOut } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js"

window.logout = function(){

signOut(auth)

.then(()=>{
window.location.href="login.html"
})

}
