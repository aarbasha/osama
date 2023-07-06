import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./style/style.css";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import WOW from "wowjs";
import { motion } from "framer-motion";
import ScrollAnimation from "../../../Animation/ScrollAnimation";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loding, setLodin] = useState(false);
  const getData = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
        setLodin(false);
      });
  };
  useEffect(() => {
    const wow = new WOW.WOW({
      scrollContainer: ".my-scroll-container",
      offset: 100,
    });
    wow.init();

    setLodin(true);

    setTimeout(() => {
      getData();
    }, 3000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 1.5 }}
    >
      <div className="wrapper home">
        <main className="">
          <h1 className="  wow fadeIn text-center">Home</h1>
          <hr />

          <div className="row w-100">
            <div className="col-lg-12">
              <ul className=" w-100">
                {posts.map((post) => (
                  <ScrollAnimation
                    className="card"
                    key={post.id}
                    style={{ width: "18rem", minHeight: "250px" }}
                  >
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title text-danger">{post.title}</h5>
                      <hr />
                      <p className="card-text">{post.body}</p>
                      <a href="#" className="btn btn-primary">
                        Go somewhere
                      </a>
                    </div>
                  </ScrollAnimation>
                ))}
                {loding ? (
                  <div className="spical-spinner">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : null}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default Home;
