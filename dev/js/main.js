import { Events } from "./modules/TinyPubSub.js";

Events.add("Sup", function(){
    console.log("Hello!");
});

Events.add("Sup", function() {
  console.log("Dude!");
});



Events.emit("Sup");


Events.list();