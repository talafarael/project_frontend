const button=document.querySelector('.button')


button.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.querySelector('.email').value;
    const name = document.querySelector('.name').value;
    const password = document.querySelector('.password').value;


    console.log(email);

    // Создаем объект данных для отправки
    const data = {
       name: name,
       email: email,
      password: password
    };
    console.log(data);
    // Отправляем запрос на сервер
   fetch('https://project-49di.onrender.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
     body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
         // Redirection to the 'sendemail' route on successful registration
         const baseUrl = window.location.origin
      window.location.href = `${baseUrl}//FE-project/code.html`;
        console.log(baseUrl);
         
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);


      })})