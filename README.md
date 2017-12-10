# TinyPubSub
A small Publish/Subscribe library for project use! (Still testing);


#### Import the Events Object

`import { Events } from "./modules/TinyPubSub.js";`

#### Add Events:

`Events.add("Event Name", someCallbackFunction)`

#### Remove Events:

`Events.remove("Event Name", functionToRemove)`

#### Trigger Events:

`Events.emit(someFunctionToTrigger, someDataToPass)`

#### List Events:

`Events.List()`

### Features:
* Throws an error if you try to Emit a function that does not exist, easier for debugging purposes. 

* Extremely Tiny (733 bytes minified!);

*  Zero Dependencies

