import React, {Component} from 'react'
import Zone from '../presentation/Zone'
import superagent from 'superagent'
class Zones extends Component {
	constructor(){
		super()
		this.state = {
			zone:{
				name: '',
				zipCodes: ''
			},
			list: []
		}
	}
	componentDidMount(){

		superagent
		.get('/api/zone')
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
	updateZone(e){
		let updatedZone = Object.assign({}, this.state.zone)
		updatedZone[e.target.id] = e.target.value
		this.setState({
			zone: updatedZone
		})
	}
	addZone(){
		let updatedZoneList = Object.assign([], this.state.list)
		updatedZoneList.push(this.state.zone)
		this.setState({
			list: updatedZoneList
		})
	}
	render(){
		const listItems = this.state.list.map((zone,i) => {
			return (
					<li key={i}>
						<Zone zone={zone}/>
					</li>
				)
		})
		return(
			<div>
				<ol style={{padding: 0}}>
					{listItems}
				</ol>
				<input id='name' onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Name" /><br/>
				<input id='zipCodes' onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zip Code" /><br/>
				<button onClick={this.addZone.bind(this)} className="btn btn-danger">Add Zone</button>
			</div>
			)
	}
}
export default Zones