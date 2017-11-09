import React from 'react';

const titleStyle = {
  fontWeight: 'bold'
}

const RepoListEntry = (props) => (
  <div>
    <li>
      <span style={{fontWeight: 'bold'}}>Username: </span>{props.value.login}  
      <div><span style={{fontWeight: 'bold'}}>Repo: </span><a href={props.value.repoUrl}> {props.value.repoName}</a></div>
      <div><span style={{fontWeight: 'bold'}}>Forks: </span>{props.value.forks}</div>
    </li>
    <p/>
  </div>
)

export default RepoListEntry;