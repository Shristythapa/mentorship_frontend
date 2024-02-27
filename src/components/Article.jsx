import { React, useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
const Article = ({ article, handleArticleClick }) => {
  return (
    <div key={article.id} className="col-md-4 mb-5 ">
      <Card
        className="rounded-7 p-4"
        style={{
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
          border: "none",
          // maxHeight: "200px",
          cursor: "pointer",
        }}
        onClick={() => handleArticleClick(article)}
      >
        <Card.Body>
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                {" "}
                {/* Use "col-auto" to adjust the column width based on content */}
                <img
                  className="rounded-circle img-fluid mx-auto m-3"
                  src={article.profileUrl}
                  alt="Profile"
                  style={{ width: "80px", height: "80px" }}
                />
                <div className="text-dark fw-bold">{article.mentorName}</div>
                <div className="text-dark fw-normal">{article.mentorEmail}</div>
              </div>

              <div className="col-sm-5 align-items-start">
                {" "}
                {/* Use "col" to allow the column to take up remaining space */}
                <Card.Title
                  className="text-truncate"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {article.title}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-truncate">
                  {article.body}
                </Card.Subtitle>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
    // <div
    //   key={article.id}
    //   className="info-box card p-3 m-3 d-flex flex-column border-0 shadow-sm   p-3 mb-3"
    //   style={{ maxHeight: "200px", cursor: "pointer" }}
    //   onClick={() => handleArticleClick(article)}
    // >
    //   <div className="row h-100 p-2">
    //     <div
    //       className="col-sm-3 h-100"
    //       style={{
    //         backgroundColor: "#ffffff",
    //         borderRight: "2px solid gray",
    //       }}
    //     >
    //       <div className="container ">
    //         <div className="d-flex flex-column align-items-center justify-content-center">
    //           <img
    //             className="rounded-circle img-fluid mx-auto m-3"
    //             src={article.profileUrl}
    //             alt="Profile"
    //             style={{ width: "80px", height: "80px" }}
    //           />
    //           <div className="text-dark fw-bold">{article.mentorName}</div>
    //           <div className="text-dark fw-normal">{article.mentorEmail}</div>
    //         </div>
    //       </div>
    //     </div>
    //     {/* <div className="var"></div> */}
    //     <div
    //       className="col-lg-9 h-100 p-4"
    //       style={{ backgroundColor: "#ffffff" }}
    //     >
    //       <div className="fw-bold fs-4 text-dark ">{article.title}</div>

    //       <div className=" fs-7 text-dark mt-3 text-wrap ">{article.body}</div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Article;
