import { useState } from "react";

import {

createUserWithEmailAndPassword

}

from "firebase/auth";

import { auth } from "../firebase";

export default function Signup({

goLogin

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

async function signup(){

setError("");

if(
!email
||
!password
){

setError(

"Fill all fields"

);

return;

}

try{

setLoading(true);

await createUserWithEmailAndPassword(

auth,
email,
password

);

alert(

"Account created successfully"

);

goLogin();

}
catch(err){

console.log(err);

if(

err.code===

"auth/email-already-in-use"

){

setError(

"Email already registered"

);

}

else if(

err.code===

"auth/weak-password"

){

setError(

"Password must be at least 6 characters"

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

"Signup failed"

);

}

}
finally{

setLoading(false);

}

}

return(

<div className="loginPage">

<div className="loginCard">

<h1>

Create Account

</h1>

<p>

Join FinMentor

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

placeholder="Create password"

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

onClick={signup}

disabled={loading}

>

{

loading

?

"Creating..."

:

"Sign Up"

}

</button>

<p

className="switchAuth"

onClick={goLogin}

>

Already have account? Login

</p>

</div>

</div>

);

}