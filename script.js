const init = () => {
    fetch("https://waraclecodetesting.azurewebsites.net/api/restaurants")
    .then(res => res.json())
    .then( restaurantData => {
        // Turn input [[{...restaurant}, {...restaurant2}]] in to ['<tr>...</tr><tr>...</tr>']
        const generatedHTML = restaurantData.map( row => 
            `<tr>
            ${
                // Use reduce as final array may be shorter than input array due to excluding all restaurants in city 'Bielefeld'
                row.reduce((elString, restaurant) => 
                    restaurant.address.city.toLowerCase() === 'bielefeld'
                    ? elString
                    : elString + `<td>
                        <h3>${restaurant.name}</h3>
                        <p>${restaurant.desc.length < 20 ? restaurant.desc : restaurant.desc.slice(0, 20) + '...'}</p>
                        <p>${restaurant.phone}</p>
                        <p>${restaurant.address.number} ${restaurant.address.street}, ${restaurant.address.city}, 
                        ${restaurant.address.country}</p>
                    </td>`
                , '')
            }
            </tr>`
        );

        // Insertion point for generated HTML
        const root = document.querySelector('#root');
        root.innerHTML = `<table>${generatedHTML.join("")}</table>`;
    });
};

init();
