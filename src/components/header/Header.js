import React, { useState, useEffect } from "react";
import "./Header.scss";
import logo from "../../assets/logo.png";
import { connect } from "react-redux";
import { getMovie, setMovieType, setResponsePageNumber, searchQuery, searchResult, clearMovieDetails } from "../../redux/action/movie";
import PropTypes from "prop-types";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

const HEADER_LIST = [
  {
    id: 1,
    iconClass: "fas fa-film",
    name: "上映中の作品",
    type: "now_playing",
  },
  {
    id: 2,
    iconClass: "fas fa-fire",
    name: "人気作",
    type: "popular",
  },
  {
    id: 3,
    iconClass: "fas fa-star",
    name: "急上昇",
    type: "top_rated",
  },
  {
    id: 4,
    iconClass: "fas fa-plus-square",
    name: "今後の作品",
    type: "upcoming",
  },
];

export const Header = (props) => {
  const { getMovie, setMovieType, page, totalPageIndex, setResponsePageNumber, searchQuery, searchResult, clearMovieDetails } = props;
  let [menuClass, setMenuClass] = useState(false);
  let [listClass, setlistClass] = useState(false);
  const [type, setType] = useState("now_playing");
  const [searchMovie, setSearchMovie] = useState("");
  const [disableSearchMovie, setDisableSearchMovie] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  const location = useLocation();
  const detailsRoute = useRouteMatch("/:id/:name/details");

  useEffect(() => {
    getMovie(type, page);
    setResponsePageNumber(page, totalPageIndex);
    if (detailsRoute || location.pathname === "/") {
      setHideHeader(true);
    }

    if (location.pathname !== "/" && location.key) {
      setDisableSearchMovie(true);
    }
    // eslint-disable-next-line
  }, [type, disableSearchMovie, location]);

  const setMovieTypeUrl = (type, name) => {
    setDisableSearchMovie(false);
    if (location.pathname !== "/") {
      clearMovieDetails();
      history.push("/");
      setType(type);
      setMovieType(type);
    } else {
      setType(type);
      setMovieType(type);
    }
  };

  const onChangeSearch = (e) => {
    setSearchMovie(e.target.value);
    searchQuery(e.target.value);
    searchResult(e.target.value);
  };

  const toggleMenu = () => {
    menuClass = !menuClass;
    listClass = !listClass;
    setMenuClass(menuClass);
    setlistClass(listClass);
    if (listClass) {
      document.body.classList.add("header-nav-open");
    } else {
      document.body.classList.remove("header-nav-open");
    }
  };

  const history = useHistory();

  const toMain = () => {
    setDisableSearchMovie(false);
    clearMovieDetails();
    history.push("/");
  };

  return (
    <>
      {hideHeader && (
        <div className="header">
          <div className="header-wrapper">
            <div className="header-bar"></div>
            <div className="header-nav">
              <div className="header-image" onClick={() => toMain()}>
                <img src={logo} alt="" />
              </div>
              <div className={`${menuClass ? "header-toggle active" : "header-toggle"}`} id="header-toggle" onClick={() => toggleMenu()}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
              <ul className={`${listClass ? "header-list header-toggle-list" : "header-list"}`}>
                {HEADER_LIST.map((data) => (
                  <li key={data.id} className={data.type === type ? "header-list-item active-item" : "header-list-item"} onClick={() => setMovieTypeUrl(data.type)}>
                    <span className="header-list-name">
                      <i className={data.iconClass}></i>
                    </span>
                    &nbsp;
                    <span className="header-list-name">{data.name}</span>
                  </li>
                ))}
                <input className={`search-input ${disableSearchMovie ? "disabled" : ""}`} type="text" placeholder="映画名を入力してください" value={searchMovie} onChange={onChangeSearch} />
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Header.propTypes = {
  getMovie: PropTypes.func.isRequired,
  setMovieType: PropTypes.func,
  setResponsePageNumber: PropTypes.func,
  searchQuery: PropTypes.func,
  searchResult: PropTypes.func,
  list: PropTypes.array,
  page: PropTypes.number,
  totalPageIndex: PropTypes.number,
  clearMovieDetails: PropTypes.func,
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  page: state.movies.page,
  totalPageIndex: state.movies.totalPageIndex,
});

export default connect(mapStateToProps, { getMovie, setMovieType, setResponsePageNumber, searchQuery, searchResult, clearMovieDetails })(Header);
