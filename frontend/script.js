// Configuration
const API_URL = 'http://localhost:5000';
const form = document.getElementById('applicationForm');
const container = document.getElementById('applicationsContainer');

// Load applications on page load
document.addEventListener('DOMContentLoaded', loadApplications);

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await createApplication();
    form.reset();
});

// CREATE: Add new application
async function createApplication() {
    const data = {
        company: document.getElementById('company').value,
        position: document.getElementById('position').value,
        jobLink: document.getElementById('jobLink').value,
        notes: document.getElementById('notes').value,
    };

    try {
        const response = await fetch(`${API_URL}/applications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to create application');

        showMessage('Application added successfully!', 'success');
        loadApplications();
    } catch (error) {
        console.error('Error:', error);
        showMessage('Failed to add application. Check console.', 'error');
    }
}

// READ: Load all applications
async function loadApplications() {
    try {
        container.innerHTML = '<p class="loading">Loading applications...</p>';

        const response = await fetch(`${API_URL}/applications`);
        if (!response.ok) throw new Error('Failed to load applications');

        const data = await response.json();
        const applications = data.applications || [];

        if (applications.length === 0) {
            container.innerHTML = '<p class="empty">No applications yet. Add one above!</p>';
            return;
        }

        container.innerHTML = applications
            .map((app) => createApplicationCard(app))
            .join('');

        // Attach event listeners to buttons
        document.querySelectorAll('.btn-edit').forEach((btn) => {
            btn.addEventListener('click', () => editStatus(btn.dataset.id));
        });

        document.querySelectorAll('.btn-delete').forEach((btn) => {
            btn.addEventListener('click', () => deleteApplication(btn.dataset.id));
        });
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p class="error">Failed to load applications. Check your API connection.</p>';
    }
}

// Create HTML for a single application card
function createApplicationCard(app) {
    const statusClass = `status-${app.status.toLowerCase()}`;
    const dateApplied = new Date(app.applicationDate).toLocaleDateString();

    return `
        <div class="application-card ${statusClass}">
            <div class="application-info">
                <div class="application-header">
                    <h3>${escapeHtml(app.company)}</h3>
                    <span class="status-badge ${app.status.toLowerCase()}">${app.status}</span>
                </div>
                <div class="application-details">
                    <strong>Position:</strong> ${escapeHtml(app.position)}
                </div>
                <div class="application-details">
                    <strong>Applied:</strong> ${dateApplied}
                </div>
                ${app.jobLink ? `<div class="application-details"><a href="${escapeHtml(app.jobLink)}" target="_blank">View Job Post</a></div>` : ''}
                ${app.notes ? `<div class="application-notes">${escapeHtml(app.notes)}</div>` : ''}
            </div>
            <div class="application-actions">
                <button class="btn btn-sm btn-edit" data-id="${app.applicationId}">Update</button>
                <button class="btn btn-sm btn-delete" data-id="${app.applicationId}">Delete</button>
            </div>
        </div>
    `;
}

// UPDATE: Change status (simplified - shows prompt for now)
async function editStatus(id) {
    const statuses = ['Applied', 'Interviewing', 'Offered', 'Rejected'];
    const status = prompt('Select new status:\n' + statuses.join('\n'));

    if (!status || !statuses.includes(status)) return;

    try {
        const response = await fetch(`${API_URL}/applications/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) throw new Error('Failed to update application');

        showMessage('Status updated successfully!', 'success');
        loadApplications();
    } catch (error) {
        console.error('Error:', error);
        showMessage('Failed to update application', 'error');
    }
}

// DELETE: Remove application
async function deleteApplication(id) {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
        const response = await fetch(`${API_URL}/applications/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete application');

        showMessage('Application deleted successfully!', 'success');
        loadApplications();
    } catch (error) {
        console.error('Error:', error);
        showMessage('Failed to delete application', 'error');
    }
}

// Utility: Show message
function showMessage(message, type) {
    const msg = document.createElement('div');
    msg.className = type;
    msg.textContent = message;
    msg.style.position = 'fixed';
    msg.style.top = '20px';
    msg.style.right = '20px';
    msg.style.zIndex = '9999';
    msg.style.minWidth = '300px';
    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 3000);
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}
