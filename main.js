let long
let lat
let key = "3b9aec9c5e84a2a902c7fb2dc1ff731a"
let geoKey = "AIzaSyD_PJ1oud0QMTGHShXyIN6_3UUXa6rT5Vw"
let ipUrl = "https://api.ipify.org?format=json"
let ipKey = "7905852c43f87b53ff7d620d7dfd9c67"


if (navigator.geolocation){
	navigator.geolocation.getCurrentPosition(position => {
		state = true
		showLoader(state)
		long = position.coords.longitude
		lat = position.coords.latitude
	},

	error =>{
		if(error.code == error.PERMISSION_DENIED){
			fetch(ipUrl)
			.then(resIp => {
				return resIp.json()

			})
			.then(dataIp => {
				state = true
				showLoader(state)
				let ipAdd = dataIp.ip

				let ipTracer = `http://api.ipstack.com/${ipAdd}?access_key=${ipKey}`

				fetch(ipTracer)
					.then(traceRes => {
						return traceRes.json()
					})
					.then(traceData => {
						console.log(traceData)
						long = traceData.longitude
						lat = traceData.latitude
				})
			})
		}
	})


}
