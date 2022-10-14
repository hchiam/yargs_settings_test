var fs = require("fs");

require("yargs")
  .scriptName("cmd")
  .usage("$0 [args]")
  .command(
    "$0",
    "default short command",
    function (yargs) {},
    function (argv) {
      var settingsFileName = "settings.json";
      readFile(settingsFileName, function (text) {
        var data = JSON.parse(text);
        var path = data.path;
        console.log();
        highlightedLog("reading " + settingsFileName + ":");
        console.log(data, "\n");
        highlightedLog("reading " + settingsFileName + " JSON data.path:");
        console.log(path, "\n");
        if (path) {
          readFile(path, function (text) {
            highlightedLog("using setting path to read text in " + path + ":");
            console.log(text, "\n");
          });
        }
      });
    }
  )
  .command(
    "run [some_argument] [num]",
    "run a command with params",
    function (yargs) {
      yargs
        .positional("some_argument", {
          type: "string",
          default: "<FALLBACK_VALUE>",
          describe: "Argument description.",
        })
        .positional("num", {
          type: "number",
          default: "<FALLBACK_VALUE>",
          describe: "Argument description.",
        });
    },
    function (argv) {
      console.log(argv.some_argument, argv.num);
    }
  )
  .help().argv;

function readFile(fileName, callback) {
  if (!fileName) fileName = "settings.json";
  fs.readFile(fileName, "utf8", function (err, text) {
    if (err) return console.log(err);
    callback(text);
  });
}

function highlightedLog(text) {
  console.log("\x1b[7m" + text + "\x1b[0m");
}
