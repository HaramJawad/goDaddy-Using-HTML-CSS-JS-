// selecting the html elements 
const domainInput = document.getElementById('domain-input')
const searchDomainButton = document.getElementById('searchDomain-btn')
const mainImageSection = document.querySelector('.image-section')
const domainNamesList = document.getElementById('domain-names-list')
const websiteAndHostingList = document.getElementById('websites-and-hosting-list')
const moreList = document.getElementById('more-list')
const allParentLists = document.querySelectorAll('.parentList')
const getStartedButton = document.getElementById('getStartedButton')
const secondSectionFirstItem = document.getElementById('success-steps')
const thirdImageSection = document.querySelector('.img-section')
const secondSectionItems = document.querySelectorAll('.secondSectionItem')
const allImageDivs = document.querySelectorAll('.flex-images');
const popupOverlay = document.getElementById('image-popup');
const largeImage = document.getElementById('large-image');
const closeBtn = document.getElementById('close-popup');
const emailAddressInput = document.getElementById('emailAddressInput')
const signUpButton = document.getElementById('signUp-Btn')
const signUpSectionFirstPart = document.querySelector('.signup-section-first-part')
const extensionPrices = {
    '.online': 0.99,
    '.net': 14.99,
    '.inc': 999.99,
    '.more': 11.99,
    // Add other extensions and their prices here
};
//  Remove the old messages
function clearMessages() {
    const oldErrors = document.querySelectorAll('.message')
    const oldLoading = document.querySelectorAll('.message')
    oldErrors.forEach(msg => msg.remove())
    oldLoading.forEach(msg => msg.remove())
}
// SearchDomain Logic
function searchDomainLogic() {
    clearMessages()
    const userInputValue = domainInput.value.trim().toLowerCase();
    if (userInputValue === "") {
        const emptyInputError = "Please enter a domain name"
        searchDomainUI(emptyInputError, "warning")
    }
    else if (userInputValue.length < 3) {
        const shortDomainError = "Domain name is too short"
        searchDomainUI(shortDomainError, "warning")
    }
    else {
        waiting(userInputValue);
    }
}
async function waiting(userInputValue) {
    const loadingMessage = "⏳ Checking availability…"
    // waiting for the promise to resolve 
    await showingLoadingUI(loadingMessage)
    if (userInputValue.includes("google") || userInputValue.includes("facebook") || userInputValue.includes("shop") || userInputValue.includes("tech")) {
        const result = "Domain is taken"
        searchDomainUI(result, "error")
    }
    else {
        const result = "Domain is available"
        searchDomainUI(result, "success")
    }
}
// searchDomain UI
function searchDomainUI(message, type) {
    const errorMessage = document.createElement('p')
    errorMessage.classList.add('message', type)
    errorMessage.textContent = message
    // Insert the new element immediately before the existing element
    mainImageSection.insertAdjacentElement('beforebegin', errorMessage);

}
function showingLoadingUI(message) {
    const loadingMessage = document.createElement('p')
    // giving class to loadingMessage element
    loadingMessage.classList.add('message', 'loading')
    loadingMessage.textContent = message
    // Insert the new element immediately before the existing element
    mainImageSection.insertAdjacentElement('beforebegin', loadingMessage);
    loadingMessage.style.color = "#2563EB"
    // Return a Promise that resolves after the timeout
    return new Promise((resolve) => {
        // Hide the message after 3 seconds
        setTimeout(() => {
            loadingMessage.style.display = 'none';
            resolve();
        }, 3000);
    });
}
// on search domain button click
searchDomainButton.addEventListener('click', () => {
    searchDomainLogic();
});

// Add an event listener for the 'keydown' event on the input field
domainInput.addEventListener('keydown', function (event) {
    // Check if the key pressed is the Enter key (key code 13 or event.key === 'Enter')
    if (event.key === 'Enter') {
        // Prevent the default behavior (e.g., form submission if it's in a form)
        event.preventDefault();
        searchDomainLogic();
    }
});
function removingPreviousHighlights() {
    const previousHightLights = document.querySelectorAll('.highlight')
    previousHightLights.forEach(msg => msg.classList.remove('highlight'))
}
function clearingSelectedDomainAndPriceMsg() {
    const invalidDomainMsg = document.querySelectorAll('.invalid-domain-msg')
    const previousSelectedDomain = document.querySelectorAll('.selected-domain')
    const previousSelectedDomainPrice = document.querySelectorAll('.selected-domain-price')
    const previousSelectedDomainAvailability = document.querySelectorAll('.selected-domain-availability')
    invalidDomainMsg.forEach(msg => msg.remove())
    previousSelectedDomain.forEach(msg => msg.remove())
    previousSelectedDomainPrice.forEach(msg => msg.remove())
    previousSelectedDomainAvailability.forEach(msg => msg.remove())
}
function selectedDomainLogic(event) {
    // Get the extension name from the clicked element
    const clickedExtension = event.target.textContent
    const parentDiv = event.target.parentNode
    // Look up the price
    const price = extensionPrices[clickedExtension];
    if (price !== undefined) {
        parentDiv.classList.add('highlight')

    } else {
        console.log("No price found...")
    }
    selectedDomainUI(price, clickedExtension)
}
// helper function for the validDomain
function invalidDomainUI(message) {
    // creating a new element for showing empty input msg
    const emptyDomain = document.createElement('p')
    emptyDomain.classList.add('invalid-domain-msg')
    emptyDomain.textContent = message
    // Insert the new element immediately before the existing element
    mainImageSection.insertAdjacentElement('beforebegin', emptyDomain);
}
// helper function for the validDomain
function validDomainUI(userInputValue, clickedExtension, availabilityMsg, price) {
    // creating a new element for showing selected domain
    const selectedDomain = document.createElement('p')
    selectedDomain.classList.add('selected-domain')
    selectedDomain.textContent = `Selected domain:${userInputValue}${clickedExtension}`
    // Insert the new element immediately before the existing element
    mainImageSection.insertAdjacentElement('beforebegin', selectedDomain);
    // creating a new element for showing domain is available or not
    const selectedDomainAvailability = document.createElement('p')
    selectedDomainAvailability.classList.add('selected-domain-availability')
    selectedDomainAvailability.textContent = availabilityMsg
    mainImageSection.insertAdjacentElement('beforebegin', selectedDomainAvailability);
    // creating a new element for showing selected domain's price
    const selectedDomainPrice = document.createElement('p')
    selectedDomainPrice.classList.add('selected-domain-price')
    selectedDomainPrice.textContent = `Price:$${price}/year`
    // Insert the new element immediately before the existing element
    mainImageSection.insertAdjacentElement('beforebegin', selectedDomainPrice);
}
function selectedDomainUI(price, clickedExtension) {
    clearingSelectedDomainAndPriceMsg()
    const userInputValue = domainInput.value.trim().toLowerCase();
    console.log("the userINPUTvalue is:::", userInputValue)
    if (userInputValue === "") {
        const emptyDomainMsg = "Please enter a domain name first"
        invalidDomainUI(emptyDomainMsg)
    }
    else if (userInputValue.length < 3) {
        const invalidDomainMsg = "Please enter a valid domain name first"
        invalidDomainUI(invalidDomainMsg)
    }
    else if (userInputValue.includes("google") || userInputValue.includes("facebook") || userInputValue.includes("shop") || userInputValue.includes("tech")) {
        const availabilityMsg = "❌ This domain is already taken"
        validDomainUI(userInputValue, clickedExtension, availabilityMsg, price)
    }
    else {
        const availabilityMsg = "✔️ This domain is available"
        validDomainUI(userInputValue, clickedExtension, availabilityMsg, price)
    }
}
// selectiing the domains
document.querySelectorAll('.domain').forEach(span => {
    span.addEventListener('click', (event) => {
        removingPreviousHighlights()
        selectedDomainLogic(event)
    });
});
// helper function for adding dropdown in headerLists Logic
function addDropdownLogicHelper(items, selectedList) {
    addDropdownUIHelper(items, selectedList)
}
// helper function for adding dropdown in headerLists UI
function addDropdownUIHelper(items, selectedList) {
    //  Create the main container for the dropdown ( a new <ul>)
    const dropdownUl = document.createElement('ul');
    dropdownUl.classList.add('dropdown-menu'); // Add a class for styling

    //  Create and append the individual list items to the dropdown <ul>
    items.forEach(itemData => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = itemData.url;
        a.textContent = itemData.text;
        li.appendChild(a);
        dropdownUl.appendChild(li);
    });

    // Append the newly created dropdown <ul> to the parent <li>
    selectedList.appendChild(dropdownUl);
}
// Function to add the dropdown in headerLists
function addDropdownToHeaderListsLogic() {
    const domainDropdownItems = [
        { text: '.com Domains', url: './com' },
        { text: '.net Domains', url: './net' },
        { text: '.org Domains', url: './org' },
        { text: '.shop Domains', url: './shop' },
        { text: 'Domain Name Search', url: './search' },
        { text: 'Domain Transfer', url: './transfer' },
    ]

    const websiteDropdownItems = [
        { text: 'Website Builder', url: './builder' },
        { text: 'WordPress Hosting', url: './wordpress' },
        { text: 'Web Hosting Plans', url: './hosting' },
        { text: 'Online Store', url: './store' },
        { text: 'SSL Security', url: './ssl' },
        { text: 'Email & Microsoft 365', url: './email' },
    ]

    const moreDropdownItems = [
        { text: 'Resources', url: './resources' },
        { text: 'Partner Programs', url: './partners' },
        { text: 'Account', url: './account' },
        { text: 'Help Center', url: './help' },
        { text: 'GoDaddy Blog', url: './blog' },
        { text: 'Legal & Policies', url: './legal' },
    ]
    // calling the helper function for logic
    addDropdownLogicHelper(domainDropdownItems, domainNamesList)
    addDropdownLogicHelper(websiteDropdownItems, websiteAndHostingList)
    addDropdownLogicHelper(moreDropdownItems, moreList)

}
// function call
addDropdownToHeaderListsLogic()
// showing the dropdowns on click
function showDropdownBoxes(dropdownMenu) {
    dropdownMenu.classList.add('active');
}
// adding 'click' event listener on all the parentLists
allParentLists.forEach(li => {
    li.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedList = e.currentTarget;
        const dropdownMenu = selectedList.querySelector('.dropdown-menu');
        showDropdownBoxes(dropdownMenu)
    });
});
// Function to hide all dropdown boxes
function hideAllDropdownBoxes() {
    document.querySelectorAll('.dropdown-menu').forEach(box => {
        box.classList.remove('active');
    });
}
//  Add a global event listener to the document to hide the dropdown
document.addEventListener('click', (event) => {
    let clickedInsideBox = false;

    // Check if the click occurred inside any of the dropdown boxes
    document.querySelectorAll('.dropdown-menu').forEach(box => {
        if (box.contains(event.target)) {
            clickedInsideBox = true;
        }
    });

    // If the click was not inside a box and not on a list item 
    if (!clickedInsideBox) {
        hideAllDropdownBoxes();
    }
});
getStartedButton.addEventListener('click', () => {
    smoothScroll()
});

function smoothScroll() {
    // Scroll smoothly first
    secondSectionFirstItem.scrollIntoView({ behavior: 'smooth' });

    //  Remove animation class to reset
    secondSectionFirstItem.classList.remove('show');

    //  Use setTimeout to ensure browser sees the state change
    setTimeout(() => {
        secondSectionFirstItem.classList.add('show');
    }, 50); // 50ms delay is enough for browser to register

    //  remove 'show' after animation ends so it's ready for next click
    setTimeout(() => {
        secondSectionFirstItem.classList.remove('show');
    }, 950);
}
// Intersection Observer 
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // The element is in view
            entry.target.classList.add('show');
        }
        else {
            entry.target.classList.remove('show'); // reset for next scroll
        }
    });
}, {
    threshold: 0.5 // triggers when 50% of the element is visible
});

// Observe each secondSectionItem individually
secondSectionItems.forEach(item => observer.observe(item));

// MODAL PREVIEW
// Create ONE modal globally
const modalPreview = document.createElement('div');
modalPreview.className = 'modalPreview';

const modalContent = document.createElement('div');
modalContent.className = 'modalContent';

const modalImg = document.createElement('img');

const closeButton = document.createElement('button');
closeButton.className = 'modalClose';
closeButton.textContent = '✕';

// Build modal structure
modalContent.appendChild(closeButton);
modalContent.appendChild(modalImg);
modalPreview.appendChild(modalContent);

// Open modal
allImageDivs.forEach(imgDiv => {
    imgDiv.addEventListener('click', () => {
        const img = imgDiv.querySelector('img');
        modalImg.src = img.src;

        document.body.appendChild(modalPreview);
        document.body.style.overflow = 'hidden';
    });
});

// Close modal (button)
closeButton.addEventListener('click', closeModal);

// Close modal (click outside)
modalPreview.addEventListener('click', e => {
    if (e.target === modalPreview) closeModal();
});

function closeModal() {
    modalPreview.remove();
    document.body.style.overflow = '';
}

// Newsletter Email Validation
signUpButton.addEventListener('click', () => {
    validateEmail()
}
)
function validateEmail() {
    clearingSignUpMessages()
    const emailAddress = emailAddressInput.value
    // creating element for messages
    const message = document.createElement('p')
    message.classList.add('signUpMessages')
    signUpSectionFirstPart.appendChild(message)
    if (emailAddress === "") {
        message.textContent = "Email Address cannot be empty"
        message.classList.add('error')
    }
    else if (!isValidEmail(emailAddress)) {
        message.textContent = "Please enter a valid email address"
        message.classList.add('error')
    }
    else {
        message.textContent = "You successfully sign up"
        message.classList.add('success')
    }
}
function isValidEmail(email) {
    // A standard regular expression for general email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function clearingSignUpMessages() {
    document.querySelectorAll('.signUpMessages').forEach(msg => {
        msg.remove()
    }
    )
}
