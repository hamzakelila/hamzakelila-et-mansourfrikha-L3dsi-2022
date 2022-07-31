import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProblemeAction,
  updateProblemeAction,
} from "../../actions/problemesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";

function SingleProbleme({ match, history }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [niveau, setNiveau] = useState();
  const [date, setDate] = useState("");
  const [oldData, setOldData] = useState();
  const dispatch = useDispatch();

  const problemeUpdate = useSelector((state) => state.problemeUpdate);
  const { loading, error } = problemeUpdate;

  const problemeDelete = useSelector((state) => state.problemeDelete);
  const { loading: loadingDelete, error: errorDelete } = problemeDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProblemeAction(id));
    }
    history.push("/allprobleme");
  };
  // const oldData = "";
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(
        "http://localhost:5000" + `/api/problemes/${match.params.id}`
      );
      // oldData = data;
      setOldData(data);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setNiveau(data.niveau);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setNiveau("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category || !niveau) return;

    const updatedProbleme = {};
    if (oldData.title != title) {
      updatedProbleme = { ...updatedProbleme, title };
    }
    if (oldData.content != content) {
      updatedProbleme = { ...updatedProbleme, content };
    }
    if (oldData.category != category) {
      updatedProbleme = { ...updatedProbleme, category };
    }
    if (oldData.niveau != niveau) {
      updatedProbleme = { ...updatedProbleme, niveau };
    }

    dispatch(
      // updateProblemeAction(match.params.id, title, content, category, niveau)
      updateProblemeAction(updatedProbleme)
    );
    
    resetHandler();
    history.push("/allprobleme");
  };

  return (
    <MainScreen title="Edit Probleme">
      <Card>
        <Card.Header>Edit your Probleme</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlid="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlid="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlid="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlid="niveau">
              <Form.Label>Niveau</Form.Label>
              <Form.Select
                aria-label="choisir le niveau"
                onChange={(e) => setNiveau(e.target.value)}
                value={niveau}
              >
                <option>facile</option>
                <option>moyenne</option>
                <option>difcuile</option>
              </Form.Select>
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Probleme
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Probleme
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleProbleme;