import _ from 'lodash'
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import history from '../../history';
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    // console.log(`formValues`, formValues);
    this.props.editStream(this.props.match.params.id, formValues)
    history.push('/');
  };

  render() {
    if (!this.props.stream) {
      return <div>LOading.....</div>;
    }
    // console.log(`object`, this.props);
    console.log('this.props', this.props);

    return (
      <div>
        <h2>Edit A Stream</h2>
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(`editownProps`, ownProps)
  console.log(`editstate`, state)
  // this dwon state is written by seeing the console in browser
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
