const request = require('request')

// Define your HTML/CSS
const data = {
  html: "<div class='box'>JavaScript ✅</div>",
  css: ".box { border: 4px solid #03B875; padding: 20px; font-family: 'Roboto'; }",
  google_fonts: "Roboto"
}

// Create an image by sending a POST to the API.
// Retrieve your api_id and api_key from the Dashboard. https://htmlcsstoimage.com/dashboard
request.post({ url: 'https://hcti.io/v1/image', form: data})
  .auth(API_ID, API_KEY)
  .on('data', function(data) {
    console.log(JSON.parse(data))
  })

// {"url": "https://hcti.io/v1/image/1113184e-419f-49f1-b231-2069942a186f"}
