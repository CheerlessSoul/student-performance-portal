# 🎓 EduTrack - Student Record & Performance Portal

Welcome! This is a simple, modern, and user-friendly student management website designed specifically to be **easy to run and understand, even if you are not experienced with coding**.

---

## 🚀 How to Run the Website (Super Easy!)

You **do not need** to install Node.js, Python, or any complex database software.

### Step 1: Open the Folder
Go to:
```
C:\Users\Prateek\.gemini\antigravity\scratch\student-performance-portal
```

### Step 2: Double-Click `index.html` or `Start_Portal.bat`
Simply **double-click the file named `index.html`** or **`Start_Portal.bat`** in File Explorer.
It will open instantly in your web browser (Google Chrome, Microsoft Edge, Brave, or Firefox)!

---

## ✨ Features Included

### 1. 📋 Normal Student Details
Every student record includes:
- **Full Name**
- **Roll Number / Student ID**
- **Class / Grade** (Grade 9, 10, 11, 12) & **Section**
- **Gender & Date of Birth**
- **Parent / Guardian Name**
- **Contact Phone & Email**
- **Attendance Percentage (%)** with color-coded status badges

### 2. 📊 Academic Performance Records
- Individual marks (out of 100) for **5 core subjects**:
  - Mathematics
  - Science
  - English
  - Social Studies
  - Computer Science
- **Automatic Calculations** done instantly by the system:
  - **Total Marks** (out of 500)
  - **Percentage (%)**
  - **Letter Grade** (`A+`, `A`, `B+`, `B`, `C`, `D`, `F`)
  - **Academic Status** (*Distinction*, *Passed*, *Needs Improvement*)
- **Teacher's Remarks / Feedback** note

### 3. 📈 Class Overview Dashboard
At the top of the page, you'll see live summary cards:
- **Total Students** enrolled
- **Class Average Percentage**
- **Top Performer** (Name & Highest Score)
- **Passing Rate (%)**

### 4. 🖨️ Printable Official Report Card
- Click the **"Report Card"** button on any student.
- A transcript card will open showing their subject breakdown, progress bars, and teacher comments.
- Click the **"Print / Save PDF"** button to print the report card or save it directly as a clean PDF for parents!

### 5. 🔍 Search, Filter & Sort
- **Search bar**: Type any student name or roll number to find them instantly.
- **Class Filter**: Filter by Grade 9, 10, 11, or 12.
- **Status Filter**: View only *Distinction*, *Passed*, or *Needs Improvement* students.
- **Sort Dropdown**: Sort by Highest Marks, Lowest Marks, Name (A to Z), or Attendance.
- **View Switch**: Toggle between **Cards View** and **Table View** with one click.

### 6. 💾 Safe Storage & Data Export
- **Automatic Saving**: Any student you add, edit, or delete is automatically saved to your browser's local memory (`localStorage`). You won't lose your data when you refresh the page.
- **Export to CSV**: Click the **"Export CSV"** button at the top right to download all student records into an Excel / spreadsheet file.
- **Reset Sample Data**: If you want to experiment or restore the default demo students, click **"Reset Data"**.

---

## 🛠️ How to Customize (If You Want to Change Anything)

The project is made of 3 clean files:

| File | What It Does |
| :--- | :--- |
| `index.html` | The webpage structure (buttons, cards, forms, popup dialogs) |
| `style.css` | The colors, layout, styling, fonts, and print format |
| `app.js` | The smart calculations, saving data, search, and printing logic |

### Want to change the School Name on the Report Card?
1. Open `index.html` in any text editor (Notepad, VS Code).
2. Search for: `SPRINGFIELD ACADEMY OF EXCELLENCE`.
3. Change it to your own school or college name!

### Want to change the grading scale?
1. Open `app.js`.
2. Look at lines `140-170` inside the `calculatePerformance` function. You can easily adjust the percentage numbers (`90`, `80`, `70`, etc.).

---

*Enjoy tracking your student records effortlessly!*
