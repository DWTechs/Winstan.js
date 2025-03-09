import { log } from "../../dist/winstan.js";

log.error("App did not start");

log.warn("App did not start");

log.info("App started on port : 3000");

log.debug("UpdateOne(user=4)");

log.debug("UpdateOne(user=4)", 4554645);

log.debug("UpdateOne(user=4)", 4554645, 45);

log.debug("UpdateOne(user=4)", 4554645, 45, [ "update" ]);

log.debug("UpdateOne(user=4)", 4554645, 45, [ "update", "user" ]);