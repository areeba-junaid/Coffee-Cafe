
function Validate() {
       
       Error = " ";
       alert("Running");
       n = document.getElementById("name").value;
       e = document.getElementById("email").value;
       p = document.getElementById("password").value;
       c = document.getElementById("confirm_password").value;
       let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
       let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
       if(p.value=="" || c.value=="" || e.value=="" || n.value=="")
       {
              alert("Fields can not be empty");
              Error="True";
       
       }  
       else{
       
       if (!regName.test(n))
              Error += " Invalid name,";
       if (!regEmail.test(e))
              Error += "Invalid Email,";
       if (p.length < 8)
              Error += "Too short password";
       if (p.length > 20)
              Error += "Too long password";
       if (p != c)
              Error += "Passwords and Confirm passwords don't match";
       if (Error != " ")
              alert(Error);
}
if(Error===" ")
{
       registering(n,e,p);
}
}
async function registering(n,e,p)
{
alert("Registering");
          await fetch('http://localhost:4000/register', {
                     method: 'POST',
                     headers: {
                            'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({
                            name: n.value,
                            email: e.value,
                            password: p.value,
                     })

              }).then(
                     res => { return res.Json() }
              ).then(data => console.log(data))
                     .catch(error => {
                            console.log('ERROR');
                     })
}