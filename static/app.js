var Experiences = React.createClass({
  render: function() {
    return (
      <h1 style={styles.container}>Hello</h1>
    );
  }
});

var styles = {
  container: {
    color: 'red'
  }
}

ReactDOM.render(
  <Experiences />,
  document.getElementById("content")
);
