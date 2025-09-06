# Eurobet site Scraping

A Node.js project that scrapes live betting data from **Eurobet** and saves match details, scores, and odds into `.txt` files.  
This project was developed for a client.

---

## 🚀 Features
- Continuously fetches live sports data from Eurobet’s API.
- Extracts:
  - Sport type  
  - Nation  
  - Competition  
  - Match name  
  - Live score & time  
  - Available bets with odds
- Saves data into text files under `Eurobet/files/`. Two saving modes available:
  - **Single file mode** → all matches in `eurobet.txt`.
  - **Multiple files mode** → one file per group of matches.

---

## 🛠️ Tech Stack
- **Node.js** (v16+ recommended)
- **Express.js** (server entry point)
- **node-fetch** (to perform API requests)
- **fs** (Node.js file system module)

---

## 📂 Project Structure
```
AlessioBetScraping/
│── Eurobet/          # Core scraping logic
│   ├── eurobet.js
│   ├── const.js
│   └── files/        # Output .txt files
│── index.js          # Entry point (server + scraper)
│── package.json
│── package-lock.json
```

---

## 📄 Example Output
```txt
----------
Sport: Soccer
Nation: Italy
Competition: Serie A
Match: Napoli vs Milan
Score: 1-0
Time live: 45'
Bets available: {
  "1X2": { "1": "2.30", "X": "3.20", "2": "2.80" },
  "Over/Under 2.5": { "Over": "1.90", "Under": "1.85" }
}
```
