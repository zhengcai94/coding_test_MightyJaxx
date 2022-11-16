import NavLinks from './NavLinks';
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useSelector } from 'react-redux';

const BigSidebar = () => {
  const { showSidebar } = useSelector((store) => store.user)
  
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
          <h3>Sneaker App</h3>
          </header>
          <NavLinks toggle={false} />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;