const { start } = require('@hubspot/serverless-dev-runtime');
let currentServer;

// Run the test server for the function being tested before running the test
global.beforeEach(async () => {
  const { testPath } = global.jasmine;
  currentServer = await start({
    path: testPath.split('/').slice(0, -1).join('/'),
    port: 5432
  });
});

// Cleanup after running the test
global.afterEach(async () => {
  await currentServer.exit();
}, 20000);
