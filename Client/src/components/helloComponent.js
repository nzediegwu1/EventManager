import React from 'react';

const user1 = {
  firstName: 'Anaeze',
  lastName: 'Nsoffor',
};
const user2 = {
  firstName: 'Chiamaka',
  lastName: 'Onyebuchi',
};
const FormatName = (props) => {
  return (
    <div>
      <h1>Welcome {props.user.firstName} {props.user.lastName}</h1>
      <p>{props.msg}</p>
    </div>
  );
};
const Clock = (props) => {
  return (<h2>The time is { props.date }</h2>);
}
export class Hello extends React.Component {
  render() {
    const welcomeComponent = (
      <div>
        <FormatName user={user1} msg='You have done a great job' />
        <FormatName user={user2} msg='You are good to go' />
        <Clock date = {new Date().toLocaleTimeString()}/>
      </div>
    );
    return welcomeComponent;
  }
}