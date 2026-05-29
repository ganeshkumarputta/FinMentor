import {
useEffect,
useState,
useRef
}
from "react";

import API from "../services/api";

import jsPDF from "jspdf";

import SpeechRecognition,{
useSpeechRecognition
}
from "react-speech-recognition";

export default function Recommendation({

amount,
years

}){

const[
report,
setReport
]=useState("");

const[
question,
setQuestion
]=useState("");

const[
history,
setHistory
]=useState([]);

const[
loading,
setLoading
]=useState(false);

const endRef=
useRef(null);

const{

transcript,
resetTranscript

}=

useSpeechRecognition();

useEffect(()=>{

generate();

},[]);

useEffect(()=>{

endRef.current
?.scrollIntoView({

behavior:"smooth"

});

},[
history,
loading
]);

function cleanText(text){

if(
text===null
||
text===undefined
){

return "";

}

if(
typeof text==="object"
){

text=

JSON.stringify(

text,

null,

2

);

}

return String(text)

.replaceAll(
"\\n",
"\n"
)

.replaceAll(
"\\t",
"\t"
)

.replaceAll(
'\\"',
'"'
)

.replaceAll(
"\\\\",
"\\"

);

}

async function generate(){

try{

setLoading(true);

const res=

await API.post(

"/ai-recommend",

{

amount,
years

}

);

setReport(

cleanText(

res.data?.text

||

res.data?.reply

||

res.data

)

);

}
catch{

setReport(

"Unable to generate answer."

);

}
finally{

setLoading(false);

}

}

async function askQuestion(){

if(
!question.trim()
)
return;

const current=
question;

setQuestion("");

setLoading(true);

try{

const res=

await API.post(

"/followup",

{

context:

JSON.stringify({

report,
history

}),

question:
current

}

);

setHistory(

prev=>

[

...prev,

{

question:
current,

answer:

cleanText(

res.data?.text

||

res.data?.reply

||

res.data

)

}

]

);

}
catch{

setHistory(

prev=>

[

...prev,

{

question:
current,

answer:

"Unable to answer."

}

]

);

}
finally{

setLoading(false);

}

}

function startVoice(){

resetTranscript();

SpeechRecognition.startListening({

continuous:false,

language:"en-IN"

});

}

useEffect(()=>{

if(
transcript
){

setQuestion(
transcript
);

}

},[
transcript
]);

function exportPDF(){

const pdf=

new jsPDF();

pdf.setFontSize(
18
);

pdf.text(

"FinMentor Report",

15,

20

);

pdf.setFontSize(
11
);

pdf.text(

cleanText(report),

15,

40,

{

maxWidth:
180

}

);

pdf.save(

"FinMentor_Report.pdf"

);

}

function render(text){

text=
cleanText(text);

return text

.split("\n")

.map(

(line,i)=>{

line=
line.trim();

if(
!line
)
return null;

if(

line.startsWith("#")

){

return(

<h2
key={i}
>

{

line

.replaceAll(
"#",
""
)

.replaceAll(
"*",
""
)

}

</h2>

);

}

if(

line.startsWith("*")

||

line.startsWith("-")

){

return(

<div

key={i}

className="bullet"

>

✓

{

line

.replace(
"*",
""
)

}

</div>

);

}

if(

/^\d+\./

.test(line)

){

return(

<div

key={i}

className="step"

>

{

line

}

</div>

);

}

return(

<p
key={i}
>

{

line

}

</p>

);

}

);

}

return(

<div
className="chatPage"
>

<div
className="topActions"
>

<button
onClick={exportPDF}
>

📄 Export PDF

</button>

</div>

<div
className="answerBox"
>

<h2>

FinMentor

</h2>

<div
className="formattedAnswer"
>

{

render(
report
)

}

</div>

</div>

{

history.map(
(
h,
i
)=>

<div
key={i}
>

<div
className="userBubble">

{

h.question

}

</div>

<div
className="aiBubble">

{

render(
h.answer
)

}

</div>

</div>

)

}

{

loading&&

<div
className="aiBubble"
>

Thinking...

</div>

}

<div
ref={endRef}
/>

<div
className="bottomInput"
>

<input

value={question}

placeholder=

"Ask another doubt..."

onChange={(e)=>

setQuestion(
e.target.value
)

}

onKeyDown={(e)=>{

if(
e.key==="Enter"
){

askQuestion();

}

}}

/>

<button

onClick={startVoice}

>

🎤

</button>

<button

onClick={askQuestion}

>

Send

</button>

</div>

</div>

);

}