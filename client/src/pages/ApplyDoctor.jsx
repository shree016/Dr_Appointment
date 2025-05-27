import React, { useState } from "react";
import "../styles/contact.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const ApplyDoctor = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    specialization: "",
    experience: "",
    fees: "",
    pic2: "", // will store certificate URL here
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onUpload = async (element) => {
    setLoading(true);
    if (element.type === "image/jpeg" || element.type === "image/png") {
      const data = new FormData();
      data.append("file", element);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);

      try {
        const res = await fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
          method: "POST",
          body: data,
        });
        const result = await res.json();
        setFile(result.url.toString());
        setFormDetails((prev) => ({ ...prev, pic2: result.url.toString() }));
      } catch (err) {
        toast.error("Failed to upload image");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error("Please select an image in jpeg or png format");
    }
  };

  const btnClick = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formDetails,
        pic2: file || formDetails.pic2, // Use the file URL if available
      };

      await toast.promise(
        axios.post(
          "/doctor/applyfordoctor",
          { formDetails: payload },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Doctor application sent successfully",
          error: "Unable to send Doctor application",
          loading: "Sending doctor application...",
        }
      );

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <section className="register-section flex-center apply-doctor" id="contact">
        <div className="register-container flex-center contact">
          <h2 className="form-heading">Apply for Doctor</h2>
          <form className="register-form">
            <input
              type="text"
              name="specialization"
              className="form-input"
              placeholder="Enter your specialization"
              value={formDetails.specialization}
              onChange={inputChange}
            />
            <input
              type="number"
              name="experience"
              className="form-input"
              placeholder="Enter your experience (in years)"
              value={formDetails.experience}
              onChange={inputChange}
            />
            <input
              type="number"
              name="fees"
              className="form-input"
              placeholder="Enter your fees (in dollars)"
              value={formDetails.fees}
              onChange={inputChange}
            />

            <div className="text-gray-600 text-sm mt-2 mb-1">
              Submit your Medical Registration Certificate
            </div>

          
            <input
              type="file"
              id="profile-pic"
              name="profile-pic"
              onChange={(e) => onUpload(e.target.files[0])}
              className="hidden"
            />

            {file && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-1">Preview:</p>
                <img
                  src={file}
                  alt="Uploaded Certificate"
                  width="200"
                  className="rounded shadow"
                />
              </div>
            )}

            <button
              type="submit"
              className="btn form-btn mt-4"
              onClick={btnClick}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Apply"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyDoctor;
