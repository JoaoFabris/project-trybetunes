import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      user: '',
    };
  }

  componentDidMount() {
    this.handleApi();
  }

    handleApi = async () => {
      this.setState({ isLoading: true });
      const user = await getUser();
      this.setState({ isLoading: false });
      this.setState({ user: user.name });
    }

    render() {
      const { isLoading, user } = this.state;
      return (
        <header data-testid="header-component">
          <div>
            { isLoading ? <Loading />
              : <h3 data-testid="header-user-name">{user}</h3>}
          </div>
          <nav>
            <Link to="/search" data-testid="link-to-search">Search</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </nav>
        </header>
      );
    }
}

export default Header;
