import React, { useEffect } from "react";
import { useState } from "react";
import FormField from "../Components/FormField";
import Loader from "../Components/Loader";
import axios from "axios";
import Card from "../Components/Card";

const Home = () => {
  ///createing states

  const [loading, setLoading] = useState(false);
  const [allPosts, SetAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSerachedResults] = useState(null);
  const [serachTimeOut, setSearchTimeOut] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://open-ai-g8rf.onrender.comy/api/v1/post"
        );
        if (response) {
          SetAllPosts(response?.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  console.log(allPosts);
  const handleSearch = (e) => {
    clearTimeout(serachTimeOut);
    setSearchText(e.target.value);
    setSearchTimeOut(
      setTimeout(() => {
        const searchResult = allPosts.data?.filter(
          (item) =>
            item?.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item?.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSerachedResults(searchResult);
      }, 500)
    );
  };
  const searched = (searchText) => (post) =>
    post.name.toLowerCase().includes(searchText);
  const RenderCards = ({ data, title }) => {
    if (data?.data?.length > 0) {
      return data?.data
        ?.filter(searched(searchText))
        .map((post, index) => <Card key={post._id} {...post} />);
    } else {
      return (
        <h2
          style={{
            marginTop: "1rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#6449ff",
            fontSize: "1.2rem",
          }}
        >
          {title}
        </h2>
      );
    }
  };
  return (
    <section className="home">
      <div className="">
        <h1>The Community Showcase</h1>
        <p>
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E AI
        </p>
      </div>
      <div className="f">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="input-bar"
          type="text"
          placeholder="Search......"
        />
      </div>
      <div className="g">
        {loading ? (
          <div className="h">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2
                style={{
                  marginBottom: "0.5rem",
                  fontWeight: "bolder",
                  color: "#666e75",
                  fontSize: "1rem",
                }}
              >
                Showing results for{" "}
                <span style={{ color: "rgba(0,0,0,0.9)" }}>{searchText}</span>
              </h2>
            )}
            <div className="grid">
              {/* {searchText ? (
                <RenderCards
                  data={searchResults}
                  title="No Search Results found"
                />
              ) : ( */}
              <RenderCards data={allPosts} title="No Posts Found" />
              {/* )} */}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;