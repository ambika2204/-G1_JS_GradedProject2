document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const resumeContainer = document.getElementById('resume-container');

    // Fetch the JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            let resumes = data.resume;
            displayResumes(resumes);

            // Event listener for the search input
            searchInput.addEventListener('input', function(e) {
                const searchQuery = e.target.value.toLowerCase();
                const filteredResumes = resumes.filter(resume => 
                    resume.basics.AppliedFor.toLowerCase().includes(searchQuery)
                );
                displayResumes(filteredResumes);
            });
        });

    // Function to display resumes
    function displayResumes(resumes) {
        resumeContainer.innerHTML = '';

        resumes.forEach(resume => {
            const resumeItem = document.createElement('div');
            resumeItem.classList.add('resume-item');

            resumeItem.innerHTML = `
                <h2>${resume.basics.name}</h2>
                <p><strong>Applied For:</strong> ${resume.basics.AppliedFor}</p>
                <p><strong>Email:</strong> ${resume.basics.email}</p>
                <p><strong>Phone:</strong> ${resume.basics.phone}</p>
                <p><strong>Location:</strong> ${resume.basics.location.city}, ${resume.basics.location.state}</p>
                <p><strong>Skills:</strong> ${resume.skills.keywords.join(', ')}</p>
                <p><strong>Experience:</strong> ${resume.work.Position} at ${resume.work.Company.Name}</p>
                <p><strong>Education:</strong> ${resume.education.UG.course} from ${resume.education.UG.institute}</p>
                <p><strong>Interests:</strong> ${resume.interests.hobbies.join(', ')}</p>
            `;

            resumeContainer.appendChild(resumeItem);
        });
    }
});
