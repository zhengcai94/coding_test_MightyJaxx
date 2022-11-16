import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../store/product-slice";
import Loading from "./Loading";
import Product from "./Product";
import Wrapper from "../assets/wrappers/ProductsContainer";
import PageBtnContainer from "./PageBtnContainer";

const ProductsContainer = () => {
  const dispatch = useDispatch();
  const { products, page, totalProducts, search, numOfPages } = useSelector(
    (store) => store.product
  );
  const { isLoading } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getProducts());
  }, [search, page]);

  if (isLoading) {
    return <Loading center />;
  }
  if (products.length === 0) {
    return (
      <Wrapper>
        <h2>No products to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalProducts} product{products.length > 1 && "s"} found
      </h5>
      <div className="products">
        {products.map((product) => {
          return <Product key={product._id} {...product} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default ProductsContainer;
