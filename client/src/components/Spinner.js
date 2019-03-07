import React, {Component} from 'react';
import { PulseLoader } from 'react-spinners';
import {connect} from 'react-redux';

class Spinner extends Component {
  render(){
    console.log('in spinner', this.props.height, this.props.width);
    return (
      <div
        className="spinner"
        style={{height: this.props.height, width: this.props.width}}
        // style={{left: this.props.width/2 - 100, top: this.props.height/2}}
      >
        <PulseLoader
          sizeUnit={"px"}
          size={50}
          color={'#000000'}
          loading={this.props.loading}
        />
      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    width: state.userInfo.width,
    height: state.userInfo.height
  }
}

export default connect(mapStateToProps)(Spinner);
