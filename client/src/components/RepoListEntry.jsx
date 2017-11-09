import React from 'react';

const RepoListEntry = (props) => (
  <div>
    <li>
      <h3>{props.value.login}</h3>
      <a href={props.value.repoUrl}>{props.value.repoUrl}</a></li>
  </div>
)

export default RepoListEntry;