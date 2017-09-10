import React, {Component} from 'react'

class CreateComment extends Component {
	constructor(){
		super()
		this.state = {
			comment: {

			}
		}
	}
	updateComment(e){
		console.log('updateComment :' + e.target.id + '==' + e.target.value)
		let updatedComment = Object.assign({}, this.state.comment)
		updatedComment[e.target.id] = e.target.value
		this.setState({
			comment: updatedComment
		})

	}
	submitComment(){
		console.log('submitComment :' + JSON.stringify(this.state.comment))
		this.props.onCreate(this.state.comment)
	}
	render(){
		return(
			<div>Create Comment
				<input id='username' onChange={this.updateComment.bind(this)} className="form-control" type="text" placeholder="username"/><br/>
				<input id='body' onChange={this.updateComment.bind(this)} className="form-control" type="text" placeholder="Comment.."/><br/>
				<button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
			</div>
			)
	}
}

export default CreateComment