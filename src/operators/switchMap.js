const { of, from, merge } = require("rxjs")
const { map, delay, switchAll, switchMap } = require('rxjs/operators')

const getData = (param) => {
  return of(`get data called on param ${param}`)
}

const getDataWithDelay = (param) => {
  return of(`get data called on param ${param} with 4s delay`).pipe(delay(4000))
}

const obs1 = from([1,2,3,4])
const obs2 = of(5).pipe(delay(2000))

// map
obs1.pipe(
  map(param => getData(param.toString() + " from map"))
).subscribe(val => val.subscribe(data => console.log("1", data)));

// switchMap
obs1.pipe(
  switchMap(param => getData(param.toString() + " from switchMap"))
).subscribe(val => console.log("2", val));

/*
what happens when we are streaming unpredictable number of values
5th value comes in a bit later

our fourth value is unsubscribed, but anything that passes downstream will be executed

*/

// using switchMap with new late value

merge(obs1, obs2).pipe(
  switchMap(param => getData(param.toString() + " from switchMap with new value"))
).subscribe(val => console.log("3", val));


merge(obs1, obs2).pipe(
  switchMap(param => getData(param.toString() + " from switchMap with new value and delay on console"))
).subscribe(val => setTimeout(() => console.log("4", val), 3000));

// however, if the inner observable hasn't completed, the switchmap will cancel the inner obs

merge(obs1, obs2).pipe(
  switchMap(param => getDataWithDelay(param.toString() + " from switchMap with new value and delay on data retrieval"))
).subscribe(val =>  console.log("5", val))
