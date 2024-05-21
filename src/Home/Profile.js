import { v4 as uuidv4 } from "uuid";
import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";

export default function Profile() {
  const [showCard, setShowCard] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(true);
  const [workInfo, setWorkInfo] = useState(false);
  const [showEditProfile, setshowEditProfile] = useState(false);

  const [dispatchValues, setDispatchValues] = useState([]);
  useEffect(() => {
    if (dispatchValues.length === 0) return;
    localStorage.setItem("dispatchValues", JSON.stringify(dispatchValues));
  }, [dispatchValues]);

  useEffect(() => {
    let dispatchValues = JSON.parse(localStorage.getItem("dispatchValues"));
    setDispatchValues(dispatchValues);
  }, []);

  const dispatchFormSubmit = (
    fullName,
    email,
    gender,
    contact,
    location,
    profession,
    companyUrl,
    companyLocation,
    myBio,
    achievement,
    mediaLink,
    mediaName,
    service
  ) => {
    setDispatchValues([
      {
        id: uuidv4(),
        fullName: fullName,
        email: email,
        gender: gender,
        contact: contact,
        location: location,
        profession: profession,
        companyUrl: companyUrl,
        companyLocation: companyLocation,
        myBio: myBio,
        achievement: achievement,
        mediaLink: mediaLink,
        mediaName: mediaName,
        service: service,
      },
    ]);
  };

  return (
    <section className=" w-full h-full flex">
      <aside className="w-1/5 text-wrap flex flex-col items-center justify-between h-full p-2 relative">
        <h2 className="h-auto flex items-center justify-between p-2 border-b-2 border-orange-500 w-full">
          <strong className=" text-xl">My Profile</strong>
        </h2>
        <ul className=" w-full p-1 flex flex-col items-center justify-center relative">
          <li className=" w-full flex flex-col gap-2 items-center justify-center mt-10">
            <img
              src="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="your photos"
              className=" w-32 h-32 rounded-full flex items-center justify-center"
            />
            {dispatchValues.map((Data) => {
              return (
                <h3 className=" text-2xl font-bold text-gray-600 ">
                  {Data.fullName}
                </h3>
              );
            })}

            {dispatchValues.map((Data) => {
              return (
                <p className="flex items-center gap-2 text-lg font-medium text-gray-400 ">
                  <FaLocationDot /> {Data.location}
                </p>
              );
            })}
            <div className=" w-full flex items-center justify-center mt-4">
              <button
                className="activeElement flex items-center justify-center gap-1 w-3/4 rounded-full bg-orange-500 text-white p-2 h-10 font-semibold text-nowrap"
                onClick={() => {
                  setshowEditProfile(!showEditProfile);
                }}>
                <AiOutlineEdit /> Edit Profile
              </button>
            </div>
          </li>
        </ul>
        <section
          className={`w-full h-auto flex items-center justify-center + profile-styles ${
            showEditProfile ? "show--frame" : ""
          }`}>
          {showEditProfile && (
            <ProfileUpdate
              setshowEditProfile={setshowEditProfile}
              dispatchFormSubmit={dispatchFormSubmit}
              showEditProfile={showEditProfile}
            />
          )}
        </section>
        <div className="w-full h-auto flex items-center justify-center">
          <NavLink
            to={"/Login"}
            className={`w-1/2 flex items-center justify-center gap-2 p-2 rounded-xl border shadow-lg text-orange-500 font-bold`}>
            <FiLogOut /> Logout
          </NavLink>
        </div>
      </aside>
      <section className="flex-1 h-full relative">
        <div className="w-full h-1/6 bg-teal-950 text-white mt-1 flex items-center justify-center">
          {dispatchValues.map((Data) => {
            return <strong className=" text-3xl">{Data.fullName}</strong>;
          })}
        </div>
        <div className="w-full h-upHgt flex">
          <ul className="w-1/4 h-full p-2 flex flex-col items-start justify-around border-l border-r border-teal-950 relative">
            <li className=" w-full flex flex-col gap-2 items-center justify-center">
              {personalInfo && (
                <h3 className="w-full flex items-center justify-between p-2 border-b border-orange-500 font-bold text-gray-600 ">
                  <img
                    src="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="your photos"
                    className=" w-8 h-8 rounded-full flex items-center justify-center"
                  />
                  Personal Infomation
                </h3>
              )}
              {workInfo && (
                <h3 className="w-full flex items-center justify-between p-2 border-b border-orange-500 font-bold text-gray-600  ">
                  <img
                    src="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Career photos"
                    className=" w-8 h-8 rounded-full flex items-center justify-center"
                  />
                  Professional Infomation
                </h3>
              )}
            </li>
            <li className=" w-full h-auto flex flex-col gap-2 mt-4">
              <p className=" flex items-center justify-start p-2 border-b-2 border-orange-500 w-full">
                Contact Card
              </p>
              {dispatchValues.map((Data) => {
                return (
                  <ol className=" w-full flex-col gap-2 items-start justify-center border-orange-500 border-b font-medium">
                    <li className=" w-full p-2 flex items-center justify-start gap-2 my-1">
                      Full Name: <span>{Data.fullName}</span>
                    </li>
                    <li className=" w-full p-2 flex items-center justify-start gap-2 my-1">
                      Email: <span>{Data.email}</span>
                    </li>

                    <li className=" w-full p-2 flex items-center justify-start gap-2 my-1">
                      Contact: <span>{Data.contact}</span>
                    </li>
                    <li className=" w-full p-2 flex items-center justify-start gap-2 my-1">
                      Location: <span>{Data.location}</span>
                    </li>
                    <li className=" w-full p-2 flex items-center justify-start gap-2 my-1">
                      Professional Service:
                      <span className=" w-max max-h-20 text-balance overflow-auto">
                        {Data.service}
                      </span>
                    </li>
                    <li className=" w-full p-2 flex items-center justify-start gap-2 my-1">
                      <span>{Data.mediaName}, </span>
                      <a
                        href={`http:// ${Data.mediaLink}`}
                        className=" text-blue-600 hover:underline">
                        visit page
                      </a>
                    </li>
                  </ol>
                );
              })}
            </li>
            {/* card sharing component */}
            {showCard && (
              <li className=" w-full h-auto absolute bottom-36 flex items-center justify-center">
                {dispatchValues.map((Data) => {
                  return (
                    <ol
                      className={`w-11/12 flex-col items-start justify-center bg-teal-50 footer--shadow text-gray-600 rounded font-medium ${
                        showCard ? "show--frame" : ""
                      }`}>
                      <li className=" w-full flex flex-col gap-2 items-center justify-center mt-10">
                        <img
                          src="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="your photos"
                          className=" w-32 h-32 rounded-full flex items-center justify-center"
                        />
                        <span>Follow me: {Data.mediaName} </span>
                        <a
                          href={`http:// ${Data.mediaLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=" text-blue-600 hover:underline">
                          <strong>View Profile</strong>
                        </a>
                      </li>
                      <li className=" w-full p-2 flex items-center justify-start gap-2 my-1">
                        Full Name: <span>{Data.fullName}</span>
                      </li>
                      <li className=" w-full p-2 flex items-center justify-start gap-2 my-1">
                        Email: <span>{Data.email}</span>
                      </li>

                      <li className=" w-full p-2 flex items-center justify-start gap-2 my-1">
                        Contact: <span>{Data.contact}</span>
                      </li>
                      <li className=" w-full p-2 flex items-center justify-start gap-2 my-1">
                        Location: <span>{Data.location}</span>
                      </li>
                      <li className=" w-full p-2 flex items-center justify-start gap-2 mt-1">
                        Service:
                        <span className=" w-max max-h-20 text-balance overflow-auto">
                          {Data.service}
                        </span>
                      </li>
                    </ol>
                  );
                })}
              </li>
            )}
            {showCard && (
              <li className=" w-full h-auto absolute bottom-24 flex items-center justify-center rounded">
                <ol
                  className={`w-11/12 h-11 flex items-center justify-center bg-teal-50 footer--shadow text-gray-600 rounded font-medium ${
                    showCard ? "show--frame" : ""
                  }`}>
                  <li className=" w-full flex gap-2 items-center justify-start px-2">
                    share via:
                    <span className=" flex-1 p-1 flex items-center justify-center gap-2">
                      <a
                        href="mailto:christophereshun91@gmail"
                        className=" p-2 rounded font-bold text-gray-500 text-2xl">
                        <MdEmail />
                      </a>
                      <a
                        href="http://linkedin.com/in/christophereshun"
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" p-2 rounded font-bold text-blue-500 text-xl">
                        <BsLinkedin />
                      </a>
                      <a
                        href="http://facebook.com/christophereshun"
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" p-2 rounded font-bold text-blue-500 text-2xl">
                        <FaFacebook />
                      </a>
                      <a
                        href="tel:+233277534309"
                        className=" p-2 rounded font-bold text-green-500 text-2xl">
                        <IoLogoWhatsapp />
                      </a>
                    </span>
                  </li>
                </ol>
              </li>
            )}
            <li
              className={`w-full flex items-center justify-center ${
                showCard ? "mt-12" : ""
              }`}
              style={{ transition: "300ms ease-in-out" }}>
              <button
                className={`activeElement flex items-center justify-center gap-1 w-3/4 rounded-xl bg-teal-950 text-white p-2 h-12 font-semibold text-nowrap`}
                onClick={() => {
                  setShowCard(!showCard);
                }}>
                <AiOutlineEdit /> Share Profile
              </button>
            </li>
          </ul>
          <div className="w-3/4 h-full flex-col">
            <header className=" w-full h-14 flex flex-row items-center justify-center gap-4 bg-black">
              <button
                type="button"
                className={`w-1/4 h-11 rounded border border-gray-600 shadow-2xl font-semibold activeElement ${
                  personalInfo ? " bg-gray-100 text-black" : " text-white "
                }`}
                onClick={() => {
                  setPersonalInfo(true);
                  setWorkInfo(false);
                }}>
                Personal Information
              </button>
              <button
                type="button"
                className={`w-1/4 h-11 rounded border border-gray-600 shadow-2xl font-semibold activeElement ${
                  workInfo ? " bg-gray-100 text-black" : " text-white "
                }`}
                onClick={() => {
                  setWorkInfo(true);
                  setPersonalInfo(false);
                }}>
                Professional Information
              </button>
            </header>
            <section className=" w-full h-Hgt ">
              {personalInfo && (
                <section className="flex w-full h-full bg-gray-100 text-black">
                  {dispatchValues.map((Data) => {
                    return (
                      <ul className="w-3/4 h-full p-1">
                        <li className=" w-full flex items-center justify-start gap-10 my-2 p-2">
                          <p>
                            <strong>Full Name</strong>: {Data.fullName}
                          </p>
                          <p>
                            <strong>Gender</strong>: {Data.gender}
                          </p>
                        </li>
                        <li className=" w-full flex items-center justify-start my-2 p-2">
                          <p>
                            <strong>Email</strong>: {Data.email}
                          </p>
                        </li>
                        <li className=" w-full flex items-center justify-start gap-10 my-2 p-2">
                          <p>
                            <strong>Contact</strong>: {Data.contact}
                          </p>
                        </li>
                        <li className=" w-full flex items-center justify-start gap-10 my-2 p-2">
                          <p>
                            <strong>Location</strong>: {Data.location}
                          </p>
                        </li>
                        <li className=" w-full flex items-center justify-start gap-10 border-b border-orange-300 mt-4 mb-1 px-2">
                          <strong>Social Media Links</strong>
                        </li>

                        <li className=" w-full flex items-start justify-start gap-4 p-2">
                          <ol className="w-3/4 h-full p-1 text-gray-800">
                            <li className=" w-full flex items-center justify-start gap-2 ">
                              <span>{Data.mediaName}, </span>
                              <a
                                href={`http:// ${Data.mediaLink}`}
                                className=" text-blue-800 font-semibold hover:underline">
                                Visit page
                              </a>
                            </li>
                          </ol>
                        </li>
                      </ul>
                    );
                  })}
                  <div className="w-cwdt h-full p-1 border-l ">
                    <strong className=" block w-full my-2 text-left">
                      My Bio
                    </strong>
                    {dispatchValues.map((Data) => {
                      return (
                        <p className=" w-full p-2 block text-balance">
                          {Data.myBio}
                        </p>
                      );
                    })}
                  </div>
                </section>
              )}
              {workInfo && (
                <section className="flex w-full h-full bg-gray-100 text-black">
                  {dispatchValues.map((Data) => {
                    return (
                      <ul className="w-3/4 h-full p-1">
                        <li className=" w-full flex items-center justify-start gap-10 my-2 p-2">
                          <p>
                            <strong>Company Name</strong> : {Data.profession}
                          </p>
                        </li>
                        <li className=" w-full flex items-center justify-start my-2 p-2">
                          <p>
                            <strong>Website: </strong>
                            <a href={`http://${Data.companyUrl}`}>
                              <strong className=" text-blue-800 font-semibold hover:underline">
                                Go to page
                              </strong>
                            </a>
                          </p>
                        </li>

                        <li className=" w-full flex items-center justify-start gap-10 my-2 p-2">
                          <p>
                            <strong>Location</strong> : {Data.companyLocation}
                          </p>
                        </li>
                      </ul>
                    );
                  })}
                  <div className="w-cwdt h-full p-1 border-l ">
                    <strong className=" block w-full my-2 text-left">
                      Achievemnts & Recommendations
                    </strong>
                    {dispatchValues.map((Data) => {
                      return (
                        <p className=" w-full p-2 block text-balance">
                          {Data.myProf}
                        </p>
                      );
                    })}
                  </div>
                </section>
              )}
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}

function ProfileUpdate(props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [mediaLink, setMediaLink] = useState("");
  const [mediaName, setMediaName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [myBio, setMyBio] = useState("");
  const [achievement, setAchievement] = useState("");
  const [service, setService] = useState("");
  const [showBasic, setShowBasic] = useState(true);

  const constsubmitForm = (e) => {
    e.preventDefault();
    props.setshowEditProfile(false);
    props.dispatchFormSubmit(
      fullName,
      email,
      gender,
      contact,
      location,
      profession,
      companyUrl,
      companyLocation,
      myBio,
      achievement,
      mediaLink,
      mediaName,
      service
    );
    setFullName("");
    setEmail("");
    setGender("");
    setContact("");
    setLocation("");
    setProfession("");
    setCompanyUrl("");
    setCompanyLocation("");
    setMyBio("");
    setAchievement("");
    setMediaLink("");
    setMediaName("");
    setService("");
  };

  return (
    <form
      className="w-full flex flex-col justify-center items-center gap-2 bg-teal-50 p-1"
      onSubmit={constsubmitForm}>
      <span className="w-full items-center justify-start p-2 h-8">
        <strong
          className=" text-xl bg-orange-500 text-white w-7 h-7 flex items-center justify-center rounded-full"
          onClick={() => {
            props.setshowEditProfile(!props.showEditProfile);
          }}>
          <IoMdClose />
        </strong>
      </span>
      {showBasic && (
        <div className="w-full flex flex-col justify-center items-center p-1 text-black font-bold">
          <h1 className="text-2xl w-full text-center">Basic Infomation</h1>
          <hr />
          <div className=" flex w-full h-auto my-1 flex-col items-start text-gray-500">
            <label
              htmlFor="username"
              className="flex flex-row items-center gap-2 h-8 text-gray-800 capitalize">
              <FaUserTie />
              Full Name
            </label>
            <input
              type="text"
              name="username"
              id="Username"
              placeholder="Your Full Name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
          </div>
          <div className=" flex w-full h-auto my-1 items-center justify-center gap-10 text-gray-500 ">
            <span className=" flex items-center gap-2">
              <label
                htmlFor="gender"
                className="flex flex-row items-center gap-2 h-8 text-gray-800 capitalize">
                <FaUserTie />
                Male
              </label>
              <input
                type="radio"
                name="gender"
                id="Male"
                value={"Male"}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
            </span>
            <span className=" flex items-center gap-2">
              <label
                htmlFor="gender"
                className="flex flex-row items-center gap-2 h-8 text-gray-800 capitalize">
                <FaUserTie />
                Female
              </label>
              <input
                type="radio"
                name="gender"
                id="Female"
                value={"Female"}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
            </span>
          </div>
          <div className=" flex w-full h-auto my-1 flex-col items-start text-gray-500">
            <label
              htmlFor="usermail"
              className="flex flex-row items-center gap-2 h-8 text-gray-800 capitalize">
              <MdEmail />
              email
            </label>
            <input
              type="text"
              id="usermail"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
          </div>
          <div className=" flex w-full h-auto my-1 flex-col items-start text-gray-500">
            <label
              htmlFor="userContact"
              className="flex flex-row items-center gap-2 h-8 text-gray-800 capitalize">
              <BsTelephoneFill />
              Contact
            </label>
            <input
              type="tel"
              id="userContact"
              name="userContact"
              placeholder="Enter Contact"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
              }}
              className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
          </div>
          <div className=" flex w-full h-auto my-1 flex-col items-start text-gray-500">
            <label
              htmlFor="location"
              className="flex flex-row items-center gap-2 h-8 text-gray-800 capitalize">
              <FaLocationDot />
              location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
          </div>
          <div className=" flex w-full my-1 flex-col items-start text-gray-500">
            <label
              htmlFor="myBio"
              className="flex flex-row items-center gap-2 h-8 text-gray-800 capitalize">
              <GrContactInfo /> Brief Bio
            </label>
            <textarea
              name="myBio"
              id="myBio"
              cols="30"
              rows="6"
              value={myBio}
              onChange={(e) => {
                setMyBio(e.target.value);
              }}
              className=" focus:outline-none
                shadow-lg w-full border rounded-lg p-2 text-gray-400
                text-sm font-normal h-12"></textarea>
          </div>
          <div className=" flex w-full h-auto my-1 flex-col items-start text-gray-500">
            <label
              htmlFor="Social"
              className="flex flex-row items-center gap-2 h-8 text-gray-800 capitalize">
              <MdConnectWithoutContact />
              social media account
            </label>
            <div className=" flex items-center justify-start gap-2 w-full">
              <input
                type="text"
                id="Social"
                name="Social"
                placeholder="social media name"
                value={mediaName}
                onChange={(e) => {
                  setMediaName(e.target.value);
                }}
                className=" focus:outline-none shadow-lg flex-1 h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
              />
              <input
                type="url"
                id="Social"
                name="Social"
                placeholder="url link to profile page"
                value={mediaLink}
                onChange={(e) => {
                  setMediaLink(e.target.value);
                }}
                className=" focus:outline-none shadow-lg flex-1 h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
              />
            </div>
          </div>
        </div>
      )}
      {!showBasic && (
        <div className=" w-full flex flex-col justify-center items-center p-1 text-black font-bold">
          <h1 className="text-2xl w-full text-center">
            Professional Infomation
          </h1>
          <hr />
          <div className=" flex w-full h-auto my-1 flex-col items-start text-gray-500">
            <label
              htmlFor="pService"
              className="flex flex-row items-center gap-2 h-8 text-gray-800 capitalize">
              <FaUserTie />
              Professional Service
            </label>
            <input
              type="text"
              name="pService"
              id="pService"
              placeholder="Professional Service engaged"
              value={service}
              onChange={(e) => {
                setService(e.target.value);
              }}
              className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
          </div>
          <div className=" flex w-full h-auto my-1 flex-col items-start text-gray-500">
            <label
              htmlFor="Company"
              className="flex flex-row items-center gap-2 h-8 text-gray-800 capitalize">
              <FaUserTie />
              Company Name
            </label>
            <input
              type="text"
              name="Company"
              id="Company"
              placeholder="Enter Company Name"
              value={profession}
              onChange={(e) => {
                setProfession(e.target.value);
              }}
              className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
          </div>
          <div className=" flex w-full h-auto my-1 flex-col items-start text-gray-500">
            <label
              htmlFor="website"
              className="flex flex-row items-center gap-2 h-8 text-gray-800 capitalize">
              <MdEmail />
              Company Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              placeholder="e.g https://boskalis.com/about-us/dockwise"
              value={companyUrl}
              onChange={(e) => {
                setCompanyUrl(e.target.value);
              }}
              className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
          </div>
          <div className=" flex w-full h-auto my-1 flex-col items-start text-gray-500">
            <label
              htmlFor="location"
              className="flex flex-row items-center gap-2 h-8 text-gray-800 capitalize">
              <FaLocationDot />
              location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter location"
              value={companyLocation}
              onChange={(e) => {
                setCompanyLocation(e.target.value);
              }}
              className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
          </div>

          <div className=" flex w-full my-1 flex-col items-start text-gray-500">
            <label
              htmlFor="myProf"
              className="flex flex-row items-center gap-2 h-8 text-gray-800 capitalize">
              <GrContactInfo /> Achievements
            </label>
            <textarea
              name="myProf"
              id="myProf"
              value={achievement}
              onChange={(e) => {
                setAchievement(e.target.value);
              }}
              className=" focus:outline-none
                shadow-lg w-full border rounded-lg p-2 text-gray-400
                text-sm font-normal h-12"></textarea>
          </div>
          <div className=" flex w-full h-12 items-center justify-center gap-2 mt-4">
            <button
              type="submit"
              className="w-1/4 h-full shadow-xl  border rounded-full activeElement">
              Submit
            </button>
            <button
              type="button"
              className="w-1/4 h-full shadow-xl  border rounded-full activeElement"
              onClick={() => {
                props.setshowEditProfile(false);
              }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-2 w-full h-12 px-1">
        <button
          type="button"
          className="h-full w-1/2 bg-green-700 rounded-full  text-white activeElement"
          onClick={() => {
            setShowBasic(true);
          }}>
          Back
        </button>
        <button
          type="button"
          className=" h-full w-1/2 bg-green-700 rounded-full  text-white activeElement"
          onClick={() => {
            setShowBasic(false);
          }}>
          Next
        </button>
      </div>
    </form>
  );
}
