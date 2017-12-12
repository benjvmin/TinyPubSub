/*

TINY PUB SUB
BY: BENJAMIN TAYLOR

DO WHATEVA YOU WANT W/ IT HOMIE
MIT LICENSE

*/

export const Events = {
  //All Events will be added to the Handlers object, to see every function added, call Events.debug.list();
  handlers: {},

  //Add Event ---> Accepts Event Name & A callback function as parameters
  add(event, callbackFn) {
    //If the Event does not exist in the handlers object, create it
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }

    // If the event you are adding already exists, console log the added function already exists
    if (this.handlers[event].includes(callbackFn)) {
      if (this.debug.on) {
        console.warn(
          `Specified callback "${callbackFn}" already exists. Please check your Event adder for duplicate functions and try again.`
        );
      }
      return;
    }
    // Add the callback function to the event
    this.handlers[event].push(callbackFn);
  },

  // Remove Event ---> Accepts Event Name, and callback function to remove.
  remove(event, fnName) {
    if (this.handlers[event] && this.handlers[event].includes(fnName)) {
      this.handlers[event].splice(this.handlers[event].indexOf(fnName), 1);
    } else {
      // If you are trying to remove and event that does not exist, it will let you know via console.warn (if debug is active)
      if (this.debug.on) {
        console.warn(`There are no matching functions ${fnName} to remove`);
      }
    }
  },

  //Triggers the Event, uses the rest/spread operater to pass an unlimited number of parameters
  emit(name, ...data) {
    //If the emitted Event exists, call each function inside the matching array
    if (this.handlers[name]) {
      this.handlers[name].forEach(function(fn) {
        fn(...data);
      });
    } else {
      //If no matching event name exists inside the handlers object, a console.warn statement will appear with the emitted event name. (Only if debug is on)
      if (this.debug.on) {
        console.warn(
          `Specified Event "${name}" did not fire. Please check spelling of the event, or whether or not it exists in the handlers object.`
        );
      }
    }
  },

  debug: {
    //Switch debugging with a boolean value, will output console.warn statements. ( On is recommended for easier debugging);
    on: true,

    //List all properties of the Event Handlers object
    list() {
      //Will console.table if it is supported inside your browser
      if (console.table) {
        console.table(Events.handlers);
      } else {
        console.log(Events.handlers);
      }
    },

    //Use debug.listEvent to find an console.log a specific event.
    listEvent(name) {
      if (Events.handlers[name]) {
        console.log(Events.handlers[name]);
      } else {
        console.warn(`${name} does not exist inside Events handlers object.`);
      }
    }
  }
};
