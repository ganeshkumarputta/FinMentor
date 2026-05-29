import { useState } from "react";

import {

signInWithEmailAndPassword,

GoogleAuthProvider,

signInWithPopup

}

from "firebase/auth";

import { auth } from "../firebase";

export default function Login({

onSuccess,
goSignup,
goForgot

}){

const[
email,
setEmail
]=useState("");

const[
password,
setPassword
]=useState("");

const[
error,
setError
]=useState("");

const[
loading,
setLoading
]=useState(false);

async function login(){

setError("");

if(
!email
||
!password
){

setError(

"Enter email and password"

);

return;

}

try{

setLoading(true);

await signInWithEmailAndPassword(

auth,
email,
password

);

onSuccess();

}
catch(err){

console.log(err);

if(

err.code===

"auth/invalid-credential"

||

err.code===

"auth/wrong-password"

){

setError(

"Incorrect password"

);

}

else if(

err.code===

"auth/user-not-found"

){

setError(

"No account found with this email"

);

}

else if(

err.code===

"auth/invalid-email"

){

setError(

"Invalid email address"

);

}

else{

setError(

"Login failed"

);

}

}
finally{

setLoading(false);

}

}

async function googleLogin(){

try{

const provider=

new GoogleAuthProvider();

await signInWithPopup(

auth,
provider

);

onSuccess();

}
catch(err){

console.log(err);

setError(

"Google login failed"

);

}

}

return(

<div className="loginPage">

<div className="loginCard">

<h1>

FinMentor

</h1>

<p>

Welcome back

</p>

<input

type="email"

placeholder="Enter email"

value={email}

onChange={(e)=>

setEmail(
e.target.value
)

}

/>

<input

type="password"

placeholder="Enter password"

value={password}

onChange={(e)=>

setPassword(
e.target.value
)

}

/>

{

error&&

<p className="error">

{error}

</p>

}

<button

className="loginBtn"

onClick={login}

disabled={loading}

>

{

loading

?

"Please wait..."

:

"Login"

}

</button>

<button

className="googleBtn"

onClick={googleLogin}

>

Continue with Google

</button>

<p

className="forgot"

onClick={goForgot}

>

Forgot Password?

</p>

<p

className="switchAuth"

onClick={goSignup}

>

Create new account

</p>

</div>

</div>

);

}