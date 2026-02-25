const xhr = new XMLHttpRequest();

xhr.addEventListener('load', ()=>{
   const response =  xhr.response
   console.log(response)
})

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send()
//this is asychronous code, it doesnt get a response 
// immediatly. it will wait for a response

//we can send different messages using url paths
xhr.open('GET', 'https://supersimplebackend.dev/hello');
xhr.send()

xhr.open('GET', 'https://supersimplebackend.dev/documentation')
xhr.send()