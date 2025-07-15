/* STEP 2: Reference the HEADER and the SECTION elements with variables */
const header = document.querySelector("header");
const section = document.querySelector("section");
// STEP 3a: Create the asynchronous function populate()
async function populate(){


    // Introducing JavaScript Object Notation (JSON): https://json.org/
    // STEP 4: Store the URL of a JSON file in a variable */
    let url = "https://nathanpage2.github.io/comp1073s25-Week10/js/i-scream.json";
    // STEP 5: Use the new URL to create a new request object
    let request = new Request(url);
    console.log(request);
    // STEP 6: Make a network request with the fetch() function, which returns a Response object
    let response = await fetch(request);
    console.log(response);
    // STEP 7: Capture the returned Response object and covert to a JSON object using json()
    let responseJson = await response.json();
    // STEP 8: Output the iScream JSON object to the console 
    console.log(responseJson);
    // STEP 9a: Invoke the populateHeader function here, then build it below
    populateHeader(responseJson);
    // STEP 10a: Invoke the showTopFlavors function here, then build it below
    showTopFlavors(responseJson)


// STEP 3b: Call the populate() function
}
populate();

/* STEP 9b: Build out the populateHeader() function */
function populateHeader(jsonBody) {
    // Create the H1 element
    let h1 = document.createElement("h1");
    let para = document.createElement("p");
    // Grab the company name from the JSON object and use it for the text node
    h1.textContent =jsonBody.companyName;
    para.textContent = `Head Office: ${jsonBody.headOffice}, est. ${jsonBody.established} - Active: ${jsonBody.active? "Yes" : "No"}`;
    // Inject the complete H1 element into the DOM, inside the HEADER
    header.appendChild(h1);
    header.appendChild(para);
};
/* STEP 10b: Assemble the showTopFlavors() function */
function showTopFlavors(jsonBody) {
    // STEP 10c: Attache the JSON topFlavors object to a variable
    let topFlavors = jsonBody.topFlavors;
    
    // Define calorie multipliers for different types.
    const typeCalories = {
        "Ice Cream": 1.0,      // Base calories
        "Sorbet": 0.7,         // 30% fewer calories
        "Milk Shake": 1.5,     // 50% more calories
        "Scoop": 1.2           // 20% more calories
    };
    
    // STEP 10d: Loop through the topFlavors object
    for (let i = 0; i < topFlavors.length; i ++) {
        console.log(topFlavors[i]);
        // STEP 10e: build HTML elements for the content
        let article = document.createElement("article");
        let h2 = document.createElement("h2");
        let image = document.createElement("img");
        let p1 = document.createElement("p");
        let p2= document.createElement("p");
        let list = document.createElement("ul");
        if (topFlavors[i].calories > 300){
            p1.style.color = 'red';
        }
        
        // Create type selector.
        let typeSelector = document.createElement("select");
        typeSelector.className = "type-selector";
        typeSelector.setAttribute("data-flavor-index", i);
        typeSelector.setAttribute("data-base-calories", topFlavors[i].calories);
        
        // Add options for each type.
        const types = ["Ice Cream", "Sorbet", "Milk Shake", "Scoop"];
        types.forEach(type => {
            let option = document.createElement("option");
            option.value = type;
            option.textContent = type; // Already properly capitalized
            if (type.toLowerCase() === topFlavors[i].type.toLowerCase()) {
                option.selected = true;
            }
            typeSelector.appendChild(option);
        });
        
        // STEP 10f: Set the textContent property for each of the above elements (except the UL), based on the JSON content
        h2.textContent = topFlavors[i].name;
        p1.textContent = "Calories: " + topFlavors[i].calories;
        p2.textContent = "Type: " + topFlavors[i].type;
        image.setAttribute("src", topFlavors[i].image);

        // STEP 10g: Build a loop for the ingredients array in the JSON
        let ingredients = topFlavors[i].ingredients;
        for (let j = 0; j < ingredients.length; j++){
            let listItem = document.createElement("li");
            listItem.textContent = ingredients[j];
            list.appendChild(listItem);
        }
            // add the ingredient to the UL

        // STEP 10h: Append each of the above HTML elements to the ARTICLE element
        article.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(typeSelector);
        article.appendChild(list);
        article.appendChild(image);
        // STEP 10i: Append each complete ARTICLE element to the SECTION element
        section.appendChild(article);
        
        // Add event listener to type selector.
        typeSelector.addEventListener("change", function() {
            const flavorIndex = parseInt(this.getAttribute("data-flavor-index"));
            const baseCalories = parseInt(this.getAttribute("data-base-calories"));
            const selectedType = this.value;
            const multiplier = typeCalories[selectedType] || 1.0; // Revert back to default just incase.
            const newCalories = Math.round(baseCalories * multiplier);
            
            // Update the calories display with visual feedback.
            const caloriesElement = article.querySelector("p");
            caloriesElement.textContent = "Calories: " + newCalories;
            caloriesElement.classList.add("calories-updated");
            
            // Update color based on new calories.
            if (newCalories > 300) {
                caloriesElement.style.color = 'red';
            } else {
                caloriesElement.style.color = 'blue';
            }
            
            // Remove the highlight after 2 seconds.
            setTimeout(() => {
                caloriesElement.classList.remove("calories-updated");
            }, 2000);
            
            // Update the type display.
            const typeElement = article.querySelectorAll("p")[1];
            typeElement.textContent = "Type: " + selectedType;
            
            // Show calorie change info.
            const originalCalories = topFlavors[flavorIndex].calories;
            if (newCalories !== originalCalories) {
                const change = newCalories > originalCalories ? "+" + (newCalories - originalCalories) : (newCalories - originalCalories);
                console.log(`${topFlavors[flavorIndex].name}: ${originalCalories} → ${newCalories} (${change} calories)`);
            }
        });
    };
};
// STEP 11: The instructor will edit the JSON file - refresh your page to see the updated content

// STEP 12: Change the URL in STEP 3 to point to the JSON file in the local /js folder in order to prepare for today's lab

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

// A special thanks to https://openclipart.org/detail/285225/ice-cream-cones for the awesome ice cream cone illustrations
