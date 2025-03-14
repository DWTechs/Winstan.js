import { init, log } from "../../dist/winstan.js";

init(
  "europe/paris",
  "fr-FR",
  "ms-user",
  "debug"
);

log.error("App did not start");

log.warn("App did not start properly");

log.info("App started on port : 3000");

log.debug("UpdateOne(user=4)");

log.debug("UpdateOne(user=4)", { id:4554645 });

log.debug("UpdateOne(user=4)", { id:4554645, userId: 45 });

log.debug("UpdateOne(user=4)", { id:4554645, userId: 45, tags: [ "update" ] });

log.debug("UpdateOne(user=4)", { id:4554645, userId: 45, tags:  [ "update", "user" ] });