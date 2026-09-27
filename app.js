/**
 * ==============================================================================
 * EduTrack - Student Performance & Record Management Portal
 * Simple, Clean Vanilla JavaScript for Beginners
 * ==============================================================================
 */

// Storage Key for Browser LocalStorage
const STORAGE_KEY = 'edutrack_students_data_v1';

// Default Sample Student Records
const INITIAL_STUDENTS = [
  {
    id: 'stu-1',
    fullName: 'Sneha Kulkarni',
    rollNumber: 'R-145',
    studentClass: 'Grade 11',
    section: 'Section A',
    gender: 'Female',
    dob: '2009-04-12',
    guardianName: 'Dr. Suresh Kulkarni',
    guardianPhone: '+91 98230 11223',
    email: 'sneha.k@example.com',
    attendance: 98,
    marks: {
      math: 98,
      science: 96,
      english: 92,
      social: 95,
      computer: 99
    },
    remarks: 'Outstanding analytical skills and leadership in group science projects. Top student of the term!'
  },
  {
    id: 'stu-2',
    fullName: 'Rahul Sharma',
    rollNumber: 'R-101',
    studentClass: 'Grade 10',
    section: 'Section A',
    gender: 'Male',
    dob: '2010-08-22',
    guardianName: 'Mr. Anil Sharma',
    guardianPhone: '+91 98765 43210',
    email: 'rahul.s@example.com',
    attendance: 94,
    marks: {
      math: 92,
      science: 89,
      english: 85,
      social: 88,
      computer: 95
    },
    remarks: 'Consistent academic dedication and keen interest in computer science and coding competitions.'
  },
  {
    id: 'stu-3',
    fullName: 'Ananya Verma',
    rollNumber: 'R-102',
    studentClass: 'Grade 10',
    section: 'Section B',
    gender: 'Female',
    dob: '2010-11-05',
    guardianName: 'Mrs. Sunita Verma',
    guardianPhone: '+91 98111 22334',
    email: 'ananya.v@example.com',
    attendance: 91,
    marks: {
      math: 88,
      science: 85,
      english: 94,
      social: 90,
      computer: 86
    },
    remarks: 'Exceptional communication and essay writing skills. Active participation in all school debates.'
  },
  {
    id: 'stu-4',
    fullName: 'Priya Das',
    rollNumber: 'R-210',
    studentClass: 'Grade 12',
    section: 'Section A',
    gender: 'Female',
    dob: '2008-01-19',
    guardianName: 'Mr. Subhash Das',
    guardianPhone: '+91 98300 44556',
    email: 'priya.das@example.com',
    attendance: 87,
    marks: {
      math: 78,
      science: 82,
      english: 85,
      social: 79,
      computer: 88
    },
    remarks: 'Steady progress across all science modules. Works well in collaborative laboratory sessions.'
  },
  {
    id: 'stu-5',
    fullName: 'Aarav Patel',
    rollNumber: 'R-089',
    studentClass: 'Grade 9',
    section: 'Section C',
    gender: 'Male',
    dob: '2011-06-15',
    guardianName: 'Mr. Jayesh Patel',
    guardianPhone: '+91 98222 33445',
    email: 'aarav.patel@example.com',
    attendance: 82,
    marks: {
      math: 70,
      science: 75,
      english: 72,
      social: 68,
      computer: 81
    },
    remarks: 'Good grasp of fundamentals. Needs regular practice in mathematics problem-solving.'
  },
  {
    id: 'stu-6',
    fullName: 'Rohan Gupta',
    rollNumber: 'R-105',
    studentClass: 'Grade 10',
    section: 'Section B',
    gender: 'Male',
    dob: '2010-03-30',
    guardianName: 'Mr. Rajeev Gupta',
    guardianPhone: '+91 98450 67890',
    email: 'rohan.g@example.com',
    attendance: 68,
    marks: {
      math: 42,
      science: 45,
      english: 52,
      social: 48,
      computer: 56
    },
    remarks: 'Attendance has been irregular. Needs focused remedial guidance in Science and Mathematics.'
  }
];

// App State
let studentsList = [];
let currentView = 'cards'; // 'cards' or 'table'
let studentToDeleteId = null;

// DOM Elements
const cardsView = document.getElementById('cardsView');
const tableView = document.getElementById('tableView');
const tableBody = document.getElementById('tableBody');
const emptyState = document.getElementById('emptyState');

// Filters & Controls
const searchInput = document.getElementById('searchInput');
const filterClass = document.getElementById('filterClass');
const filterStatus = document.getElementById('filterStatus');
const sortBy = document.getElementById('sortBy');
const btnViewCards = document.getElementById('btnViewCards');
const btnViewTable = document.getElementById('btnViewTable');
const btnClearFilters = document.getElementById('btnClearFilters');
const btnExportCSV = document.getElementById('btnExportCSV');
const btnResetSampleData = document.getElementById('btnResetSampleData');

// Dashboard Stats Elements
const statTotalStudents = document.getElementById('statTotalStudents');
const statClassAverage = document.getElementById('statClassAverage');
const statTopPerformer = document.getElementById('statTopPerformer');
const statPassingRate = document.getElementById('statPassingRate');

// Dialogs
const studentDialog = document.getElementById('studentDialog');
const btnOpenAddModal = document.getElementById('btnOpenAddModal');
const btnCloseDialog = document.getElementById('btnCloseDialog');
const btnCancelForm = document.getElementById('btnCancelForm');
const studentForm = document.getElementById('studentForm');
const modalTitle = document.getElementById('modalTitle');
const editStudentId = document.getElementById('editStudentId');

// Live calculation inputs
const markInputs = document.querySelectorAll('.subject-input');
const previewTotal = document.getElementById('previewTotal');
const previewPercentage = document.getElementById('previewPercentage');
const previewGrade = document.getElementById('previewGrade');
const previewStatus = document.getElementById('previewStatus');

// Report Card Dialog Elements
const reportCardDialog = document.getElementById('reportCardDialog');
const btnCloseReport = document.getElementById('btnCloseReport');
const btnPrintReport = document.getElementById('btnPrintReport');

// Delete Confirm Dialog Elements
const deleteConfirmDialog = document.getElementById('deleteConfirmDialog');
const btnCancelDelete = document.getElementById('btnCancelDelete');
const btnConfirmDelete = document.getElementById('btnConfirmDelete');
const deleteConfirmMessage = document.getElementById('deleteConfirmMessage');

// Toast Notification
const toastNotification = document.getElementById('toastNotification');

/* ==========================================================================
   Helper Functions (Grades, Calculations, Badges)
   ========================================================================== */

/**
 * Calculates total, percentage, grade, and academic status based on marks
 * @param {Object} marks - Object containing math, science, english, social, computer
 * @returns {Object} Calculated metrics
 */
function calculatePerformance(marks) {
  const m = {
    math: Number(marks?.math) || 0,
    science: Number(marks?.science) || 0,
    english: Number(marks?.english) || 0,
    social: Number(marks?.social) || 0,
    computer: Number(marks?.computer) || 0
  };

  const total = m.math + m.science + m.english + m.social + m.computer;
  const maxTotal = 500;
  const percentage = Math.round((total / maxTotal) * 1000) / 10; // 1 decimal place

  // Grade Determination
  let grade = 'F';
  let gradeClass = 'grade-F';

  if (percentage >= 90) {
    grade = 'A+';
    gradeClass = 'grade-A-plus';
  } else if (percentage >= 80) {
    grade = 'A';
    gradeClass = 'grade-A';
  } else if (percentage >= 70) {
    grade = 'B+';
    gradeClass = 'grade-B-plus';
  } else if (percentage >= 60) {
    grade = 'B';
    gradeClass = 'grade-B';
  } else if (percentage >= 50) {
    grade = 'C';
    gradeClass = 'grade-C';
  } else if (percentage >= 40) {
    grade = 'D';
    gradeClass = 'grade-D';
  } else {
    grade = 'F';
    gradeClass = 'grade-F';
  }

  // Academic Status
  let status = 'Needs Improvement';
  let statusClass = 'status-fail';

  if (percentage >= 85) {
    status = 'Distinction';
    statusClass = 'status-distinction';
  } else if (percentage >= 50) {
    status = 'Passed';
    statusClass = 'status-passed';
  } else {
    status = 'Needs Improvement';
    statusClass = 'status-fail';
  }

  // Progress Bar Fill Color
  let fillClass = 'fill-rose';
  if (percentage >= 80) fillClass = 'fill-emerald';
  else if (percentage >= 60) fillClass = 'fill-blue';
  else if (percentage >= 50) fillClass = 'fill-amber';

  return {
    total,
    maxTotal,
    percentage,
    grade,
    gradeClass,
    status,
    statusClass,
    fillClass
  };
}

/**
 * Gets student initials for avatar icon
 */
function getInitials(name) {
  if (!name) return 'ST';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Returns class name for attendance badge based on percentage
 */
function getAttendanceClass(att) {
  const val = Number(att) || 0;
  if (val >= 85) return 'attendance-good';
  if (val >= 75) return 'attendance-avg';
  return 'attendance-low';
}

/* ==========================================================================
   Data Persistence (LocalStorage)
   ========================================================================== */

function loadStudentsData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      studentsList = JSON.parse(raw);
    } else {
      // First time loading - use default sample data
      studentsList = [...INITIAL_STUDENTS];
      saveStudentsData();
    }
  } catch (error) {
    console.error('Could not read from localStorage, using initial data:', error);
    studentsList = [...INITIAL_STUDENTS];
  }
}

function saveStudentsData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(studentsList));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    showToast('Warning: Unable to save data locally.');
  }
}

/* ==========================================================================
   Dashboard Overview Stats Update
   ========================================================================== */

function updateDashboardStats() {
  const total = studentsList.length;
  statTotalStudents.textContent = total;

  if (total === 0) {
    statClassAverage.textContent = '0%';
    statTopPerformer.textContent = '—';
    statPassingRate.textContent = '0%';
    return;
  }

  let totalPercentageSum = 0;
  let passCount = 0;
  let topStudent = null;
  let topScore = -1;

  studentsList.forEach(student => {
    const perf = calculatePerformance(student.marks);
    totalPercentageSum += perf.percentage;

    if (perf.percentage >= 50) {
      passCount++;
    }

    if (perf.percentage > topScore) {
      topScore = perf.percentage;
      topStudent = student;
    }
  });

  const avgPercentage = (totalPercentageSum / total).toFixed(1);
  const passRate = Math.round((passCount / total) * 100);

  statClassAverage.textContent = `${avgPercentage}%`;
  statPassingRate.textContent = `${passRate}%`;

  if (topStudent) {
    statTopPerformer.textContent = `${topStudent.fullName} (${topScore}%)`;
    statTopPerformer.title = `${topStudent.fullName} (${topScore}%)`;
  } else {
    statTopPerformer.textContent = '—';
  }
}

/* ==========================================================================
   Filter, Search & Sort Logic
   ========================================================================== */

function getFilteredAndSortedStudents() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedClass = filterClass.value;
  const selectedStatus = filterStatus.value;
  const sortOption = sortBy.value;

  // Filter
  const filtered = studentsList.filter(student => {
    // 1. Search Query (matches name or roll number)
    const matchesQuery = 
      !query || 
      student.fullName.toLowerCase().includes(query) ||
      student.rollNumber.toLowerCase().includes(query);

    // 2. Class Filter
    const matchesClass = 
      selectedClass === 'ALL' || 
      student.studentClass === selectedClass;

    // 3. Status Filter
    const perf = calculatePerformance(student.marks);
    let matchesStatus = true;
    if (selectedStatus === 'Distinction') {
      matchesStatus = perf.status === 'Distinction';
    } else if (selectedStatus === 'Passed') {
      matchesStatus = perf.status === 'Passed';
    } else if (selectedStatus === 'Needs Improvement') {
      matchesStatus = perf.status === 'Needs Improvement';
    }

    return matchesQuery && matchesClass && matchesStatus;
  });

  // Sort
  filtered.sort((a, b) => {
    const perfA = calculatePerformance(a.marks);
    const perfB = calculatePerformance(b.marks);

    switch (sortOption) {
      case 'percentage-desc':
        return perfB.percentage - perfA.percentage;
      case 'percentage-asc':
        return perfA.percentage - perfB.percentage;
      case 'name-asc':
        return a.fullName.localeCompare(b.fullName);
      case 'roll-asc':
        return a.rollNumber.localeCompare(b.rollNumber, undefined, { numeric: true });
      case 'attendance-desc':
        return (Number(b.attendance) || 0) - (Number(a.attendance) || 0);
      default:
        return 0;
    }
  });

  return filtered;
}

/* ==========================================================================
   Render UI (Cards View & Table View)
   ========================================================================== */

function renderApp() {
  updateDashboardStats();
  const students = getFilteredAndSortedStudents();

  // If no students match filters
  if (students.length === 0) {
    cardsView.style.display = 'none';
    tableView.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  if (currentView === 'cards') {
    cardsView.style.display = 'grid';
    tableView.style.display = 'none';
    renderCardsView(students);
  } else {
    cardsView.style.display = 'none';
    tableView.style.display = 'block';
    renderTableView(students);
  }
}

/**
 * Render Student Cards
 */
function renderCardsView(students) {
  cardsView.innerHTML = '';

  students.forEach(student => {
    const perf = calculatePerformance(student.marks);
    const initials = getInitials(student.fullName);
    const attClass = getAttendanceClass(student.attendance);

    const card = document.createElement('article');
    card.className = 'student-card';
    card.innerHTML = `
      <div>
        <!-- Card Top Header -->
        <div class="card-top">
          <div class="card-profile">
            <div class="avatar">${initials}</div>
            <div>
              <h3 class="card-name">${escapeHTML(student.fullName)}</h3>
              <div class="card-meta">
                <span>Roll: <strong>${escapeHTML(student.rollNumber)}</strong></span>
                <span class="card-meta-dot"></span>
                <span>${escapeHTML(student.studentClass)}</span>
              </div>
            </div>
          </div>
          <span class="badge-grade ${perf.gradeClass}">${perf.grade}</span>
        </div>

        <!-- Academic Performance Score Box -->
        <div class="card-scores">
          <div class="score-headline">
            <span class="score-percentage">${perf.percentage}%</span>
            <span class="badge-status ${perf.statusClass}">${perf.status}</span>
          </div>

          <!-- Visual Progress Bar -->
          <div class="progress-bar-container" title="Overall Score: ${perf.percentage}%">
            <div class="progress-bar-fill ${perf.fillClass}" style="width: ${Math.min(perf.percentage, 100)}%;"></div>
          </div>

          <!-- Mini Subjects Preview -->
          <div class="mini-subjects">
            <span class="subject-pill">Math: <strong>${student.marks.math}</strong></span>
            <span class="subject-pill">Sci: <strong>${student.marks.science}</strong></span>
            <span class="subject-pill">Eng: <strong>${student.marks.english}</strong></span>
            <span class="subject-pill">Soc: <strong>${student.marks.social}</strong></span>
            <span class="subject-pill">CS: <strong>${student.marks.computer}</strong></span>
          </div>
        </div>

        <!-- Student Normal Details -->
        <div class="card-details-list">
          <div class="detail-row">
            <span class="detail-label">Section & Gender:</span>
            <span class="detail-val">${escapeHTML(student.section || '—')} • ${escapeHTML(student.gender || '—')}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Guardian:</span>
            <span class="detail-val">${escapeHTML(student.guardianName || 'Not specified')}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Contact:</span>
            <span class="detail-val">${escapeHTML(student.guardianPhone || student.email || '—')}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Attendance:</span>
            <span class="attendance-pill ${attClass}">${student.attendance || 0}%</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="card-actions">
        <button class="btn btn-primary btn-sm" onclick="viewReportCard('${student.id}')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Report Card
        </button>

        <button class="btn-icon-only" title="Edit student details and marks" onclick="openEditStudent('${student.id}')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>

        <button class="btn-icon-only danger" title="Delete record" onclick="promptDeleteStudent('${student.id}')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `;

    cardsView.appendChild(card);
  });
}

/**
 * Render Student Table View
 */
function renderTableView(students) {
  tableBody.innerHTML = '';

  students.forEach(student => {
    const perf = calculatePerformance(student.marks);
    const initials = getInitials(student.fullName);
    const attClass = getAttendanceClass(student.attendance);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="table-student-cell">
          <div class="table-avatar">${initials}</div>
          <div>
            <strong>${escapeHTML(student.fullName)}</strong>
            <div style="font-size: 0.78rem; color: var(--text-muted);">
              ${escapeHTML(student.guardianName || student.email || '')}
            </div>
          </div>
        </div>
      </td>
      <td><strong>${escapeHTML(student.rollNumber)}</strong></td>
      <td>${escapeHTML(student.studentClass)} <small>(${escapeHTML(student.section || 'A')})</small></td>
      <td><span class="attendance-pill ${attClass}">${student.attendance || 0}%</span></td>
      <td><strong>${perf.total}</strong> / 500</td>
      <td><strong>${perf.percentage}%</strong></td>
      <td><span class="badge-grade ${perf.gradeClass}">${perf.grade}</span></td>
      <td><span class="badge-status ${perf.statusClass}">${perf.status}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn btn-secondary btn-sm" onclick="viewReportCard('${student.id}')">Report</button>
          <button class="btn-icon-only" title="Edit" onclick="openEditStudent('${student.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button class="btn-icon-only danger" title="Delete" onclick="promptDeleteStudent('${student.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

/* ==========================================================================
   Real-Time Form Score Calculator
   ========================================================================== */

function updateLiveScoreCalculation() {
  const marks = {
    math: document.getElementById('markMath').value,
    science: document.getElementById('markScience').value,
    english: document.getElementById('markEnglish').value,
    social: document.getElementById('markSocial').value,
    computer: document.getElementById('markComputer').value
  };

  const perf = calculatePerformance(marks);

  previewTotal.textContent = `${perf.total} / 500`;
  previewPercentage.textContent = `${perf.percentage}%`;

  previewGrade.textContent = perf.grade;
  previewGrade.className = `badge-grade ${perf.gradeClass}`;

  previewStatus.textContent = perf.status;
  previewStatus.className = `badge-status ${perf.statusClass}`;
}

markInputs.forEach(input => {
  input.addEventListener('input', updateLiveScoreCalculation);
});

/* ==========================================================================
   Modal Operations (Add / Edit Student)
   ========================================================================== */

function openAddStudentModal() {
  modalTitle.textContent = 'Add New Student';
  editStudentId.value = '';
  studentForm.reset();

  // Reset defaults
  document.getElementById('section').value = 'Section A';
  document.getElementById('attendance').value = '88';
  document.getElementById('gender').value = 'Male';
  document.getElementById('studentClass').value = 'Grade 10';

  // Clear live preview
  updateLiveScoreCalculation();

  // Hide validation errors
  document.getElementById('errorFullName').style.display = 'none';
  document.getElementById('errorRollNumber').style.display = 'none';

  studentDialog.showModal();
}

function openEditStudent(id) {
  const student = studentsList.find(s => s.id === id);
  if (!student) return;

  modalTitle.textContent = 'Edit Student Record';
  editStudentId.value = student.id;

  // Fill personal details
  document.getElementById('fullName').value = student.fullName || '';
  document.getElementById('rollNumber').value = student.rollNumber || '';
  document.getElementById('studentClass').value = student.studentClass || '';
  document.getElementById('section').value = student.section || '';
  document.getElementById('gender').value = student.gender || 'Male';
  document.getElementById('dob').value = student.dob || '';
  document.getElementById('guardianName').value = student.guardianName || '';
  document.getElementById('guardianPhone').value = student.guardianPhone || '';
  document.getElementById('email').value = student.email || '';
  document.getElementById('attendance').value = student.attendance ?? 85;

  // Fill marks
  document.getElementById('markMath').value = student.marks?.math ?? 0;
  document.getElementById('markScience').value = student.marks?.science ?? 0;
  document.getElementById('markEnglish').value = student.marks?.english ?? 0;
  document.getElementById('markSocial').value = student.marks?.social ?? 0;
  document.getElementById('markComputer').value = student.marks?.computer ?? 0;

  // Fill remarks
  document.getElementById('remarks').value = student.remarks || '';

  // Update live preview
  updateLiveScoreCalculation();

  document.getElementById('errorFullName').style.display = 'none';
  document.getElementById('errorRollNumber').style.display = 'none';

  studentDialog.showModal();
}

function handleSaveStudent(event) {
  event.preventDefault();

  const nameInput = document.getElementById('fullName');
  const rollInput = document.getElementById('rollNumber');
  const classInput = document.getElementById('studentClass');

  let hasError = false;

  if (!nameInput.value.trim()) {
    document.getElementById('errorFullName').style.display = 'block';
    hasError = true;
  } else {
    document.getElementById('errorFullName').style.display = 'none';
  }

  if (!rollInput.value.trim()) {
    document.getElementById('errorRollNumber').style.display = 'block';
    hasError = true;
  } else {
    document.getElementById('errorRollNumber').style.display = 'none';
  }

  if (hasError) return;

  const idToEdit = editStudentId.value;

  const studentData = {
    id: idToEdit || ('stu-' + Date.now()),
    fullName: nameInput.value.trim(),
    rollNumber: rollInput.value.trim(),
    studentClass: classInput.value || 'Grade 10',
    section: document.getElementById('section').value.trim() || 'Section A',
    gender: document.getElementById('gender').value,
    dob: document.getElementById('dob').value,
    guardianName: document.getElementById('guardianName').value.trim(),
    guardianPhone: document.getElementById('guardianPhone').value.trim(),
    email: document.getElementById('email').value.trim(),
    attendance: Math.min(100, Math.max(0, Number(document.getElementById('attendance').value) || 0)),
    marks: {
      math: clampMark(document.getElementById('markMath').value),
      science: clampMark(document.getElementById('markScience').value),
      english: clampMark(document.getElementById('markEnglish').value),
      social: clampMark(document.getElementById('markSocial').value),
      computer: clampMark(document.getElementById('markComputer').value)
    },
    remarks: document.getElementById('remarks').value.trim()
  };

  if (idToEdit) {
    // Update existing
    const index = studentsList.findIndex(s => s.id === idToEdit);
    if (index !== -1) {
      studentsList[index] = studentData;
      showToast(`Updated record for ${studentData.fullName}`);
    }
  } else {
    // Insert new
    studentsList.unshift(studentData);
    showToast(`Added new student: ${studentData.fullName}`);
  }

  saveStudentsData();
  studentDialog.close();
  renderApp();
}

function clampMark(val) {
  const num = Number(val);
  if (isNaN(num)) return 0;
  return Math.min(100, Math.max(0, num));
}

/* ==========================================================================
   Report Card Generation & Printable Modal
   ========================================================================== */

function viewReportCard(id) {
  const student = studentsList.find(s => s.id === id);
  if (!student) return;

  const perf = calculatePerformance(student.marks);

  // Fill Student Metadata
  document.getElementById('reportAvatar').textContent = getInitials(student.fullName);
  document.getElementById('reportName').textContent = student.fullName;
  document.getElementById('reportRoll').textContent = student.rollNumber;
  document.getElementById('reportClass').textContent = `${student.studentClass} - ${student.section || 'A'}`;
  document.getElementById('reportGender').textContent = student.gender || 'Not specified';
  document.getElementById('reportGuardian').textContent = student.guardianName || 'Not specified';
  document.getElementById('reportPhone').textContent = student.guardianPhone || 'Not specified';
  document.getElementById('reportAttendance').textContent = `${student.attendance || 0}%`;
  document.getElementById('reportEmail').textContent = student.email || '—';

  // Fill Subject Scores Table
  const subjects = [
    { name: 'Mathematics', mark: student.marks.math },
    { name: 'Science', mark: student.marks.science },
    { name: 'English', mark: student.marks.english },
    { name: 'Social Studies', mark: student.marks.social },
    { name: 'Computer Science', mark: student.marks.computer }
  ];

  const tbody = document.getElementById('reportSubjectRows');
  tbody.innerHTML = '';

  subjects.forEach(sub => {
    let subGrade = 'F';
    let subGradeClass = 'grade-F';
    let subFillColor = '#e11d48'; // red
    const m = Number(sub.mark) || 0;

    if (m >= 90) {
      subGrade = 'A+';
      subGradeClass = 'grade-A-plus';
      subFillColor = '#059669'; // emerald
    } else if (m >= 80) {
      subGrade = 'A';
      subGradeClass = 'grade-A';
      subFillColor = '#10b981'; // green
    } else if (m >= 70) {
      subGrade = 'B+';
      subGradeClass = 'grade-B-plus';
      subFillColor = '#2563eb'; // blue
    } else if (m >= 60) {
      subGrade = 'B';
      subGradeClass = 'grade-B';
      subFillColor = '#3b82f6'; // light blue
    } else if (m >= 50) {
      subGrade = 'C';
      subGradeClass = 'grade-C';
      subFillColor = '#d97706'; // amber
    } else if (m >= 40) {
      subGrade = 'D';
      subGradeClass = 'grade-D';
      subFillColor = '#f59e0b'; // light amber
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${sub.name}</strong></td>
      <td style="text-align: center;">100</td>
      <td style="text-align: center; font-weight: 700;">${sub.mark}</td>
      <td style="text-align: center;"><span class="badge-grade ${subGradeClass}">${subGrade}</span></td>
      <td>
        <div class="mini-score-bar-bg">
          <div class="mini-score-bar-fill" style="width: ${Math.min(m, 100)}%; background-color: ${subFillColor};"></div>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Summary Metrics
  document.getElementById('reportTotalMarks').textContent = `${perf.total} / 500`;
  document.getElementById('reportPercentage').textContent = `${perf.percentage}%`;
  
  const reportGradeElem = document.getElementById('reportGrade');
  reportGradeElem.textContent = perf.grade;
  reportGradeElem.className = `metric-value badge-grade ${perf.gradeClass}`;
  
  const reportStatusElem = document.getElementById('reportStatus');
  reportStatusElem.textContent = perf.status;
  reportStatusElem.className = `metric-value badge-status ${perf.statusClass}`;

  // Remarks
  document.getElementById('reportRemarks').textContent = 
    student.remarks || 'Consistent academic performance and active engagement throughout the term.';

  reportCardDialog.showModal();
}

/* ==========================================================================
   Delete Handling
   ========================================================================== */

function promptDeleteStudent(id) {
  const student = studentsList.find(s => s.id === id);
  if (!student) return;

  studentToDeleteId = id;
  deleteConfirmMessage.textContent = `Are you sure you want to remove ${student.fullName} (Roll: ${student.rollNumber})? This cannot be undone.`;
  deleteConfirmDialog.showModal();
}

function confirmDeleteStudent() {
  if (!studentToDeleteId) return;

  const target = studentsList.find(s => s.id === studentToDeleteId);
  const targetName = target ? target.fullName : 'Student';

  studentsList = studentsList.filter(s => s.id !== studentToDeleteId);
  studentToDeleteId = null;

  saveStudentsData();
  deleteConfirmDialog.close();
  renderApp();
  showToast(`Record for ${targetName} was deleted.`);
}

/* ==========================================================================
   Export to CSV (Spreadsheet)
   ========================================================================== */

function exportRecordsToCSV() {
  if (studentsList.length === 0) {
    showToast('No student records to export.');
    return;
  }

  const headers = [
    'Student ID',
    'Full Name',
    'Roll Number',
    'Class',
    'Section',
    'Gender',
    'Date of Birth',
    'Guardian Name',
    'Guardian Phone',
    'Email',
    'Attendance (%)',
    'Math',
    'Science',
    'English',
    'Social Studies',
    'Computer Science',
    'Total Marks (out of 500)',
    'Percentage (%)',
    'Grade',
    'Status',
    'Teacher Remarks'
  ];

  const csvRows = [];
  csvRows.push(headers.join(','));

  studentsList.forEach(s => {
    const perf = calculatePerformance(s.marks);
    const row = [
      escapeCSV(s.id),
      escapeCSV(s.fullName),
      escapeCSV(s.rollNumber),
      escapeCSV(s.studentClass),
      escapeCSV(s.section),
      escapeCSV(s.gender),
      escapeCSV(s.dob),
      escapeCSV(s.guardianName),
      escapeCSV(s.guardianPhone),
      escapeCSV(s.email),
      escapeCSV(s.attendance),
      escapeCSV(s.marks.math),
      escapeCSV(s.marks.science),
      escapeCSV(s.marks.english),
      escapeCSV(s.marks.social),
      escapeCSV(s.marks.computer),
      escapeCSV(perf.total),
      escapeCSV(perf.percentage),
      escapeCSV(perf.grade),
      escapeCSV(perf.status),
      escapeCSV(s.remarks)
    ];
    csvRows.push(row.join(','));
  });

  const csvString = csvRows.join('\r\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `EduTrack_Student_Performance_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast('Student performance records exported as CSV!');
}

function escapeCSV(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

/* ==========================================================================
   Reset Sample Data
   ========================================================================== */

function resetToSampleData() {
  if (confirm('Do you want to reset all records back to the original sample student data? Any custom records added will be replaced.')) {
    studentsList = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
    saveStudentsData();
    renderApp();
    showToast('Reset to original sample student records.');
  }
}

/* ==========================================================================
   Toast Notification & HTML Escaping
   ========================================================================== */

let toastTimeout = null;
function showToast(msg) {
  toastNotification.textContent = msg;
  toastNotification.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastNotification.classList.remove('show');
  }, 3200);
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   Event Listeners
   ========================================================================== */

// Open Add Modal
btnOpenAddModal.addEventListener('click', openAddStudentModal);

// Close Modals
btnCloseDialog.addEventListener('click', () => studentDialog.close());
btnCancelForm.addEventListener('click', () => studentDialog.close());
btnCloseReport.addEventListener('click', () => reportCardDialog.close());

// Close modal when clicking backdrop
[studentDialog, reportCardDialog, deleteConfirmDialog].forEach(dialog => {
  dialog.addEventListener('click', (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  });
});

// Form Submit
studentForm.addEventListener('submit', handleSaveStudent);

// Delete Confirm
btnCancelDelete.addEventListener('click', () => deleteConfirmDialog.close());
btnConfirmDelete.addEventListener('click', confirmDeleteStudent);

// Print Report Card
btnPrintReport.addEventListener('click', () => {
  window.print();
});

// View Toggle Buttons
btnViewCards.addEventListener('click', () => {
  currentView = 'cards';
  btnViewCards.classList.add('active');
  btnViewTable.classList.remove('active');
  renderApp();
});

btnViewTable.addEventListener('click', () => {
  currentView = 'table';
  btnViewTable.classList.add('active');
  btnViewCards.classList.remove('active');
  renderApp();
});

// Search and Filters
searchInput.addEventListener('input', renderApp);
filterClass.addEventListener('change', renderApp);
filterStatus.addEventListener('change', renderApp);
sortBy.addEventListener('change', renderApp);

// Clear Filters
btnClearFilters.addEventListener('click', () => {
  searchInput.value = '';
  filterClass.value = 'ALL';
  filterStatus.value = 'ALL';
  sortBy.value = 'percentage-desc';
  renderApp();
});

// Export CSV & Reset
btnExportCSV.addEventListener('click', exportRecordsToCSV);
btnResetSampleData.addEventListener('click', resetToSampleData);

/* ==========================================================================
   Initialization on Page Load
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  loadStudentsData();
  renderApp();
});

// Global functions for inline HTML event handlers
window.viewReportCard = viewReportCard;
window.openEditStudent = openEditStudent;
window.promptDeleteStudent = promptDeleteStudent;
