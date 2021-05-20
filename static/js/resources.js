let U_name = document.getElementById("name")
let gender = document.getElementById("gender")
let state = document.getElementById("city")

let form = document.getElementById("form")


let btn = document.getElementById('submit')

btn.addEventListener('click',(e)=>{
  e.preventDefault()

  
  const app = document.getElementById('root')
  const container = document.createElement('div')
  container.setAttribute('class', 'container')
  app.appendChild(container)
  const ercard = document.createElement('div')
  ercard.setAttribute('class', 'error')
  

  // Validating user input
  if (U_name.value!==""&&gender.value!==""&&state.value!=="") {
    form.style.display="none"
    const greeting = document.createElement('h1')
          greeting.textContent = `Hello ${U_name.value}`
          container.appendChild(greeting)
    
    


    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let res = JSON.parse(this.responseText).data
        let cities=[]
        res.forEach(city => {
          cities.push(city.name)
        });
        if(cities.includes(state.value)){

          const para = document.createElement('p')
          para.textContent = `The following are adoptable pets in ${state.value}`
          container.appendChild(para)
          // Client credentials
        var key = 'NMLjvhUh7qmRSMaVFN2Fvw1arr91BgHowPBXILyPnJircuEHVN';
        var secret = 's0R68dLNjvT30KAzt5yxUMBv5KiwevZORvA76Sh7';

        // This is a POST request, because we need the API to generate a new token for us

        
        fetch('https://api.petfinder.com/v2/oauth2/token', {
          method: 'POST',
          body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function (resp) {

          return resp.json();

        }).then(function (data) {

          // Return a second API call
          // This one uses the token we received for authentication
          return fetch('https://api.petfinder.com/v2/animals?location=' + state.value+'&status=adoptable', {
            headers: {
              'Authorization': data.token_type + ' ' + data.access_token,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });

        }).then(function (resp) {

          // Return the API response as JSON
          return resp.json();

        }).then(function (data) {

          // Log the pet data

          let real = data.animals
          real.forEach(pet => {
            
            let x = document.createElement("IMG");
            x.setAttribute("src", pet.primary_photo_cropped.small);

            const card = document.createElement('div')
              card.setAttribute('class', 'card')

            const h1 = document.createElement('h1')  
            h1.textContent = pet.name
            const p = document.createElement('p')
            p.textContent = pet.species

            container.appendChild(card)

            card.appendChild(h1)
            card.appendChild(p)
            card.appendChild(x)
          });

        }).catch(function (err) {

          // Log any errors
          console.log('something went wrong', err);

        });
        }else{
          let pos = Math.floor(Math.random() * 11)
          const p = document.createElement('p')
          p.textContent = `We could not find adoptable pets in ${state.value}, try ${cities[pos]}`
          container.appendChild(p)
        }

        

      }
    });

    xhr.open("GET", "https://wft-geo-db.p.rapidapi.com/v1/geo/countries/US/regions?limit=10&offset=0");
    xhr.setRequestHeader("x-rapidapi-key", "5ce095054bmsh260927f0063f782p107502jsn2cfdbb87be56");
    xhr.setRequestHeader("x-rapidapi-host", "wft-geo-db.p.rapidapi.com");

    xhr.send(data)
  } else if(U_name.value==""&&gender.value!==""&&state.value!=="") {
    console.log("Enter name");
  }else if(U_name.value!==""&&gender.value==""&&state.value!==""){
    console.log("Enter Gender");
  }else if(U_name.value!==""&&gender.value!==""&&state.value==""){
    console.log("Enter state");
  }else{
    console.log("You must fill all fields");
  }    
  })
  