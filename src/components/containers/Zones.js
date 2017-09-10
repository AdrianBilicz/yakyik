import React, {Component} from 'react'
import Zone from '../presentation/Zone'
import {APIManager} from '../../utils'
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

		APIManager.get('/api/zone',null,(err,response) =>{
			if(err){
				console.log('err :'+ err)
				return
			}
			this.setState({
				list: response.results
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
		let updatedZone = Object.assign({}, this.state.zone)
		updatedZone['zipCodes'] = updatedZone.zipCodes.split(',')

		APIManager.post('/api/zone', updatedZone, (err,response) => {
			if(err){
				console.log('err :'+ err.message)
				return
			}
			console.log('Zone created :'+ JSON.stringify(response))

			let updatedZoneList = Object.assign([], this.state.list)
			updatedZoneList.push(response.results)
			this.setState({
				list: updatedZoneList
			})

		})

		// let updatedZoneList = Object.assign([], this.state.list)
		// updatedZoneList.push(this.state.zone)
		// this.setState({
		// 	list: updatedZoneList
		// })
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