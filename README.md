# TinyPubSub
A small Publish/Subscribe library for project use! (Still testing);


Add Events:
`Events.add("Event Name", someCallbackFunction)`

Remove Events:
`Events.remove("Event Name", functionToRemove)`

Trigger Events:
`Events.emit(someFunctionToTrigger, someDataToPass)`

### Features:
* Throws an error if you try to Emit a function that does not exist, easier for debugging purposes. 

* Extremely Tiny

