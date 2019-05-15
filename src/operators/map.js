const { interval } = require("rxjs")
const { take, map } = require("rxjs/operators")

const source = interval(800)
let count = 1
const startingValue = 10

const obs = source.pipe(
  take(10),
  map(() => {
    const value = startingValue + count
    count ++
    return value
  })
)

obs.subscribe((val) => {
  console.log("value 1 - display", val)
})

/*
mapping is one of the more commonly used operators

stream of info coming in can be thought of as an array over time

https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/map.ts

map operator has access to a source and a destination
subscribes to the source (observable), (map subscriber) then passes the argument on to the destination which is another observable

*/

let count2 = 1
const startingValue2 = 20

const onComplete = async (val) => {
  console.log("value 2 - display", await val)
}

const mapFn = (count) => {
  return count2 + startingValue2
}

const timeoutVal = (fn1) => (fn2) => (time) => {
  const interval = setInterval(() => {
    const a = new Promise((res) => {
      const newVal = fn1(count2)
      count2 ++
      res(newVal)
    })
    fn2(a)
    clear(interval)
  }, time)

}

const clear = (timeoutVal) => {
  if (count2 > 10) {
    clearInterval(timeoutVal)
  }
}

timeoutVal(mapFn)(onComplete)(800)