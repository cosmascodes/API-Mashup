var config = {
  client_id: "06fef78a0beb0092952c236091a4ae07",
  client_secret: "b109eb416300214b66234aec115f8d11cb7ec122b151864cea8ece58034eb95b",
  redirect_uri: "https://priceless-ride-34b555.netlify.app/",
  authorization_endpoint: "https://api.myanimelist.net/v2/anime",
  token_endpoint: "",
  requested_scopes: ""
};

let btn = document.getElementById('submit')

btn.addEventListener('click',(e)=>{
  e.preventDefault()
  let name = document.getElementById('name').value
  let age = document.getElementById('age').value

  const app = document.getElementById('root')
  const container = document.createElement('div')
  container.setAttribute('class', 'container')
  app.appendChild(container)
  const ercard = document.createElement('div')
  ercard.setAttribute('class', 'error')

  if(name!="" && age!=""){
    let form = document.getElementById('form')
    form.style.display="none"
      // Create a request variable and assign a new XMLHttpRequest object to it.
      let request = new XMLHttpRequest()

      // Open a new connection, using the GET request on the URL endpoint
      request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

      

      request.onload = function () {
        // Begin accessing JSON data here
      let data = JSON.parse(this.response)


      if (request.status >= 200 && request.status < 400) {
          data.forEach((movie) => {
              const card = document.createElement('div')
              card.setAttribute('class', 'card')
              // Create an h1 and set the text content to the film's title
              const h1 = document.createElement('h1')
              const p = document.createElement('p')
              const d_name = document.createElement('p')


              h1.textContent = movie.title        
              movie.description = movie.description.substring(0, 300) // Limit to 300 chars
              p.textContent = `${movie.description}...` // End with an ellipses
              d_name.textContent = `Director: ${movie.director}.`

              // Append the cards to the container element
              container.appendChild(card)

              // Each card will contain an h1 and a p
              card.appendChild(h1)
              card.appendChild(p)
              card.appendChild(d_name)
          })
        } else {
          console.log('error')
        }
      }
      // Send request
      request.send()
  }else{
    let e = document.createElement('p')
    container.appendChild(ercard)
    
    if(name==""&&age==""){      
      e.textContent = "Please enter your name and age"
      ercard.appendChild(e)
    }
    if(name==""&&age!==""){
      e.textContent = "Please enter your name"
      ercard.appendChild(e)
    }
    if(name!==""&&age==""){
      e.textContent = "Please enter your age"
      ercard.appendChild(e)
    }

  }
})