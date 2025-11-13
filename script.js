const inp = document.getElementById("inp")
const imageBox = document.querySelector(".image-box")
const loading = document.getElementById("loading")
const button = document.querySelector("button")

async function getImage() {
  if (!inp.value.trim()) {
    alert("Please enter an image description")
    return
  }

  button.disabled = true
  button.textContent = "Generating..."
  loading.style.display = "block"
  imageBox.innerHTML = ""

  try {
    const prompt = encodeURIComponent(inp.value)
    const imageUrl = `https://image.pollinations.ai/prompt/${prompt}`

    const img = document.createElement("img")
    img.src = imageUrl
    img.alt = "AI Generated Image"

    img.onload = () => {
      imageBox.appendChild(img)
      loading.style.display = "none"
    }

    img.onerror = () => {
      loading.style.display = "none"
      alert("Failed to generate image")
    }
  } catch (error) {
    loading.style.display = "none"
    alert("Error: " + error.message)
  } finally {
    button.disabled = false
    button.textContent = "Generate"
  }
}

// Event listeners
button.addEventListener("click", getImage)
inp.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getImage()
})
