import React, { Component } from 'react';
import Checklist from '../Checklist/Checklist';
import './App.css';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checklists: JSON.parse(localStorage.getItem('checklists')) || [
        { title: 'None', steps: [] }
      ],
      currentChecklist: localStorage.getItem('currentChecklist') || null
    };
  }

  importChecklist = () => {
    let text = this.state.textArea;
    let lines = text.split('\n');
    let checklist = {
      title: this.state.checklistTitle,
      steps: []
    };
    lines.map(l => checklist.steps.push({ text: l, completed: false }));
    let checklists = this.state.checklists;
    checklists.push(checklist);

    localStorage.setItem('checklists', JSON.stringify(checklists));
    let currentChecklist = this.state.currentChecklist || 0;
    localStorage.setItem('currentChecklist', currentChecklist);
    this.setState({ checklists, currentChecklist });
  };

  checklistContentHandle = e => {
    this.setState({ textArea: e.target.value });
  };

  checklistTitleHandle = e => {
    this.setState({ checklistTitle: e.target.value });
  };

  changeChecklist = e => {
    this.setState({
      currentChecklist: e.target.value,
      checklist: this.state.checklists[e.target.value]
    });
    localStorage.setItem('currentChecklist', e.target.value);
  };

  updateStep = i => {
    let checklists = this.state.checklists;
    checklists[this.state.currentChecklist].steps[i].completed ^= true;
    this.setState({ checklists });
    localStorage.setItem('checklists', JSON.stringify(checklists));
  };

  render() {
    return (
      <div>
        <div className='checklist-import-inputs'>
          <span>Title</span>
          <input type='text' onChange={e => this.checklistTitleHandle(e)} />
          <span>Text</span>
          <textarea
            cols='5'
            rows='200'
            onChange={e => this.checklistContentHandle(e)}></textarea>
          <p></p>
          <button onClick={this.importChecklist.bind(this)}>Import</button>
          <p>Selector</p>
          <div className='checklist-selection'>
            <select
              value={this.state.currentChecklist}
              onChange={e => this.changeChecklist(e)}>
              {this.state.checklists
                ? this.state.checklists.map((c, i) => (
                    <option name='checklist' value={i} key={i}>
                      {c.title}
                    </option>
                  ))
                : ''}
            </select>
          </div>
        </div>

        <Checklist
          data={this.state.checklists[this.state.currentChecklist]}
          updateStep={i => this.updateStep(i)}
        />
      </div>
    );
  }
}
