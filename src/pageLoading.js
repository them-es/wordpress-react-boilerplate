import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';


class PageLoading extends React.Component {

  render() {

    return (
      <div className="content">
        <Spinner className="d-block m-auto" animation="grow" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  }

}

export default PageLoading;
