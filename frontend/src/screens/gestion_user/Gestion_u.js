import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Modal, Table } from "react-bootstrap";
import axios from "axios";
import "./gest.css";
import { useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

const Gestion_U = ({ search }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const [ViewEdit, SetEditShow] = useState(false);
  const [ViewDelete, SetDeleteShow] = useState(false);
  const [Delete, setDelete] = useState(false);
  const [updated, setUpdated] = useState(false);

  const [id, setId] = useState("");
  const [checked, setChecked] = useState(true);
  const [Data, setData] = useState([]);
  const [RowData, SetRowData] = useState({
    name: "",
    email: "",
    roles: "",
    isActif: true,
  });

  const problemeDelete = useSelector((state) => state.problemeDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = problemeDelete;
  // const [itensPerPage, setitensPerPage] = useState(10);
  // const [currentPage, setcurrentPage] = useState(0);
  // const page = Math.ceil(Data.length / itensPerPage);

  // const startindex = currentPage * itensPerPage;
  // const endindex = currentPage + itensPerPage;
  // const currentitem = Data.slice(startindex, endindex);
  const handleDeleteShow = () => {
    SetDeleteShow(true);
  };
  const handleChange = () => {
    setChecked(!checked);
  };
  const hanldeDeleteClose = () => {
    SetDeleteShow(false);
  };

  const handleEditShow = () => {
    SetEditShow(true);
  };
  const hanldeEditClose = () => {
    SetEditShow(false);
  };
  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
  useEffect(() => {
    const fetchData = async () => {
      console.log(limit);
      console.log(pageNumber);

      const result = await axios.get(
        "http://localhost:5000" +
          // `api/users/allUser?page=${pageNumber}`
          `/api/users/allUser/${pageNumber}/${limit}`
      );
      console.log(result);

      // const result = await axios.get(`api/users/allUser`);
      // .then((response) =>

      // .then(({ totalpage, result }) => {

      setData(result.data.result);
      setNumberOfPages(result.data.totalpage);
      console.log(result.data.totalpage);
    };
    fetchData().catch(console.error);
  }, [Delete, updated, pageNumber, limit, successDelete]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetch("/api/users/allUser");
  //     const jsonResult = await result.json();
  //     setData(jsonResult);
  //   };
  //   fetchData().catch(console.error);
  // }, [updated, Delete]);
  const handlerfilter = async (isActif) => {
    return await axios
      .get("http://localhost:5000" + `/api/users/getOnUsersIs/${isActif}`)
      .then((response) => {
        setData(response.data);
        // setNumberOfPages(3);

        // setDelete(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = async () => {
    console.log(RowData._id);
    console.log(RowData.isActif);
    const Credentials = {
      name: RowData.name,
      email: RowData.email,
      roles: RowData.roles,
      isActif: RowData.isActif,
    };
    try {
      const response = await axios.put(
        "http://localhost:5000" + `/api/users/${RowData._id}`,
        Credentials
      );

      console.log(response);
      // const result = response.data;
      setUpdated(!updated);
      SetEditShow(false);
      console.log(RowData.isActif);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {
    const url = "http://localhost:5000" + `/api/users/${id}`;
    axios
      .delete(url)
      .then((response) => {
        setDelete(true);
        //        const result = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    hanldeDeleteClose();
  };

  return (
    <div>
      <h1> listes des utilisateurs </h1>
      <div className="row">
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

        <div className="table-responsive">
          <Table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>roles</th>
                <th>etat</th>
                <th> action</th>
              </tr>
            </thead>
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            {loadingDelete && <Loading />}

            <tbody>
              {Data.filter(
                (filteredNote) =>
                  filteredNote.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  filteredNote.roles
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  filteredNote.email
                    .toLowerCase()
                    .includes(search.toLowerCase())
              ).map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.roles}</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        type={"checkbox"}
                        checked={item.isActif}
                        readOnly
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckChecked"
                      >
                        actif
                      </label>
                    </div>
                  </td>
                  <td style={{ minWidth: 190 }}>
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => {
                        SetRowData(item);

                        handleEditShow();
                      }}
                    >
                      edit
                    </Button>
                    |
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        SetRowData(item);
                        setId(item._id);
                        handleDeleteShow();
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Array.from(Array(page), (item, index) => {
              return (
                <Button
                  key={item}
                  value={index}
                  onClick={(e) => setcurrentPage(Number(e.target.value))}
                >
                  {index}
                </Button>
              );
            })} */}
          {/* </div> */}
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
        <div className="center">
          <h5>filter by :</h5>
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="secondary"
              onClick={() => handlerfilter(true)}
              style={{ marginLeft: "2px" }}
            >
              active
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlerfilter(false)}
              style={{ marginLeft: "2px" }}
            >
              decactive
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="model-box-view">
        <Modal
          show={ViewEdit}
          onHide={hanldeEditClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    SetRowData({ ...RowData, name: e.target.value })
                  }
                  placeholder="Please enter Name"
                  defaultValue={RowData.name}
                />
              </div>
              <div className="form-group mt-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) =>
                    SetRowData({ ...RowData, email: e.target.value })
                  }
                  placeholder="Please enter email"
                  defaultValue={RowData.email}
                />
              </div>
              <div className="form-group mt-3">
                <label>roles</label>
                <select
                  defaultValue={RowData.roles}
                  onChange={(e) =>
                    SetRowData({ ...RowData, roles: e.target.value })
                  }
                >
                  <option>user</option>
                  <option>admin</option>
                  <option>superuser</option>
                </select>
              </div>
              <div className="form-group mt-3">
                <label>isActif</label>
                <input
                  type="checkbox"
                  className="form-control"
                  defaultChecked={RowData.isActif}
                  onChange={(e) => {
                    SetRowData({ ...RowData, isActif: !RowData.isActif });
                    console.log(RowData.isActif);
                    console.log(e.target);
                  }}

                  // SetRowData({ ...RowData, isActif: e.target.value })
                  // )

                  // }
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              className="btn btn-warning mt-4"
              onClick={handleEdit}
            >
              save
            </Button>
            <Button variant="secondary" onClick={hanldeEditClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="model-box-view">
        <Modal
          show={ViewDelete}
          onHide={hanldeDeleteClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>View user Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={RowData.name}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="email"
                  className="form-control"
                  value={RowData.email}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  value={RowData.roles}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="checkbox"
                  className="form-control"
                  value={RowData.isActif}
                  readOnly
                />
              </div>

              <Button
                type="submit"
                className="btn btn-danger mt-4"
                onClick={handleDelete}
              >
                Delete user
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hanldeDeleteClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Gestion_U;
