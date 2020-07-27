function Profile(name, email, profession){
    this.name = name;
    this.email = email;
    this.profession = profession;
};

function UI() {}

UI.prototype.showProfiles = function ({name, email, profession}){
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <th scope="col">${name}</th>
    <td>${email}</td>
    <td>${profession}</td>
    <td><i class="fas fa-trash-alt" id="delete"></i></td>
    `;
    // instantiate
    const ui = new UI();
    if(name === '' || email === '' || profession === ''){
        ui.showAlert('please check your input', 'danger');
    }else{
        document.querySelector('#profile-list').appendChild(tr);
        ui.showAlert('profile added successfully', 'success');
    }
};
//clear field
UI.prototype.clearField = function(){
    const name = document.querySelector('#name').value = "";
    const email = document.querySelector('#email').value = "";
    const profession = document.querySelector('#profession').value = "";
}

// delete
UI.prototype.deleteProfile = function (target){
    if(target.id === 'delete'){
        target.parentElement.parentElement.remove();
        console.log('Delete success'); 
        const ui = new UI();
        ui.showAlert('Delete success','warning');
    }
};

UI.prototype.showAlert = function(text, className){
    const div = document.createElement('div');
    const container = document.querySelector('.container');
    const form = document.querySelector('#profile-form');
    div.className = `alert alert-${className}`;
    div.textContent = text;
    container.insertBefore(div,form);
    setTimeout(() =>{
        document.querySelector('.alert').remove();
    }, 2000);
}

// add event listener
document.querySelector('#profile-form').addEventListener('submit', (e) => {
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const profession = document.querySelector('#profession').value

    //instantiate
    const profile = new Profile(name, email, profession);
    const ui = new UI();
    ui.showProfiles(profile);
    ui.clearField();
    
    e.preventDefault();
});
// add event listenter (using event bubbling)

document.querySelector('#profile-list').addEventListener('click', (e) => {
   const ui = new UI();
   ui.deleteProfile(e.target);
});