import { log, setService, setColorize } from "../../dist/winstan.js";
function runTests(mode) {
    console.log(`\n🧪 === TESTING ${mode.toUpperCase()} MODE ===`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
    console.log(`SERVICE_NAME: ${process.env.SERVICE_NAME || 'undefined'}`);
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
function testServiceName() {
    console.log("\n🏷️ === TESTING SERVICE CONFIGURATION ===");
    console.log("NOTE: SERVICE_NAME should be set at startup via environment variable");
    console.log("or programmatically via setService() method, not changed during runtime.");
    console.log("\n--- Test 1: No service configured ---");
    log.info("Test message without service name");
    log.error("Error message without service name", { userId: 123 });
    console.log("\n--- Test 2: Service set via setService('user-service') ---");
    setService("user-service");
    log.info("Test message with user-service");
    log.warn("Warning message with user-service", { requestId: 456 });
    log.error("Error message with user-service", { userId: 123, error: "Connection failed" });
    console.log("\n--- Test 3: setService('ms_auth-api') ---");
    setService("ms_auth-api");
    log.info("Authentication service started");
    log.debug("Token validation completed", { tokenId: "abc123", userId: 789 });
    console.log("\n--- Test 4: setService('My App Service v2.1') ---");
    setService("My App Service v2.1");
    log.info("Application service with version info");
    log.error("Service error with complex name", { version: "2.1", module: "auth" });
    setService("");
    console.log("\n--- Test 5: SERVICE_NAME = '' (empty string) ---");
    console.log(`SERVICE_NAME: '${process.env.SERVICE_NAME}'`);
    log.info("Test message with empty service name");
    log.warn("Warning with empty service name", { tags: ["test"] });
    console.log("\n--- Test 6: SERVICE_NAME in Production Mode ---");
    setService("prod-api");
    process.env.NODE_ENV = "production";
    console.log(`SERVICE_NAME: ${process.env.SERVICE_NAME}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    log.info("Production service message");
    log.error("Production error with service name", { errorCode: 500 });
    console.log("\n--- Test 7: SERVICE_NAME in Development Mode ---");
    setService("dev-api");
    process.env.NODE_ENV = "development";
    console.log(`SERVICE_NAME: ${process.env.SERVICE_NAME}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    log.info("Development service message");
    log.debug("Debug message with service name", { debugInfo: "test data" });
    console.log("\n--- Test 8: Multiline Messages with SERVICE_NAME ---");
    setService("complex-service");
    process.env.NODE_ENV = "development";
    log.info(`Service initialization:
- Database connected
- Redis cache ready
- API endpoints loaded
- Service ready to accept requests`);
    log.error(`Service startup failed:
- Database connection timeout
- Redis unavailable
- Configuration invalid
- Service shutdown initiated`, { errorCode: 503, retryAfter: 30 });
    delete process.env.SERVICE_NAME;
    delete process.env.NODE_ENV;
    console.log("\n🏷️ === SERVICE_NAME TESTS COMPLETED ===");
}
testServiceName();
function testColorize() {
    console.log("\n🎨 === TESTING COLORIZATION CONTROL ===");
    console.log("NOTE: Color changes affect all subsequent log output");
    console.log("\n--- Test 1: Default Colorization ---");
    console.log(`NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
    console.log("Default colorization behavior (based on environment):");
    log.error("Error message with default colors");
    log.warn("Warning message with default colors");
    log.info("Info message with default colors");
    log.debug("Debug message with default colors");
    console.log("\n--- Test 2: setColorize(true) - Colors Enabled ---");
    setColorize(true);
    log.error("Error message with colors enabled");
    log.warn("Warning message with colors enabled");
    log.info("Info message with colors enabled");
    log.debug("Debug message with colors enabled");
    console.log("\n--- Test 3: setColorize(false) - Colors Disabled ---");
    setColorize(false);
    log.error("Error message with colors disabled");
    log.warn("Warning message with colors disabled");
    log.info("Info message with colors disabled");
    log.debug("Debug message with colors disabled");
    console.log("\n--- Test 4: Colorization with Context Data ---");
    setColorize(true);
    log.info("User authentication", {
        userId: 12345,
        method: "oauth",
        tags: ["auth", "success"]
    });
    setColorize(false);
    log.error("Database connection failed", {
        host: "db.example.com",
        port: 5432,
        error: "Connection timeout",
        retryAttempt: 3,
        tags: ["database", "error"]
    });
    console.log("\n--- Test 5: Colorization with Multiline Messages ---");
    setColorize(true);
    process.env.NODE_ENV = "development";
    log.info(`Service initialization with colors:
- Database connected
- Cache initialized  
- API endpoints loaded
- Ready to accept requests`);
    setColorize(false);
    log.warn(`Service warning without colors:
- High memory usage detected
- Consider scaling up resources
- Monitor performance metrics
- Check for memory leaks`);
    console.log("\n--- Test 6: Colorization in Production Mode ---");
    process.env.NODE_ENV = "production";
    setColorize(true);
    console.log("Colors enabled in production mode:");
    log.info("Production service started");
    log.error("Production error occurred", { errorCode: 500 });
    setColorize(false);
    console.log("Colors disabled in production mode:");
    log.info("Production service message");
    log.error("Production error without colors", { errorCode: 404 });
    console.log("\n--- Test 7: Dynamic Color Toggling ---");
    console.log("Simulating runtime color control:");
    const messages = [
        { level: 'info', msg: 'Message 1', colored: true },
        { level: 'warn', msg: 'Message 2', colored: false },
        { level: 'error', msg: 'Message 3', colored: true },
        { level: 'debug', msg: 'Message 4', colored: false }
    ];
    messages.forEach((item, index) => {
        setColorize(item.colored);
        console.log(`  ${index + 1}. Colors ${item.colored ? 'ON' : 'OFF'}:`);
        log[item.level](item.msg, { toggle: item.colored, index: index + 1 });
    });
    console.log("\n--- Test 8: Return Value Validation ---");
    const result1 = setColorize(true);
    console.log(`setColorize(true) returned: ${result1}`);
    const result2 = setColorize(false);
    console.log(`setColorize(false) returned: ${result2}`);
    setColorize(true);
    delete process.env.NODE_ENV;
    console.log("\n🎨 === COLORIZATION TESTS COMPLETED ===");
}
testColorize();
console.log("\n🎉 === ALL TESTS COMPLETED ===");
