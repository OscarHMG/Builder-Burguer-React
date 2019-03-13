import React, { Component } from "react";
import Modal from "./../../components/UI/Modal/Modal";
import Aux from "./../Auxiliary";

const errorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    constructor(props) {
      super(props);

      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.respInterceptors = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }

    componentWillUnmount() {
      
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.respInterceptors);
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null
      });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClose={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default errorHandler;
