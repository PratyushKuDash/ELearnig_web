// Check Authentication
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadCourses();
    loadAssignments();
    loadGrades();
    loadAnnouncements();
});

// Authentication Check
function checkAuth() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!user || user.role !== 'faculty') {
        window.location.href = '../index.html';
    }
}

// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('currentUser');
    window.location.href = '../index.html';
});

// Course Management
function loadCourses() {
    // Sample course data (replace with API call)
    const courses = [
        {
            id: 1,
            name: 'Web Development',
            students: 25,
            content: [
                { type: 'lecture', title: 'HTML Basics', date: '2024-03-15' },
                { type: 'material', title: 'CSS Guide', date: '2024-03-14' }
            ]
        },
        {
            id: 2,
            name: 'Data Science',
            students: 30,
            content: [
                { type: 'video', title: 'Python Introduction', date: '2024-03-15' },
                { type: 'lecture', title: 'Data Analysis', date: '2024-03-13' }
            ]
        }
    ];

    const coursesList = document.getElementById('coursesList');
    coursesList.innerHTML = courses.map(course => `
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="card-title">${course.name}</h5>
                    <span class="badge bg-primary">${course.students} Students</span>
                </div>
                <div class="list-group">
                    ${course.content.map(item => `
                        <div class="list-group-item">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas ${getContentIcon(item.type)} me-2"></i>
                                    ${item.title}
                                </div>
                                <small class="text-muted">${item.date}</small>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Populate course select dropdowns
    const courseSelects = document.querySelectorAll('select[required]');
    const courseOptions = courses.map(course => 
        `<option value="${course.id}">${course.name}</option>`
    ).join('');
    
    courseSelects.forEach(select => {
        if (select.options.length <= 1) {
            select.innerHTML += courseOptions;
        }
    });
}

function getContentIcon(type) {
    switch (type) {
        case 'lecture':
            return 'fa-book';
        case 'material':
            return 'fa-file-alt';
        case 'video':
            return 'fa-video';
        default:
            return 'fa-file';
    }
}

// Assignment Management
function loadAssignments() {
    // Sample assignment data (replace with API call)
    const assignments = [
        {
            title: 'HTML Project',
            course: 'Web Development',
            dueDate: '2024-03-20',
            submissions: 15
        },
        {
            title: 'Data Analysis Report',
            course: 'Data Science',
            dueDate: '2024-03-25',
            submissions: 20
        }
    ];

    const tableBody = document.getElementById('assignmentsTableBody');
    tableBody.innerHTML = assignments.map(assignment => `
        <tr>
            <td>${assignment.title}</td>
            <td>${assignment.course}</td>
            <td>${assignment.dueDate}</td>
            <td>${assignment.submissions}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewSubmissions('${assignment.title}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteAssignment('${assignment.title}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Grade Management
function loadGrades() {
    // Sample grade data (replace with API call)
    const grades = [
        {
            student: 'John Doe',
            assignment: 'HTML Project',
            submissionDate: '2024-03-18',
            grade: 85
        },
        {
            student: 'Jane Smith',
            assignment: 'Data Analysis Report',
            submissionDate: '2024-03-19',
            grade: 92
        }
    ];

    const tableBody = document.getElementById('gradesTableBody');
    tableBody.innerHTML = grades.map(grade => `
        <tr>
            <td>${grade.student}</td>
            <td>${grade.assignment}</td>
            <td>${grade.submissionDate}</td>
            <td>${grade.grade}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editGrade('${grade.student}', '${grade.assignment}')">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Announcements
function loadAnnouncements() {
    // Sample announcement data (replace with API call)
    const announcements = [
        {
            title: 'Project Deadline Extended',
            course: 'Web Development',
            message: 'The deadline for the HTML project has been extended to March 25th.',
            date: '2024-03-15'
        },
        {
            title: 'Guest Lecture',
            course: 'Data Science',
            message: 'We will have a guest lecture on Machine Learning next week.',
            date: '2024-03-14'
        }
    ];

    const announcementsList = document.getElementById('announcementsList');
    announcementsList.innerHTML = announcements.map(announcement => `
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="card-title">${announcement.title}</h6>
                    <span class="badge bg-primary">${announcement.course}</span>
                </div>
                <p class="card-text">${announcement.message}</p>
                <small class="text-muted">Posted on ${announcement.date}</small>
            </div>
        </div>
    `).join('');
}

// Form Handlers
document.getElementById('addContentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const newContent = {
        course: form.querySelector('select').value,
        type: form.querySelector('select[required]').value,
        title: form.querySelector('input[type="text"]').value,
        content: form.querySelector('textarea').value,
        file: form.querySelector('input[type="file"]').files[0]
    };
    console.log('Adding content:', newContent);
    loadCourses();
    bootstrap.Modal.getInstance(document.getElementById('addContentModal')).hide();
});

document.getElementById('addAssignmentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const newAssignment = {
        course: form.querySelector('select').value,
        title: form.querySelector('input[type="text"]').value,
        description: form.querySelector('textarea').value,
        dueDate: form.querySelector('input[type="datetime-local"]').value,
        points: form.querySelector('input[type="number"]').value
    };
    console.log('Adding assignment:', newAssignment);
    loadAssignments();
    bootstrap.Modal.getInstance(document.getElementById('addAssignmentModal')).hide();
});

document.getElementById('addAnnouncementForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const newAnnouncement = {
        course: form.querySelector('select').value,
        title: form.querySelector('input[type="text"]').value,
        message: form.querySelector('textarea').value,
        date: new Date().toISOString().split('T')[0]
    };
    console.log('Adding announcement:', newAnnouncement);
    loadAnnouncements();
    bootstrap.Modal.getInstance(document.getElementById('addAnnouncementModal')).hide();
});

// Helper Functions
function viewSubmissions(assignmentTitle) {
    console.log('Viewing submissions for:', assignmentTitle);
    // Implement view submissions logic
}

function deleteAssignment(assignmentTitle) {
    if (confirm('Are you sure you want to delete this assignment?')) {
        console.log('Deleting assignment:', assignmentTitle);
        loadAssignments();
    }
}

function editGrade(student, assignment) {
    const newGrade = prompt('Enter new grade:');
    if (newGrade !== null) {
        console.log('Updating grade for', student, 'on', assignment, 'to', newGrade);
        loadGrades();
    }
} 