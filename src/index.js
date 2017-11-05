import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom'
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Table, {TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Janken from './janken'
import './index.css'

class JankenGamePage extends Component {
    constructor(props){
        super(props)
        this.janken = new Janken()
        this.state = {scores: [], status: {}}
    }
    componentDidMount(){
        this.getResult()
    }
    getResult(){
        this.setState({scores: this.janken.getScores()})
        this.setState({status: this.janken.getStatuses()})
    }
    pon(te){
        this.janken.pon(te)
        this.getResult()
    }

    render(){
        const tabStyle = {width: 200, height: 50, textAlign: 'cneter', color: '#fff', backgroundColor: '#01bcd4'}
        const activeStyle = 
            (path) => Object.assign(
                {borderButton: `solid 2px ${this.props.location.pathname.match(path) ? '#f00' : '#01bcd4'}`}, tabStyle)
        return (
                <div style={{margineLeft:30}}>
                    <Header>じゃんけん ぽん！</Header>
                    <JankenBox actionPon={(te) => this.pon(te)} />
                    <Paper style={{width: 500}} zdepth={2}>
                        <Link id="tab-scores" to="/scores"><Button style={activeStyle('scores')}>対戦結果</Button></Link>
                        <Link id="tab-status" to="/status"><Button style={activeStyle('status')}>対戦成績</Button></Link>

                        <Route path="/scores" component={() => <ScoreList scores={this.state.scores} />}/>
                        <Route path="/status" component={() => <StatusBox status={this.state.status} />}/>
                        <Route exact path="/" component={() => <Redirect to="/scores" />}/>
                    </Paper>
                </div>
        )
    }
}
JankenGamePage.propTypes = {
    location: PropTypes.object
}

const Header = (props) => (<h1>{props.children}</h1>)
Header.propTypes = {
    children: PropTypes.string
}

const StatusBox = (props) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>勝ち</TableCell>
                <TableCell>負け</TableCell>
                <TableCell>引き分け</TableCell>
            </TableRow>
        </TableHead>
        <TableBody displayRowCheckbox={false}>
            <TableRow displayBorder={false}>
                <TableCell style={judgmentStyle(1)}>{props.status.win}</TableCell>
                <TableCell style={judgmentStyle(2)}>{props.status.lose}</TableCell>
                <TableCell style={judgmentStyle(0)}>{props.status.draw}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
)
StatusBox.propTypes = {
    status: PropTypes.object
}

const JankenBox = (props) => {
    const style = {marginLeft: 20}
    return (
        <div style={{marginTop: 40, marginBottom: 30, marginLeft: 30}}>
            <Button raised id="btn-guu"   onClick={() => props.actionPon(0)} style={style} >グー</Button>
            <Button raised id="btn-choki" onClick={() => props.actionPon(1)} style={style} >チョキ</Button>
            <Button raised id="btn-paa"   onClick={() => props.actionPon(2)} style={style} >パー</Button>
        </div>
    )
}
JankenBox.propTypes = {
    actionPon: PropTypes.func
}

const ScoreList = (props) => {
    return (
            <Table>
            <TableHead adjustforcheckbox={'false'} displayselectall={'false'}>
            <TableRow>
            <TableCell>時間</TableCell><TableCell>人間</TableCell><TableCell>コンピューター</TableCell><TableCell>結果</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {props.scores.map((score, ix) => <ScoreListItem key={ix} score={score} />)}
            </TableBody>
            </Table>
    )
}
ScoreList.propTypes = {
    scores: PropTypes.array
}

const ScoreListItem = (props) => {
    const teString = ["グー", "チョキ", "パー"]
    const judgmentString = ["引き分け", "勝ち", "負け"]
    const dateHHMMSS = (d) => d.toTimeString().substr(0, 8)

    return (
        <TableRow style={judgmentStyle(props.score.judgment)}>
            <TableCell>{dateHHMMSS(props.score.created_at)}</TableCell>
            <TableCell>{teString[props.score.human]}</TableCell>
            <TableCell>{teString[props.score.computer]}</TableCell>
            <TableCell>{judgmentString[props.score.judgment]}</TableCell>
        </TableRow>
    )
}
ScoreListItem.propTypes = {
    score: PropTypes.object
}

const judgmentStyle = (judgment) => ({color: ["#000", "#2979FF", "#FF1744"][judgment]})

ReactDOM.render(
    <BrowserRouter>
        <Route path="/" component={JankenGamePage}/>
    </BrowserRouter>,
    document.getElementById('root')
)
