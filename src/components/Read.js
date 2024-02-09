import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { read } from "./redux/slice/index";
import Table from "./Table";
import { ToastContainer } from "react-toastify";
import "../index.css";
import NoData from "./NoData";
import LanguageSelector from "./SelectLang";
import { useTranslation } from "react-i18next";
import Loader from './Loader'
import Title from "./Title";



/**
 * @description  "Below is the Read Function Component "
 * @summary 1. It is the Home Component of this Project
 *         
 */

const Read = () => {
  const {t,i18n} = useTranslation();
  const dispatch = useDispatch();
  const { users, loading, fetchDone, searchData } = useSelector(
    (state) => state.app
  );
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (!fetchDone) dispatch(read());
  }, [dispatch, fetchDone]);


  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  /**
 * @description  "Below is the Pagination Function "
 * @summary 1. It has logics of how  to show the buttons and the corresponding button data 
 *         
 */

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(users.length / itemsPerPage);


  const renderPageButtons = () => {
    const numButtonsToShow = 5;
    const startPage =
      currentPage <= numButtonsToShow
        ? 1
        : Math.max(currentPage - Math.floor(numButtonsToShow / 2), 1);
    const endPage =
      startPage + numButtonsToShow - 1 > totalPages
        ? totalPages
        : startPage + numButtonsToShow - 1;

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => (
      <button
        key={startPage + i}
        onClick={() => paginate(startPage + i)}
        autoFocus={startPage + i === currentPage}
        className={startPage + i === currentPage ? "focused" : ""}
      >
        {startPage + i}
      </button>
    ));
  };


  return (
      <>
      <Title title ={"Home"}/>
      { loading ? <Loader/> : users.filter((element) => {
        return (
          searchData === "" ||
          element.name.toLowerCase().includes(searchData) ||
          element.name.toUpperCase().includes(searchData)
        );
      }).length === 0 ? (
        <NoData />
      ) : (
        <div className="table-container">
          <ToastContainer />
          <LanguageSelector />
          <table className="table table-bordered border-primary">
            <thead>
              <tr>
                <th scope="col">{t("id")}</th>
                <th scope="col">{t("name")}</th>
                <th scope="col">{t("email")}</th>
                <th>{t("edit")}</th>
                <th>{t("delete")}</th>
              </tr>
            </thead>
            <tbody>
              {currentItems
                .filter((element) => {
                  return (
                    searchData === "" ||
                    element.name.toLowerCase().includes(searchData) ||
                    element.name.toUpperCase().includes(searchData)
                  );
                })
                .map((element, index) => (
                  <Table
                    key={element.id}
                    User={element}
                    Count={index + 1 + indexOfFirstItem}
                  />
                ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {renderPageButtons()}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
   </>
  );
};

export default Read;
