import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utills";
import Loader from "../Components/Loader";
import axios from "axios";
import { toast } from "react-toastify";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  ///generate image
  const generateImage = async () => {
    if (form.prompt) {
      setGeneratingImg(true);
      try {
        const response = await axios.post(
          "https://open-ai-g8rf.onrender.com/api/v1/dalle",
          { prompt: form.prompt }
        );
        const data = response;
        console.log(data);
        setForm({
          ...form,
          photo: `data:image/jpeg;base64,${data?.data.photo}`,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      toast.error("plz enter Prompt");
    }
  };

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://open-ai-g8rf.onrender.com/api/v1/post",
          {
            name: form.name,
            prompt: form.prompt,
            photo: form.photo,
          }
        );

        navigate("/");
        toast.success("Post Save Successfully :)");
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please enter a prompt and generate an image");
    }
  };

  //form inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //utillfunction
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="creates">
      <div className="">
        <h1>Create</h1>
        <p>
          Create imaginative and visually stunning images through DALL-E AI and
          share them with the community
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <div>
            <label>Prompt</label>

            <button
              type="button"
              onClick={handleSurpriseMe}
              style={{
                fontWeight: "500",
                background: "#ECECF1",
                padding: "0.4rem",
                borderRadius: "3px",
                color: "black",
                border: "none",
                marginLeft: "1rem",
              }}
            >
              Surprise Me
            </button>
          </div>
          <br></br>
          <input
            type="text"
            name="prompt"
            placeholder="Enter Your Prompt Value"
            value={form.prompt}
            onChange={handleChange}
          />
        </div>
        <div className="relative">
          {form.photo ? (
            <img
              src={form.photo}
              alt={form.prompt}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : (
            <img
              src={preview}
              alt="preview"
              style={{
                width: "7rem",
                height: "7rem",
                objectFit: "contain",
                opacity: "50%",
              }}
            />
          )}
          {generatingImg && (
            <div className="gen">
              <Loader />
            </div>
          )}
        </div>
        <div className="btns">
          <button className="gbtn" type="button" onClick={generateImage}>
            {generatingImg ? "Generating...." : "Generate"}
          </button>
        </div>
        <div className="" style={{ marginTop: "1rem" }}>
          <p style={{ marginTop: "1rem", color: "#666e75", fontSize: "14px" }}>
            Once you have created the image you want, you can share it with
            others in the Community
          </p>
          <button type="submit" className="btn2">
            {loading ? "Sharing...." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
