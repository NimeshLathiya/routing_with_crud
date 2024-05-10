import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
import { Button, Modal } from "react-bootstrap";

const Home = () => {
  const [newUser, setNewUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const itemPerPage = 5;

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:5174/people");
      // console.log(result);
      setNewUser(result.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemPerPage;
  const paginatedUsers = newUser.slice(offset, offset + itemPerPage);

  useEffect(() => {
    // apiData();
    loadUsers();
  }, []);

  const handleView = async (
    id,
    name,
    username,
    phone,
    website,
    email,
    ageGroup,
    gender,
    selectCity,
    userImage,
    index
  ) => {
    try {
      console.log("userData.data");
      console.log("id", id);
      console.log("name", name);
      console.log("username", username);
      console.log("phone", phone);
      console.log("website", website);
      console.log("email", email);
      console.log("ageGroup", ageGroup);
      console.log("gender", gender);
      console.log("selectCity", selectCity);
      console.log("userImage", userImage);
      console.log("index", index);

      localStorage.setItem("id", id);
      localStorage.setItem("name", name);
      localStorage.setItem("username", username);
      localStorage.setItem("phone", phone);
      localStorage.setItem("website", website);
      localStorage.setItem("email", email);
      localStorage.setItem("ageGroup", ageGroup);
      localStorage.setItem("gender", gender);
      localStorage.setItem("selectCity", selectCity);
      localStorage.setItem("userImage", userImage);
      localStorage.setItem("index", index);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEdit = (
    id,
    name,
    username,
    phone,
    website,
    email,
    ageGroup,
    gender,
    selectCity,
    userImage
  ) => {
    console.log("id", id);
    console.log("name", name);
    console.log("username", username);
    console.log("phone", phone);
    console.log("website", website);
    console.log("email", email);
    console.log("ageGroup", ageGroup);
    console.log("gender", gender);
    console.log("selectCity", selectCity);
    console.log("userImage", userImage);

    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("username", username);
    localStorage.setItem("phone", phone);
    localStorage.setItem("website", website);
    localStorage.setItem("email", email);
    localStorage.setItem("ageGroup", ageGroup);
    localStorage.setItem("gender", gender);
    localStorage.setItem("selectCity", selectCity);
    localStorage.setItem("userImage", userImage);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5174/people/${userId}`);
      setNewUser(newUser.filter((user) => user.id !== userId));
      handleCloseModal();
      toast.error("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteUserId(null);
  };

  const handleShowModal = (userId) => {
    setShowModal(true);
    setDeleteUserId(userId);
  };

  // const handleDelete = async (idx) => {
  //   setShow(true);
  //   console.log("idx___________", idx);
  //   // prompt("are you sure you want to delete this user");
  //   await axios.delete(`http://localhost:5174/people/${idx}`);
  //   // toast.error("User Delete successfully!");
  //   setShow(false);
  // };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-danger-subtle mx-4 rounded my-3">
          Are You Sure you want to delete this user ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleDelete(deleteUserId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container">
        <h3 className="py-4 homes">Home</h3>
        <div>
          <table className="table shadow rounded">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      className="btn btn-outline-primary"
                      onClick={() =>
                        handleView(
                          user.id,
                          user.name,
                          user.username,
                          user.phone,
                          user.website,
                          user.email,
                          user.ageGroup,
                          user.gender,
                          user.selectCity,
                          user.userImage,
                          index + 1
                        )
                      }
                      to={"/view"}
                    >
                      view
                    </Link>
                    <Link
                      className="btn btn-outline-secondary ms-2"
                      to={"/edituser"}
                      onClick={() =>
                        handleEdit(
                          user.id,
                          user.name,
                          user.username,
                          user.phone,
                          user.website,
                          user.email,
                          user.ageGroup,
                          user.gender,
                          user.selectCity,
                          user.userImage
                        )
                      }
                    >
                      Edit
                    </Link>
                    <Link
                      className="btn btn-outline-danger ms-2"
                      onClick={() => handleShowModal(user.id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center align-items-center mt-5">
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={Math.ceil(newUser.length / itemPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
