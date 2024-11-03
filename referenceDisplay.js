function showReference(type) {
    const referenceDiv = document.getElementById("reference");
    if (type === 'carry-on') {
        referenceDiv.innerHTML = `
            <h3>Carry-On Baggage</h3>
            <p>Typical Maximum Dimensions: 55 x 35 x 20 cm</p>
            <p>Typical Maximum Weight: 7-10 kg</p>
        `;
    } else if (type === 'checked') {
        referenceDiv.innerHTML = `
            <h3>Checked Baggage</h3>
            <p>Typical Maximum Dimensions: 158 cm (linear)</p>
            <p>Typical Maximum Weight: 23 kg</p>
        `;
    }
}
