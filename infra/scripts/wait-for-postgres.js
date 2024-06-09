const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout, stderr) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      setTimeout(checkPostgres, 1000);
      return;
    }

    console.log("\n🟢 Postgres is ready! 🚀\n");
  }
}

process.stdout.write("\n\n🔴 Waiting for Postgres accept connections...");
checkPostgres();
