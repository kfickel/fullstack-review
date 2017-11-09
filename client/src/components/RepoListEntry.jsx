import React from 'react';

const RepoListEntry = (props) => (
  <div>
    <li>
      Username:  {props.value.login}.   
      <div><a href={props.value.repoUrl}>  Repo: {props.value.repoName}</a></div>
      <div> Forks: {props.value.forks}</div>
      </li>
  </div>
)

export default RepoListEntry;