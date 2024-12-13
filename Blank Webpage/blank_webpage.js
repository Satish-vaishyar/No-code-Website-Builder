function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("elementId", event.target.id);
    event.dataTransfer.setData("offsetX", event.offsetX);
    event.dataTransfer.setData("offsetY", event.offsetY);
}

function drop(event) {
    event.preventDefault();
    var elementId = event.dataTransfer.getData("elementId");
    var offsetX = parseInt(event.dataTransfer.getData("offsetX"), 10);
    var offsetY = parseInt(event.dataTransfer.getData("offsetY"), 10);
    var element;

    if (!elementId.startsWith("element")) {
        var data = elementId;
        if (data === "text") {
            element = document.createElement("div");
            element.contentEditable = true;
            element.innerText = "Editable Text";
        } else if (data === "image") {
            element = document.createElement("img");
            element.src = "https://via.placeholder.com/150";
            element.alt = "Placeholder Image";
        } else if (data === "button") {
            element = document.createElement("button");
            element.innerText = "Button";
        } else if (data === "header") {
            element = document.createElement("h1");
            element.contentEditable = true;
            element.innerText = "Header";
        } else if (data === "footer") {
            element = document.createElement("footer");
            element.contentEditable = true;
            element.innerText = "Footer";
            element.style.position = "fixed";
            element.style.bottom = "0";
            element.style.width = "100%";
            element.style.height = "30px";
            element.style.backgroundColor = "#f1f1f1";
            element.style.textAlign = "center";
            element.style.padding = "10px 0";
        } else if (data === "paragraph") {
            element = document.createElement("p");
            element.contentEditable = true;
            element.innerText = "Editable Paragraph";
        } else if (data === "list") {
            element = document.createElement("ul");
            var listItem = document.createElement("li");
            listItem.contentEditable = true;
            listItem.innerText = "Editable List Item";
            element.appendChild(listItem);
        } else if (data === "table") {
            element = document.createElement("table");
            var row = document.createElement("tr");
            var cell = document.createElement("td");
            cell.contentEditable = true;
            cell.innerText = "Editable Cell";
            row.appendChild(cell);
            element.appendChild(row);
        } else if (data === "video") {
            element = document.createElement("video");
            element.controls = true;
            var source = document.createElement("source");
            source.src = "https://www.w3schools.com/html/mov_bbb.mp4";
            source.type = "video/mp4";
            element.appendChild(source);
        }
        element.id = "element" + Date.now();
        element.draggable = true;
        element.ondragstart = drag;
        element.ondragend = repositionElement;
        element.onclick = () => selectElement(element);
        event.target.appendChild(element);
    } else {
        element = document.getElementById(elementId);
    }

    element.style.position = "absolute";
    element.style.left = (event.clientX - offsetX - event.target.offsetLeft) + "px";
    element.style.top = (event.clientY - offsetY - event.target.offsetTop) + "px";
}

function repositionElement(event) {
    var offsetX = parseInt(event.dataTransfer.getData("offsetX"), 10);
    var offsetY = parseInt(event.dataTransfer.getData("offsetY"), 10);
    event.target.style.left = (event.clientX - offsetX - event.target.offsetLeft) + "px";
    event.target.style.top = (event.clientY - offsetY - event.target.offsetTop) + "px";
}

var selectedElement = null;

function selectElement(element) {
    selectedElement = element;
    var properties = document.getElementById("properties");
    var editorText = document.getElementById("editor-text");
    var editorImage = document.getElementById("editor-image");
    var imageWidth = document.getElementById("image-width");
    var imageHeight = document.getElementById("image-height");
    var elementColor = document.getElementById("element-color");
    var elementFontSize = document.getElementById("element-font-size");
    var elementBackgroundColor = document.getElementById("element-background-color");
    var elementBorder = document.getElementById("element-border");
    var elementPadding = document.getElementById("element-padding");
    var imageRadius = document.getElementById("image-radius");
    var elementMargin = document.getElementById("element-margin");
    var elementWidth = document.getElementById("element-width");
    var elementHeight = document.getElementById("element-height");
    var elementTextAlign = document.getElementById("element-text-align");
    var elementDisplay = document.getElementById("element-display");
    var headerType = document.getElementById("header-type");
    var elementFontFamily = document.getElementById("element-font-family");
    var elementBold = document.getElementById("element-bold");
    var elementItalic = document.getElementById("element-italic");
    var elementUnderline = document.getElementById("element-underline");
    var elementHyperlink = document.getElementById("element-hyperlink");
    var videoSrc = document.getElementById("video-src");
    var videoWidth = document.getElementById("video-width");
    var videoHeight = document.getElementById("video-height");
    var tableRows = document.getElementById("table-rows");
    var tableCols = document.getElementById("table-cols");
    var tableBorder = document.getElementById("table-border");
    var tablePadding = document.getElementById("table-padding");
    var tableMargin = document.getElementById("table-margin");
    var tableCellSpacing = document.getElementById("table-cellspacing");
    var canvasBackgroundColor = document.getElementById("canvas-background-color");
    var canvasAnimation = document.getElementById("canvas-animation");
    properties.style.display = "block";
    if (element.tagName === "DIV" || element.tagName === "H1" || element.tagName === "H2" || element.tagName === "H3" || element.tagName === "H4" || element.tagName === "H5" || element.tagName === "H6" || element.tagName === "FOOTER" || element.tagName === "BUTTON" || element.tagName === "P" || element.tagName === "LI" || element.tagName === "TD") {
        editorText.value = element.innerText;
        editorText.oninput = () => {
            element.innerText = editorText.value;
        };
        elementColor.value = rgbToHex(window.getComputedStyle(element).color);
        elementColor.oninput = () => {
            element.style.color = elementColor.value;
        };
        elementFontSize.value = parseInt(window.getComputedStyle(element).fontSize, 10);
        elementFontSize.oninput = () => {
            element.style.fontSize = elementFontSize.value + "px";
        };
        elementBackgroundColor.value = rgbToHex(window.getComputedStyle(element).backgroundColor);
        elementBackgroundColor.oninput = () => {
            element.style.backgroundColor = elementBackgroundColor.value;
        };
        elementBorder.value = window.getComputedStyle(element).border;
        elementBorder.oninput = () => {
            element.style.border = elementBorder.value;
        };
        elementPadding.value = window.getComputedStyle(element).padding;
        elementPadding.oninput = () => {
            element.style.padding = elementPadding.value;
        };
        elementMargin.value = window.getComputedStyle(element).margin;
        elementMargin.oninput = () => {
            element.style.margin = elementMargin.value;
        };
        elementWidth.value = window.getComputedStyle(element).width;
        elementWidth.oninput = () => {
            element.style.width = elementWidth.value;
        };
        elementHeight.value = window.getComputedStyle(element).height;
        elementHeight.oninput = () => {
            element.style.height = elementHeight.value;
        };
        elementTextAlign.value = window.getComputedStyle(element).textAlign;
        elementTextAlign.oninput = () => {
            element.style.textAlign = elementTextAlign.value;
        };
        elementDisplay.value = window.getComputedStyle(element).display;
        elementDisplay.oninput = () => {
            element.style.display = elementDisplay.value;
        };
        elementFontFamily.value = window.getComputedStyle(element).fontFamily.replace(/"/g, '');
        elementFontFamily.oninput = () => {
            element.style.fontFamily = elementFontFamily.value;
        };
        elementBold.onclick = () => {
            element.style.fontWeight = element.style.fontWeight === "bold" ? "normal" : "bold";
        };
        elementItalic.onclick = () => {
            element.style.fontStyle = element.style.fontStyle === "italic" ? "normal" : "italic";
        };
        elementUnderline.onclick = () => {
            element.style.textDecoration = element.style.textDecoration === "underline" ? "none" : "underline";
        };
        elementHyperlink.value = element.tagName === "A" ? element.href : "";
        elementHyperlink.oninput = () => {
            if (element.tagName !== "A") {
                var link = document.createElement("a");
                link.innerText = element.innerText;
                link.style.cssText = element.style.cssText;
                link.href = elementHyperlink.value;
                link.id = element.id;
                link.draggable = true;
                link.ondragstart = drag;
                link.ondragend = repositionElement;
                link.onclick = () => selectElement(link);
                element.parentNode.replaceChild(link, element);
                element = link;
            } else {
                element.href = elementHyperlink.value;
            }
        };
        if (element.tagName.startsWith("H")) {
            headerType.value = element.tagName;
            headerType.onchange = () => {
                var newHeader = document.createElement(headerType.value);
                newHeader.innerText = element.innerText;
                newHeader.contentEditable = true;
                newHeader.style.cssText = element.style.cssText;
                newHeader.id = element.id;
                newHeader.draggable = true;
                newHeader.ondragstart = drag;
                newHeader.ondragend = repositionElement;
                newHeader.onclick = () => selectElement(newHeader);
                element.parentNode.replaceChild(newHeader, element);
                element = newHeader;
            };
            headerType.style.display = "block";
        } else {
            headerType.style.display = "none";
        }
        editorImage.style.display = "none";
        imageWidth.style.display = "none";
        imageHeight.style.display = "none";
        imageRadius.style.display = "none";
        videoSrc.style.display = "none";
        videoWidth.style.display = "none";
        videoHeight.style.display = "none";
        tableRows.style.display = "none";
        tableCols.style.display = "none";
        tableBorder.style.display = "none";
        tablePadding.style.display = "none";
        tableMargin.style.display = "none";
        tableCellSpacing.style.display = "none";
        editorText.style.display = "block";
        elementColor.style.display = "block";
        elementFontSize.style.display = "block";
        elementBackgroundColor.style.display = "block";
        elementBorder.style.display = "block";
        elementPadding.style.display = "block";
        elementMargin.style.display = "block";
        elementWidth.style.display = "block";
        elementHeight.style.display = "block";
        elementTextAlign.style.display = "block";
        elementDisplay.style.display = "block";
        elementFontFamily.style.display = "block";
        elementBold.style.display = "block";
        elementItalic.style.display = "block";
        elementUnderline.style.display = "block";
        elementHyperlink.style.display = "block";
        canvasBackgroundColor.style.display = "none";
        canvasAnimation.style.display = "none";
    } else if (element.tagName === "IMG") {
        editorImage.onchange = (event) => {
            var reader = new FileReader();
            reader.onload = function(e) {
                element.src = e.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        };
        imageWidth.value = element.width;
        imageHeight.value = element.height;
        imageWidth.oninput = () => {
            element.width = imageWidth.value;
        };
        imageHeight.oninput = () => {
            element.height = imageHeight.value;
        };
        imageRadius.value = parseInt(window.getComputedStyle(element).borderRadius, 10);
        imageRadius.oninput = () => {
            element.style.borderRadius = imageRadius.value + "px";
        };
        editorText.style.display = "none";
        editorImage.style.display = "block";
        imageWidth.style.display = "block";
        imageHeight.style.display = "block";
        imageRadius.style.display = "block";
        elementColor.style.display = "none";
        elementFontSize.style.display = "none";
        elementBackgroundColor.style.display = "none";
        elementBorder.style.display = "none";
        elementPadding.style.display = "none";
        elementMargin.style.display = "none";
        elementWidth.style.display = "none";
        elementHeight.style.display = "none";
        elementTextAlign.style.display = "none";
        elementDisplay.style.display = "none";
        headerType.style.display = "none";
        elementFontFamily.style.display = "none";
        elementBold.style.display = "none";
        elementItalic.style.display = "none";
        elementUnderline.style.display = "none";
        elementHyperlink.style.display = "none";
        videoSrc.style.display = "none";
        videoWidth.style.display = "none";
        videoHeight.style.display = "none";
        tableRows.style.display = "none";
        tableCols.style.display = "none";
        tableBorder.style.display = "none";
        tablePadding.style.display = "none";
        tableMargin.style.display = "none";
        tableCellSpacing.style.display = "none";
        canvasBackgroundColor.style.display = "none";
        canvasAnimation.style.display = "none";
    } else if (element.tagName === "VIDEO") {
        videoSrc.value = element.querySelector("source").src;
        videoSrc.oninput = () => {
            element.querySelector("source").src = videoSrc.value;
            element.load();
        };
        videoWidth.value = element.width;
        videoHeight.value = element.height;
        videoWidth.oninput = () => {
            element.width = videoWidth.value;
        };
        videoHeight.oninput = () => {
            element.height = videoHeight.value;
        };
        editorText.style.display = "none";
        editorImage.style.display = "none";
        imageWidth.style.display = "none";
        imageHeight.style.display = "none";
        imageRadius.style.display = "none";
        elementColor.style.display = "none";
        elementFontSize.style.display = "none";
        elementBackgroundColor.style.display = "none";
        elementBorder.style.display = "none";
        elementPadding.style.display = "none";
        elementMargin.style.display = "none";
        elementWidth.style.display = "none";
        elementHeight.style.display = "none";
        elementTextAlign.style.display = "none";
        elementDisplay.style.display = "none";
        headerType.style.display = "none";
        elementFontFamily.style.display = "none";
        elementBold.style.display = "none";
        elementItalic.style.display = "none";
        elementUnderline.style.display = "none";
        elementHyperlink.style.display = "none";
        videoSrc.style.display = "block";
        videoWidth.style.display = "block";
        videoHeight.style.display = "block";
        tableRows.style.display = "none";
        tableCols.style.display = "none";
        tableBorder.style.display = "none";
        tablePadding.style.display = "none";
        tableMargin.style.display = "none";
        tableCellSpacing.style.display = "none";
        canvasBackgroundColor.style.display = "none";
        canvasAnimation.style.display = "none";
    } else if (element.tagName === "TABLE") {
        tableRows.value = element.rows.length;
        tableCols.value = element.rows[0].cells.length;
        tableBorder.value = window.getComputedStyle(element).border;
        tablePadding.value = window.getComputedStyle(element).padding;
        tableMargin.value = window.getComputedStyle(element).margin;
        tableCellSpacing.value = element.cellSpacing;
        tableRows.oninput = () => {
            var currentRows = element.rows.length;
            var newRows = parseInt(tableRows.value, 10);
            if (newRows > currentRows) {
                for (var i = currentRows; i < newRows; i++) {
                    var row = element.insertRow();
                    for (var j = 0; j < tableCols.value; j++) {
                        var cell = row.insertCell();
                        cell.contentEditable = true;
                        cell.innerText = "Editable Cell";
                    }
                }
            } else {
                for (var i = currentRows - 1; i >= newRows; i--) {
                    element.deleteRow(i);
                }
            }
        };
        tableCols.oninput = () => {
            var currentCols = element.rows[0].cells.length;
            var newCols = parseInt(tableCols.value, 10);
            for (var i = 0; i < element.rows.length; i++) {
                var row = element.rows[i];
                if (newCols > currentCols) {
                    for (var j = currentCols; j < newCols; j++) {
                        var cell = row.insertCell();
                        cell.contentEditable = true;
                        cell.innerText = "Editable Cell";
                    }
                } else {
                    for (var j = currentCols - 1; j >= newCols; j--) {
                        row.deleteCell(j);
                    }
                }
            }
        };
        tableBorder.oninput = () => {
            element.style.border = tableBorder.value;
        };
        tablePadding.oninput = () => {
            element.style.padding = tablePadding.value;
        };
        tableMargin.oninput = () => {
            element.style.margin = tableMargin.value;
        };
        tableCellSpacing.oninput = () => {
            element.cellSpacing = tableCellSpacing.value;
        };
        editorText.style.display = "none";
        editorImage.style.display = "none";
        imageWidth.style.display = "none";
        imageHeight.style.display = "none";
        imageRadius.style.display = "none";
        elementColor.style.display = "none";
        elementFontSize.style.display = "none";
        elementBackgroundColor.style.display = "none";
        elementBorder.style.display = "none";
        elementPadding.style.display = "none";
        elementMargin.style.display = "none";
        elementWidth.style.display = "none";
        elementHeight.style.display = "none";
        elementTextAlign.style.display = "none";
        elementDisplay.style.display = "none";
        headerType.style.display = "none";
        elementFontFamily.style.display = "none";
        elementBold.style.display = "none";
        elementItalic.style.display = "none";
        elementUnderline.style.display = "none";
        elementHyperlink.style.display = "none";
        videoSrc.style.display = "none";
        videoWidth.style.display = "none";
        videoHeight.style.display = "none";
        tableRows.style.display = "block";
        tableCols.style.display = "block";
        tableBorder.style.display = "block";
        tablePadding.style.display = "block";
        tableMargin.style.display = "block";
        tableCellSpacing.style.display = "block";
        canvasBackgroundColor.style.display = "none";
        canvasAnimation.style.display = "none";
    }
    canvasBackgroundColor.oninput = () => {
        document.getElementById("workspace").style.backgroundColor = canvasBackgroundColor.value;
    };
    canvasAnimation.onchange = () => {
        var workspace = document.getElementById("workspace");
        workspace.classList.remove("fade-in", "slide-in", "zoom-in");
        if (canvasAnimation.value) {
            workspace.classList.add(canvasAnimation.value);
        }
    };
    canvasBackgroundColor.style.display = "block";
    canvasAnimation.style.display = "block";
}

function deleteElement() {
    if (selectedElement) {
        selectedElement.remove();
        document.getElementById("properties").style.display = "none";
        selectedElement = null;
    }
}

function rgbToHex(rgb) {
    var result = rgb.match(/\d+/g).map(function(x) {
        return parseInt(x).toString(16).padStart(2, '0');
    });
    return "#" + result.join('');
}

function exportProject() {
    var workspace = document.getElementById("workspace");
    var htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Exported Project</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                header, footer {
                    width: 100%;
                    background-color: #f1f1f1;
                    text-align: center;
                    padding: 10px 0;
                }
                #workspace {
                    width: 100%;
                    height: calc(100vh - 100px);
                    overflow-y: auto;
                    background-color: white;
                    position: relative;
                }
            </style>
        </head>
        <body>
            <header>
                <h1>No-Code Website Builder</h1>
            </header>
            <div id="workspace">
                ${workspace.innerHTML.replace(/contentEditable="true"/g, '')}
            </div>
            <footer>
                <p>&copy; 2023 No-Code Website Builder</p>
            </footer>
            <script>
                // Add any necessary JavaScript here
            </script>
        </body>
        </html>
    `;

    var htmlBlob = new Blob([htmlContent], { type: "text/html" });
    saveAs(htmlBlob, "index.html");
}

function livePreview() {
    var workspace = document.getElementById("workspace");
    var htmlContent = workspace.innerHTML;
    var previewWindow = window.open("", "_blank");
    previewWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Live Preview</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                header, footer {
                    width: 100%;
                    background-color: #f1f1f1;
                    text-align: center;
                    padding: 10px 0;
                }
                #workspace {
                    width: 100%;
                    height: calc(100vh - 100px);
                    overflow-y: auto;
                    background-color: white;
                    position: relative;
                }
            </style>
        </head>
        <body>
            <header>
                <h1>Live Preview</h1>
            </header>
            <div id="workspace">
                ${htmlContent}
            </div>
            <footer>
                <p>&copy; 2023 No-Code Website Builder</p>
            </footer>
        </body>
        </html>
    `);
}
