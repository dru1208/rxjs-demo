const { of, from, merge } = require('rxjs')
const { map, delay, mergeMap, concatMap } = require('rxjs/operators')

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

// concatMap
obs1.pipe(
  concatMap(param => getData(param.toString() + " from concatMap"))
).subscribe(val => console.log("2", val));

/*
concat map subscribes to the inner observable for you
will not subscribe to next observable until the current one finishes
maintains order

useful if you know you'll need all the pieces of data
*/

// using concatMap with new late value

merge(obs1, obs2).pipe(
  concatMap(param => getData(param.toString() + " from concatMap with new value"))
).subscribe(val => console.log("3", val));


merge(obs1, obs2).pipe(
  concatMap(param => getData(param.toString() + " from concatMap with new value and delay on console"))
).subscribe(val => setTimeout(() => console.log("4", val), 3000));

merge(obs1, obs2).pipe(
  concatMap(param => getDataWithDelay(param.toString() + " from concatMap with new value and delay on data retrieval"))
).subscribe(val =>  console.log("5", val))
