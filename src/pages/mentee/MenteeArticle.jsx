import React, { useEffect, useState } from "react";

import { getAllArticle } from "../../Api/Api";
import Article from "../../components/Article";

const MenteeArticles = () => {
  const [articles, setArticles] = useState([]);
  const [showArticleModal, setShowArticleModal] = useState(false);
  useEffect(() => {
    console.log("run use effect");
    getAllArticle().then((res) => {
      if (!res.data) {
        console.log("no res");
      }
      console.log(res);
      setArticles(res.data.articles);
      console.log(res.data.articles);
    });
  }, []);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const handleCloseModal = () => {
    setShowArticleModal(false);
  };
  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div
          className="col py-3"
          style={{ backgroundColor: "#f7f8fc", color: "#EEA025" }}
        >
          <div
            className="col py-3"
            style={{ backgroundColor: "#f7f8fc", color: "#EEA025" }}
          >
            <div className="">
              {/* <div className="mb-5 mt-2 border-0">
                <form className="form-inline my-2 my-lg-0 container ">
                  <div className="row">
                    <div className="col-md-10">
                      <input
                        className="form-control w-100 shadow-sm border-0"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                    </div>
                    <div className="col-md-2 mt-2 mt-md-0">
                      <button
                        className="btn w-100 shadow-sm"
                        style={{ backgroundColor: "#C48EEA", color: "#fff" }}
                        type="submit"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div> */}
              <div className=" d-flex justify-content-between align-items-center">
                <header
                  className="col-6 "
                  style={{
                    color: "#EEA025",
                    fontSize: "28px",
                    fontWeight: "bolder",
                  }}
                >
                  <h4>Article</h4>
                </header>
                <div className="col-2 text-end"></div>
              </div>

              <div className="col-lg-12">
                <div className="row">
                  {articles.map((article) => (
                    <Article
                      article={article}
                      handleArticleClick={handleArticleClick}
                    ></Article>
                  ))}
                  {showArticleModal && (
                    <div
                      className="modal fade show"
                      style={{ display: "block" }}
                      tabIndex="-1"
                      role="dialog"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">
                              {selectedArticle.title}
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={handleCloseModal}
                            ></button>
                          </div>
                          <div
                            className="modal-body"
                            style={{ color: "black" }}
                          >
                            <p>{selectedArticle.body}</p>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={handleCloseModal}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    //  <MentorSidebar></MentorSidebar>
  );
};

export default MenteeArticles;
