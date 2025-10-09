import { init, log } from "../../dist/winstan.js";

init("europe/paris","fr-FR","ms-user","debug");
log.error("App did not start");
log.warn("App did not start properly");
log.info("App started on port : 3000");
log.debug("UpdateOne(user=4)");
log.debug("UpdateOne(user=4)", { requestId:4554645 });
log.debug("UpdateOne(user=4)", { requestId:4554645, userId: 65.6 });
log.debug("UpdateOne(user=4)", { requestId:4554645, userId: 45 });
log.debug("UpdateOne(user=4)", { requestId:4554645, userId: 45, tags: [ "update" ] });
log.debug("UpdateOne(user=4)", { requestId:4554645, userId: 45, tags:  [ "update", "user" ] });
console.log("\n=== Testing Line Break Support ===");
log.info("Single line message test");
log.info("Multi-line message test:\nLine 1\nLine 2\nLine 3");
log.warn("Warning with details:\nError in module A\nCheck configuration file\nRestart required");
log.error("Error with stack trace:\nTypeError: Cannot read property\n  at Object.method (file.js:10:5)\n  at main (app.js:25:10)");
log.info(`Entity Summary Test:
┌─ SQLEntity: "users" (Table: users)
├─ Total Properties: 3
├─ Operation Distribution:
│  └─ SELECT: 3 properties
│  └─ INSERT: 2 properties
├─ Property Details:
│  ├─ id:
│  │   ├─ Type: number
│  │   └─ Operations: [SELECT]
│  ├─ name:
│  │   ├─ Type: string
│  │   └─ Operations: [SELECT, INSERT]
│  └─ email:
│      ├─ Type: string
│      └─ Operations: [SELECT, INSERT]
└─ Entity initialization completed`);
log.debug("Debug with empty lines:\nLine 1\n\nLine 3\n\nLine 5");
console.log("=== Line Break Tests Completed ===");
