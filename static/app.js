var BASE_URL = "https://dev.xola.com";

var Result = React.createClass({
  styles: {
    container: {
      position: 'relative',
      width: 800,
      display: 'flex',
      margin: 10,
      border: '1px solid #f2f2f2',
      flexDirection: 'row',
      borderRadius: 5,
      fontFamily: 'Helvetica Neue, sans-serif'
    },
    name: {
      margin: 0,
      fontWeight: 'bold'
    },
    category: {
      color: '#999',
      fontFamily: 'Georgia, serif',
      fontSize: 14,
      margin: 0,
      paddingTop: 5
    },
    price: {
      position: 'absolute',
      margin: 0,
      top: 0, right: 0,
      padding: 10,
      fontFamily: 'Georgia, serif'
    }
  },

  render: function() {
    var photo = <img src="http://placehold.it/100x100" />;
    if (this.props.value.photo) {
      var imageUrl = BASE_URL + this.props.value.photo.src;
      photo = <img src={imageUrl} style={{height: 100, width: 100}} />;
    }

    return (
      <div style={this.styles.container}>
        {photo}
        <div style={{padding: 10, textAlign: 'left'}}>
          <p style={this.styles.name}>{this.props.value.name}</p>
          <p style={this.styles.category}>{this.props.value.category}</p>
        </div>
        <p style={this.styles.price}>
            ${this.props.value.price}
        </p>
      </div>
    );
  }
})

var Results = React.createClass({
  getInitialState: function() {
    return { pageNo: 1 };
  },

  goToPage: function(e) {
    var pageNo = e.target.getAttribute('data-key');
    this.setState({pageNo});
  },

  render: function() {
    var pagination = [];

    if (this.props.values.length > 0) {
      var numPages = Math.ceil(this.props.values.length/this.props.pageLength);
      for (var i = 1; i <= numPages; i++) {
        var content = <span data-key={i} style={{padding: 5}}>{i}</span>;
        if (parseInt(this.state.pageNo) === i) {
          content = (
              <span data-key={i} style={{
                backgroundColor: 'red',
                color: 'white',
                padding: 5
              }}>{i}</span>
          );
        }

        pagination.push(
            <div key={i} onClick={this.goToPage} style={{
              border: '1px solid #f2f2f2',
              fontFamily: 'Verdana, sans-serif',
              marginLeft: 10,
              borderRadius: 3
            }}>{content}</div>
        );
      }
    }

    var beg = (this.state.pageNo - 1) * this.props.pageLength;
    var end = beg + this.props.pageLength;
    return (
      <div>
        {this.props.values.slice(beg, end).map(function(each) {
          return <Result key={each.id} value={each} />;
        })}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 20
        }}>
          {pagination}
        </div>
      </div>
    )
  }
})

var Experiences = React.createClass({
  getInitialState: function() {
    return {
      searchTerm: '',
      searchResults: []
    };
  },

  submitSearch: function(e) {
    e.preventDefault();
    
    var params = $.param({
      searchterm: this.state.searchTerm,
      lat: this.state.lat,
      lng: this.state.lng
    });

    $.ajax({
      url: '/search?' + params,
      method: 'GET',
      success: function(data) {
        this.setState({searchResults: data.data});
      }.bind(this)
    });
  },

  onSearchTermChange: function(e) {
    this.setState({searchTerm: e.target.value});
  },

  onLatChange: function(e) {
    this.setState({lat: e.target.value});
  },

  onLngChange: function(e) {
    this.setState({lng: e.target.value});
  },

  render: function() {
    return (
        <div style={styles.container}>
          <div style={{
            boxShadow: '0 1px 0 0 rgba(0,0,0,.05),0 2px 4px 0 rgba(0,0,0,.06)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 70
          }}>
            <h2 style={{
              margin: 0,
              padding: 20,
              fontFamily: 'Verdana, sans-serif',
              fontSize: 20,
            }}>
              Explore Experiences
            </h2>
            <form style={{display: 'flex', alignItems: 'center'}} onSubmit={this.submitSearch}>
              <input type="text" style={styles.textField} onChange={this.onSearchTermChange} placeholder={'Search'}/>
              <input type="text" style={styles.textField} onChange={this.onLatChange} placeholder={'Latitude'}/>
              <input type="text" style={styles.textField} onChange={this.onLngChange} placeholder={'Longitude'}/>
              <button style={styles.submitButton} type="submit">Search</button>
            </form>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Results pageLength={5} values={this.state.searchResults} />
          </div>
        </div>

      );
  }
});

var styles = {
  container: {
    textAlign: 'center',
    margin: 0,
    padding: 0,
    backgroundColor: 'white'
  },
  textField: {
    height: 20,
    borderRadius: 2,
    marginRight: 10,
    fontSize: 15,
    padding: 5,
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '1px solid #f2f2f2'
  },
  submitButton: {
    paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8,
    fontFamily: 'Verdana, sans-serif',
    color: 'white',
    fontSize: 14,
    border: 'none',
    backgroundColor: '#da552f',
    textDecoration: 'none'
  }
}

ReactDOM.render(
  <Experiences />,
  document.getElementById("content")
);
