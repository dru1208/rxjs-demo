const { of, from } = require('rxjs')
const { map, mergeMap, delay } = require("rxjs/operators")

const getData = (param) => {
  return of(`merge map called on param ${param}`).pipe(
    delay(1000)
  )
}

from([1,2,3,4]).pipe(
  map(param => getData(param))
).subscribe(val => console.log(val))


from([1,2,3,4]).pipe(
  mergeMap(param => getData(param))
).subscribe(val => console.log(val))

/*
used for flattening observables
why is this useful

you want to set up something new every time there is a new fire
time related, i want a new timer for each fire
make that timer into an observable that is created on each fire
flatten it to continue downstream

you want to branch off
one action to trigger 2 actions

instead of writing two duplicated epics that map a source action to a result action,
mapping an source action to an observable that is created from 2 result actions
*/