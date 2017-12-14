/*
TINY PUB SUB
BY: BENJAMIN TAYLOR
EDITED BY: @SAULDOESCODE
DO WHATEVA YOU WANT W/ IT HOMIE
MIT LICENSE
*/

export const Events = {
  // All Events will be added to the Handlers map, to see every function added, call Events.debug.list()
  handlers: new Map(),
  // Add Event ---> Accepts Event Name & A callback function as parameters
  add (event, func) {
    // If the handlers do not have the event then create it.
    if (!Events.handlers.has(event)) {
      Events.handlers.set(event, new Set())
    }
    // Add the callback function to the event
    Events.handlers.get(event).add(func)
  },

  // Remove Event ---> Accepts Event Name, and callback function to remove.
  remove (event, func) {
    const handles = Events.handlers.get(event)
    if (handles) {
      handles.delete(func)
    } else if (Events.debug.on) {
      // If you are trying to remove and event that does not exist, it will let you know via console.warn (if debug is active)
      console.warn(`There are no matching functions ${func} to remove`)
    }
  },

  // Triggers the Event, uses the rest/spread operater to pass an unlimited number of parameters
  emit (event, ...data) {
    // If the emitted Event exists, call each function ins the matching Set
    if (Events.handlers.has(event)) {
      Events.handlers.get(event).forEach(fn => { fn(...data) })
    } else if (Events.debug.on) {
        // If no matching event name exists in the handlers Map, a console.warn statement will appear with the emitted event name. (Only if debug is on)
        console.warn(
          `Specified Event "${event}" did not fire. Please check spelling of the event, or whether or not it exists in the handlers Map.`
        )
    }
  },

  debug: {
    // Switch debugging with a boolean value, will output console.warn statements. ( On is recommended for easier debugging)
    on: true,

    // List all properties of the Event Handlers Map
    list () {
      // Will console.table if it is supported in your browser
      console[console.table ? 'table' : 'log'](Events.handlers)
    },

    // Use debug.listEvent to find an console.log a specific event.
    listEvent (event) {
      if (Events.handlers.has(event)) {
        console.log(Events.handlers.get(event))
      } else {
        console.warn(`${event} does not exist inside Events handlers Map.`)
      }
    }
  }
}
