import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.setState = this.setState.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: "POST",
      url: 'http://127.0.0.1:1128/repos',
      data: term,
      success: (data) => {
        this.get();
      },
      error: function(err) {
        console.log('Error ', err);
      }
    })
  }

  get(){
    $.ajax({
      type: "GET",
      url: 'http://127.0.0.1:1128/repos',
      success: (data) => {
        // repos = data;
        console.log('success UPDATE', data);
        this.update(data);
      },
      error: function(err) {
        console.log('Error ', err);
      }
    })
  }

  update(repos){
    this.setState({
          repos: repos
    });
  }

  componentWillMount() {
    $.ajax({
      type: "GET",
      url: 'http://127.0.0.1:1128/repos',
      success: (data) => {
        this.setState({
          repos: data
        });
      },
      error: function(err) {
        console.log('Error ', err);
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));