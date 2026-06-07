# Email Writer AI ✉️🤖

An AI-powered Chrome Extension that helps users generate professional email replies directly inside Gmail using Google's Gemini API and Spring AI.

## 🚀 Features

* Generate email replies instantly using AI
* Seamlessly integrates with Gmail
* Uses Google Gemini API for content generation
* Built with Spring Boot and Spring AI
* Chrome Extension for quick access inside Gmail
* Supports different email tones (Professional, Friendly, Formal, etc.)
* Simple and responsive user interface

---

## 🏗️ Architecture

```text
Chrome Extension
        │
        ▼
Spring Boot Backend
        │
        ▼
Spring AI
        │
        ▼
Google Gemini API
```

### Workflow

1. User opens an email in Gmail.
2. Chrome Extension detects the email content.
3. User clicks the **AI Reply** button.
4. Email content is sent to the Spring Boot backend.
5. Backend uses Spring AI to communicate with Gemini API.
6. Gemini generates a response.
7. Generated reply is inserted into Gmail's compose box.

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* Chrome Extension APIs

### Backend

* Java
* Spring Boot
* Spring AI
* Maven

### AI

* Google Gemini API

---

## 📂 Project Structure

```text
Email_Writer_AI/
│
├── email-writer-extension/
│   ├── manifest.json
│   ├── content.js
│   ├── popup.html
│   ├── popup.js
│   └── styles.css
│
├── email-writer-sb/
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kartikbhandare7/Email_Writer_AI.git
cd Email_Writer_AI
```

### 2. Configure Gemini API Key

Add your Gemini API key in:

```properties
application.properties
```

```properties
spring.ai.google.gemini.api-key=YOUR_API_KEY
```

### 3. Run Spring Boot Backend

```bash
mvn spring-boot:run
```

Backend will start on:

```text
http://localhost:8080
```

---

## 🔌 Load Chrome Extension

1. Open Chrome.
2. Navigate to:

```text
chrome://extensions
```

3. Enable **Developer Mode**.
4. Click **Load Unpacked**.
5. Select the extension folder.
6. Open Gmail and start using the AI Reply feature.

---

## 🎯 Example Use Case

### Input Email

```text
Hi Kartik,

Can you provide an update regarding the project status by tomorrow?

Thanks,
Manager
```

### AI Generated Reply

```text
Hi Manager,

Thank you for reaching out.

I am currently working on the project and will provide a detailed status update by tomorrow. Please let me know if there are any specific areas you would like me to focus on.

Best Regards,
Kartik
```

---

## 🔮 Future Enhancements

* Multiple language support
* Custom prompt templates
* Email summarization
* Tone customization
* One-click email generation
* Outlook support

---

## 👨‍💻 Author

**Kartik Bhandare**

GitHub: https://github.com/kartikbhandare7

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.
