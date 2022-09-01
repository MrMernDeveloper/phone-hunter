const loadPhones = async (searchText , dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json()
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones , dataLimit) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerHTML = ``
    // console.log(phones.length);

    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit &&  phones.length > 10) {
        phones = phones.slice(0, 10)  
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }
    
    const noPhone = document.getElementById('no-found-message')
    if (phones.length == 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    phones.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card h-100 rounded">
                    <div class="design ">
                     <img src="${phone.image}" class="card-img-top p-4" alt="..."></div>
                   
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">The phone is 100% original and official with 2 years official gurenty</p>
                        <button onclick="loadPhoneDetails('${phone.slug}')" class ="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                    </div>
                </div>
        `
        phoneContainer.appendChild(phoneDiv)
    });
    toggleSpiner(false);

}

const processSearch = (dataLimit) => {
    //start loader
    toggleSpiner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText , dataLimit);
}

// handel search button click

document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10);
   
})

// enter key search

document.getElementById('search-field').addEventListener('keypress', function (e) {
    console.log(e.key)
    if (e.key === 'Enter') {
        processSearch(10);
        // code for enter
    }
});

const toggleSpiner = isLoading => {
    const loadingSection = document.getElementById('loader')
    if (isLoading) {
        loadingSection.classList.remove('d-none');
    }
    else {
        loadingSection.classList.add('d-none')
    }
}

// not the best way to show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
    console.log(phone)
    
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML = ``
    const modalBody = document.createElement('div');
    modalBody.classList.add('col')
    modalBody.innerHTML = `
    <div class="card h-100 rounded w-75 h-50 mx-auto">
                    <div class="w-50 mx-auto">
                     <img src="${phone.image}" class="card-img-top " alt="..."></div>
                   
                    <div class="card-body">
                    <h5 class="card-title">${phone.name}</h5>
                    <p>${phone.releaseDate ? phone.releaseDate : 'NO Release Date'}</p>
                        <p class="card-textfw-bold">MainFeatures: </p>
                       <p> Storage: ${phone.mainFeatures.storage}</p>
                       <p> Display Size: ${phone.mainFeatures.displaySize}</p>
                       <p> chipSet: ${phone.mainFeatures.chipSet}</p>
                       <p>Bluthhoth: ${phone.others ? phone.others.Bluetooth : 'No Bluthhoth'}</p>
                    </div>
                </div>
    `
    modalContainer.appendChild(modalBody);
    
}

// loadPhones('apple'); 