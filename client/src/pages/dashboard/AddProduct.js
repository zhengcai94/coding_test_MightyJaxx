import { FormRow, Alert } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert, displayAlert } from "../../store/user-slice";
import { editProduct } from "../../store/product-slice";
import {
  handleChange,
  clearValues,
  createProduct,
} from "../../store/product-slice";

const AddProduct = () => {
  const { showAlert, isLoading } = useSelector((store) => store.user);
  const { isEditing, title, image, SKU, productLocation, productType } =
    useSelector((store) => store.product);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !SKU || !image) {
      dispatch(displayAlert());
      setTimeout(() => {
        dispatch(clearAlert());
      }, 2000);
      return;
    }
    if (isEditing) {
      dispatch(editProduct());
      dispatch(clearValues());
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
      return;
    }
    dispatch(createProduct());
    dispatch(clearValues());
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(`${name}:${value}`);
    dispatch(handleChange({ name, value }));
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"} </h3>
        {showAlert && <Alert />}

        {/* title */}
        <div className="form-center">
          <FormRow
            type="text"
            name="title"
            value={title}
            handleChange={handleJobInput}
          />
          {/* SKU */}
          <FormRow
            type="text"
            name="SKU"
            value={SKU}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type="text"
            labelText="location"
            name="productLocation"
            value={productLocation}
            handleChange={handleJobInput}
          />
          {/* image */}
          <FormRow
            type="text"
            labelText="image"
            name="image"
            value={image}
            handleChange={handleJobInput}
          />
          {/* product type */}
          <FormRow
            type="text"
            labelText="type"
            name="productType"
            value={productType}
            handleChange={handleJobInput}
          />
          {/* product status */}

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                // console.log('clear values')
                dispatch(clearValues());
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddProduct;
