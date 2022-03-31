const withReducer = (key, reducer) => (WrappedComponent) => {
  return (props) => <WrappedComponent {...props} />;
};

export default withReducer;
