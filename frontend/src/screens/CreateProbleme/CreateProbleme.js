import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import {
  Button,
  Card,
  CardGroup,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createProblemeAction, createProblemeSuccess, createProblemeFail } from "../../actions/problemesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import axios from "axios";

function CreateProbleme({ history }) {

  let serverError = false

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Python");
  const [niveau, setNiveau] = useState("facile");
  const [filecor, setFileCor] = useState("");
  const [testfile, setTestFile] = useState("");
  const [nbrtest, setNbrTest] = useState("");

  const dispatch = useDispatch();
  const problemeCreate = useSelector((state) => state.problemeCreate);
  const { loading, error, probleme } = problemeCreate;

  console.log(probleme);


  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setNiveau("");
    // setFileCor("");
    // setTestFile("");
    setNbrTest("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      serverError ||
      !title ||
      !content ||
      !category ||
      !niveau ||
      // !filecor ||
      // !testfile ||
      !nbrtest
    ) {
      dispatch(createProblemeFail("Fill all the feilds"));
      return;
    }
    console.log("mourad1");
    try {
      dispatch(createProblemeAction());

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      console.log("mourad2");

      const dataToServer = new FormData();
      dataToServer.append("correctionFile", filecor);
      dataToServer.append("testsFile", testfile);
      dataToServer.append("newProblemData", JSON.stringify({ title, content, category, niveau, nbrtest }))

      console.log("mourad3");
      console.log(dataToServer);
      console.log("mourad4");

      const response = await axios.post("http://localhost:5000" +
        `/api/problemes/create`,
        dataToServer,
        config
      );


      console.log("mourad5");
      console.log({response});

      console.log("mourad6");
      if (response.data.error && response.data.error.type === "erreur") {
        dispatch(createProblemeFail(response.data.error.error.traceback));
      } else {
        dispatch(createProblemeSuccess(response));
        resetHandler();
        history.push("/allprobleme");
      }
    } catch (error) {
      console.log("mourad catch");
      console.log(error);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(createProblemeFail(message));
    }


  };

  useEffect(() => { }, []);

  return (

    <MainScreen title="Create a problem">

      <Card>
        <Card.Header>Create a problem</Card.Header>

        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlid="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <br />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "DodgerBlue",
              }}
            >
              {" "}
              <a
                href="https://www.markdownguide.org/basic-syntax/"
                target="_blank"
              >
                learn about markdown and latex in 30 minutes
              </a>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>
            <CardGroup>
              <Form.Group controlid="content">
                <Card id="content">
                  <Card.Header>description with latex and markdown</Card.Header>
                  <Form.Control
                    as="textarea"
                    value={content}
                    placeholder="Enter the content"
                    rows={4}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Card>
              </Form.Group>

              <Card>
                <Card.Header>view</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            </CardGroup>
            <br />
            <Form.Group controlid="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
              <br />
            </Form.Group>
            <Form.Group controlid="niveau">
              <Form.Label>Niveau</Form.Label>
              <Form.Select
                value={niveau}
                aria-label=""
                onChange={(e) => setNiveau(e.target.value)}
              >
                <option>moyen</option>
                <option>facile</option>
                <option>difficile</option>
              </Form.Select>
            </Form.Group>

            <Form.Group >
              <Form.Label controlid="filecor">Choisir le fichier de correction</Form.Label>
              <Form.Control
                type="file"
                id="filecor"
                accept=".py"
                onChange={event => {
                  const filecor = event.target.files[0];
                  setFileCor(filecor);
                }}
              />
            </Form.Group>
            <br />

            <Form.Group >
              <Form.Label controlid="testfile">Choisir le fichier de correction</Form.Label>
              <Form.Control
                type="file"
                id="testfile"
                accept=".txt"
                onChange={event => {
                  const testfile = event.target.files[0];
                  setTestFile(testfile);
                }}
              />
            </Form.Group>
            <br />

            <Form.Group controlid="nbrtest">
              <Form.Label>Choisir le nombres des test</Form.Label>
              <Form.Control
                type="number"
                value={nbrtest}
                onChange={(e) => setNbrTest(e.target.value)}
              />
            </Form.Group>

            <br />
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary" >
              Create problem
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset problem
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>

  );

}


export default CreateProbleme;
