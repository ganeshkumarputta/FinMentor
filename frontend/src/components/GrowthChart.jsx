import { useState } from "react";

import {

LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid,
Legend

}
from "recharts";

import {
investments
}
from "../data/investments";

import {
compareInvestments
}
from "../utils/simulator";

export default function GrowthChart({

amount,
years

}){

const[
selected,
setSelected
]=useState(
"ALL"
);

if(
!amount||
!years
)
return null;

const compared=

compareInvestments(

Number(amount),

Number(years),

investments

);

let data=[];

if(
selected==="ALL"
){

for(

let i=0;

i<Number(years);

i++

){

let row={

year:
i+1

};

compared.forEach(
(
x
)=>{

row[
x.name
]=

x
.growth
.yearly?.[
i
]?.value

??

0;

});

data.push(
row
);

}

}

else{

const chosen=

compared.find(
(
x
)=>

x.name===selected

);

data=

chosen
?.growth
?.yearly

??

[];

}

return(

<div
className="chartBox"
>

<div
className="chartHeader"
>

<h2>

Growth Projection

</h2>

<select

className="chartSelect"

value={selected}

onChange={(e)=>

setSelected(
e.target.value
)

}

>

<option>

ALL

</option>

{

investments.map(
(
x,
i
)=>

<option
key={i}
>

{x.name}

</option>

)

}

</select>

</div>

<ResponsiveContainer

width="100%"

height={500}

>

<LineChart
data={data}
>

<CartesianGrid
stroke="#334155"
/>

<XAxis
dataKey="year"
/>

<YAxis/>

<Tooltip/>

<Legend/>

{

selected==="ALL"

?

investments.map(
(
x,
i
)=>

<Line

key={i}

type="monotone"

dataKey={x.name}

strokeWidth={3}

/>

)

:

<Line

type="monotone"

dataKey="value"

strokeWidth={5}

/>

}

</LineChart>

</ResponsiveContainer>

</div>

);

}