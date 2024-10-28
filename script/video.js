// 1. Fetch, Load and Show Categories on html

// create loadCategories

const loadCategories = () => {
    fetch ('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.error(error))
    
    
}

// Create displayCategories

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');

    categories.forEach(item => {
        console.log(item);
        // create button 
        const button = document.createElement("button");
        button.classList = "btn" ;
        button.innerText = item.category ;

        // add button to category container
        categoryContainer.appendChild(button);

        
    })
    
}

loadCategories();