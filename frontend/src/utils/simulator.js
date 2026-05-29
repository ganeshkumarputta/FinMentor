export function simulateGrowth(
amount,
years,
rate
){

let yearly=[];

let monthly=[];

let value=
Number(
amount);

for(

let y=1;

y<=years;

y++

){

value=
value*
(
1+
rate/100
);

yearly.push({

year:y,

value:
Math.round(
value
)

});

}

let monthlyValue=
Number(
amount);

for(

let m=1;

m<=years*12;

m++

){

monthlyValue=
monthlyValue*
(
1+
rate/
1200
);

monthly.push({

month:m,

value:
Math.round(
monthlyValue
)

});

}

return{

yearly,

monthly,

final:

Math.round(
value
)

};

}

export function compareInvestments(
amount,
years,
items
){

return items.map(
(
i
)=>{

const growth=

simulateGrowth(

amount,

years,

i.returnRate

);

const inflation=

Math.round(

growth.final/

Math.pow(
1.06,
years
)

);

return{

...i,

growth,

inflation

};

}

);

}