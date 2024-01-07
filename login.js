
const button=document.querySelector('.button')
function creatTime(){
    const now = new Date();
    const date= now.getDate()+1+'.'+now.getHours()
    return date
}
button.addEventListener('click', async (event) => {
    event.preventDefault();
 
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    // Создаем объект данных для отправки
    const data = {
        email: email,
        password: password,
    };

    // Опции запроса
    const options = {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(data), }
   

    // Отправляем запрос на сервер
    fetch('https://project-49di.onrender.com/auth/login', options)
    .then(response => response.json())
    .then(data => {
        
        console.log(data.token);
      localStorage.setItem('token',data.token)
     localStorage.setItem('time',creatTime() )
     if( localStorage.getItem('token')>=0){

     }
    }).then(data => {
        const baseUrl = window.location.origin
         window.location.href = `${baseUrl}/project_frontend/main.html`;
    }
    )

});
