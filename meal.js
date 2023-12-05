// // console.log("Loaded");

// // fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata')
// //     .then((response) => response.json())
// //     .then((json) => console.log(json))


// // on utilise la méthode HTTP POST
// async function addPost() {
//     try {
//       const options = {
//         method: "GET",
//         Headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       // fetch accepte en second paramètre un objet qui contient :
//       // la méthode HTTP utilisée
//       // le corps ou body de la requête
//       // les headers éventuels en l'occurence le format des données que l'on envoie au serveur
//       const response = await fetch(
//         "https://www.themealdb.com/api/json/v1/1/list.php?c=list",
//       );
  
//       const data = await response.json();
  
//       return data
//     } catch (error) {
//       console.log(error);
//     }
//   }
  

//   async function recette() {
//     const categories = await addPost();
//     console.log(categories) 

//     try {

//     for (const category of categories.meals) {
//         const container = document.querySelector('.container')
//         container.innerHTML += `
//         <ul>
//         <li>${category.strCategory}</li>
//         </ul>
//         `
//     }

//     } catch (error) {
//         console.log('error', error)
//     }
//   }

//   recette()


async function getAlcohol() {
    try{
        const response = await fetch(
               "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass")

      const data = await response.json();
  
      return data
    } catch (error) {
        console.log('error')
    }
}

async function cocktails() {
         const alcool= await getAlcohol();
        console.log(alcool) 
        try {
        for (const objet of alcool.drinks) {
         const container = document.querySelector('.container')

         container.innerHTML += `
         <h2>${objet.strDrink}</h2>
         `
        }
            
        }
        catch{

        }
}
cocktails()
