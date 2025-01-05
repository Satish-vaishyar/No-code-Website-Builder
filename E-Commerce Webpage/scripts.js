// Variables for preview area and shop info
const previewArea = document.getElementById('product-preview');
const shopInfo = document.getElementById('shop-info');
const shopNamePreview = document.getElementById('shop-name-preview');
const shopAddressPreview = document.getElementById('shop-address-preview');
 
let shopDisplayed = false;

// User-defined function to add a product
function addProduct() {
    const shopName = document.getElementById('shop-name').value;
    const shopAddress = document.getElementById('shop-address').value;
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const imageInput = document.getElementById('product-image');
    let whatsappNumber = document.getElementById('whatsapp-number').value;

    // Validate input fields
    if (!shopName || !shopAddress || !name || !description || !price || !imageInput.files[0] || !whatsappNumber) {
        alert('Please fill all fields and select an image.');
        return;
    }

    // Ensure the WhatsApp number includes the country code +91
    if (!whatsappNumber.startsWith('+91')) {
        whatsappNumber = '+91' + whatsappNumber;
    }

    // Validate the WhatsApp number length
    const numberWithoutCode = whatsappNumber.replace('+91', '');
    if (numberWithoutCode.length !== 10) {
        alert('Enter a 10 digit WhatsApp number.');
        return;
    }

    // Display shop info if not already displayed
    if (!shopDisplayed) {
        shopNamePreview.textContent = shopName;
        shopAddressPreview.textContent = `Address: ${shopAddress}`;
        shopInfo.style.display = 'block';
        shopDisplayed = true;
    }

    // Read the image file and create the product HTML
    const reader = new FileReader(); // Built-in function
    reader.onload = (e) => {
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=I'm%20interested%20in%20your%20product%20${encodeURIComponent(name)}.`;

        const productHTML = `
            <div class="product-preview">
                <h3>${name}</h3>
                <p>${description}</p>
                <p><strong>Price:</strong> $${price}</p>
                <img src="${e.target.result}" alt="${name}"><br>
                <a href="${whatsappLink}" class="buy-now" target="_blank"><i class="fab fa-whatsapp"></i> Buy Now</a>
                <button onclick="deleteProduct(this.parentElement)" class="delete-product"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
        `;

        if (previewArea.innerHTML.trim() === '<p>No products added yet.</p>') {
            previewArea.innerHTML = productHTML;
        } else {
            previewArea.innerHTML += productHTML;
        }
    };
    reader.readAsDataURL(imageInput.files[0]);
}

// User-defined function to delete a product
function deleteProduct(productElement) {
    productElement.remove();
    if (previewArea.innerHTML.trim() === '') {
        previewArea.innerHTML = '<p>No products added yet.</p>';
    }
}

// User-defined function to export CSS
function exportCSS() {
    const cssContent = `
/* Basic styles for the body and layout */
body {
    font-family: 'Roboto', Arial, sans-serif;
    margin: 0;
    display: flex;
    flex-direction: row;
    height: 100vh;
    background-color: #f1f7ed;
}

/* Sidebar styles */
.sidebar {
    width: 30%;
    background-color: #7ca982;
    padding: 20px;
    border-right: 1px solid #ccc;
    overflow-y: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.sidebar h2 {
    font-size: 1.5rem;
    color: #243e36;
    margin-bottom: 20px;
    text-align: center;
}

.sidebar .form-group {
    margin-bottom: 15px;
}

.sidebar .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #243e36;
}

.sidebar .form-group input,
.sidebar .form-group textarea {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: #afe1af;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.sidebar .form-group input:focus,
.sidebar .form-group textarea:focus {
    background-color: #d6f5d6;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

/* Main area styles */
.main-area {
    flex-grow: 1;
    padding: 20px;
    overflow: auto;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.main-area h2 {
    font-size: 1.5rem;
    color: #243e36;
    margin-bottom: 20px;
    text-align: center;
}

/* Product grid styles */
.product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 1200px;
}

/* Product preview styles */
.product-preview {
    border: 1px solid #ddd;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-preview:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-preview h3 {
    font-size: 1.25rem;
    color: #243e36;
    margin-bottom: 10px;
}

.product-preview p {
    color: #243e36;
    margin-bottom: 10px;
}

.product-preview img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
}

/* Button styles */
button {
    display: block;
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    cursor: pointer;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.buy-now {
    margin-top: 15px;
    display: inline-block;
    padding: 10px 15px;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.buy-now:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Response container styles */
.response_container {
    border: 2px solid black;
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Loading spinner styles */
.spinner {
    display: none;
    margin: 10px auto;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #243e36;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`;

    const blob = new Blob([cssContent], { type: 'text/css' }); // Built-in function
    const a = document.createElement('a'); // Built-in function
    a.href = URL.createObjectURL(blob); // Built-in function
    a.download = 'styles.css';
    a.click(); // Built-in function
}

// User-defined function to export HTML
function exportHTML() {
    const shopName = document.getElementById('shop-name').value;
    const shopAddress = document.getElementById('shop-address').value;
    let productHTML = previewArea.innerHTML;
    productHTML = productHTML.replace(/<button.*?delete-product.*?<\/button>/g, ''); // Remove delete buttons

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${shopName}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="main-area">
        <div id="shop-info" style="margin-bottom: 20px;">
            <h2>${shopName}</h2>
            <p>Address: ${shopAddress}</p>
            <hr>
        </div>
        <div class="product-grid">
            ${productHTML}
        </div>
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' }); // Built-in function
    const a = document.createElement('a'); // Built-in function
    a.href = URL.createObjectURL(blob); // Built-in function
    a.download = 'ecommerce.html';
    a.click(); // Built-in function
}

// User-defined function to preview website
function previewWebsite() {
    const shopName = document.getElementById('shop-name').value;
    const shopAddress = document.getElementById('shop-address').value;
    let productHTML = previewArea.innerHTML;
    productHTML = productHTML.replace(/<button.*?delete-product.*?<\/button>/g, ''); // Remove delete buttons

    const previewWindow = window.open('', '_blank'); // Built-in function
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${shopName}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="main-area">
        <div id="shop-info" style="margin-bottom: 20px;">
            <h2>${shopName}</h2>
            <p>Address: ${shopAddress}</p>
            <hr>
        </div>
        <div class="product-grid">
            ${productHTML}
        </div>
    </div>
</body>
</html>`;

    previewWindow.document.write(htmlContent); // Built-in function
    previewWindow.document.close(); // Built-in function
}

// AI Response Generator
// Function to get completion from the API (User-defined function)
async function getCompletion() {
    // Get the prompt value from the input element
    const prompt = document.getElementById('prompt').value;
    // Get the response element to display the result
    const responseElement = document.getElementById('response');

    // API URL
    const url = 'http://localhost:1229/v1/completions'; // Updated URL to localhost
    // Data to be sent in the request body
    const data = {
        model: 'llama-3.2-1b-instruct',  // Use the compatible model
        prompt: prompt,
        max_tokens: 100
    };

    try {
        // Make a POST request to the API
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Check if the response is not ok
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const result = await response.json();
        let text = result.choices[0].text;

        // Replace **text** with <b>text</b>
        text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

        // Display the result in the response element
        responseElement.innerHTML = text;
    } catch (error) {
        // Display the error message in the response element
        responseElement.textContent = 'Error: ' + error.message;
    }
}
