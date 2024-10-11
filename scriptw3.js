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
  document
    .getElementById("uploadFormWellness")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get form field values
      const title = document.getElementById("titleInputWellness").value;
      const date = document.getElementById("dateInputWellness").value;
      const headline = document.getElementById("headlineInputWellness").value;
      const textInput = document.getElementById("textInputWellness").value;
      const imageUpload = document.getElementById("imageUploadWellness")
        .files[0];
      const formMessage = document.getElementById("formMessageWellness");

      if (textInput.split(/\s+/).length > 3000) {
        formMessage.innerText = "Your text exceeds the 3000-word limit.";
        return;
      }

      try {
        // Upload image to Firebase storage
        const imageRef = ref(
          storage,
          `images/${Date.now()}_${imageUpload.name}`
        );
        await uploadBytes(imageRef, imageUpload);
        const imageUrl = await getDownloadURL(imageRef);

        // Add document to Firestore
        await addDoc(collection(firestore, "wellness_and_health"), {
          title: title,
          date: date,
          headline: headline,
          text: textInput,
          imageUrl: imageUrl,
          timestamp: new Date(),
        });

        formMessage.innerText = "Form submitted successfully!";
        document.getElementById("uploadFormWellness").reset();

        // Add content to display
        addContent(
          title,
          date,
          headline,
          textInput,
          imageUrl,
          "wellnessContentContainer"
        );
      } catch (error) {
        formMessage.innerText = "Error uploading content. Please try again.";
        console.error(error);
      }
    });

  // Finance and Business Submission
  document
    .getElementById("uploadFormFinance")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get form field values
      const title = document.getElementById("titleInputFinance").value;
      const date = document.getElementById("dateInputFinance").value;
      const headline = document.getElementById("headlineInputFinance").value;
      const textInput = document.getElementById("textInputFinance").value;
      const imageUpload =
        document.getElementById("imageUploadFinance").files[0];
      const formMessage = document.getElementById("formMessageFinance");

      if (textInput.split(/\s+/).length > 3000) {
        formMessage.innerText = "Your text exceeds the 3000-word limit.";
        return;
      }

      try {
        // Upload image to Firebase storage
        const imageRef = ref(
          storage,
          `images/${Date.now()}_${imageUpload.name}`
        );
        await uploadBytes(imageRef, imageUpload);
        const imageUrl = await getDownloadURL(imageRef);

        // Add document to Firestore with title, date, headline, text, and image
        await addDoc(collection(firestore, "finance_and_business"), {
          title: title,
          date: date,
          headline: headline,
          text: textInput,
          imageUrl: imageUrl,
          timestamp: new Date(),
        });

        formMessage.innerText = "Form submitted successfully!";
        document.getElementById("uploadFormFinance").reset();

        // Add content to display
        addContent(
          title,
          date,
          headline,
          textInput,
          imageUrl,
          "financeContentContainer"
        );
      } catch (error) {
        formMessage.innerText = "Error uploading content. Please try again.";
        console.error(error);
      }
    });

  // Environment and Climate Submission
  document
    .getElementById("uploadFormEnvironment")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get form field values
      const title = document.getElementById("titleInputEnvironment").value;
      const date = document.getElementById("dateInputEnvironment").value;
      const headline = document.getElementById(
        "headlineInputEnvironment"
      ).value;
      const textInput = document.getElementById("textInputEnvironment").value;
      const imageUpload = document.getElementById("imageUploadEnvironment")
        .files[0];
      const formMessage = document.getElementById("formMessageEnvironment");

      if (textInput.split(/\s+/).length > 3000) {
        formMessage.innerText = "Your text exceeds the 3000-word limit.";
        return;
      }

      try {
        // Upload image to Firebase storage
        const imageRef = ref(
          storage,
          `images/${Date.now()}_${imageUpload.name}`
        );
        await uploadBytes(imageRef, imageUpload);
        const imageUrl = await getDownloadURL(imageRef);

        // Add document to Firestore with title, date, headline, text, and image
        await addDoc(collection(firestore, "environment_and_climate"), {
          title: title,
          date: date,
          headline: headline,
          text: textInput,
          imageUrl: imageUrl,
          timestamp: new Date(),
        });

        formMessage.innerText = "Form submitted successfully!";
        document.getElementById("uploadFormEnvironment").reset();

        // Add content to display
        addContent(
          title,
          date,
          headline,
          textInput,
          imageUrl,
          "environmentContentContainer"
        );
      } catch (error) {
        formMessage.innerText = "Error uploading content. Please try again.";
        console.error(error);
      }
    });

  // Education and Learning Submission
  document
    .getElementById("uploadFormEducationLearning")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get form field values
      const title = document.getElementById(
        "titleInputEducationLearning"
      ).value;
      const date = document.getElementById("dateInputEducationLearning").value;
      const headline = document.getElementById(
        "headlineInputEducationLearning"
      ).value;
      const textInput = document.getElementById(
        "textInputEducationLearning"
      ).value;
      const imageUpload = document.getElementById(
        "imageUploadEducationLearning"
      ).files[0];
      const formMessage = document.getElementById(
        "formMessageEducationLearning"
      );

      if (textInput.split(/\s+/).length > 3000) {
        formMessage.innerText = "Your text exceeds the 3000-word limit.";
        return;
      }

      try {
        // Upload image to Firebase storage
        const imageRef = ref(
          storage,
          `images/${Date.now()}_${imageUpload.name}`
        );
        await uploadBytes(imageRef, imageUpload);
        const imageUrl = await getDownloadURL(imageRef);

        // Add document to Firestore with title, date, headline, text, and image
        await addDoc(collection(firestore, "education_and_learning"), {
          title: title,
          date: date,
          headline: headline,
          text: textInput,
          imageUrl: imageUrl,
          timestamp: new Date(),
        });

        formMessage.innerText = "Form submitted successfully!";
        document.getElementById("uploadFormEducationLearning").reset();

        // Add content to display
        addContent(
          title,
          date,
          headline,
          textInput,
          imageUrl,
          "educationLearningContentContainer"
        );
      } catch (error) {
        formMessage.innerText = "Error uploading content. Please try again.";
        console.error(error);
      }
    });

  // Fetching Technology and Innovation Content
  async function fetchContent(category, containerId) {
    try {
      const techQuery = query(
        collection(firestore, category),
        orderBy("timestamp", "desc")
      );
      const techSnapshot = await getDocs(techQuery);
      techSnapshot.forEach((doc) => {
        const data = doc.data();
        addContent(data.text, data.imageUrl, containerId);
      });
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }
  // Fetch Content for Wellness and Health
  fetchContent("wellness_and_health", "wellnessContentContainer");

  fetchContent("finance_and_business", "financeContentContainer");

  fetchContent("environment_and_climate", "environmentContentContainer");

  fetchContent("education_and_learning", "educationLearningContentContainer");
});
function addContent(
  text,
  imageUrl,
  containerId,
  title = "",
  date = "",
  headline = ""
) {
  const container = document.getElementById(containerId);
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content-item");
  contentDiv.innerHTML = `
        ${title ? `<h3>${title}</h3>` : ""}
        ${headline ? `<h4>${headline}</h4>` : ""}
        ${date ? `<p><strong>Date:</strong> ${date}</p>` : ""}
        <p>${text}</p>
        ${imageUrl ? `<img src="${imageUrl}" alt="Uploaded Image">` : ""}
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
    case "wellnessContentContainer":
      return "wellness_and_health";
    case "financeContentContainer":
      return "finance_and_business";
    case "environmentContentContainer":
      return "environment_and_climate";
    case "educationLearningContentContainer":
      return "education_and_learning";
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
