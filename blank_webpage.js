const canvas = document.getElementById("canvas");
const placeholder = document.getElementById("placeholder");
const propertiesPanel = document.getElementById("properties");
const exportButton = document.getElementById("export-btn");
const previewButton = document.getElementById("preview-btn");

let selectedElement = null;

// Add event listeners to tools for drag-and-drop
document.querySelectorAll(".tool").forEach((tool) => {
  tool.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("type", e.target.getAttribute("data-type"));
  });
});

document.querySelectorAll(".template-selector").forEach((button) => {
  button.addEventListener("click", () => {
    const templateName = button.getAttribute("data-template-name");
    loadTemplate(templateName);
  });
});

const templates = {
  template1: '<div><p>Template 1 Content</p></div>',
  template2: '<div><p>Template 2 Content</p></div>',
  professional: `
    <div class="professional-template">
      <h1 contenteditable="true">Professional Template</h1>
      <p contenteditable="true">This is a professional-looking template. You can edit this text.</p>
      <div contenteditable="true" draggable="true" style="border: 1px solid #ccc; padding: 10px;">
        Editable and draggable section.
      </div>
    </div>
  `,
  // Add more templates as needed
};

function loadTemplate(templateName) {
  console.log(`Loading template: ${templateName}`); // Debugging
  let templateHTML = templates[templateName];
  
  if (!templateHTML) {
    alert(`Template "${templateName}" not found! Loading professional template.`);
    templateHTML = templates['professional'];
  }

  console.log(`Template HTML: ${templateHTML}`); // Debugging

  // Load the selected template onto the canvas
  canvas.innerHTML = templateHTML;

  // Make all elements in the template editable and draggable
  makeAllElementsEditable();
}

function makeAllElementsEditable() {
  canvas.querySelectorAll("*").forEach((element) => {
    setElementEditable(element);
  });
}

function setElementEditable(element) {
  element.setAttribute("contenteditable", "true");
  element.setAttribute("draggable", "true");
  element.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.outerHTML);
  });

  element.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent event bubbling
    selectedElement = element;
    showProperties(element);
  });
}

// Enable dropping on the canvas
canvas.addEventListener("dragover", (e) => e.preventDefault());

canvas.addEventListener("drop", (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData("type");
  let newElement;

  switch (type) {
    case "text":
      newElement = document.createElement("p");
      newElement.textContent = "New Text";
      break;
    case "image":
      newElement = document.createElement("img");
      newElement.src = "path/to/image.jpg"; // Replace with the actual image path
      newElement.alt = "New Image";
      break;
    case "button":
      newElement = document.createElement("button");
      newElement.textContent = "New Button";
      break;
    case "heading":
      newElement = document.createElement("h1");
      newElement.textContent = "New Heading";
      break;
    case "list":
      newElement = document.createElement("ul");
      newElement.innerHTML = "<li>List Item 1</li><li>List Item 2</li>";
      break;
    case "form":
      newElement = document.createElement("form");
      newElement.innerHTML = `
        <label for="input">Input:</label>
        <input type="text" id="input" name="input">
        <button type="submit">Submit</button>
      `;
      break;
    case "container":
      newElement = document.createElement("div");
      newElement.style.border = "1px solid #ccc";
      newElement.style.padding = "10px";
      newElement.textContent = "Container";
      break;
    // Add more cases for additional tools
    default:
      return;
  }

  setElementEditable(newElement);
  canvas.appendChild(newElement);
});

// Make an element draggable
function makeElementDraggable(element) {
  let isDragging = false, initialX, initialY, mouseX, mouseY;

  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    initialX = element.offsetLeft;
    initialY = element.offsetTop;
    mouseX = e.clientX;
    mouseY = e.clientY;
    element.style.cursor = "move";
    element.style.zIndex = 1000; // Bring to front
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const dx = e.clientX - mouseX;
      const dy = e.clientY - mouseY;
      element.style.left = `${initialX + dx}px`;
      element.style.top = `${initialY + dy}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    element.style.cursor = "default";
    element.style.zIndex = ""; // Reset z-index
  });
}

// Show property controls for the selected element
function showProperties(element) {
  propertiesPanel.innerHTML = ""; // Clear previous properties

  // Add property controls
  if (element.tagName === "P" || element.tagName === "BUTTON") {
    addPropertyInput("Text Content", element.textContent, (value) => {
      element.textContent = value;
    });
  } else if (element.tagName === "IMG") {
    addPropertyInput("Image URL", element.src, (value) => {
      element.src = value;
    });
  }

  // Common width and height controls
  addPropertyInput("Width (px)", element.offsetWidth, (value) => {
    element.style.width = `${value}px`;
  });

  addPropertyInput("Height (px)", element.offsetHeight, (value) => {
    element.style.height = `${value}px`;
  });

  document.getElementById("element-id").value = element.id || "";
  document.getElementById("element-class").value = element.className || "";
  document.getElementById("element-color").value = element.style.color || "#000000";
  document.getElementById("element-bg-color").value = element.style.backgroundColor || "#ffffff";
  document.getElementById("element-font-size").value = parseInt(element.style.fontSize) || 16;

  document.getElementById("element-id").oninput = function() {
    element.id = this.value;
  };
  document.getElementById("element-class").oninput = function() {
    element.className = this.value;
  };
  document.getElementById("element-color").oninput = function() {
    element.style.color = this.value;
  };
  document.getElementById("element-bg-color").oninput = function() {
    element.style.backgroundColor = this.value;
  };
  document.getElementById("element-font-size").oninput = function() {
    element.style.fontSize = this.value + "px";
  };
}

// Add a property input to the properties panel
function addPropertyInput(label, defaultValue, onChange) {
  const container = document.createElement("div");
  container.style.marginBottom = "10px";

  const inputLabel = document.createElement("label");
  inputLabel.textContent = label;

  const input = document.createElement("input");
  input.type = "text";
  input.value = defaultValue;
  input.addEventListener("input", (e) => onChange(e.target.value));

  container.appendChild(inputLabel);
  container.appendChild(input);
  propertiesPanel.appendChild(container);
}

// Export canvas content to an HTML file
exportButton.addEventListener("click", () => {
  const exportContent = canvas.innerHTML.replace(/contenteditable="true"/g, ""); // Remove contenteditable
  const blob = new Blob([exportContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "website.html";
  a.click();
  URL.revokeObjectURL(url);
});

// Preview canvas content in a new tab
previewButton.addEventListener("click", () => {
  const previewWindow = window.open("", "_blank");
  previewWindow.document.write(canvas.innerHTML);
  previewWindow.document.close();
});
