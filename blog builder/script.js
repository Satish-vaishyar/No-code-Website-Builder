let selectedElement = null;

// User-defined function to add content to the live preview
function addContent() {
    const content = document.getElementById('blogContent').value;
    if (content.trim()) {
        const element = document.createElement('div');
        element.textContent = content;
        element.style.cursor = 'pointer';
        element.onclick = () => selectElement(element);
        document.getElementById('livePreview').appendChild(element);
        document.getElementById('blogContent').value = '';
    }
}

// User-defined function to add a heading to the live preview
function addHeading() {
    const content = document.getElementById('blogHeading').value;
    if (content.trim()) {
        const element = document.createElement('h1');
        element.textContent = content;
        element.style.cursor = 'pointer';
        element.onclick = () => selectElement(element);
        document.getElementById('livePreview').appendChild(element);
        document.getElementById('blogHeading').value = '';
    }
}

// User-defined function to add a subheading to the live preview
function addSubheading() {
    const content = document.getElementById('blogSubheading').value;
    if (content.trim()) {
        const element = document.createElement('h2');
        element.textContent = content;
        element.style.cursor = 'pointer';
        element.onclick = () => selectElement(element);
        document.getElementById('livePreview').appendChild(element);
        document.getElementById('blogSubheading').value = '';
    }
}

// User-defined function to add a paragraph to the live preview
function addParagraph() {
    const content = document.getElementById('blogParagraph').value;
    if (content.trim()) {
        const element = document.createElement('p');
        element.textContent = content;
        element.style.cursor = 'pointer';
        element.onclick = () => selectElement(element);
        document.getElementById('livePreview').appendChild(element);
        document.getElementById('blogParagraph').value = '';
    }
}

// User-defined function to add an image to the live preview
function addImage() {
    const url = document.getElementById('blogImage').value;
    if (url.trim()) {
        const element = document.createElement('img');
        element.src = url;
        element.style.cursor = 'pointer';
        element.onclick = () => selectElement(element);
        document.getElementById('livePreview').appendChild(element);
        document.getElementById('blogImage').value = '';
    }
}

// User-defined function to select an element in the live preview
function selectElement(element) {
    if (selectedElement) {
        selectedElement.style.outline = '';
    }
    selectedElement = element;
    selectedElement.style.outline = '2px dashed blue';

    // Show or hide image-specific properties
    const imageProperties = document.getElementById('imageProperties');
    const textProperties = document.getElementById('textProperties');
    const deleteImageButton = document.getElementById('deleteImageButton');
    if (selectedElement.tagName === 'IMG') {
        imageProperties.style.display = 'block';
        textProperties.style.display = 'none';
        deleteImageButton.style.display = 'block';
    } else if (selectedElement.tagName === 'IFRAME') {
        imageProperties.style.display = 'none';
        textProperties.style.display = 'none';
        deleteImageButton.style.display = 'none';
    } else {
        imageProperties.style.display = 'none';
        textProperties.style.display = 'block';
        deleteImageButton.style.display = 'none';
    }
}

// User-defined function to update properties of the selected element
function updateProperties() {
    if (selectedElement) {
        if (selectedElement.tagName === 'IMG') {
            const width = document.getElementById('imageWidth').value;
            const height = document.getElementById('imageHeight').value;
            const borderRadius = document.getElementById('imageBorderRadius').value;
            const borderColor = document.getElementById('imageBorderColor').value;

            selectedElement.style.width = width ? `${width}px` : '';
            selectedElement.style.height = height ? `${height}px` : '';
            selectedElement.style.borderRadius = borderRadius ? `${borderRadius}px` : '';
            selectedElement.style.borderColor = borderColor;
        } else {
            const fontSize = document.getElementById('fontSize').value;
            const color = document.getElementById('color').value;
            const textAlign = document.getElementById('textAlign').value;
            const fontWeight = document.getElementById('fontWeight').value;
            const fontStyle = document.getElementById('fontStyle').value;
            const textDecoration = document.getElementById('textDecoration').value;
            const margin = document.getElementById('margin').value;
            const padding = document.getElementById('padding').value;

            selectedElement.style.fontSize = `${fontSize}px`;
            selectedElement.style.color = color;
            selectedElement.style.textAlign = textAlign;
            selectedElement.style.fontWeight = fontWeight;
            selectedElement.style.fontStyle = fontStyle;
            selectedElement.style.textDecoration = textDecoration;
            selectedElement.style.margin = `${margin}px`;
            selectedElement.style.padding = `${padding}px`;
        }
    }
}

// User-defined function to edit the content of the selected element
function editContent() {
    if (selectedElement) {
        const newText = prompt("Edit the content:", selectedElement.textContent);
        if (newText !== null) {
            selectedElement.textContent = newText;
        }
    }
}

// User-defined function to delete the selected element
function deleteContent() {
    if (selectedElement) {
        selectedElement.remove();
        selectedElement = null;
    }
}

// User-defined function to delete the selected image
function deleteSelectedImage() {
    if (selectedElement && selectedElement.tagName === 'IMG') {
        selectedElement.remove();
        selectedElement = null;
        document.getElementById('imageProperties').style.display = 'none';
        document.getElementById('deleteImageButton').style.display = 'none';
    }
}

// User-defined function to add a link to the selected element
function addLink() {
    if (selectedElement && selectedElement.tagName !== 'IMG') {
        const url = prompt("Enter the URL:", "https://www.");
        if (url) {
            const link = document.createElement('a');
            link.href = url;
            link.textContent = selectedElement.textContent;
            link.target = '_blank';
            selectedElement.textContent = '';
            selectedElement.appendChild(link);
        }
    }
}

// User-defined function to add a YouTube video to the live preview
function addYouTubeVideo() {
    const url = prompt("Enter the YouTube video URL:");
    if (url) {
        let videoId = url.split('v=')[1];
        const ampersandPosition = videoId ? videoId.indexOf('&') : -1;
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }
        if (videoId) {
            const iframe = document.createElement('iframe');
            iframe.width = "560";
            iframe.height = "315";
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.cursor = 'pointer';
            iframe.onclick = () => selectElement(iframe);
            document.getElementById('livePreview').appendChild(iframe);
            checkYouTubeVideos();
        } else {
            alert("Invalid YouTube URL");
        }
    }
}

// User-defined function to delete all YouTube videos from the live preview
function deleteAllYouTubeVideos() {
    const iframes = document.querySelectorAll('#livePreview iframe');
    iframes.forEach(iframe => iframe.remove());
    checkYouTubeVideos();
}

// User-defined function to check if there are any YouTube videos in the live preview
function checkYouTubeVideos() {
    const iframes = document.querySelectorAll('#livePreview iframe');
    const deleteButton = document.getElementById('deleteAllYouTubeVideosButton');
    if (iframes.length > 0) {
        deleteButton.style.display = 'block';
    } else {
        deleteButton.style.display = 'none';
    }
}

// Call checkYouTubeVideos on page load to set the initial state of the delete button
document.addEventListener('DOMContentLoaded', checkYouTubeVideos);

// Add event listener for the delete image button
document.addEventListener('DOMContentLoaded', () => {
    const deleteImageButton = document.createElement('button');
    deleteImageButton.id = 'deleteImageButton';
    deleteImageButton.className = 'btn btn-danger mt-2';
    deleteImageButton.textContent = 'Delete Selected Image';
    deleteImageButton.style.display = 'none';
    deleteImageButton.onclick = deleteSelectedImage;
    document.getElementById('imageProperties').appendChild(deleteImageButton);
});

// User-defined function to add a social media link to the live preview
function addSocialMediaLink() {
    const platform = prompt("Enter the social media platform (e.g., Facebook, Twitter, Instagram):").toLowerCase();
    const url = prompt("Enter the URL for the social media account:");
    if (platform && url) {
        const icon = document.createElement('i');
        switch (platform) {
            case 'facebook':
                icon.className = 'fab fa-facebook social-media-icon';
                break;
            case 'twitter':
                icon.className = 'fab fa-twitter social-media-icon';
                break;
            case 'instagram':
                icon.className = 'fab fa-instagram social-media-icon';
                break;
            case 'linkedin':
                icon.className = 'fab fa-linkedin social-media-icon';
                break;
            default:
                alert("Unsupported platform");
                return;
        }
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.appendChild(icon);
        document.getElementById('livePreview').appendChild(link);
    }
}

// User-defined function to preview the content in a new window
function previewContent() {
    const previewWindow = window.open('', '_blank');
    const previewContent = document.getElementById('livePreview').innerHTML;
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).map(style => style.outerHTML).join('\n');
    previewWindow.document.write(`
        <html>
        <head>
            <title>Preview</title>
            ${stylesheets}
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f2f5;
                }
                .container {
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    background-color: #fff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    overflow-y: auto;
                    margin: 10px;
                }
                .live-preview {
                    padding: 20px;
                    min-height: 100%;
                    background: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .live-preview > * {
                    display: block;
                    margin: 10px 0;
                }
            </style>
        </head>
        <body>
            <div class="container live-preview">
                ${previewContent}
            </div>
        </body>
        </html>
    `);
    previewWindow.document.close();
}

// User-defined function to export the content as an HTML file
function exportContent() {
    const content = document.getElementById('livePreview').innerHTML;
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(link => link.outerHTML).join('\n');
    const cssContent = Array.from(document.querySelectorAll('style')).map(style => style.innerHTML).join('\n');
    const htmlContent = `
        <html>
        <head>
            <title>Exported Content</title>
            ${stylesheets}
            <style>
                ${cssContent}
            </style>
        </head>
        <body>
            <div class="container">
                ${content}
            </div>
        </body>
        </html>
    `;

    // Create a blob for the HTML content
    const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
    const htmlUrl = URL.createObjectURL(htmlBlob);

    // Create a link to download the HTML file
    const htmlLink = document.createElement('a');
    htmlLink.href = htmlUrl;
    htmlLink.download = 'exported_content.html';
    document.body.appendChild(htmlLink);
    htmlLink.click();
    document.body.removeChild(htmlLink);
}

// User-defined function to export the CSS as a file
function exportCSS() {
    // Define the CSS content to be exported
    const cssContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            display: flex;
            flex-direction: column;
            height: 100vh;
            font-family: Arial, sans-serif;
            background-color: #f0f2f5;
        }

        main {
            display: flex;
            flex: 1;
        }

        .container {
            flex: 1;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow-y: auto;
            margin: 10px;
        }

        .left-container {
            background-color: #f9f9f9;
        }

        .middle-container {
            background-color: #ffffff;
            border-left: none;
            border-right: none;
        }

        .right-container {
            background-color: #f1f1f1;
        }

        .left-container, .right-container {
            flex: 0 0 20%;
            background-color: #213555;
            color: #d8c4b6;
        }

        .left-container, .right-container {
            background-color: #213555;
            color: #d8c4b6;
        }

        .left-container textarea, .left-container input, 
        .right-container textarea, .right-container input {
            color: #d8c4b6;
            border: 1px solid #d8c4b6;
        }

        .left-container button, .right-container button {
            background-color: #007bff;
            color: #fff;
            cursor: pointer;
        }

        .left-container button:hover, .right-container button:hover {
            background-color: #0056b3;
        }

        .middle-container {
            flex: 1;
        }

        textarea, input[type="text"], input[type="number"], input[type="color"], select {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #d9eafd;
        }

        textarea:focus, input[type="text"]:focus, input[type="number"]:focus, input[type="color"]:focus, select:focus {
            background-color: #c5e3f6;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
            outline: none;
        }

        button {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: none;
            border-radius: 4px;
            background-color: #007bff;
            color: #fff;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background-color: #0056b3;
        }

        .live-preview {
            padding: 20px;
            min-height: 100%;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .property-input {
            margin-bottom: 10px;
        }

        .heading-input, .subheading-input, .paragraph-input, .image-input {
            margin-bottom: 10px;
        }

        .live-preview img {
            max-width: 100%;
            height: auto;
        }

        header, footer {
            background-color: #007bff;
            color: #fff;
            text-align: center;
            padding: 10px 0;
        }

        header h1, footer p {
            margin: 0;
        }

        header a, footer a {
            color: #fff;
            text-decoration: none;
        }

        @media (max-width: 768px) {
            body {
                flex-direction: column;
            }

            main {
                flex-direction: column;
            }

            .container {
                margin: 10px 0;
            }

            .left-container, .right-container {
                flex: 1;
                max-width: 100%;
            }

            .middle-container {
                flex: 1;
                max-width: 100%;
            }
        }

        .social-media-icon {
            margin-right: 10px;
            font-size: 24px;
            color: #007bff;
        }

        .social-media-icon:hover {
            color: #0056b3;
        }
    `;

    // Create a blob for the CSS content
    const cssBlob = new Blob([cssContent], { type: 'text/css' });
    const cssUrl = URL.createObjectURL(cssBlob);

    // Create a link to download the CSS file
    const cssLink = document.createElement('a');
    cssLink.href = cssUrl;
    cssLink.download = 'styles.css';
    document.body.appendChild(cssLink);
    cssLink.click();
    document.body.removeChild(cssLink);
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