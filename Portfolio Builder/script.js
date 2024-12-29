// Function to sync content from input fields to display fields
function syncContent() {
    document.getElementById('displayHeader').innerText = document.getElementById('headerInput').value;
    document.getElementById('displayName').innerText = document.getElementById('nameInput').value;
    document.getElementById('displayTitle').innerText = document.getElementById('titleInput').value;
    document.getElementById('displayImage').src = document.getElementById('imageInput').value;
    document.getElementById('displayAbout').innerText = document.getElementById('aboutInput').value;
    document.getElementById('displayProjects').innerText = document.getElementById('projectsInput').value;
    document.getElementById('displaySkills').innerText = document.getElementById('skillsInput').value;
    document.getElementById('displayPastCareer').innerText = document.getElementById('pastCareerInput').value;
    document.getElementById('displayFutureGoals').innerText = document.getElementById('futureGoalsInput').value;
    document.getElementById('displayMobile').innerHTML = `<i class="fas fa-phone"></i> ${document.getElementById('mobileInput').value}`;
    document.getElementById('displayEmail').innerHTML = `<i class="fas fa-envelope"></i> ${document.getElementById('emailInput').value}`;
    document.getElementById('linkedinLink').href = document.getElementById('linkedinInput').value;
    document.getElementById('linkedinLink').innerText = document.getElementById('linkedinInput').value;
    document.getElementById('githubLink').href = document.getElementById('githubInput').value;
    document.getElementById('githubLink').innerText = document.getElementById('githubInput').value;
    document.getElementById('facebookLink').href = document.getElementById('facebookInput').value;
    document.getElementById('facebookLink').innerText = document.getElementById('facebookInput').value;
    document.getElementById('instagramLink').href = document.getElementById('instagramInput').value;
    document.getElementById('instagramLink').innerText = document.getElementById('instagramInput').value;
    document.getElementById('displayEducation').innerText = document.getElementById('educationInput').value;

    const awardsContainer = document.getElementById('awardsContainer');
    awardsContainer.innerHTML = '';
    const certificates = document.querySelectorAll('.certificate');
    certificates.forEach((certificate, index) => {
        const awardImage = certificate.querySelector('.awardImageInput').value;
        const awardName = certificate.querySelector('.awardNameInput').value;
        const awardInfo = certificate.querySelector('.awardInfoInput').value;
        const awardHTML = `
            <div class="col-md-6 award">
                <img src="${awardImage}" alt="Award Image" class="img-fluid">
                <h3>${awardName}</h3>
                <p>${awardInfo}</p>
            </div>
        `;
        awardsContainer.innerHTML += awardHTML;
    });
}

// Event listener for sync button
document.getElementById('syncBtn').addEventListener('click', syncContent);

// Event listeners for input fields to sync content on input and focus
document.querySelectorAll('.editable-container input, .editable-container textarea').forEach(element => {
    element.addEventListener('input', syncContent);
    element.addEventListener('focus', function() {
        showProperties(element);
    });
});

// Event listener for add certificate button
document.getElementById('addCertificateBtn').addEventListener('click', function() {
    const certificatesContainer = document.getElementById('certificates');
    const certificateHTML = `
        <div class="certificate">
            <label>Award/Certification Image URL:</label>
            <input type="text" class="form-control awardImageInput" value="award.jpg">
            <label>Award/Certification Name:</label>
            <input type="text" class="form-control awardNameInput" value="Best Developer">
            <label>Award/Certification Info:</label>
            <textarea class="form-control awardInfoInput">Details about the award or certification...</textarea>
        </div>
    `;
    certificatesContainer.innerHTML += certificateHTML;

    // Add event listeners to the new inputs and textareas
    certificatesContainer.querySelectorAll('.awardImageInput, .awardNameInput, .awardInfoInput').forEach(element => {
        element.addEventListener('input', syncContent);
        element.addEventListener('focus', function() {
            showProperties(element);
        });
    });

    syncContent(); // Ensure the new certificate is synced immediately
});

// Ensure properties section is available for existing certification content
document.querySelectorAll('.awardImageInput, .awardNameInput, .awardInfoInput').forEach(element => {
    element.addEventListener('input', syncContent);
    element.addEventListener('focus', function() {
        showProperties(element);
    });
});

// Event listener for export button to export HTML
document.getElementById('exportBtn').addEventListener('click', function() {
    const canvasContent = document.querySelector('.canvas-container').innerHTML;
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    ${canvasContent}
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'portfolio.html';
    link.click();
});

// Event listener for export CSS button
document.getElementById('exportCssBtn').addEventListener('click', function() {
    const cssContent = `
body {
    font-family: 'Roboto', Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
}

header {
    background-color: #333;
    color: #fff;
    padding: 1rem;
    text-align: center;
    height: fit-content;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.container {
    width: 70%;
    float: center;
    margin: 1rem 0;
    padding: 1rem;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.profile {
    text-align: left;
    margin: 2rem 0;
    display: flex;
    justify-content: left;
    align-items: center;
}

.profile img {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile h1 {
    margin: 0.5rem 0;
    font-size: 2rem;
}

.profile p {
    color: #666;
    font-size: 1rem;
}

.profile-info {
    display: block;
    margin-left: 1rem;
    margin-top: .6rem;
}

section {
    margin: 2rem 0;
}

section h2 {
    border-bottom: 2px solid #333;
    padding-bottom: 0.5rem;
    font-size: 1.5rem;
}

#education p,
#skills p,
#projects p,
#pastCareer p,
#futureGoals p,
#contact p {
    color: #666;
    font-size: 1rem;
}

footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 1rem;
    width: 100%;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
}

.editable {
    border: 1px dashed #ccc;
    padding: 0.5rem;
    cursor: text;
}

.editable-container {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem 0;
    width: 25%;
    float: left;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.editable-container h2 {
    margin-top: 0;
    font-size: 1.5rem;
}

.editable-container input,
editable-container textarea {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.canvas-container {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem 0;
    width: 70%;
    float: right;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.award img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.properties-container {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem 0;
    width: 25%;
    float: left;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.properties-container h2 {
    margin-top: 0;
    font-size: 1.5rem;
}

.properties-container label {
    display: block;
    margin-top: 0.5rem;
}

.properties-container input,
.properties-container select {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
    .editable-container, .canvas-container {
        width: 100%;
        float: none;
        margin: 1rem 0;
    }

    .container {
        width: 100%;
        float: none;
        margin: 1rem 0;
    }

    footer {
        /* position: static; */
    }
}
    `;

    const blob = new Blob([cssContent], { type: 'text/css' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'styles.css';
    link.click();
});

// Event listener for preview button
document.getElementById('previewBtn').addEventListener('click', function() {
    const canvasContent = document.querySelector('.canvas-container').innerHTML;
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Portfolio Preview</title>
            <link rel="stylesheet" href="styles.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        </head>
        <body>
            ${canvasContent}
        </body>
        </html>
    `);
    previewWindow.document.close();
});

// Function to show properties of the selected element
function showProperties(element) {
    const propertiesContent = document.getElementById('propertiesContent');
    let targetElement;

    if (element.id === 'imageInput') {
        targetElement = document.getElementById('displayImage');
    } else {
        const targetId = element.id.replace('Input', ''); // Get the corresponding display element ID
        targetElement = document.getElementById(`display${targetId.charAt(0).toUpperCase() + targetId.slice(1)}`);
    }

    if (element.id === 'imageInput') {
        propertiesContent.innerHTML = `
            <h3>Properties for ${element.previousElementSibling.innerText}</h3>
            <label for="widthInput">Width:</label>
            <input type="number" id="widthInput" class="form-control" value="${targetElement.width}">
            <label for="heightInput">Height:</label>
            <input type="number" id="heightInput" class="form-control" value="${targetElement.height}">
            <label for="borderRadiusInput">Border Radius:</label>
            <input type="number" id="borderRadiusInput" class="form-control" value="${parseInt(window.getComputedStyle(targetElement).borderRadius)}">
            <label for="borderInput">Border:</label>
            <input type="text" id="borderInput" class="form-control" value="${window.getComputedStyle(targetElement).border}">
            <label for="boxShadowInput">Box Shadow:</label>
            <input type="text" id="boxShadowInput" class="form-control" value="${window.getComputedStyle(targetElement).boxShadow}">
            <label for="opacityInput">Opacity:</label>
            <input type="number" id="opacityInput" class="form-control" value="${window.getComputedStyle(targetElement).opacity}" step="0.1" min="0" max="1">
            <label for="filterInput">Filter:</label>
            <input type="text" id="filterInput" class="form-control" value="${window.getComputedStyle(targetElement).filter}">
            <label for="transformInput">Transform:</label>
            <input type="text" id="transformInput" class="form-control" value="${window.getComputedStyle(targetElement).transform}">
            <label for="transitionInput">Transition:</label>
            <input type="text" id="transitionInput" class="form-control" value="${window.getComputedStyle(targetElement).transition}">
            <button id="applyPropertiesBtn" class="btn btn-primary mt-3">Apply</button>
        `;

        document.getElementById('applyPropertiesBtn').addEventListener('click', function() {
            applyImageProperties(targetElement);
        });
    } else {
        propertiesContent.innerHTML = `
            <h3>Properties for ${element.previousElementSibling.innerText}</h3>
            <label for="fontSizeInput">Font Size:</label>
            <input type="number" id="fontSizeInput" class="form-control" value="${window.getComputedStyle(targetElement).fontSize.replace('px', '')}">
            <label for="colorInput">Color:</label>
            <input type="color" id="colorInput" class="form-control" value="${rgbToHex(window.getComputedStyle(targetElement).color)}">
            <label for="backgroundColorInput">Background Color:</label>
            <input type="color" id="backgroundColorInput" class="form-control" value="${rgbToHex(window.getComputedStyle(targetElement).backgroundColor)}">
            <label for="textAlignInput">Text Align:</label>
            <select id="textAlignInput" class="form-control">
                <option value="left" ${window.getComputedStyle(targetElement).textAlign === 'left' ? 'selected' : ''}>Left</option>
                <option value="center" ${window.getComputedStyle(targetElement).textAlign === 'center' ? 'selected' : ''}>Center</option>
                <option value="right" ${window.getComputedStyle(targetElement).textAlign === 'right' ? 'selected' : ''}>Right</option>
                <option value="justify" ${window.getComputedStyle(targetElement).textAlign === 'justify' ? 'selected' : ''}>Justify</option>
            </select>
            <label for="marginInput">Margin:</label>
            <input type="text" id="marginInput" class="form-control" value="${window.getComputedStyle(targetElement).margin}">
            <label for="paddingInput">Padding:</label>
            <input type="text" id="paddingInput" class="form-control" value="${window.getComputedStyle(targetElement).padding}">
            <label for="lineHeightInput">Line Height:</label>
            <input type="number" id="lineHeightInput" class="form-control" value="${window.getComputedStyle(targetElement).lineHeight.replace('px', '')}">
            <label for="letterSpacingInput">Letter Spacing:</label>
            <input type="number" id="letterSpacingInput" class="form-control" value="${window.getComputedStyle(targetElement).letterSpacing.replace('px', '')}">
            <label for="fontWeightInput">Font Weight:</label>
            <input type="number" id="fontWeightInput" class="form-control" value="${window.getComputedStyle(targetElement).fontWeight}">
            <label for="textTransformInput">Text Transform:</label>
            <select id="textTransformInput" class="form-control">
                <option value="none" ${window.getComputedStyle(targetElement).textTransform === 'none' ? 'selected' : ''}>None</option>
                <option value="capitalize" ${window.getComputedStyle(targetElement).textTransform === 'capitalize' ? 'selected' : ''}>Capitalize</option>
                <option value="uppercase" ${window.getComputedStyle(targetElement).textTransform === 'uppercase' ? 'selected' : ''}>Uppercase</option>
                <option value="lowercase" ${window.getComputedStyle(targetElement).textTransform === 'lowercase' ? 'selected' : ''}>Lowercase</option>
            </select>
            <label for="textDecorationInput">Text Decoration:</label>
            <input type="text" id="textDecorationInput" class="form-control" value="${window.getComputedStyle(targetElement).textDecoration}">
            <label for="fontStyleInput">Font Style:</label>
            <select id="fontStyleInput" class="form-control">
                <option value="normal" ${window.getComputedStyle(targetElement).fontStyle === 'normal' ? 'selected' : ''}>Normal</option>
                <option value="italic" ${window.getComputedStyle(targetElement).fontStyle === 'italic' ? 'selected' : ''}>Italic</option>
                <option value="oblique" ${window.getComputedStyle(targetElement).fontStyle === 'oblique' ? 'selected' : ''}>Oblique</option>
            </select>
            <label for="textShadowInput">Text Shadow:</label>
            <input type="text" id="textShadowInput" class="form-control" value="${window.getComputedStyle(targetElement).textShadow}">
            <label for="whiteSpaceInput">White Space:</label>
            <select id="whiteSpaceInput" class="form-control">
                <option value="normal" ${window.getComputedStyle(targetElement).whiteSpace === 'normal' ? 'selected' : ''}>Normal</option>
                <option value="nowrap" ${window.getComputedStyle(targetElement).whiteSpace === 'nowrap' ? 'selected' : ''}>No Wrap</option>
                <option value="pre" ${window.getComputedStyle(targetElement).whiteSpace === 'pre' ? 'selected' : ''}>Pre</option>
                <option value="pre-line" ${window.getComputedStyle(targetElement).whiteSpace === 'pre-line' ? 'selected' : ''}>Pre-line</option>
                <option value="pre-wrap" ${window.getComputedStyle(targetElement).whiteSpace === 'pre-wrap' ? 'selected' : ''}>Pre-wrap</option>
            </select>
            <button id="applyPropertiesBtn" class="btn btn-primary mt-3">Apply</button>
        `;

        document.getElementById('applyPropertiesBtn').addEventListener('click', function() {
            applyTextProperties(targetElement);
        });
    }
}

// Function to apply text properties to the target element
function applyTextProperties(targetElement) {
    const fontSize = document.getElementById('fontSizeInput').value + 'px';
    const color = document.getElementById('colorInput').value;
    const backgroundColor = document.getElementById('backgroundColorInput').value;
    const textAlign = document.getElementById('textAlignInput').value;
    const margin = document.getElementById('marginInput').value;
    const padding = document.getElementById('paddingInput').value;
    const lineHeight = document.getElementById('lineHeightInput').value + 'px';
    const letterSpacing = document.getElementById('letterSpacingInput').value + 'px';
    const fontWeight = document.getElementById('fontWeightInput').value;
    const textTransform = document.getElementById('textTransformInput').value;
    const textDecoration = document.getElementById('textDecorationInput').value;
    const fontStyle = document.getElementById('fontStyleInput').value;
    const textShadow = document.getElementById('textShadowInput').value;
    const whiteSpace = document.getElementById('whiteSpaceInput').value;

    targetElement.style.fontSize = fontSize;
    targetElement.style.color = color;
    targetElement.style.backgroundColor = backgroundColor;
    targetElement.style.textAlign = textAlign;
    targetElement.style.margin = margin;
    targetElement.style.padding = padding;
    targetElement.style.lineHeight = lineHeight;
    targetElement.style.letterSpacing = letterSpacing;
    targetElement.style.fontWeight = fontWeight;
    targetElement.style.textTransform = textTransform;
    targetElement.style.textDecoration = textDecoration;
    targetElement.style.fontStyle = fontStyle;
    targetElement.style.textShadow = textShadow;
    targetElement.style.whiteSpace = whiteSpace;

    syncContent();
}

// Function to apply image properties to the target element
function applyImageProperties(targetElement) {
    const width = document.getElementById('widthInput').value + 'px';
    const height = document.getElementById('heightInput').value + 'px';
    const borderRadius = document.getElementById('borderRadiusInput').value + 'px';
    const border = document.getElementById('borderInput').value;
    const boxShadow = document.getElementById('boxShadowInput').value;
    const opacity = document.getElementById('opacityInput').value;
    const filter = document.getElementById('filterInput').value;
    const transform = document.getElementById('transformInput').value;
    const transition = document.getElementById('transitionInput').value;

    targetElement.style.width = width;
    targetElement.style.height = height;
    targetElement.style.borderRadius = borderRadius;
    targetElement.style.border = border;
    targetElement.style.boxShadow = boxShadow;
    targetElement.style.opacity = opacity;
    targetElement.style.filter = filter;
    targetElement.style.transform = transform;
    targetElement.style.transition = transition;

    syncContent();
}

// Function to convert RGB color to HEX
function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g).map(function(x) {
        return parseInt(x).toString(16).padStart(2, '0');
    });
    return `#${result.join('')}`;
}
