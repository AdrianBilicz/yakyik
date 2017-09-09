import React, {Component} from 'react'
import Comment from '../presentation/Comment'
import styles from './styles'
import superagent from 'superagent'
class Comments extends Component {
	constructor(){
		super()
		this.state = {
			comment: {
				username: '',
				body: '',
				timestamp: ''
			},
			list: []
		}
	}
	componentDidMount(){

		superagent
		.get('/api/comments')
		.query(null)
		.set('Accept', 'aplication/json')
		.end((err,res) => {
			if(err){
				console.log('err')
				return
			}

			console.log(res.body)
			let results = res.body.results
			this.setState({
				list: results
		})

		})
	}
	submitComment(){
		console.log('Submit '+ JSON.stringify(this.state.comment))
		let updatedList = Object.assign([], this.state.list)
		updatedList.push(this.state.comment)
		this.setState({
			list: updatedList
		})
	}
	updateUsername(e){

		let updatedComment = Object.assign({},this.state.comment)
		updatedComment['username'] = e.target.value
		this.setState({
			comment: updatedComment
		})
	}
	upadteBody(e){
		let updatedComment = Object.assign({},this.state.comment)
			updatedComment['body'] = e.target.value
		this.setState({
			comment: updatedComment
		})
	}
	updateTimestamp(e){
		let updatedComment = Object.assign({},this.state.comment)
			updatedComment['timestamp'] = e.target.value
		this.setState({
			comment: updatedComment
		})
	}
	render(){
		const commentList = this.state.list.map((comment,i) => {
			return (
				<li key={i}><Comment currentComment={comment}/></li>
				)
		})
		return (
			<div style={styles.comment.commentsBox}>
			<h2>Zone 2</h2>
			<ul style={styles.comment.commentsList}>
				{commentList}
			</ul>
			<input onChange={this.updateUsername.bind(this)} className="form-control" type="text" placeholder="username"/><br/>
			<input onChange={this.upadteBody.bind(this)} className="form-control" type="text" placeholder="Comment.."/><br/>
			<input onChange={this.updateTimestamp.bind(this)} className="form-control" type="text" placeholder="timeStamp"/>
			<button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
			</div>
			)
	}
}

export default Comments