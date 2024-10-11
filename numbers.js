import {
  initializeApp,
  getApp,
  getApps,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmksj9rPjyZapz0wjT7llNYe8vT6jGbgY",
  authDomain: "newsinfo-2dcb2.firebaseapp.com",
  projectId: "newsinfo-2dcb2",
  storageBucket: "newsinfo-2dcb2.appspot.com",
  messagingSenderId: "641121104333",
  appId: "1:641121104333:web:b686d0844427008b47d484",
  measurementId: "G-N814HMYX62",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);

// Event listener for when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  displayCategoriesWithCounts();
});

// Function to display news categories and counts
async function displayCategoriesWithCounts() {
  const categories = [
    "crises",
    "archaeology_and_history",
    "crime_law",
    "education_and_learning",
    "entertainment",
    "environment_and_climate",
    "finance_and_business",
    "social_issues_and_movement",
    "sports",
    "technology",
    "wellness_and_health",
    "bhutanese_future_scope",
    "bhutanese_jobs",
    "bhutanese_news",
    "worlds_future_scope",
  ];

  const container = document.getElementById("categoryList");
  container.innerHTML = ""; // Clear container before adding new content

  for (const category of categories) {
    const querySnapshot = await getDocs(collection(firestore, category));
    const count = querySnapshot.size; // Get the number of documents in the category
    let allNewsItems = [];

    // Log category and count to see what's going on
    console.log(`Category: ${category}, Count: ${count}`);

    // Add each document to the list with its timestamp and reference
    querySnapshot.forEach((docSnap) => {
      allNewsItems.push({
        id: docSnap.id,
        data: docSnap.data(),
        category: category,
        timestamp: docSnap.data().date, // Assuming 'date' field is in each document
      });
    });

    // Display category and count
    const categoryElement = document.createElement("p");
    categoryElement.innerText = `${category.replace(
      /_/g,
      " "
    )}: ${count} news items`;
    container.appendChild(categoryElement);

    // If category exceeds 25 news items, show delete button
    if (count > 25) {
      createDeleteButton(allNewsItems, count - 25, category);
    }
  }
}

// Function to create a deletion button and prompt for confirmation
function createDeleteButton(allNewsItems, excessCount, category) {
  const container = document.getElementById("categoryList");

  // Create a button for confirmation
  const deleteButton = document.createElement("button");
  deleteButton.innerText = `Delete Oldest ${excessCount} Items in ${category.replace(
    /_/g,
    " "
  )}`;
  deleteButton.style.marginTop = "20px";
  deleteButton.style.padding = "10px 15px"; // Padding for the button
  deleteButton.style.backgroundColor = "#ff4c4c"; // Red background color
  deleteButton.style.color = "#fff"; // White text color
  deleteButton.style.border = "none"; // No border
  deleteButton.style.borderRadius = "5px"; // Rounded corners
  deleteButton.style.cursor = "pointer"; // Pointer cursor on hover
  deleteButton.style.fontSize = "16px"; // Font size
  deleteButton.style.transition = "background-color 0.3s"; // Transition effect

  deleteButton.addEventListener("mouseover", () => {
    deleteButton.style.backgroundColor = "#ff1f1f"; // Darker red on hover
  });

  deleteButton.addEventListener("mouseout", () => {
    deleteButton.style.backgroundColor = "#ff4c4c"; // Original red on mouse out
  });

  deleteButton.addEventListener("click", async () => {
    const confirmation = confirm(
      `You have ${excessCount} extra news items in ${category.replace(
        /_/g,
        " "
      )}. Do you want to delete the oldest ${excessCount} items?`
    );
    if (confirmation) {
      await deleteOldestNews(allNewsItems, excessCount);
    } else {
      alert("Deletion cancelled.");
    }
  });

  container.appendChild(deleteButton);
}

// Function to delete only the excess news items beyond 25
async function deleteOldestNews(allNewsItems, excessCount) {
  // Sort news by date in ascending order (oldest first)
  allNewsItems.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  // Delete the oldest 'excessCount' number of items
  for (let i = 0; i < excessCount; i++) {
    const newsItem = allNewsItems[i];
    const docRef = doc(firestore, newsItem.category, newsItem.id);
    await deleteDoc(docRef);
    console.log(`Deleted news item from ${newsItem.category}: ${newsItem.id}`);
  }

  // Reload the categories to update the counts after deletion
  displayCategoriesWithCounts();
}
