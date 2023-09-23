const signup=document.getElementById('signup');
const signupmessage=document.getElementById('signup-message');
function generaterandomtoken(){
    return [...Array(16)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}
signup.addEventListener('click',(event)=>{
    const name=document.getElementById('name').value;
    const password=document.getElementById('password').value;
    const email=document.getElementById('email').value;
    const confirmpassword=document.getElementById('confirmpass').value;

    if(!name||!password||!confirmpassword||!email){
        signupmessage.innerText='Error: All fields are mandatory!'
        return;
    }
    if(password!=confirmpassword){
        signupmessage.innerText='Password do not match!';
        return;
    }
    const token = generaterandomtoken();
    localStorage.setItem('user',JSON.stringify({
        name:name,
        password:password,
        email:email,
        token:token
    }));
    localStorage.setItem('justSignedUp', 'true');
   signupmessage.innerText='Signup successful'
   console.log(name);
   console.log(token);
   showProfile();
})

function showProfile(){
    const container2=document.querySelector('.container2');
    const container1=document.querySelector('.container1');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (window.location.pathname.endsWith('profile.html') && !user.token) {
        window.location.href = 'signup.html';
        return;
    }
    if (window.location.pathname.endsWith('signup.html') && user.token) {
        window.location.href = 'profile.html';
        return;
    }

    if(user&&user.token){
      container1.style.display='none';
      container2.style.display='block';
      const justSignedUp = localStorage.getItem('justSignedUp');
        if (justSignedUp === 'true') {
            const successMessage = document.createElement('p');
            successMessage.className="signup-message";
            successMessage.innerText = 'Signup successful!';
            container2.appendChild(successMessage);

            // Clear the flag to ensure the message isn't shown again
            localStorage.removeItem('justSignedUp');
        }
      const profile=document.createElement("div");
      profile.className="profile";

      profile.innerHTML=`
      <h1>Profile</h1>
                <span class="material-symbols-outlined">
                    person
                </span>
                <p>Full Name: ${user.name}</p>
                <p>Email: ${user.email}</p>
                <p>Token: ${user.token}</p>
                <p>Password: ${user.password} </p>
                <button type="submit" id="logout"> Logout</button>
      `;
      const logoutButton = profile.querySelector("button[type='submit']");
      logoutButton.addEventListener('click', function() {
          localStorage.clear();
          window.location.reload(); // This will reload the current page, effectively running your showProfile logic again
      });
 
      container2.append(profile);
    }
    else{
      container2.style.display='none';
      container1.style.display='block';
    }
}