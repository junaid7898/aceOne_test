import React, { useState } from "react";
import { useEffect } from "react";
import LoginComponent from "../component/login/LoginComponent";
import NavBar from "../component/navbar/NavBar";
import Table from "../component/table/Table";

import { addNote, archive, getCall, getCalls } from "../api/apiCalls";

import "./styles/homePage.css";
import Modal from "../component/modal/Modal";

const Pagination = ({ totalCount, handlePagination, offset }) => {
  const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / 10));

  return (
    <div className="pagination">
      {Array(Math.round(totalPages))
        .fill()
        .map((_, index) => {
          return (
            <p
              key={index}
              onClick={() => handlePagination(index)}
              className={`pagination-item ${
                offset === index && "pagination-item--active"
              }`}
            >
              {index + 1}
            </p>
          );
        })}
    </div>
  );
};

const HomePage = () => {
  const [option, setOption] = useState("login");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [table, setTable] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);

  const [call, setCall] = useState(false);

  useEffect(() => {
    if (user) {
      const getTable = async (limit, token) => {
        try {
          const res = await getCalls(offset, limit, token);
          setTable(res.nodes);
          console.log(res);
          setOption("logout");
          setIsLoading(false);
          setTotalCount(res.totalCount);
          setHasNext(res.hasNextPage);
        } catch (error) {
          setIsLoading(false);
        }
      };
      setIsLoading(true);
      getTable(10, user.access_token);
    }
  }, [user, offset]);

  const setOptionHandler = (value) => {
    setOption(value);
  };

  const handlePagination = (index) => {
    setOffset(index);
  };

  const handleGetCall = async (id) => {
    setIsLoading(true);
    await getCall(id, user.access_token)
      .then((res) => {
        setCall(res);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("something went wrong");
        setIsLoading(false);
      });
  };

  const handleAddNote = async (id, content) => {
    const res = await addNote(id, user.access_token, content);
    return res;
  };

  const closeModal = () => {
    setCall(null);
  };

  const handleArchiveCall = async (id) => {
    try {
      setIsLoading(true);
      const res = await archive(id, user.access_token);
      setIsLoading(false);
      return res;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="home-page">
      {call && (
        <Modal
          call={call}
          closeModal={closeModal}
          handleAddNote={handleAddNote}
        />
      )}
      <NavBar option={option} setOption={(value) => setOptionHandler(value)} />
      {isLoading ? (
        <p style={{ color: "red", textAlign: "center", fontSize: "2.5rem" }}>
          Loading...
        </p>
      ) : (
        <div className="home-body">
          {option === "login" ? (
            <LoginComponent setUser={setUser} setIsLoading={setIsLoading} />
          ) : (
            <div>
              <Table
                data={table}
                handleGetCall={handleGetCall}
                handleArchiveCall={handleArchiveCall}
              />
              <Pagination
                totalCount={totalCount}
                offset={offset}
                handlePagination={handlePagination}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
