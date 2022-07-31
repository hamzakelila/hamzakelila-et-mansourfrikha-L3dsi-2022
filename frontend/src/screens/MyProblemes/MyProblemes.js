import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  deleteProblemeAction,
  listProRequest,
} from "../../actions/problemesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";

const MyProblemes = () => {
  const dispatch = useDispatch();

  const problemeList = useSelector((state) => state.problemeList);
  const { loading, error, problemes } = problemeList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const problemeCreate = useSelector((state) => state.problemeCreate);
  const { success: successCreate } = problemeCreate;
  const problemeUpdate = useSelector((state) => state.problemeUpdate);
  const { success: successUpdate } = problemeUpdate;
  const problemeDelete = useSelector((state) => state.problemeDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = problemeDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProblemeAction(id));
    }
  };
  const history = useHistory();

  console.log(problemes);
  useEffect(() => {
    dispatch(listProRequest());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    successCreate,
    history,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  return (
    <MainScreen title={`welcome back ${userInfo.name}..`}>
      <Link to="createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Probleme
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}

      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {problemes?.reverse().map((probleme) => (
        <Accordion>
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <Accordion.Item as={Card.Text} variant="link" eventKey="0">
                  <Accordion.Header>{probleme.title}</Accordion.Header>
                  <Accordion.Body>
                    <h4>
                      <Badge variant="success">
                        Category - {probleme.category}
                      </Badge>
                    </h4>

                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{probleme.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {probleme.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Accordion.Body>
                </Accordion.Item>
              </span>
              <div>
                <Button href={`/note/${probleme._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(probleme._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyProblemes;
