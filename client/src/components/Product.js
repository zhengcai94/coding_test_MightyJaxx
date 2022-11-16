import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEditProduct, deleteProduct } from "../store/product-slice";
import Wrapper from "../assets/wrappers/Product";
import ProductInfo from "./ProductInfo";

const Product = ({
  _id,
  title,
  SKU,
  image,
  productLocation,
  productType,
  createdAt,
}) => {
  const dispatch = useDispatch();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{productType.charAt(0)}</div>
        <div className="info">
          <h5>{title}</h5>
          <p>{SKU}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <div className="product-info">
            <ProductInfo icon={<FaLocationArrow />} text={productLocation} />
            <ProductInfo icon={<FaCalendarAlt />} text={date} />
            <ProductInfo icon={<FaBriefcase />} text={productType} />
          </div>
          <div className="image-container">
            <img className="product-image" src={image}></img>
          </div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-product"
              onClick={() => dispatch(setEditProduct(_id))}
              className="btn edit-btn"
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteProduct(_id))}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Product;
