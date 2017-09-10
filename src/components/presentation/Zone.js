import React, {Component} from 'react'
import styles from './styles'

class Zone extends Component {

	render(){
		const zoneStyle = styles.zone

		const zipCode = this.props.zone.zipCodes
		return(
				<div style={zoneStyle.container}>
					<h2 style={zoneStyle.header}>
						<a style={zoneStyle.title} href="#">{this.props.zone.name}</a>
					</h2>
					<span className="detail">{zipCode}</span><br/>
					<span>{this.props.zone.numComments} comments</span>
				</div>
			)
	}
}

export default Zone