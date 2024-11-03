console.log("baggageChecker.js loaded");

const airlines = [
    { airline: "American Airlines", type: "Carry-On", maxDimensions: [56, 36, 23], maxWeight: null, logo: "https://logo.clearbit.com/aa.com", url: "https://www.aa.com" },
    { airline: "American Airlines", type: "Checked", maxDimensions: [158], maxWeight: 23, logo: "https://logo.clearbit.com/aa.com", url: "https://www.aa.com" },
    { airline: "Delta Airlines", type: "Carry-On", maxDimensions: [56, 35, 23], maxWeight: null, logo: "https://logo.clearbit.com/delta.com", url: "https://www.delta.com/us/en/baggage/carry-on-baggage" },
    { airline: "Delta Airlines", type: "Checked", maxDimensions: [158], maxWeight: 23, logo: "https://logo.clearbit.com/delta.com", url: "https://www.delta.com"},
    { airline: "United Airlines", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/united.com", url: "https://www.united.com" },
    { airline: "United Airlines", type: "Checked", maxDimensions: [158], maxWeight: 23, logo: "https://logo.clearbit.com/united.com", url: "https://www.united.com" },
    { airline: "Emirates", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/emirates.com", url: "https://www.emirates.com" },
    { airline: "Spirit", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/spirit.com", url: "https://www.spirit.com" },
    { airline: "Swiss", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/swiss.com", url: "https://www.swiss.com/us/en/prepare/baggage/hand-baggage" },
    { airline: "Alitalia", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/alitalia.com", url: "https://www.alitalia.com" },
    { airline: "British Airways", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/britishairways.com", url: "https://www.britishairways.com" },
    { airline: "KLM", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/klm.com", url: "https://www.klm.com" },
    { airline: "Hawaiian Airlines", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/hawaiianairlines.com", url: "https://www.hawaiianairlines.com" },
    { airline: "Iberia", type: "Carry-On", maxDimensions: [56, 35, 22], maxWeight: null, logo: "https://logo.clearbit.com/iberia.com", url: "https://www.iberia.com" },
];

function checkBaggage() {
    console.log("checkBaggage function called");

    const length = parseFloat(document.getElementById("length").value);
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const unit = document.getElementById("unit").value;

    console.log("Input values:", { length, width, height, weight, unit });

    // Convert to centimeters if necessary
    const conversionFactor = unit === "inches" ? 2.54 : 1;
    const lengthCm = length * conversionFactor;
    const widthCm = width * conversionFactor;
    const heightCm = height * conversionFactor;
    const linearDimension = lengthCm + widthCm + heightCm;

    console.log("Converted values:", { lengthCm, widthCm, heightCm, linearDimension });

    // Filter airlines based on criteria
    const matchingAirlines = airlines.filter(airline => {
        const [maxL, maxW, maxH] = airline.maxDimensions;
        const maxLinear = airline.maxDimensions[0];
        const dimensionCheck = maxL && maxW && maxH
            ? lengthCm <= maxL && widthCm <= maxW && heightCm <= maxH
            : linearDimension <= maxLinear;
        const weightCheck = airline.maxWeight ? weight <= airline.maxWeight : true;
        return dimensionCheck && weightCheck;
    });

    console.log("Matching airlines:", matchingAirlines);

    // Display results
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // Clear previous results
    if (matchingAirlines.length > 0) {
        matchingAirlines.forEach(a => {
            const resultItem = document.createElement("div");
            resultItem.className = "result-item";

            // Create a link that wraps the logo and points to the airline's website
            const link = document.createElement("a");
            link.href = a.url;
            link.target = "_blank"; // Open link in a new tab

            // Create the logo image element
            const logo = document.createElement("img");
            logo.src = a.logo;
            logo.alt = `${a.airline} logo`;
            logo.style.width = "80px"; // Ensure logo size is consistent

            // Append the logo to the link, then append the link to result item
            link.appendChild(logo);
            resultItem.appendChild(link);
 
            // Create and append the airline name text
            let textSpan = document.createElement("span"); // Use a different variable name if needed
            textSpan.innerText = `${a.airline} (${a.type})`;
            resultItem.appendChild(textSpan);

                       
            resultDiv.appendChild(resultItem);
        });
    } else {
        resultDiv.innerText = "No compatible airlines found for the entered baggage dimensions.";
    }
}
