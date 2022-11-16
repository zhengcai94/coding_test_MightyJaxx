import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../store/product-slice";

const PageBtnContainer = () => {
  const { page, numOfPages } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      // newPage = 1
      // alternative
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      // newPage = numOfPages
      // alternative
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>

      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              key={pageNumber}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
