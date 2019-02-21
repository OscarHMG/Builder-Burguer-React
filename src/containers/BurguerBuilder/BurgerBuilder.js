import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Auxiliary from '../../hoc/Auxiliary';

export default class BurgerBuilder extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <Auxiliary>
        <div>Burger</div>
        <div>Builder controls</div>
      </Auxiliary>
    )
  }
}
