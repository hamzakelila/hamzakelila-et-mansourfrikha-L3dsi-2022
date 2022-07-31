import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteProblemeAction } from "../../actions/problemesActions";
import axios from "axios";
import {
  listProRequest,
  listProSuccess,
  listFailPro,
} from "../../actions/problemesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
export const Allprobleme = ({ search }) => {
  const dispatch = useDispatch();
  const problemeList = useSelector((state) => {
    console.log({ state });
    return state.problemeList;
  });

  
  const { loading, problemes, error } = problemeList;
  const userLogin = useSelector((state) => state.userLogin);
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

  const { userInfo } = userLogin;

  const history = useHistory();
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  useEffect(() => {
    try {
      dispatch(listProRequest());

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      var data;
      const fetchData = async () => {
        data = await axios.get("http://localhost:5000"+`/api/problemes/${pageNumber}/${limit}`, config);
        console.log({ data });
        console.log(limit);
        console.log(pageNumber);
        console.log(data.data.totalpage);
        setNumberOfPages(data.data.totalpage);
        console.log(data.data);
        dispatch(listProSuccess(data.data.problemes));
      };

      fetchData();
      // console.log("aaaa", data);
      // console.log(data.data);

      console.log(data.data.length);
    } catch (error) {
      console.log(error);
      dispatch(listFailPro(error));
    }

    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo, limit, pageNumber,successDelete,]);

  return (
    <div className="mt-5">
      <div className="container"></div>
      <div>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr className="table-dark">
            <th scope="col">category</th>
            <th scope="col">Title</th>
            <th scope="col">Difficule</th>
            <th scope="col">contained</th>

            <th scope="col">problem</th>
          </tr>
        </thead>
        {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
        {loading && <Loading />}
        <tbody>
          {problemes
            ?.reverse()
            .filter(
              (filteredProbleme) =>
                filteredProbleme.title
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                filteredProbleme.category
                  .toLowerCase()
                  .includes(search.toLowerCase())
              // || filteredNote.niveau.toLowerCase().includes(search.toLowerCase())
            )
            .map((probleme) => (
              <tr key={probleme._id}>
                <th scope="row">{probleme.category}</th>
                <td>{probleme.title}</td>
                <td>{probleme.niveau}</td>
                <th>
                  <ReactMarkdown>{probleme.content}</ReactMarkdown>{" "}
                </th>

                <td>
                  <Button
                    href={`/probleme/${probleme._id}`}
                    className="btn-btn-success"
                    variant="primary"
                  >
                    consult the problem
                  </Button>
                  {userInfo && userInfo.roles !== "user" ? (
                    <Button href={`/note/${probleme._id}`} variant="warning">
                      Edit
                    </Button>
                  ) : null}
                  {userInfo && userInfo.roles !== "user" ? (
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(probleme._id)}
                    >
                      Delete
                    </Button>
                  ) : null}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={gotoPrevious}>Previous</Button>
        {pages.map((pageIndex) => (
          <Button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
            {pageIndex + 1}
          </Button>
        ))}
        <Button onClick={gotoNext}>Next</Button>
      </div>
    </div>
  );
};
export default Allprobleme;
