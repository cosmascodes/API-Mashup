// let name = document.getElementById("name")
// let gender = document.getElementById("gender")
// let state = document.getElementById("city")

// let btn = document.getElementById('submit')

// btn.addEventListener('click',(e)=>{
//   e.preventDefault()
//   const app = document.getElementById('root')
//   const container = document.createElement('div')
//   container.setAttribute('class', 'container')
//   app.appendChild(container)
//   const ercard = document.createElement('div')
//   ercard.setAttribute('class', 'error')


//     const data = null;

//     const xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;

//     xhr.addEventListener("readystatechange", function () {
//       if (this.readyState === this.DONE) {
//         let res = JSON.parse(this.responseText).data
//         res.forEach(city => {
//           const p = document.createElement('p')
//           p.textContent = city.name
//           container.appendChild(p)
//         });

//         // Client credentials
//         var key = 'NMLjvhUh7qmRSMaVFN2Fvw1arr91BgHowPBXILyPnJircuEHVN';
//         var secret = 's0R68dLNjvT30KAzt5yxUMBv5KiwevZORvA76Sh7';

//         // Call details
//         var org = 'Alabama';

//         // Call the API
//         // This is a POST request, because we need the API to generate a new token for us

        
//         fetch('https://api.petfinder.com/v2/oauth2/token', {
//           method: 'POST',
//           body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//           }
//         }).then(function (resp) {

//           return resp.json();

//         }).then(function (data) {

//           // Return a second API call
//           // This one uses the token we received for authentication
//           return fetch('https://api.petfinder.com/v2/animals?location=' + org+'&status=adoptable', {
//             headers: {
//               'Authorization': data.token_type + ' ' + data.access_token,
//               'Content-Type': 'application/x-www-form-urlencoded'
//             }
//           });

//         }).then(function (resp) {

//           // Return the API response as JSON
//           return resp.json();

//         }).then(function (data) {

//           // Log the pet data

//           let real = data.animals
//           console.log(real)
//           real.forEach(pet => {
//             const card = document.createElement('div')
//               card.setAttribute('class', 'card')

//             const h1 = document.createElement('h1')  
//             h1.textContent = pet.name
//             const p = document.createElement('p')
//             p.textContent = pet.species

//             container.appendChild(card)

//             card.appendChild(h1)
//             card.appendChild(p)
//           });

//         }).catch(function (err) {

//           // Log any errors
//           console.log('something went wrong', err);

//         });

//       }
//     });

//     xhr.open("GET", "https://wft-geo-db.p.rapidapi.com/v1/geo/countries/US/regions?limit=10&offset=0");
//     xhr.setRequestHeader("x-rapidapi-key", "5ce095054bmsh260927f0063f782p107502jsn2cfdbb87be56");
//     xhr.setRequestHeader("x-rapidapi-host", "wft-geo-db.p.rapidapi.com");

//     xhr.send(data)
//   })



const http = require("https");

const options = {
	"method": "GET",
	"hostname": "wft-geo-db.p.rapidapi.com",
	"port": null,
	"path": "/v1/geo/countries/US/regions",
	"headers": {
		"x-rapidapi-key": "5ce095054bmsh260927f0063f782p107502jsn2cfdbb87be56",
		"x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
		"useQueryString": true
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();