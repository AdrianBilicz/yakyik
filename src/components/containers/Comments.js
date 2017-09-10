import React, {Component} from 'react'
import {Comment, CreateComment} from '../presentation'
import styles from './styles'
import {APIManager} from '../../utils'
class Comments extends Component {
	constructor(){
		super()
		this.state = {
			// comment: {
			// 	username: '',
			// 	body: ''
			// },
			list: []
		}
	}
	componentDidMount(){
		APIManager.get('/api/comment',null,(err,response) =>{
			if(err){
				console.log('err')
				return
			}
			this.setState({
				list: response.results
			})
		})

	}
	submitComment(comment){

		console.log('submitComment: ' + JSON.stringify(comment))
		// APIManager.post('/api/comment', updatedComment, (err,response) => {
		// 	if(err){
		// 		console.log('err :'+ err.message)
		// 		return
		// 	}
		// 	let updatedList = Object.assign([], this.state.list)
		// 	updatedList.push(response.results)
		// 	this.setState({
		// 		list: updatedList
		// 	})
		// })
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

			<CreateComment onCreate={this.submitComment.bind(this)}/>
			</div>
			)
	}
}

export default Comments