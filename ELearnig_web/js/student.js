document.addEventListener('DOMContentLoaded', function() {
    // Check if user is authenticated and has student role
    checkAuth();

    // Initialize navigation
    initializeNavigation();

    // Initialize form handlers
    initializeFormHandlers();
});

function checkAuth() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') {
        window.location.href = '../index.html';
    }
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '../index.html') {
                sessionStorage.removeItem('currentUser');
                return;
            }
            
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            loadSection(this.getAttribute('href').substring(1));
        });
    });
}

function loadSection(section) {
    // Hide all sections and show the selected one
    const mainContent = document.querySelector('.main-content');
    
    switch(section) {
        case 'courses':
            loadCourses();
            break;
        case 'assignments':
            loadAssignments();
            break;
        case 'quizzes':
            loadQuizzes();
            break;
        case 'grades':
            loadGrades();
            break;
        case 'notifications':
            loadNotifications();
            break;
        default:
            loadDashboard();
    }
}

function loadCourses() {
    const content = `
        <div class="row mb-4">
            <div class="col-12">
                <h2>My Courses</h2>
                <div class="row">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Enrolled Courses</h5>
                            </div>
                            <div class="card-body">
                                <div class="list-group">
                                    <div class="list-group-item">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h6 class="mb-1">Web Development</h6>
                                            <div>
                                                <button class="btn btn-sm btn-primary">View Content</button>
                                                <button class="btn btn-sm btn-info">Live Class</button>
                                            </div>
                                        </div>
                                        <div class="progress mt-2" style="height: 5px;">
                                            <div class="progress-bar" style="width: 75%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Course Materials</h5>
                            </div>
                            <div class="card-body">
                                <div class="list-group">
                                    <a href="#" class="list-group-item list-group-item-action">
                                        <i class="fas fa-file-pdf me-2"></i>Lecture Notes
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action">
                                        <i class="fas fa-video me-2"></i>Recorded Sessions
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    updateMainContent(content);
}

function loadAssignments() {
    const content = `
        <div class="row mb-4">
            <div class="col-12">
                <h2>Assignments</h2>
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Pending Assignments</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Assignment</th>
                                        <th>Course</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Final Project</td>
                                        <td>Web Development</td>
                                        <td>Dec 20, 2024</td>
                                        <td><span class="badge bg-warning">Pending</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-primary">Submit</button>
                                            <button class="btn btn-sm btn-info">View</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    updateMainContent(content);
}

function loadQuizzes() {
    const content = `
        <div class="row mb-4">
            <div class="col-12">
                <h2>Quizzes & Exams</h2>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Upcoming Quizzes</h5>
                            </div>
                            <div class="card-body">
                                <div class="list-group">
                                    <div class="list-group-item">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h6 class="mb-1">JavaScript Basics</h6>
                                            <small class="text-danger">Tomorrow</small>
                                        </div>
                                        <p class="mb-1">Duration: 1 hour</p>
                                        <button class="btn btn-sm btn-primary mt-2">Start Quiz</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Past Results</h5>
                            </div>
                            <div class="card-body">
                                <div class="list-group">
                                    <div class="list-group-item">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h6 class="mb-1">Database Concepts</h6>
                                            <span class="badge bg-success">85%</span>
                                        </div>
                                        <p class="mb-1">Completed on Dec 8, 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    updateMainContent(content);
}

function loadGrades() {
    const content = `
        <div class="row mb-4">
            <div class="col-12">
                <h2>Grades & Performance</h2>
                <div class="row">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Course Grades</h5>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Course</th>
                                                <th>Assignments</th>
                                                <th>Quizzes</th>
                                                <th>Overall</th>
                                                <th>Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Web Development</td>
                                                <td>88%</td>
                                                <td>92%</td>
                                                <td>90%</td>
                                                <td>A</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Performance Analytics</h5>
                            </div>
                            <div class="card-body">
                                <canvas id="performanceChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    updateMainContent(content);
}

function loadNotifications() {
    const content = `
        <div class="row mb-4">
            <div class="col-12">
                <h2>Notifications</h2>
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Recent Updates</h5>
                    </div>
                    <div class="card-body">
                        <div class="list-group">
                            <div class="list-group-item">
                                <div class="d-flex w-100 justify-content-between">
                                    <h6 class="mb-1">New Assignment Posted</h6>
                                    <small>Just now</small>
                                </div>
                                <p class="mb-1">Final Project guidelines have been posted in Web Development course.</p>
                            </div>
                            <div class="list-group-item">
                                <div class="d-flex w-100 justify-content-between">
                                    <h6 class="mb-1">Quiz Reminder</h6>
                                    <small>1 hour ago</small>
                                </div>
                                <p class="mb-1">JavaScript Basics quiz is scheduled for tomorrow.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    updateMainContent(content);
}

function initializeFormHandlers() {
    // Enroll Course Form Handler
    const enrollButtons = document.querySelectorAll('.btn-enroll');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const courseId = this.getAttribute('data-course-id');
            // Handle course enrollment
            showAlert('Successfully enrolled in the course!', 'success');
        });
    });
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.querySelector('.main-content').insertBefore(alertDiv, document.querySelector('.main-content').firstChild);
    setTimeout(() => alertDiv.remove(), 3000);
}

function updateMainContent(content) {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = content;
} 