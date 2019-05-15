const { interval, fromEvent } = require("rxjs")

/*
What are Observables?

Representation of a stream, or source of data over the course of time

Observables can be set up to listen for a certain event

e.g.
*/

// const button = document.getElementById("name-of-button")
// const buttonObs = fromEvent(button, "click")

/*
Here, the button observable has been defined, the event is being listened to, but nothing is happening because we haven't specified what should be done downstream
*/

const source = interval(800)
source.subscribe(() => {
  console.log("hi", Date.now())
})

/*
the subscription sets up the event listener that actually carries out each step going on upstream

redux-observable handling our actions, was foreign because I was reading through rxjs docs without understanding that subscriptions were handled

if we assign the subscription to a variable, it returns a subscription object
allows us to unsubscribe, what's the point of unsubscribing
memory leaks, control which stream we want
*/
