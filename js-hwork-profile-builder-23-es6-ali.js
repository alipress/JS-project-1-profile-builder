//convert es5 to es6
class Profile{
    constructor(name, email, profession, id){
        this.name = name;
        this.email = email;
        this.profession = profession;
        this.id = id;
    }
};

class Store{

    static addProfileLs(profile){
        let profiles;
        if(localStorage.getItem('profiles') === null){ profiles = []
    }else{
        profiles = JSON.parse(localStorage.getItem('profiles'));
    }
        profiles.push(profile);
        localStorage.setItem('profiles', JSON.stringify(profiles));
    }

    static getProfilesLs(){
        let profiles;
        if(localStorage.getItem('profiles') === null){ profiles = [];
        }else{
            profiles = JSON.parse(localStorage.getItem('profiles'));
        }
        return profiles;
    }
    
    static displayProfiles(){
        const profiles = Store.getProfilesLs();
        const ui =new UI();
        profiles.forEach((profile) => {
            ui.showProfiles(profile);
        });
    }

    static  deleteProfileLs(id){
        const profiles = Store.getProfilesLs();
        profiles.forEach((profile, index) => {
            if (profile.id === id){
                profiles.splice(index, 1);
            }
        });
       // filter method
       /*  const updatedProfile = profiles.filter(
            (profile) => profile.id !== id
        ); */
        localStorage.setItem('profiles', JSON.stringify(profiles));
    }
};
window.addEventListener('DOMContentLoaded', Store.displayProfiles);

class UI{
    // add profile
    showProfiles({ name, email, profession,id }){
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <th scope="col">${name}</th>
        <td>${email}</td>
        <td>${profession}</td>
        <input type = "hidden" data-id = '${id}'>
        <td><i class="fas fa-trash-alt" id="delete"></i></td>
        `;
       document.querySelector('#profile-list').appendChild(tr);
    };
    //clear field
    clearField(){
        const name = document.querySelector('#name').value = "";
        const email = document.querySelector('#email').value = "";
        const profession = document.querySelector('#profession').value = "";
    };
    //delete profile
    deleteProfile(target){
        if(target.id === 'delete'){
            target.parentElement.parentElement.remove();
            const id = Number(target.parentElement.previousElementSibling.dataset.id)
            Store.deleteProfileLs(id)
            const ui = new UI();
            ui.showAlert('Delete success','warning');
        }
    };
    // show alert
    showAlert(text, className){
        const div = document.createElement('div');
        const container = document.querySelector('.container');
        const form = document.querySelector('#profile-form');
        div.className = `alert alert-${className}`;
        div.textContent = text;
        container.insertBefore(div,form);

        setTimeout(() =>{
            document.querySelector('.alert').remove();
        }, 2000);
    };
    getId(){
        return document.querySelectorAll('tr').length
       
    }
    
    
};

// add event listener
document.querySelector('#profile-form').addEventListener('submit', (e) => {
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const profession = document.querySelector('#profession').value

    //instantiate
   
    const ui = new UI();
    const id = ui.getId();
   // console.log(getId);
     if(name === '' || email === '' || profession === ''){
         ui.showAlert('please check your input', 'danger');
     }else{
         const profile = new Profile(name, email, profession,id);

         ui.showAlert('Profile added successfully', 'success');
         Store.addProfileLs(profile);
         ui.showProfiles(profile);
         ui.clearField();
     } 
    
    
    e.preventDefault();
});
// add event listener (using event bubbling)

document.querySelector('#profile-list').addEventListener('click', (e) => {
   const ui = new UI();
   ui.deleteProfile(e.target);
});