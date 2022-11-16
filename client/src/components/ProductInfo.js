import Wrapper from '../assets/wrappers/ProductInfo';

const ProductInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      <span className='text'>{text}</span>
    </Wrapper>
  );
};

export default ProductInfo;