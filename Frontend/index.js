// Write your code below:
async function handleFormSubmit(event) {
    event.preventDefault()
    const obj = {
        name: event.target.name.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
    }
    let email;
    await axios.get(`http://localhost:3000/user/email/${obj.email}`).then((res)=>{
        email = res.data.email;
    }).catch((err)=>{
        console.log(err)
    })
    console.log(email)
    if (email == null) {
        await axios.post('http://localhost:3000/user', {data:JSON.stringify(obj)})
          .then((res) => {
            displayUserOnScreen(res.data)
            console.log(res);
          }, (err) => {
            console.log(err);
          });
    }
    const form = document.getElementById("form")
    form.reset()
}

function displayUserOnScreen(data){
    const ul = document.querySelector("ul");
        let listItem = document.createElement("li");
        const delButton = document.createElement("button");
        delButton.textContent = "Delete";
        delButton.className = "delete";
        listItem.appendChild(delButton)
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";
        listItem.textContent = `${data.name}-${data.email}-${data.phone}-`;
        listItem.appendChild(delButton)
        listItem.appendChild(editButton)
        ul.appendChild(listItem);
}

const ul = document.querySelector("ul");
if (ul != null) {
    ul.addEventListener("click", async function (e) {
        e.preventDefault()
        if (e.target.classList.contains("delete")) {
            ul.removeChild(e.target.parentElement);
            const text = e.target.parentElement.textContent.split("-")
            console.log(text[1])
            await axios.delete(`http://localhost:3000/user/${text[1]}`).then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
        }else if(e.target.classList.contains("edit")){
            ul.removeChild(e.target.parentElement);
            const text = e.target.parentElement.textContent.split("-")
            await axios.delete(`http://localhost:3000/user/${text[1]}`).then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const phone = document.getElementById("phone");
            name.value = text[0];
            email.value = text[1];
            phone.value = text[2];
        }
    })
}

window.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault();
    axios
      .get(
        "http://localhost:3000/user"
      )
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          displayUserOnScreen(response.data[i])
        }
      })
      .catch((error) => console.log(error));
  })