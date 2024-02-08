
const button = document.querySelector('.button')




button.addEventListener('click',async (event)=>{
   event.preventDefault()
    const password = document.querySelector('.code').value;
    
fetch('https://project-49di.onrender.com/auth/registercheck',{
    method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body:JSON.stringify({password:password})}
).then(response => {
  if (response.ok) {
    // Redirection to the 'sendemail' route on successful registration
    const baseUrl = window.location.origin
     window.location.href = `../Main/main.html`;
     console.log(baseUrl);
  }
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})


})
function c(){fetch('https://project-49di.onrender.com/auth/sendemail')
.then(data=> 
   
data.json()

).then(res=>console.log(res))}
c()


