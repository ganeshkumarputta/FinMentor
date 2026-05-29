import {
compareInvestments
}
from "../utils/simulator";

import {
investments
}
from "../data/investments";

export default function ProjectionTable({

amount,
years

}){

if(
!amount||
!years
)
return null;

return(

<div className="projection">

<h1 className="sectionTitle">

Understand Your Money Growth

</h1>

<div className="explainBox">

<h2>

What is Future Value?

</h2>

<p>

Suppose you invest

<b>

₹{amount}

</b>

today.

If investment keeps growing every year,
the amount after

<b>

{years} years

</b>

is called

<b>

Future Value

</b>.

</p>

<p>

Future Value simply means:

"How much your money may become later."

</p>

<hr/>

<h2>

What is Inflation?

</h2>

<p>

Inflation means prices become higher over time.

Even if your money amount increases,
the things you buy also become expensive.

</p>

<p>

Example:

</p>

<p>

🍔 Today → ₹100 buys 2 burgers

</p>

<p>

🍔 Later → ₹100 buys only 1 burger

</p>

<p>

This reduction in buying power is called inflation.

</p>

<hr/>

<h2>

Why Does Inflation Happen?

</h2>

<ul>

<li>Products become costly</li>

<li>Fuel prices increase</li>

<li>Demand increases</li>

<li>Economy grows</li>

<li>More money enters market</li>

</ul>

<hr/>

<h2>

Why Investing Matters

</h2>

<p>

If savings grow slower than inflation,
your real wealth decreases.

Investments try to grow money faster than inflation.

</p>

<hr/>

<h2>

Example Using Your Inputs

</h2>

<p>

You entered:

</p>

<ul>

<li>

Investment:

<b>

₹{amount}

</b>

</li>

<li>

Duration:

<b>

{years} years

</b>

</li>

</ul>

<p>

Now check the comparison and growth chart above.

Those sections show:

</p>

<ul>

<li>Estimated future value</li>

<li>Year-by-year growth</li>

<li>Investment differences</li>

<li>AI recommendation</li>

</ul>

</div>

</div>

);

}