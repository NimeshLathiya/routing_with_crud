import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditUser = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [id, setId] = useState(0);
  const [userImage, setUserImage] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");

  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const saveChanges = async (e) => {
    // e.preventDefault();
    console.log("e", e);
    console.log("id", id);
    // alert("hello");
    try {
      await axios.put(`http://localhost:5174/people/${id}`, {
        id: id,
        name: name,
        username: username,
        email: email,
        phone: phone,
        website: website,
        ageGroup: ageGroup,
        gender: gender,
        selectCity: selectCity,
        userImage: userImage,
      });
      reset(); // Reset form after successful submission
      toast.success("User Edit successfully!");
      setTimeout(() => {
        nav("/");
      }, 5000);
    } catch (error) {
      console.error("Error editing user:", error);
      toast.error("Failed to Edit user.");
    }
  };

  const handleFileChange = (e) => {
    console.log("FileSelected______");
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result); // Convert image object to Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setUserName(localStorage.getItem("username"));
    setEmail(localStorage.getItem("email"));
    setPhone(localStorage.getItem("phone"));
    setWebsite(localStorage.getItem("website"));
    setAgeGroup(localStorage.getItem("ageGroup"));
    setGender(localStorage.getItem("gender"));
    setSelectCity(localStorage.getItem("selectCity"));
    setUserImage(localStorage.getItem("userImage"));
  }, []);

  return (
    <>
      <div className="container pt-5">
        <div className="d-flex justify-content-around ">
          <h2>Edit user</h2>
          <Link className="btn btn-outline-secondary fw-semibold " to={"/"}>
            Back to Home
          </Link>
        </div>
        <div className="container pt-5">
          <div className="w-75 mx-auto shadow ">
            <h3 className="text-center pt-4 mb-4 ">Edit User {name}</h3>
            <div className="px-5 pb-4">
              <form onSubmit={handleSubmit(saveChanges)}>
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control form-control-lg mb-3 px-4 required ${
                      errors && errors.name ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Your Name"
                    name="name"
                    {...register("name", {
                      required: "name is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/i,
                        message: "Please enter only alphabetical characters",
                      },
                    })}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <p className="text-danger ms-2 fs-6 fw-semibold">
                    {errors.name?.message}
                  </p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control form-control-lg mb-3 px-4 ${
                      errors && errors.username ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Your Username"
                    name="Username"
                    {...register("username", {
                      required: "username is required",
                      pattern: {
                        value: /^[A-Za-z0-9]+$/,
                        message:
                          "Please enter a valid username containing letters & numbers",
                      },
                    })}
                    onChange={(e) => setUserName(e.target.value)}
                    value={username}
                  />

                  <p className="text-danger ms-2 fs-6 fw-semibold">
                    {errors.username?.message}
                  </p>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={`form-control form-control-lg mb-3 px-4 ${
                      errors && errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Your E-Mail Address"
                    name="email"
                    {...register("email", {
                      required: "email is required",
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />

                  <p className="text-danger ms-2 fs-6 fw-semibold">
                    {errors.email?.message}
                  </p>
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    className={`form-control form-control-lg mb-3 px-4 ${
                      errors && errors.phone ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Your Phone Number"
                    name="phone"
                    {...register("phone", {
                      required: "phone number is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />

                  <p className="text-danger ms-2 fs-6 fw-semibold">
                    {errors.phone?.message}
                  </p>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control form-control-lg mb-3 px-4 ${
                      errors && errors.website ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Your Website Name"
                    name="website"
                    {...register("website", {
                      required: "website name is required",
                      pattern: {
                        value: /^(ftp|http|https):\/\/[^ "]+$/,
                        message: "Please enter a valid website URL",
                      },
                    })}
                    onChange={(e) => setWebsite(e.target.value)}
                    value={website}
                  />

                  <p className="text-danger ms-2 fs-6 fw-semibold">
                    {errors.website?.message}
                  </p>
                </div>

                <div className="form-check form-check-inline mt-2 mb-3">
                  <input
                    className={`form-check-input`}
                    type="checkbox"
                    id="inlineCheckbox1"
                    value={"Male"}
                    {...register("gender", {
                      required: "gender is required",
                      pattern: {
                        message: "Please select a Gender",
                      },
                    })}
                    onChange={(e) =>
                      setGender(e.target.checked ? e.target.value : "")
                    }
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">
                    Male
                  </label>
                  {/* <p className="text-danger ms-2 fs-6 fw-semibold">
                  {errors.gender?.message}
                </p> */}
                </div>
                <div className="form-check form-check-inline mt-2 mb-3">
                  <input
                    className={`form-check-input ${
                      errors && errors.gender ? "is-invalid" : ""
                    }`}
                    type="checkbox"
                    id="inlineCheckbox2"
                    value={"FeMale"}
                    // // required
                    {...register("gender", {
                      required: "gender is required",
                      pattern: {
                        message: "Please select a Gender",
                      },
                    })}
                    onChange={(e) =>
                      setGender(e.target.checked ? e.target.value : "")
                    }
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">
                    Female
                  </label>
                </div>
                <p className="text-danger ms-2 fs-6 fw-semibold">
                  {errors.gender?.message}
                </p>

                <div className="d-flex mb-3">
                  <div className="form-check">
                    <input
                      className={`form-check-input ${
                        errors && errors.ageGroup ? "is-invalid" : ""
                      }`}
                      type="radio"
                      name="ageGroup"
                      id="exampleRadios1"
                      // required
                      {...register("ageGroup", {
                        required: "age is required",
                        pattern: {
                          message: "Please select a Age",
                        },
                      })}
                      value={"Under 18"}
                      onChange={(e) =>
                        setAgeGroup(e.target.checked ? e.target.value : "")
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      age Under 18
                    </label>
                  </div>
                  <div className="form-check ms-3 ">
                    <input
                      className={`form-check-input ${
                        errors && errors.ageGroup ? "is-invalid" : ""
                      }`}
                      type="radio"
                      name="exampleRadios"
                      id="ageGroup"
                      value={"Above 18"}
                      // required
                      {...register("ageGroup", {
                        required: "age is required",
                        pattern: {
                          message: "Please select a Age",
                        },
                      })}
                      onChange={(e) =>
                        setAgeGroup(e.target.checked ? e.target.value : "")
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                    >
                      age Above 18
                    </label>
                  </div>
                </div>
                <p className="text-danger ms-2 fs-6 fw-semibold">
                  {errors.ageGroup?.message}
                </p>
                <div className="input-group mb-3">
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupFile01"
                  >
                    User Image
                  </label>
                  <input
                    type="file"
                    className={`form-control ${
                      errors && errors.userImage ? "is-invalid" : ""
                    }`}
                    id="inputGroupFile01"
                    // value={userImage}
                    // value={userImage || ""}
                    // required
                    {...register("userImage", {
                      required: "please select a profile picture",
                      pattern: {
                        message: "Please select a picture",
                      },
                    })}
                    // onChange={(e) => setUserImage(e.target.files[0])}

                    onChange={handleFileChange}
                  />
                </div>
                <p className="text-danger ms-2 fs-6 fw-semibold">
                  {errors.userImage?.message}
                </p>

                <div className="mb-3">
                  <select
                    className={`form-select `}
                    aria-label="Default select example"
                    value={selectCity}
                    // required
                    {...register("selectCity", {
                      required: "please select a city",
                      pattern: {
                        message: "Please select a city",
                      },
                    })}
                    onChange={(e) => setSelectCity(e.target.value)}
                  >
                    <option value="">select City</option>
                    <option value="Udaipur">Udaipur</option>
                    <option value="Manali">Manali</option>
                    <option value="Abu">Abu</option>
                  </select>
                </div>

                <p className="text-danger ms-2 fs-6 fw-semibold">
                  {errors.selectCity?.message}
                </p>

                <button
                  className="btn text-center w-100  mb-3 px-4  btn-primary"
                  // onClick={saveChanges}
                  type="submit"
                >
                  Save Changes
                </button>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
