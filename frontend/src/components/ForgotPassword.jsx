import { useState } from "react";

import {

sendPasswordResetEmail

}

from "firebase/auth";

import { auth } from "../firebase";

export default function ForgotPassword({

goLogin

}){

const[
email,
setEmail
]=useState("");

const[
message,
setMessage
]=useState("");

const[
loading,
setLoading
]=useState(false);

async function resetPassword(){

if(!email){

setMessage(

"Enter email"

);

return;

}

try{

setLoading(true);

await sendPasswordResetEmail(

auth,
email

);

setMessage(

"Password reset email sent"

);

}
catch(err){

console.log(err);

setMessage(

"Failed to send reset email"

);

}
finally{

setLoading(false);

}

}

return(

<div className="loginPage">

<div className="loginCard">

<h1>

Reset Password

</h1>

<p>

Enter your email

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

<p className="error">

{message}

</p>

<button

className="loginBtn"

onClick={resetPassword}

disabled={loading}

>

{

loading

?

"Sending..."

:

"Send Reset Link"

}

</button>

<p

className="switchAuth"

onClick={goLogin}

>

Back to Login

</p>

</div>

</div>

);

}