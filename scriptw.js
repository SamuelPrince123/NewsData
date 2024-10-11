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
  // Technology and Innovation Submission
  document
    .getElementById("uploadFormTech")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get form field values
      const title = document.getElementById("titleTech").value;
      const date = document.getElementById("dateTech").value;
      const headline = document.getElementById("headlineTech").value;
      const textInput = document.getElementById("textInputTech").value;
      const imageUpload = document.getElementById("imageUploadTech").files[0];
      const formMessage = document.getElementById("formMessageTech");

      if (textInput.split(/\s+/).length > 3000) {
        formMessage.innerText = "Your text exceeds the 500-word limit.";
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
        await addDoc(collection(firestore, "technology"), {
          title: title,
          date: date,
          headline: headline,
          text: textInput,
          imageUrl: imageUrl,
          timestamp: new Date(),
        });

        formMessage.innerText = "Form submitted successfully!";
        document.getElementById("uploadFormTech").reset();

        // Add content to display
        addContent(
          title,
          date,
          headline,
          textInput,
          imageUrl,
          "techContentContainer"
        );
      } catch (error) {
        formMessage.innerText = "Error uploading content. Please try again.";
        console.error(error);
      }
    });

  // World Crises Submission
  document
    .getElementById("uploadFormCrises")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get form field values
      const title = document.getElementById("titleInputCrises").value;
      const date = document.getElementById("dateInputCrises").value;
      const headline = document.getElementById("headlineInputCrises").value;
      const textInput = document.getElementById("textInputCrises").value;
      const imageUpload = document.getElementById("imageUploadCrises").files[0];
      const formMessage = document.getElementById("formMessageCrises");

      if (textInput.split(/\s+/).length > 3000) {
        formMessage.innerText = "Your text exceeds the 1000-word limit.";
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
        await addDoc(collection(firestore, "crises"), {
          title: title,
          date: date,
          headline: headline,
          text: textInput,
          imageUrl: imageUrl,
          timestamp: new Date(),
        });

        formMessage.innerText = "Form submitted successfully!";
        document.getElementById("uploadFormCrises").reset();

        // Add content to display
        addContent(
          title,
          date,
          headline,
          textInput,
          imageUrl,
          "crisesContentContainer"
        );
      } catch (error) {
        formMessage.innerText = "Error uploading content. Please try again.";
        console.error(error);
      }
    });

  // Sports Submission
  document
    .getElementById("uploadFormSports")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get form field values
      const title = document.getElementById("titleInputSports").value;
      const date = document.getElementById("dateInputSports").value;
      const headline = document.getElementById("headlineInputSports").value;
      const textInput = document.getElementById("textInputSports").value;
      const imageUpload = document.getElementById("imageUploadSports").files[0];
      const formMessage = document.getElementById("formMessageSports");

      if (textInput.split(/\s+/).length > 3000) {
        formMessage.innerText = "Your text exceeds the 700-word limit.";
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
        await addDoc(collection(firestore, "sports"), {
          title: title,
          date: date,
          headline: headline,
          text: textInput,
          imageUrl: imageUrl,
          timestamp: new Date(),
        });

        formMessage.innerText = "Form submitted successfully!";
        document.getElementById("uploadFormSports").reset();

        // Add content to display
        addContent(
          title,
          date,
          headline,
          textInput,
          imageUrl,
          "sportsContentContainer"
        );
      } catch (error) {
        formMessage.innerText = "Error uploading content. Please try again.";
        console.error(error);
      }
    });

  // Entertainment and Celebrity News Submission
  document
    .getElementById("uploadFormEntertainment")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get form field values
      const title = document.getElementById("titleInputEntertainment").value;
      const date = document.getElementById("dateInputEntertainment").value;
      const headline = document.getElementById(
        "headlineInputEntertainment"
      ).value;
      const textInput = document.getElementById("textInputEntertainment").value;
      const imageUpload = document.getElementById("imageUploadEntertainment")
        .files[0];
      const formMessage = document.getElementById("formMessageEntertainment");

      if (textInput.split(/\s+/).length > 3000) {
        formMessage.innerText = "Your text exceeds the 800-word limit.";
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
        await addDoc(collection(firestore, "entertainment"), {
          title: title,
          date: date,
          headline: headline,
          text: textInput,
          imageUrl: imageUrl,
          timestamp: new Date(),
        });

        formMessage.innerText = "Form submitted successfully!";
        document.getElementById("uploadFormEntertainment").reset();

        // Add content to display
        addContent(
          title,
          date,
          headline,
          textInput,
          imageUrl,
          "entertainmentContentContainer"
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
      const textInputElement = document.getElementById("textInputFinance");
      const imageUploadElement = document.getElementById("imageUploadFinance");
      const formMessage = document.getElementById("formMessageFinance");

      const textInput = textInputElement.value;
      const imageUpload = imageUploadElement.files[0];

      if (textInput.split(/\s+/).length > 3000) {
        // Adjust word limit here
        formMessage.innerText = "Your text exceeds the 3000-word limit.";
        return;
      }

      try {
        const imageRef = ref(
          storage,
          `images/${Date.now()}_${imageUpload.name}`
        );
        await uploadBytes(imageRef, imageUpload);
        const imageUrl = await getDownloadURL(imageRef);
        await addDoc(collection(firestore, "finance_and_business"), {
          text: textInput,
          imageUrl: imageUrl,
          timestamp: new Date(),
        });
        formMessage.innerText = "Form submitted successfully!";
        document.getElementById("uploadFormFinance").reset();
        addContent(textInput, imageUrl, "financeContentContainer");
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
      const textInputElement = document.getElementById("textInputEnvironment");
      const imageUploadElement = document.getElementById(
        "imageUploadEnvironment"
      );
      const formMessage = document.getElementById("formMessageEnvironment");

      const textInput = textInputElement.value;
      const imageUpload = imageUploadElement.files[0];

      if (textInput.split(/\s+/).length > 3000) {
        // Adjust word limit here
        formMessage.innerText = "Your text exceeds the 3000-word limit.";
        return;
      }

      try {
        const imageRef = ref(
          storage,
          `images/${Date.now()}_${imageUpload.name}`
        );
        await uploadBytes(imageRef, imageUpload);
        const imageUrl = await getDownloadURL(imageRef);
        await addDoc(collection(firestore, "environment_and_climate"), {
          text: textInput,
          imageUrl: imageUrl,
          timestamp: new Date(),
        });
        formMessage.innerText = "Form submitted successfully!";
        document.getElementById("uploadFormEnvironment").reset();
        addContent(textInput, imageUrl, "environmentContentContainer");
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

  fetchContent("technology", "techContentContainer");
  fetchContent("crises", "crisesContentContainer");
  fetchContent("sports", "sportsContentContainer");
  fetchContent("entertainment", "entertainmentContentContainer");
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
    case "techContentContainer":
      return "technology";
    case "crisesContentContainer":
      return "crises";
    case "sportsContentContainer":
      return "sports";
    case "entertainmentContentContainer":
      return "entertainment";
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
