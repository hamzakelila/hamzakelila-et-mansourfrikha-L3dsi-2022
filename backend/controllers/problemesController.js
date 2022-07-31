const Probleme = require("../models/problemeModel.js");
const asyncHandler = require("express-async-handler");
const fs = require("fs");

const { PythonShell } = require("python-shell");
const getProbleme = asyncHandler(async (req, res) => {
  const page = parseInt(req.params.page);
  const limit = parseInt(req.params.limit);
  const total = await Probleme.countDocuments();

  const problemes = await Probleme.find({})
    .limit(limit)
    .skip(limit * page);
  // console.log(limit);
  //console.log(page);

  //console.log(total);
  console.log("mourad/problemecontroller/22");
  res.json({ problemes: problemes, totalpage: Math.ceil(total / limit) });

  // res.json(problemes);
});
const createProblem = asyncHandler(async (req, res) => {
  console.log("mourad 321321321321");
  //  console.log(req);
  //title = "aaaaaaa"
  const { title, content, category, niveau, nbrtest } = Object(JSON.parse(req.body.newProblemData));

  console.log(title);

  const correctionFile = req.files.correctionFile;
  await saveFile(correctionFile, `${process.cwd()}/public/${title}.py`)

  const testsFile = req.files.testsFile;
  await saveFile(testsFile, `${process.cwd()}/public/${title}.txt`)


  if (!title || !content || !category || !niveau || !nbrtest) {
    console.log("mourad/problemecontroller/31");
    res.status(400);
    console.log("mourad/problemecontroller/33");
    throw new Error("Please Fill all the feilds");
  } else {
    const probleme = new Probleme({
      user: req.user._id,
      title,
      content,
      category,
      niveau,
      nbrtest,
    });

    fs.readFile(`./public/${title}.txt`, "utf8", async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
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
        //bch tetbdl async
        console.log("await");
        try {
          const x = await executerPythonCode(
            NumberOfLineOfOneTest,
            linesList,
            i,
            title
          );

          // try {
          console.log("resolve");

          json[`test${i + 1}`] = {
            input: x.retourInput,
            expectedResult: x.retourPython,
          };

          //json[ex]
          //          console.log(json())
        } catch (rejects) {
          //x.retourPython
          // res.status(500).json(rejects);
          console.log("rejects=", rejects);
          console.log("rejectsssss");
          res.status(201).json({ error: rejects });
          return;
        }
      }

      var createdProbleme = ""
      try {

        createdProbleme = await probleme.save();
      } catch (error) {
        console.log(error);
        res.status(201).json({ error: {type: "erreur", error: {traceback: "Title already exist"}} });
          return;
      }

      let datta = JSON.stringify(json);
      fs.writeFileSync(`./public/${title}.json`, datta);

      console.log("ddddd");

      console.log("mourad/problemecontroller/125");
      res.status(201).json(createdProbleme);
    });

  }
});

function saveFile(file, filePathAndName) {
  return new Promise((resolve, reject) => {
    file.mv(filePathAndName, function (error, data) {
      //console.log({ error, data });
      if (error) {
        // return res.status(500).json({ error: error.message });
        reject({ error: error.message })
      }
      resolve()
    });
  })
}

function executerPythonCode(NumberOfLineOfOneTest, linesList, i, title) {
  console.log("======");
  return new Promise(function (resolve, rejects) {
    let pyshell = new PythonShell(`./public/${title}.py`);

    let toSendToPythonInput = "";
    let result = "";
    let reponse = "";

    for (let j = 0; j < NumberOfLineOfOneTest; j++) {
      toSendToPythonInput =
        toSendToPythonInput + linesList[i * NumberOfLineOfOneTest + j] + "\n";
      result = toSendToPythonInput;
    }
    console.log("les input", toSendToPythonInput);
    result = toSendToPythonInput;
    console.log("i=", i);
    // console.log("j=", j);
    pyshell.send(result);

    console.log("run code");
    pyshell.on("message", function (message) {
      console.log("bbbbb");

      console.log(message);
      reponse += message;

      console.log("resultat est ", reponse);
    });
    pyshell.on("stderr", function (stderr) {
      // console.log("erreur");
      // console.log(stderr);
    });

    pyshell.stdout.on("data", function (data) {
      console.log("stdout/", data);
    });
    console.log("cccc");
    pyshell.end(function (err, code, signal) {
      console.log("python-shell end");
      if (err) {
        // throw err;
        console.log("mourad/problemecontroller/109");
        // res.status(500).json({ err });
        console.log("D5LLLL");

        rejects({ type: "erreur", error: err });
      }
      // console.log("mouradd/problemecontroller/109") &&
      // res.status(500).json({ type: "erreur", error: err })
      console.log("The exit code was: " + code);
      console.log("The exit signal was: " + signal);
      console.log("finished");
      console.log("D5LLLL");
      // console.log(response);
      resolve({ type: "good", retourPython: reponse, retourInput: result });
    });

    console.log("D5LLLL2");

    console.log("ffff");
  });
}


const getProblemeById = asyncHandler(async (req, res) => {
  const probleme = await Probleme.findById(req.params.id);

  if (probleme) {
    console.log("mourad/problemecontroller/133");
    res.json(probleme);
  } else {
    console.log("mourad/problemecontroller/136");
    res.status(404).json({ message: "Probleme not found" });
  }
  // console.log("mourad/problemecontroller/137");
  // res.json(probleme);
});

const UpdateProbleme = asyncHandler(async (req, res) => {
  const { title, content, category, niveau } = req.body;

  const probleme = await Probleme.findById(req.params.id);

  if (probleme.user.toString() !== req.user._id.toString()) {
    console.log("mourad/problemecontroller/148");

    res.status(401);
    console.log("mourad / problemecontroller / 152");
    throw new Error("You can't perform this action");
  }

  if (probleme) {
    probleme.title = title;
    probleme.content = content;
    probleme.category = category;
    probleme.niveau = niveau;

    const updatedProbleme = await probleme.save();
    res.json(updatedProbleme);
  } else {
    console.log("mourad/problemecontroller/165");

    res.status(404);
    console.log("mourad/problemecontroller/168");

    throw new Error("Probleme not found");
  }
});
const DeleteProbleme = asyncHandler(async (req, res) => {
  const probleme = await Probleme.findById(req.params.id);

  if (probleme.user.toString() !== req.user._id.toString()) {
    console.log("mourad/problemecontroller/177");

    res.status(401);
    console.log("mourad/problemecontroller/180");

    throw new Error("You can't perform this action");
  }

  if (probleme) {
    await probleme.remove();
    console.log("mourad/problemecontroller/187");

    res.json({ message: "Probleme Removed" });
  } else {
    console.log("mourad/problemecontroller/191");

    res.status(404);
    console.log("mourad/problemecontroller/194");

    throw new Error("Probleme not Found");
  }
});
module.exports = {
  getProbleme,
  createProblem,
  getProblemeById,
  UpdateProbleme,
  DeleteProbleme,
};
