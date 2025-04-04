// Check Authentication
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initializeCharts();
    loadUsers();
    loadCourses();
    loadAnnouncements();
});

// Authentication Check
function checkAuth() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!user || user.role !== 'admin') {
        window.location.href = '../index.html';
    }
}

// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('currentUser');
    window.location.href = '../index.html';
});

// User Management
function loadUsers() {
    // Sample user data (replace with API call)
    const users = [
        { name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active' },
        { name: 'Jane Smith', email: 'jane@example.com', role: 'faculty', status: 'active' }
    ];

    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="badge bg-success">${user.status}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editUser('${user.email}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.email}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Course Management
function loadCourses() {
    // Sample course data (replace with API call)
    const courses = [
        { name: 'Web Development', instructor: 'Jane Smith', students: 25, status: 'active' },
        { name: 'Data Science', instructor: 'Mike Johnson', students: 30, status: 'active' }
    ];

    const tableBody = document.getElementById('courseTableBody');
    tableBody.innerHTML = courses.map(course => `
        <tr>
            <td>${course.name}</td>
            <td>${course.instructor}</td>
            <td>${course.students}</td>
            <td><span class="badge bg-success">${course.status}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editCourse('${course.name}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteCourse('${course.name}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Announcements
function loadAnnouncements() {
    // Sample announcement data (replace with API call)
    const announcements = [
        { title: 'Platform Maintenance', message: 'Scheduled maintenance on Sunday', date: '2024-03-15', audience: 'all' },
        { title: 'New Course Available', message: 'Check out our new Data Science course', date: '2024-03-14', audience: 'students' }
    ];

    const announcementsList = document.getElementById('announcementsList');
    announcementsList.innerHTML = announcements.map(announcement => `
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="card-title">${announcement.title}</h6>
                    <span class="badge bg-primary">${announcement.audience}</span>
                </div>
                <p class="card-text">${announcement.message}</p>
                <small class="text-muted">Posted on ${announcement.date}</small>
            </div>
        </div>
    `).join('');
}

// Charts Initialization
function initializeCharts() {
    // Student Performance Chart
    const performanceCtx = document.getElementById('studentPerformanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Average Grade',
                data: [75, 78, 82, 79, 85, 88],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Course Enrollment Chart
    const enrollmentCtx = document.getElementById('courseEnrollmentChart').getContext('2d');
    new Chart(enrollmentCtx, {
        type: 'bar',
        data: {
            labels: ['Web Dev', 'Data Science', 'AI', 'Mobile Dev', 'DevOps'],
            datasets: [{
                label: 'Enrolled Students',
                data: [25, 30, 22, 17, 15],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Form Handlers
document.getElementById('addUserForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add user logic here
    const form = e.target;
    const newUser = {
        name: form.querySelector('input[type="text"]').value,
        email: form.querySelector('input[type="email"]').value,
        role: form.querySelector('select').value
    };
    // API call to add user
    console.log('Adding user:', newUser);
    loadUsers(); // Reload user list
    bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
});

document.getElementById('addCourseForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add course logic here
    const form = e.target;
    const newCourse = {
        name: form.querySelector('input[type="text"]').value,
        instructor: form.querySelector('select').value,
        description: form.querySelector('textarea').value
    };
    // API call to add course
    console.log('Adding course:', newCourse);
    loadCourses(); // Reload course list
    bootstrap.Modal.getInstance(document.getElementById('addCourseModal')).hide();
});

document.getElementById('addAnnouncementForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add announcement logic here
    const form = e.target;
    const newAnnouncement = {
        title: form.querySelector('input[type="text"]').value,
        message: form.querySelector('textarea').value,
        audience: form.querySelector('select').value,
        date: new Date().toISOString().split('T')[0]
    };
    // API call to add announcement
    console.log('Adding announcement:', newAnnouncement);
    loadAnnouncements(); // Reload announcements
    bootstrap.Modal.getInstance(document.getElementById('addAnnouncementModal')).hide();
});

// CRUD Operations
function editUser(email) {
    console.log('Editing user:', email);
    // Implement user edit logic
}

function deleteUser(email) {
    if (confirm('Are you sure you want to delete this user?')) {
        console.log('Deleting user:', email);
        // Implement user delete logic
        loadUsers(); // Reload user list
    }
}

function editCourse(name) {
    console.log('Editing course:', name);
    // Implement course edit logic
}

function deleteCourse(name) {
    if (confirm('Are you sure you want to delete this course?')) {
        console.log('Deleting course:', name);
        // Implement course delete logic
        loadCourses(); // Reload course list
    }
} 