import React from "react";
import Product from "./Product";
import { FiSearch } from "react-icons/fi";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.state = {
      page: 1,
      searchString: "",
    };
  }

  componentDidMount() {
    this.props.getProducts(this.state.page);

    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.setState({
        page: this.state.page + 1,
      });
    }
  };

  componentDidUpdate(prevProp, prevState) {
    if (
      this.state.page !== prevState.page &&
      !this.props.loading &&
      prevState.page <= 3
    ) {
      this.props.getProducts(this.state.page);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  filterItems = () => {
    return (
      this.props.products &&
      this.props.products.filter((item) => {
        const lowerCaseName = item.name.toLowerCase();
        const lowerCaseSearchString = this.state.searchString.toLowerCase();
        console.log();
        return lowerCaseName.includes(lowerCaseSearchString);
      })
    );
  };

  handleSearchBarModal = () => {
    this.setState(
      {
        searchBarModal: true,
      },
      () => {
        this.inputRef.current.focus();
      }
    );
  };

  render() {
    return (
      <div className="home-content main-content">
        <div className="top-sec">
          <div className="container">
            {!this.state.searchBarModal && (
              <div className="info">
                <Link to="">
                  <BsArrowLeftShort className="icon left-arrow-icon" />
                  {this.props.title}
                </Link>
                <FiSearch
                  onClick={this.handleSearchBarModal}
                  className="icon"
                />
              </div>
            )}
            {this.state.searchBarModal && (
              <div className="search-bar">
                <BsArrowLeftShort
                  onClick={() => this.setState({ searchBarModal: false })}
                  className="icon left-arrow-icon"
                />
                <input
                  ref={this.inputRef}
                  placeholder="Search"
                  className="search-input"
                  value={this.state.searchString}
                  onChange={(e) => {
                    this.setState({ searchString: e.target.value });
                  }}
                />
                <MdClose
                  onClick={() => this.setState({ searchString: "" })}
                  className="icon close"
                />
              </div>
            )}
          </div>
        </div>
        <div className="container container-products">
          <ul className="products">
            {this.filterItems() &&
              this.filterItems().map((item, index) => {
                return (
                  <Product
                    key={index + "" + this.props.pageNumRequested}
                    item={item}
                  />
                );
              })}
          </ul>
          {this.filterItems() && this.filterItems().length === 0 && (
            <div className="no-records">No Records </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
