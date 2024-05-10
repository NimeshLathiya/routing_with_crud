import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [userImage, setUserImage] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [index, setIndex] = useState("");

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setUserName(localStorage.getItem("username"));
    setEmail(localStorage.getItem("email"));
    setPhone(localStorage.getItem("phone"));
    setWebsite(localStorage.getItem("website"));
    setUserImage(localStorage.getItem("userImage"));
    setSelectCity(localStorage.getItem("selectCity"));
    setGender(localStorage.getItem("gender"));
    setAgeGroup(localStorage.getItem("ageGroup"));
    setIndex(localStorage.getItem("index"));
  }, []);

  return (
    <>
      <div className="container">
        <Link className="btn btn-outline-primary mt-5 mb-3 " to={"/"}>
          back to home 🏡
        </Link>
        <div className=" mt-1 d-flex align-align-items-center flex-column ">
          <li className="list-unstyled fs-1 fw-lighter">
            Users Id:{" "}
            <strong>
              {" "}
              <b> {index} </b>
            </strong>
          </li>
          <li className="list-unstyled list-group-item fw-lighter fs-1">
            User Image :
            <b>
              {userImage ? (
                <img
                  src={userImage}
                  className="ms-5 rounded-4"
                  alt="userImage"
                  height={200}
                  width="auto"
                />
              ) : (
                "userImage not Define"
              )}
            </b>
          </li>

          <hr />
          <div className="mt-4 mb-5">
            <div>
              <ul className="list-group ">
                <li className="list-unstyled list-group-item fs-4 ">
                  Name : <b> {name ? name : ""} </b>
                </li>
                <li className="list-unstyled list-group-item fs-4 ">
                  User name : <b>{username ? username : ""}</b>
                </li>
                <li className="list-unstyled list-group-item fs-4 ">
                  Phone : <b> {phone ? phone : ""}</b>
                </li>
                <li className="list-unstyled list-group-item fs-4 overflow-y-scroll">
                  Website : <b> {website ? website : ""}</b>
                </li>
                <li className="list-unstyled list-group-item fs-4 ">
                  Email : <b> {email ? email : ""}</b>
                </li>
                <li className="list-unstyled list-group-item fs-4 ">
                  City : <b> {selectCity ? selectCity : ""}</b>
                </li>
                <li className="list-unstyled list-group-item fs-4 ">
                  Gender : <b> {gender ? gender : ""}</b>
                </li>
                <li className="list-unstyled list-group-item fs-4 ">
                  Age : <b> {ageGroup ? ageGroup : ""}</b>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
