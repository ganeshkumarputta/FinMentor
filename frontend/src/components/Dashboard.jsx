import Recommendation
from "./Recommendation";

import GrowthChart
from "./GrowthChart";

import Comparison
from "./Comparison";

import ProjectionTable
from "./ProjectionTable";

export default function Dashboard({

amount,
years,
risk

}){

if(
!amount||
!years
)
return null;

return(

<>

<Recommendation

amount={amount}

years={years}

risk={risk}

/>

<GrowthChart

amount={amount}

years={years}

/>

<Comparison

amount={amount}

years={years}

/>

<ProjectionTable

amount={amount}

years={years}

/>

</>

);

}