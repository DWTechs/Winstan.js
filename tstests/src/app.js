import { log } from "../../dist/winstan.js";
function runTests(mode) {
    console.log(`\n🧪 === TESTING ${mode.toUpperCase()} MODE ===`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
    console.log(`Expected format: ${mode === 'development' ? 'Human-readable multiline' : 'Pure logfmt with escaped newlines'}\n`);
    log.error("App did not start");
    log.warn("App did not start properly");
    log.info("App started on port : 3000");
    log.debug("UpdateOne(user=4)");
    log.debug("UpdateOne(user=4)", { requestId: 4554645 });
    log.debug("UpdateOne(user=4)", { requestId: 4554645, userId: 65.6 });
    log.debug("UpdateOne(user=4)", { requestId: 4554645, userId: 45 });
    log.debug("UpdateOne(user=4)", { requestId: 4554645, userId: 45, tags: ["update"] });
    log.debug("UpdateOne(user=4)", { requestId: 4554645, userId: 45, tags: ["update", "user"] });
    console.log(`\n--- ${mode} Mode: Line Break Support ---`);
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
└─ Entity initialization completed`, { requestId: 4554645, userId: 45, tags: ["update", "user"] });
    log.debug("Debug with empty lines:\nLine 1\n\nLine 3\n\nLine 5");
    log.info("Special chars: quotes=\"test\", backslash=\\, tab=\t, equals=key=value");
    log.error("JSON-like: {\"error\": \"Connection failed\", \"code\": 500}");
    console.log(`--- ${mode} Mode Tests Completed ---\n`);
}
process.env.NODE_ENV = 'development';
runTests('development');
process.env.NODE_ENV = 'production';
runTests('production');
delete process.env.NODE_ENV;
runTests('default (undefined)');
console.log("🎉 === ALL TESTS COMPLETED ===");
