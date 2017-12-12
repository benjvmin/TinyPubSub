# TinyPubSub
An extremely tiny Publish/Subscribe library with a thoughtful debugging process, perfect for project use! 

##Basic API

#### Import Events Object
```javascript
import { Events } from "./modulesFolder/TinyPubSub.js";
```

#### Add Events:

```javascript
Events.add("Event Name", someCallbackFunction);
```

#### Remove Events:

```javascript
Events.remove("Event Name", functionToRemove);
```

#### Trigger Events:

```javascript
Events.emit(someFunctionToTrigger, someDataToPass);
```

## Debugging:

#### Turn On / Off
```javascript
Events.debug.on = true;
```


####List All Events
Console.logs all events presently stored.

```javascript
Events.list();
```

#### List a Specific Event

Console.logs a specific event.

```javascript
Events.listEvent("eventName");
```

### Features:
* Thoughtful Debugging Process / Debug API

* Extremely Tiny (953 bytes minified + uglified!)

*  Zero Dependencies

* Forged from ES6

* Made with love. 