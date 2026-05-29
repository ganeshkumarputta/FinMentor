import { useState,useEffect } from "react";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Recommendation from "./components/Recommendation";

import "./App.css";

export default function App(){

const[
logged,
setLogged
]=useState(

localStorage.getItem("user")

||

false

);

const[
page,
setPage
]=useState("login");

const[
showIntro,
setShowIntro
]=useState(false);

const[
amount,
setAmount
]=useState("");

const[
years,
setYears
]=useState("");

const[
generate,
setGenerate
]=useState(false);


/* INTRO */

useEffect(()=>{

if(logged){

setShowIntro(true);

const timer=

setTimeout(()=>{

setShowIntro(false);

},4000);

return()=>{

clearTimeout(timer);

};

}

},[
logged
]);


/* AUTH PAGES */

if(!logged){

if(page==="signup"){

return(

<Signup

goLogin={()=>

setPage("login")

}

/>

);

}

if(page==="forgot"){

return(

<ForgotPassword

goLogin={()=>

setPage("login")

}

/>

);

}

return(

<Login

onSuccess={()=>{

localStorage.setItem(

"user",

"true"

);

setLogged(true);

}}

goSignup={()=>

setPage("signup")

}

goForgot={()=>

setPage("forgot")

}

/>

);

}


/* INTRO SCREEN */

if(showIntro){

return(

<div className="introVideo">

<div className="ring"/>

<div className="ring2"/>

<div className="logoReveal">

<div className="investLogo">

<div className="coin">

₹

</div>

<div className="bars">

<span/>
<span/>
<span/>

</div>

</div>

<h1>

FinMentor

</h1>

<p>

Learn • Invest • Grow

</p>

</div>

</div>

);

}


/* MAIN PAGE */

return(

<div className="page">

<header className="heroTop">

<div>

<h1>

FinMentor

</h1>

<p>

Your AI Financial Mentor

</p>

</div>

<div
className="navButtons"
>

<button

className="logoutBtn"

onClick={()=>{

localStorage.removeItem(

"user"

);

setGenerate(false);

setAmount("");

setYears("");

setLogged(false);

}}

>

Logout

</button>

</div>

</header>

<div className="planner">

<div className="inputGroup">

<label>

How much do you want to invest?

</label>

<input

type="number"

inputMode="numeric"

onWheel={(e)=>

e.target.blur()

}

value={amount}

placeholder="₹ 10,000"

onChange={(e)=>

setAmount(
e.target.value
)

}

/>

</div>

<div className="inputGroup">

<label>

For how many years?

</label>

<input

type="number"

inputMode="numeric"

onWheel={(e)=>

e.target.blur()

}

value={years}

placeholder="10"

onChange={(e)=>

setYears(
e.target.value
)

}

/>

</div>

<button

className="generateBtn"

onClick={()=>{

if(
!amount
||
!years
){

alert(

"Please enter amount and duration"

);

return;

}

setGenerate(false);

setTimeout(()=>{

setGenerate(true);

},100);

}}

>

Generate AI Plan

</button>

</div>

{

generate&&

<Recommendation

key={

amount+

years

}

amount={amount}

years={years}

/>

}

</div>

);

}