document
  .getElementById("fetchJobButton")
  .addEventListener("click", function () {
    fetchJobVacancies();
  });

async function fetchJobVacancies() {
  const apiKey = "92c7fa9623954e86b91adc6afc05c014"; // Replace with your actual Bing Search API key
  const organizations = [
    "Loden Foundation Bhutan",
    "Druk Smart Bhutan",
    "State Trading Corporation of Bhutan",
    "Royal Government of Bhutan",
    "Ministry of Finance Bhutan",
    "Credit Information Bureau of Bhutan",
    "Anti-Corruption Commission of Bhutan",
    "Tashi Cell",
    "Royal Civil Service Commission",
    "Druk Green Power Corporation Limited",
    "Bhutan Insurance Limited",
    "National Pension and Provident Fund Bhutan",
    "Bhutan Development Bank",
    "Druk PNB Bank",
    "Bhutan National Bank",
    "Royal Monetary Authority Bhutan",
    "Royal Insurance Corporation of Bhutan",
    "Kuensel",
    "BBS",
    "Druk Air",
  ];

  let allJobVacancies = [];

  for (const org of organizations) {
    const searchQuery = `${org} job vacancies`;
    const apiUrl = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(
      searchQuery
    )}&mkt=en-US`;

    try {
      const response = await fetch(apiUrl, {
        headers: { "Ocp-Apim-Subscription-Key": apiKey },
      });

      if (!response.ok) {
        throw new Error("Error fetching data from Bing API.");
      }

      const data = await response.json();
      allJobVacancies = allJobVacancies.concat(data.webPages.value);
    } catch (error) {
      console.error(`Error fetching job vacancies for ${org}:`, error);
    }
  }

  displayJobVacancies(allJobVacancies);
}

function displayJobVacancies(jobVacancies) {
  const resultsDiv = document.getElementById("jobVacancyResults");
  resultsDiv.innerHTML = "";

  if (!jobVacancies || jobVacancies.length === 0) {
    resultsDiv.innerHTML = "<p>No job vacancies found.</p>";
    return;
  }

  jobVacancies.forEach((vacancy) => {
    const jobItemDiv = document.createElement("div");
    jobItemDiv.className = "job-item";
    jobItemDiv.innerHTML = `
          <h3><a href="${vacancy.url}" target="_blank">${vacancy.name}</a></h3>
          <p>${vacancy.snippet}</p>
      `;
    resultsDiv.appendChild(jobItemDiv);
  });
}
