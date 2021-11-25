import React, { Component } from 'react';
import './Checklist.css';
const removeMd = require('remove-markdown');
export default class Checklist extends Component {
  toggleStep = (e, i) => {
    e.target.classList.toggle('completed');
    this.props.updateStep(i);
  };

  render() {
    return (
      <div className='checklist'>
        <h1 className='title'>
          {this.props.data ? this.props.data.title : ''}
        </h1>
        <div className='checklist-steps'>
          {this.props.data
            ? this.props.data.steps.map((s, i) => {
                if (s.text.substr(0, 2) === '##') {
                  return (
                    <h3
                      className={`checklist-step ${
                        s.completed ? 'completed' : ''
                      }`}
                      key={i}
                      onClick={e => this.toggleStep(e, i)}>
                      {removeMd(s.text)}
                    </h3>
                  );
                } else if (s.text.substr(0, 1) === '#') {
                  return (
                    <h1
                      className={`checklist-step ${
                        s.completed ? 'completed' : ''
                      }`}
                      key={i}
                      onClick={e => this.toggleStep(e, i)}>
                      {removeMd(s.text)}
                    </h1>
                  );
                } else if (s.text.substr(0, 3) === '![]') {
                  return (
                    <img
                      src={s.text.split('(')[1].split(')')[0]}
                      alt='Markdown'
                    />
                  );
                } else {
                  return (
                    <p
                      className={`checklist-step ${
                        s.completed ? 'completed' : ''
                      }`}
                      key={i}
                      onClick={e => this.toggleStep(e, i)}>
                      {removeMd(s.text)}
                    </p>
                  );
                }
              })
            : 'a'}
        </div>
      </div>
    );
  }
}
