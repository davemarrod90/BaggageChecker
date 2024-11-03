const airlines = [
    { airline: "American Airlines", type: "Carry-On", maxDimensions: [56, 36, 23], maxWeight: null, logo: "https://logo.clearbit.com/aa.com" },
    { airline: "American Airlines", type: "Checked", maxDimensions: [158], maxWeight: 23, logo: "https://logo.clearbit.com/aa.com" },
    { airline: "Delta Airlines", type: "Carry-On", maxDimensions: [56, 35, 23], maxWeight: null, logo: "https://logo.clearbit.com/delta.com" },
    { airline: "Delta Airlines", type: "Checked", maxDimensions: [158], maxWeight: 23, logo: "https://logo.clearbit.com/delta.com" },
    { airline: "United Airlines", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/united.com" },
    { airline: "United Airlines", type: "Checked", maxDimensions: [158], maxWeight: 23, logo: "https://logo.clearbit.com/united.com" },
    { airline: "Emirates", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/emirates.com" },
    { airline: "Spirit", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/spirit.com" },
    { airline: "Swiss", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/swiss.com" },
    { airline: "Alitalia", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/alitalia.com" },
    { airline: "British Airways", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/britishairways.com" },
    { airline: "KLM", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/klm.com" },
    { airline: "Hawaiian Airlines", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/hawaiianairlines.com" },
    { airline: "Iberia", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/iberia.com" },
];

function checkBaggage() {
    const length = parseFloat(document.getElementById("length").value);
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const unit = document.getElementById("unit").value;

    const conversionFactor = unit === "inches" ? 2.54 : 1;
    const lengthCm = length * conversionFactor;
    const widthCm = width * conversionFactor;
    const heightCm = height * conversionFactor;
    const linearDimension = lengthCm + widthCm + heightCm;

    const matchingAirlines = airlines.filter(airline => {
        const [maxL, maxW, maxH] = airline.maxDimensions;
        const maxLinear = airline.maxDimensions[0];
        const dimensionCheck = maxL && maxW && maxH
            ? lengthCm <= maxL && widthCm <= maxW && heightCm <= maxH
            : linearDimension <= maxLinear;
        const weightCheck = airline.maxWeight ? weight <= airline.maxWeight : true;
        return dimensionCheck && weightCheck;
    });

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    if (matchingAirlines.length > 0) {
        matchingAirlines.forEach(a => {
            const resultItem = document.createElement("div");
            resultItem.className = "result-item";
            const logo = document.createElement("img");
            logo.src = a.logo;
            logo.alt = `${a.airline} logo`;
            const text = document.createElement("span");
            text.innerText = `${a.airline} (${a.type})`;
            resultItem.appendChild(logo);
            resultItem.appendChild(text);
            resultDiv.appendChild(resultItem);
        });
    } else {
        resultDiv.innerText = "No compatible airlines found for the entered baggage dimensions.";
    }
}
