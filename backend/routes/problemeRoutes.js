const express = require("express");


const {
  getProbleme,
  createProblem,
  getProblemeById,
  UpdateProbleme,
  DeleteProbleme,
  createfile,
} = require("../controllers/problemesController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
router.route("/:page/:limit").get(protect, getProbleme);
router.route("/create").post(protect, createProblem);
router
  .route("/:id")
  .get(getProblemeById)
  .put(protect, UpdateProbleme)
  .delete(protect, DeleteProbleme);

const fs = require("fs");
const { PythonShell } = require("python-shell");

router.post("/download", function (req, res) {
  const { code, title, id, nbrtest } = req.body;

  console.log("++++++");

  console.log(req.body);

  const data = code;
  const titre = title;
  const Id = id;
  const Nbrtest = nbrtest;

  //console.log("xxxxxxxxxxxx",x)
  let jsson = {};

  fs.readFile(`./public/${title}.json`, "utf8", (err, db) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    let obj = JSON.parse(db);

    fs.writeFile(`./public/${Id}.py`, data, (err) => {
      if (err) {
        console.log("erreur");
      }

      fs.readFile(`./public/${title}.txt`, "utf8", async (err, data) => {

        console.log(data);
        var nbr = data.toString().split("\n").length;
        var NumberOfLine = nbr;
        console.log("nombre de ligne=", NumberOfLine);
        console.log("nombre des tests=", nbrtest);
        var NumberOfLineOfOneTest = Math.floor(NumberOfLine / nbrtest);
        console.log("NumberOfLineOfOneTest=", NumberOfLineOfOneTest);
        let json = {};
        let linesList = data.toString().split("\n");
        console.log(linesList);

        for (let i = 0; i < nbrtest; i++) {
          console.log("await");
          try {
            const x = await executerPythonCode(
              NumberOfLineOfOneTest,
              linesList,
              i
            );

            console.log(obj);
            console.log("expectedResult", obj.test1.expectedResult);
            console.log("expectedResult", obj.test2.expectedResult);

            console.log("resolve");

            const status = x.retourPython === obj[`test${i + 1}`].expectedResult
            json[`test${i + 1}`] = {
              input: x.retourInput,
              // expectedResult: x.retourPython,
              expectedResult: obj[`test${i + 1}`].expectedResult,
              output: x.retourPython,
              status: (x.retourPython == obj[`test${i + 1}`].expectedResult)
            };
          } catch (rejects) {
            //status=x.retourPython===expectedResult(json);
            json[`test${i + 1}`] = {
              //  ereur: rejects,
              input: obj[`test${i + 1}`].input,
              expectedResult: obj[`test${i + 1}`].expectedResult,
              output: rejects.retourEreur,
              status: false
            };

            // console.log("rejects=", rejects);
            //console.log("rejectsssss");
            //return;
          }
        }
        //    jsson=json;
        //console.log("json",json)
        //  let datta = JSON.stringify(json);
        //fs.writeFileSync(`./public/${Id}.json`, datta);

        console.log("ddddd");


        console.log("json", json)
        res.send(json)






        function executerPythonCode(
          NumberOfLineOfOneTest,
          linesList,
          i
        ) {
          console.log("======");
          return new Promise(function (resolve, rejects) {
            let pyshell = new PythonShell(`./public/${Id}.py`);

            let toSendToPythonInput = "";
            let result = "";
            let reponse = "";

            for (let j = 0; j < NumberOfLineOfOneTest; j++) {
              toSendToPythonInput =
                toSendToPythonInput +
                linesList[i * NumberOfLineOfOneTest + j] +
                "\n";
              result = toSendToPythonInput;
            }
            console.log("les input", toSendToPythonInput);
            result = toSendToPythonInput;
            console.log("i=", i);
            pyshell.send(result);
            console.log("run code");
            pyshell.on("message", function (message) {
              console.log("bbbbb");

              console.log(message);
              reponse += message;

              console.log("resultat est ", reponse);
            });
            let erreurStderr = "";
            pyshell.on("stderr", function (stderr) {
              erreurStderr = stderr;
              console.log(stderr);

            });

            pyshell.stdout.on("data", function (data) {
              console.log("stdout/", data);
            });
            console.log("cccc");
            pyshell.end(function (err, code, signal) {
              console.log("python-shell end");
              if (err) {
                console.log("mourad/problemecontroller/109");
                console.log("D5LLLL");

                rejects({ type: "erreur", error: err, retourEreur: erreurStderr });
              }
              console.log("The exit code was: " + code);
              console.log("The exit signal was: " + signal);
              console.log("finished");
              resolve({
                type: "good",
                retourPython: reponse,
                retourInput: result,
              });
              // console.log("json",json)
            });
            // console.log("json",json)
          });

        }
        //    jsson=json;
      });
      // console.log("jssssooon",jsson)
      console.log("fffff");
    });
    //console.log("json2",json)
    console.log("a1", titre);
    console.log("expectedResult2  ", obj.test2.expectedResult);

    console.log("id", Id);
    console.log(Nbrtest);
    console.log("expectedResult2  ", obj.test2.expectedResult);

    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  });
  // console.log("jssson",jsson)
});
module.exports = router;
