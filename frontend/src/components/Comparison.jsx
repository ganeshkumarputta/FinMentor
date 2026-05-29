import {
compareInvestments
}
from "../utils/simulator";

import {
investments
}
from "../data/investments";

export default function Comparison({

amount,
years

}){

if(
!amount||
!years
)
return null;

const data=

compareInvestments(

Number(amount),

Number(years),

investments

)

.sort(

(
a,
b
)=>

b.growth.final-

a.growth.final

);

const winner=
data[0];

return(

<div
className="comparison"
>

<h1
className="comparisonTitle"
>

Investment Comparison

</h1>

<table>

<thead>

<tr>

<th>

Rank

</th>

<th>

Investment

</th>

<th>

Return

</th>

<th>

Final Wealth

</th>

</tr>

</thead>

<tbody>

{

data.map(
(
x,
i
)=>(

<tr
key={i}
>

<td>

{
i===0
?

"🏆"

:

i+1

}

</td>

<td>

{
x.name
}

</td>

<td>

{
x.returnRate
}
%

</td>

<td>

₹

{

x
.growth
.final
?.toLocaleString()

}

</td>

</tr>

)

)

}

</tbody>

</table>

<div
className="winnerBox"
>

Best Performing

<h2>

{
winner?.name
}

</h2>

Final Wealth

<br/>

₹

{

winner
?.growth
?.final
?.toLocaleString()

}

</div>

</div>

);

}