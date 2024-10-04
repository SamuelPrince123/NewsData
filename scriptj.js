import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  where,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmksj9rPjyZapz0wjT7llNYe8vT6jGbgY",
  authDomain: "newsinfo-2dcb2.firebaseapp.com",
  projectId: "newsinfo-2dcb2",
  storageBucket: "newsinfo-2dcb2.appspot.com",
  messagingSenderId: "641121104333",
  appId: "1:641121104333:web:b686d0844427008b47d484",
  measurementId: "G-N814HMYX62",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  // Bhutanese Jobs Submission
  document
    .getElementById("uploadFormBhutaneseJobs")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get form field values
      const title = document.getElementById("titleInputBhutaneseJobs").value;
      const date = document.getElementById("dateInputBhutaneseJobs").value;
      const headline = document.getElementById(
        "headlineInputBhutaneseJobs"
      ).value;
      const textInput = document.getElementById("textInputBhutaneseJobs").value;
      const imageUpload = document.getElementById("imageUploadBhutaneseJobs")
        .files[0];
      const formMessage = document.getElementById("formMessageBhutaneseJobs");

      if (textInput.split(/\s+/).length > 3000) {
        formMessage.innerText = "Your text exceeds the 3000-word limit.";
        return;
      }

      try {
        let imageUrl = "";
        if (imageUpload) {
          // Upload image to Firebase storage
          const imageRef = ref(
            storage,
            `images/${Date.now()}_${imageUpload.name}`
          );
          await uploadBytes(imageRef, imageUpload);
          imageUrl = await getDownloadURL(imageRef);
        }

        // Add document to Firestore with title, date, headline, text, and image
        await addDoc(collection(firestore, "bhutanese_jobs"), {
          title: title,
          date: date,
          headline: headline,
          text: textInput,
          imageUrl: imageUrl,
          timestamp: new Date(),
        });

        formMessage.innerText = "Form submitted successfully!";
        document.getElementById("uploadFormBhutaneseJobs").reset();

        // Add content to display
        addContent(
          title,
          date,
          headline,
          textInput,
          imageUrl,
          "bhutaneseJobsContentContainer"
        );
      } catch (error) {
        formMessage.innerText = "Error uploading content. Please try again.";
        console.error(error);
      }
    });

  // Fetching Bhutanese Jobs Content
  async function fetchContent(category, containerId) {
    try {
      const queryRef = query(
        collection(firestore, category),
        orderBy("timestamp", "desc")
      );
      const snapshot = await getDocs(queryRef);
      snapshot.forEach((doc) => {
        const data = doc.data();
        addContent(
          data.title,
          data.date,
          data.headline,
          data.text,
          data.imageUrl,
          containerId
        );
      });
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }

  fetchContent("bhutanese_jobs", "bhutaneseJobsContentContainer");
});

function addContent(title, date, headline, text, imageUrl, containerId) {
  const container = document.getElementById(containerId);
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content-item");
  contentDiv.innerHTML = `
    ${title ? `<h3>${title}</h3>` : ""}
    ${headline ? `<h4>${headline}</h4>` : ""}
    ${date ? `<p><strong>Date:</strong> ${date}</p>` : ""}
    ${text ? `<p>${text}</p>` : ""}
    ${
      imageUrl
        ? `<img src="${imageUrl}" alt="Uploaded Image" style="max-width: 100%; height: auto;">`
        : ""
    }
    <button class="delete-button">Delete</button>
  `;
  container.appendChild(contentDiv);

  contentDiv.querySelector(".delete-button").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this content?")) {
      deleteContent(
        contentDiv,
        imageUrl,
        getCollectionByContainerId(containerId)
      );
    }
  });
}

function getCollectionByContainerId(containerId) {
  switch (containerId) {
    case "bhutaneseJobsContentContainer":
      return "bhutanese_jobs";
    // Add more cases as needed for your other topics
    default:
      return ""; // Handle unknown container IDs
  }
}

async function deleteContent(contentDiv, imageUrl, category) {
  try {
    const q = query(
      collection(firestore, category),
      where("imageUrl", "==", imageUrl)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    const imageRef = ref(
      storage,
      `images/${imageUrl.split("/").pop().split("?")[0]}`
    );
    await deleteObject(imageRef);

    contentDiv.remove();
  } catch (error) {
    console.error("Error deleting content:", error);
  }
}
