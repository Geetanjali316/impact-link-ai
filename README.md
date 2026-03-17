# 🤝 ImpactLink AI

> **Built With AI – Smart Volunteer Matching System**

A full-stack web application that connects volunteers with NGOs and social work opportunities using AI-powered smart matching.

---

## 🚀 Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React.js                |
| Backend   | Node.js + Express.js    |
| Database  | MongoDB (Mongoose ODM)  |
| AI Engine | Custom Matching Algorithm |

---

## 📁 Project Structure

```
volunteer-connect-ai/
│
├── client/                    (React Frontend)
│   ├── public/
│   │    └── index.html
│   └── src/
│        ├── components/
│        │      Navbar.js / Navbar.css
│        │      OpportunityCard.js / OpportunityCard.css
│        │      VolunteerForm.js / VolunteerForm.css
│        ├── pages/
│        │      Home.js / Home.css
│        │      RegisterVolunteer.js
│        │      PostOpportunity.js
│        │      Opportunities.js / Opportunities.css
│        │      PageStyles.css
│        ├── services/
│        │      api.js
│        ├── App.js
│        ├── index.js
│        └── index.css
│
├── server/                    (Backend)
│   ├── ai/
│   │      matchingEngine.js   ← AI Matching Logic
│   ├── config/
│   │      db.js
│   ├── controllers/
│   │      volunteerController.js
│   │      opportunityController.js
│   ├── models/
│   │      Volunteer.js
│   │      Opportunity.js
│   ├── routes/
│   │      volunteerRoutes.js
│   │      opportunityRoutes.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** (v16+)
- **MongoDB** (local or Atlas cloud)
- **npm** (comes with Node.js)

### 1. Clone / Extract the Project

```bash
cd volunteer-connect-ai
```

### 2. Setup Backend

```bash
cd server
npm install
```

Edit `.env` to set your MongoDB connection URI:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/volunteerConnectAI
```

Start the server:

```bash
npm run dev    # with nodemon (hot-reload)
# or
npm start      # production
```

### 3. Setup Frontend

```bash
cd client
npm install
npm start
```

The React app will open at **http://localhost:3000**.

---

## 📡 API Endpoints

| Method | Endpoint                            | Description                     |
|--------|-------------------------------------|---------------------------------|
| POST   | `/api/volunteers`                   | Register a new volunteer        |
| GET    | `/api/volunteers`                   | Get all volunteers              |
| GET    | `/api/volunteers/:id`               | Get volunteer by ID             |
| POST   | `/api/opportunities`                | Create a new opportunity        |
| GET    | `/api/opportunities`                | Get all opportunities           |
| GET    | `/api/opportunities/:id`            | Get opportunity by ID           |
| GET    | `/api/opportunities/:id/matches`    | **AI Smart Match** for opportunity |

---

## 🧠 AI Smart Matching Logic

The AI Matching Engine (`server/ai/matchingEngine.js`) uses a **weighted multi-factor scoring algorithm** to find the best volunteers for each opportunity.

### Scoring Factors

| Factor         | Weight | Description                                        |
|----------------|--------|----------------------------------------------------|
| **Skills**     | 60%    | Compares volunteer skills vs. required skills       |
| **Location**   | 25%    | Matches volunteer location with opportunity location|
| **Availability** | 15% | Rewards volunteers with broader availability        |

### How It Works

1. **Skill Matching** – Each required skill is compared against volunteer skills:
   - **Exact match** → 1.0 points
   - **Partial/substring match** → 0.5 points (fuzzy matching)
   - Score = total points / number of required skills

2. **Location Matching** – Compares volunteer and opportunity locations:
   - **Exact match** → 1.0
   - **Partial match** (substring) → 0.5
   - **No match** → 0.0

3. **Availability Score** – Keywords like "full-time", "flexible" score higher:
   - **High availability** ("full-time", "flexible") → 1.0
   - **Medium** ("weekdays", "weekends") → 0.6
   - **Other** → 0.3

4. **Final Score** = `(skillScore × 0.60) + (locationScore × 0.25) + (availabilityScore × 0.15)` → displayed as a **percentage (0–100%)**.

5. Results are **sorted by score** (highest first), and each result includes a **breakdown** explaining why the volunteer was matched.

---

## 🎨 Features

- ✅ **Volunteer Registration** – Name, email, phone, location, skills, availability
- ✅ **NGO Opportunity Posting** – Title, organization, description, location, date, skills, volunteers needed
- ✅ **Opportunities Listing** – Browse & search all available opportunities
- ✅ **AI Smart Matching** – Click "AI Smart Match" on any opportunity to see ranked volunteers
- ✅ **Score Breakdown** – See exactly why each volunteer was matched (skill %, location %, availability %)
- ✅ **Responsive Design** – Works beautifully on desktop & mobile
- ✅ **Modern Dark Theme** – Glassmorphic UI with gradient accents

---

## 💡 Presentation Tagline

> **"Built With AI – Smart Volunteer Matching System"**
>
> *Uses multi-factor weighted scoring to intelligently connect volunteers with the right NGO opportunities based on skills, location, and availability.*

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by Volunteer Connect AI Team
