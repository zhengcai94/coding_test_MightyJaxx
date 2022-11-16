import { FormRow } from '.';
import { useSelector, useDispatch } from 'react-redux';
import { clearFilters, handleChange } from '../store/product-slice';
import Wrapper from '../assets/wrappers/SearchContainer';

const SearchContainer = () => {
  const { search } = useSelector(store => store.product);
  const { isLoading } = useSelector(store => store.user); 
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };
  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        {/* search title */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          ></FormRow>
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
export default SearchContainer