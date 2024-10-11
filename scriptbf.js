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
  deleteDoc,
  doc,
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
  // Future Scope Submission
  document
    .getElementById("uploadFormFutureScope")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get form field values
      const title =
        document.getElementById("titleInputFutureScope").value || "";
      const date = document.getElementById("dateInputFutureScope").value || "";
      const headline =
        document.getElementById("headlineInputFutureScope").value || "";
      const textInput =
        document.getElementById("textInputFutureScope").value || "";
      const imageUpload = document.getElementById("imageUploadFutureScope")
        .files[0];
      const formMessage = document.getElementById("formMessageFutureScope");

      if (textInput.split(/\s+/).length > 3000) {
        formMessage.innerText = "Your text exceeds the 3000-word limit.";
        return;
      }

      let imageUrl = "";
      if (imageUpload) {
        try {
          const imageRef = ref(
            storage,
            `images/${Date.now()}_${imageUpload.name}`
          );
          await uploadBytes(imageRef, imageUpload);
          imageUrl = await getDownloadURL(imageRef);
        } catch (error) {
          formMessage.innerText = "Error uploading image. Please try again.";
          console.error(error);
          return;
        }
      }

      try {
        // Add document to Firestore with title, date, headline, text, and image
        const docRef = await addDoc(
          collection(firestore, "bhutanese_future_scope"),
          {
            title: title,
            date: date,
            headline: headline,
            text: textInput,
            imageUrl: imageUrl,
            timestamp: new Date(),
          }
        );

        formMessage.innerText = "Form submitted successfully!";
        document.getElementById("uploadFormFutureScope").reset();

        // Add content to display
        addContent(
          docRef.id,
          title,
          date,
          headline,
          textInput,
          imageUrl,
          "bhutaneseFutureScopeContentContainer"
        );
      } catch (error) {
        formMessage.innerText = "Error submitting form. Please try again.";
        console.error(error);
      }
    });

  // Fetching Future Scope Content
  async function fetchContent(category, containerId) {
    try {
      const futureScopeQuery = query(
        collection(firestore, category),
        orderBy("timestamp", "desc")
      );
      const futureScopeSnapshot = await getDocs(futureScopeQuery);
      futureScopeSnapshot.forEach((doc) => {
        const data = doc.data();
        addContent(
          doc.id,
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

  fetchContent(
    "bhutanese_future_scope",
    "bhutaneseFutureScopeContentContainer"
  );
});

function addContent(docId, title, date, headline, text, imageUrl, containerId) {
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
        <button class="deleteButton" data-doc-id="${docId}">Delete</button>
    `;
  container.appendChild(contentDiv);

  // Add event listener for the delete button
  contentDiv
    .querySelector(".deleteButton")
    .addEventListener("click", async () => {
      try {
        // Delete Firestore document
        await deleteDoc(doc(firestore, "bhutanese_future_scope", docId));

        // Delete associated image from storage
        if (imageUrl) {
          const imageRef = ref(
            storage,
            imageUrl.split("/").pop().split("?")[0]
          ); // Get file path
          await deleteObject(imageRef);
        }

        // Remove content from display
        container.removeChild(contentDiv);
      } catch (error) {
        console.error("Error deleting content:", error);
      }
    });
}
