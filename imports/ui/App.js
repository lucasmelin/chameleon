import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import { withRouter } from 'react-router';

import { withTracker } from 'meteor/react-meteor-data';

import { NumberInput, Table, TableBody, TableHead, TableHeader, TableRow, TableData, Module, ModuleBody, ModuleHeader } from 'carbon-components-react';

import 'carbon-components/css/carbon-components.css';

import { Records } from '../api/records.js';
import Record from './Record.js';

// App component - represents the whole app
class App extends Component {

  getRecords(){
    return [
      { _id: 1,
        situation: {
          date: new Date(),
          description: "Oh no it is a thing that happen this is my life right now"
        },
        moods: [
          {
            name: "Anxious",
            rating: 45,
            isDominant: true
          }, {
            name: "Hopeful",
            rating: 5,
            isDominant: false
          }
        ],
        autoThoughts: [
          {
            content: "I hate this so much",
            isDominant: false
          }, {
            content: "This will never work",
            isDominant: false
          }, {
            content: "They will suffer because of me",
            isDominant: true
          }
        ],
        pro: [
          {
            content: "They get upset when I'm like this"
          },
          {
            content: "She said she can't deal with this"
          }
        ],
        con: [
          {
            content: "I still make her smile sometimes"
          },
          {
            content: "She says it's getting better"
          }
        ],
        alt: [
          {
            content: "She's said she can't deal with this before, but she's also said it's getting better",
            isDominant: false,
            beliefRating: 20
          },
          {
            content: "Sometimes I upset them, but I can also make them smile",
            isDominant: true,
            beliefRating: 45
          }
        ],
        moodsAfter: [
          {
            name: "Anxious",
            rating: 20,
            isDominant: true
          }, {
            name: "Hopeful",
            rating: 25,
            isDominant: false
          }
        ]
      }
    ];
  }

  renderRecords() {
    return this.getRecords().map((record) => (
      <Record key={record._id} situation={record.situation} moods={record.moods} autoThoughts={record.autoThoughts}
      pro={record.pro} con={record.con} alt={record.alt} moodsAfter={record.moodsAfter} />
    ))
  }

  componentDidMount(){
    }

  render() {
    return(
      <div className="container">
        <header>
          <h1>Records</h1>
        </header>
        <ul>
          {this.renderRecords()}
        </ul>
      </div>
/*         <Router>
        <Root>   
          <Main>
            <Route exact={true} path="/" component={Situation}/>
            <Route exact={true} path="/mood" component={Mood}/>
            <Route exact={true} path="/automatic" component={Automatic}/>
            <Route exact={true} path="/pro" component={Pro}/>
            <Route exact={true} path="/con" component={Con}/>
            <Route exact={true} path="/alt" component={Alt}/>
          </Main>
        </Root>
       </Router> */
    );
  }
}

// Contains the section title along with the current date
function Frame(props){
  return(
    <div>
      <h1>
        {props.title}
      </h1>
    </div>
  );
}



function formatDate(date) {
  return date.toLocaleString();
}


class LoadFile extends Component {
  constructor(props){
    super(props)

    this.state = {
      content: null
    }
  }
  componentDidMount = () => {
    fetch(this.props.url)
      .then(res => res.text())
      .then(res => {
        this.setState({
          content: res
        })
      })
  }
  
  render() {
    const {content} = this.state
    return (
      <pre>
        <div dangerouslySetInnerHTML={{__html: content}} />
      </pre>
    )
  }
}


const Root = (props) => (
  <div className="root" {...props} ></div>
)


const Sidebar = (props) => (
  <div className="sidebar" {...props} ></div>
)

const SidebarItem = (props) => (
  <div className="sidebar-item" {...props}></div>
)


const Main = (props) => (
  <div className="main-outer">
    <div className="main-inner"{...props}></div>
  </div>
)









export default withTracker(() => {
  return {
    records: Records.find({}).fetch(),
  };
})(App);
