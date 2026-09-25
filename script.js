let generated = false;

function generateQR() {

    const input = document.getElementById("urlInput");
    const qrContainer = document.getElementById("qrcode");
    const message = document.getElementById("message");
    const downloadButton = document.getElementById("downloadButton");

    const url = input.value.trim();

    // Make sure something was entered
    if (url === "") {
        message.textContent = "Please enter a website URL.";
        return;
    }

    // Make sure the URL has http:// or https://
    let formattedURL = url;

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        formattedURL = "https://" + url;
    }

    // Check that it is actually a valid URL
    try {
        new URL(formattedURL);
    } catch {
        message.textContent = "Please enter a valid website address.";
        return;
    }

    // Clear previous QR code
    qrContainer.innerHTML = "";

    // Create new QR code
    new QRCode(qrContainer, {
        text: formattedURL,
        width: 250,
        height: 250,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    message.textContent = "QR code created! Scan it with your phone.";

    downloadButton.style.display = "block";

    generated = true;
}


function downloadQR() {

    if (!generated) {
        return;
    }

    const qrImage = document.querySelector("#qrcode img");

    if (!qrImage) {
        return;
    }

    const link = document.createElement("a");

    link.href = qrImage.src;
    link.download = "qr-code.png";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}
