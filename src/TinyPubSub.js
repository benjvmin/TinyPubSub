

const Events = {
  handlers: {},
  
  add(event, callbackFn) {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    if (this.handlers[event].includes(callbackFn)) {
      console.log("Function Already exists!");
      return
    }
    this.handlers[event].push(callbackFn);
  },

  remove(event, fnName) {
    if (this.handlers[event] && this.handlers[event].includes(fnName)) {
      this.handlers[event].splice(this.handlers[event].indexOf(fnName),1);
    }
    else {
      console.log('No Matching Functions Exist to remove!');
    }
  },
  emit(name, ...data) {
    let index = 0;
    let length = Object.keys(this.handlers).length;
    for (let eventName in this.handlers) {
      if (this.handlers[name] && name === eventName) {
        this.handlers[name].map(function(fn) {
          fn(...data);
        });
      } else {
        index++;
      }
    }
    if (index >= length) {
      console.log(index);
      throw new Error(
        'Specified event in the Event handlers object did not fire. Check the name of the event you are calling.'
      );
    }
  }
};