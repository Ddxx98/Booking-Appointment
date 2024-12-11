// Write your code below:
async function handleFormSubmit(event) {
    event.preventDefault()
    const obj = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
    }
    let email;
    await axios.get(`http://localhost:3000/user/email/${obj.email}`).then((res)=>{
        console.log(res.data.email)
        email = res.data.email;
    }).catch((err)=>{
        console.log(err)
    })
    console.log(email)
    if (email == null) {
        await axios.post('http://localhost:3000/user', {data:JSON.stringify(obj)})
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
        const ul = document.querySelector("ul");
        let listItem = document.createElement("li");
        const delButton = document.createElement("button");
        delButton.textContent = "Delete";
        delButton.className = "delete";
        listItem.appendChild(delButton)
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";
        listItem.textContent = `${event.target.username.value}-${event.target.email.value}-${event.target.phone.value}`;
        listItem.appendChild(delButton)
        listItem.appendChild(editButton)
        ul.appendChild(listItem);
    }
}
const ul = document.querySelector("ul");
if (ul != null) {
    ul.addEventListener("click", function (e) {
        e.preventDefault()
        if (e.target.classList.contains("delete")) {
            ul.removeChild(e.target.parentElement);
            const text = e.target.parentElement.textContent.split("-")
            localStorage.removeItem(text[1])
        }else if(e.target.classList.contains("edit")){
            ul.removeChild(e.target.parentElement);
            const text = e.target.parentElement.textContent.split("-")
            const user = JSON.parse(localStorage.getItem(text[1]));
            localStorage.removeItem(text[1])
            const username = document.getElementById("username");
            const email = document.getElementById("email");
            const phone = document.getElementById("phone");
            username.value = user.username;
            email.value = user.email;
            phone.value = user.phone;
        }
    })
}