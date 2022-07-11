import React from 'react';
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
        <div data-testid="header-component">
          { isLoading ? <Loading />
            : <h3 data-testid="header-user-name">{user}</h3>}
        </div>
      );
    }
}

export default Header;
