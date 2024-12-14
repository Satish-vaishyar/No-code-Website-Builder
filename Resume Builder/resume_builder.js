document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resume-form');
    const preview = document.getElementById('resume-preview');
    const profileImageInput = document.getElementById('profile-image-input');
    const addMoreCertificationsButton = document.getElementById('add-more-certifications');
    const addMoreSkillsButton = document.getElementById('add-more-skills');
    const addMoreExperienceButton = document.getElementById('add-more-experience');
    const addMoreLanguagesButton = document.getElementById('add-more-languages');
    const addMoreInterestsButton = document.getElementById('add-more-interests');
    const addMoreEducationButton = document.getElementById('add-more-education');
    const exportButton = document.getElementById('export-button');
    const exportFormat = document.getElementById('export-format');
    const certificationsContainer = document.getElementById('certifications-container');
    const skillsContainer = document.getElementById('skills-container');
    const experienceContainer = document.getElementById('experience-container');
    const languagesContainer = document.getElementById('languages-container');
    const interestsContainer = document.getElementById('interests-container');
    const educationContainer = document.getElementById('education-container');
    let profileImageSrc = '';
    let certificationCount = 2;
    let skillCount = 2;
    let experienceCount = 2;
    let languageCount = 2;
    let interestCount = 2;
    let educationCount = 1;

    form.addEventListener('input', updateResumePreview);
    profileImageInput.addEventListener('change', updateProfileImage);
    addMoreCertificationsButton.addEventListener('click', addMoreCertifications);
    addMoreSkillsButton.addEventListener('click', addMoreSkills);
    addMoreExperienceButton.addEventListener('click', addMoreExperience);
    addMoreLanguagesButton.addEventListener('click', addMoreLanguages);
    addMoreInterestsButton.addEventListener('click', addMoreInterests);
    addMoreEducationButton.addEventListener('click', addMoreEducation);
    exportButton.addEventListener('click', exportResume);

    function updateResumePreview() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const linkedin = document.getElementById('linkedin').value;
        const github = document.getElementById('github').value;
        const role = document.getElementById('role').value;
        const bio = document.getElementById('bio').value;

        let certificationsHTML = '';
        for (let i = 1; i <= certificationCount; i++) {
            const certification = document.getElementById(`certification${i}`).value;
            const company = document.getElementById(`company${i}`).value;
            if (certification && company) {
                certificationsHTML += `<p><strong>${certification}</strong><br>${company}</p>`;
            }
        }

        let skillsHTML = '';
        for (let i = 1; i <= skillCount; i++) {
            const skill = document.getElementById(`skill${i}`).value;
            if (skill) {
                skillsHTML += `<p>${skill}</p>`;
            }
        }

        let experienceHTML = '';
        for (let i = 1; i <= experienceCount; i++) {
            const experienceName = document.getElementById(`experience${i}-name`).value;
            const experienceDetails = document.getElementById(`experience${i}-details`).value.split('\n').map(detail => `<li>${detail}</li>`).join('');
            if (experienceName && experienceDetails) {
                experienceHTML += `<p><strong>${experienceName}</strong></p><ul>${experienceDetails}</ul>`;
            }
        }

        let languagesHTML = '';
        for (let i = 1; i <= languageCount; i++) {
            const language = document.getElementById(`language${i}`).value;
            if (language) {
                languagesHTML += `<p>${language}</p>`;
            }
        }

        let interestsHTML = '';
        for (let i = 1; i <= interestCount; i++) {
            const interest = document.getElementById(`interest${i}`).value;
            if (interest) {
                interestsHTML += `<p>${interest}</p>`;
            }
        }

        let educationHTML = '';
        for (let i = 1; i <= educationCount; i++) {
            const degree = document.getElementById(`degree${i}`).value;
            const college = document.getElementById(`college${i}`).value;
            if (degree && college) {
                educationHTML += `<p>${degree}</p><p>${college}</p>`;
            }
        }

        preview.innerHTML = `
            <div id="profile-info">
                <img id="profile-image" src="${profileImageSrc}" alt="Profile Image">
                <div class="profile-left">
                    <h2>${name}</h2>
                    <p class="role">${role}</p>
                    <div class="bio">
                        <p>${bio}</p>
                    </div>
                </div>
            </div>

            <div class="main-content">
                <div class="contact-info">
                    <p><i class="fas fa-envelope"></i> ${email}</p>
                    <p><i class="fas fa-phone"></i> ${phone}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${address}</p>
                    <p><i class="fab fa-linkedin"></i> ${linkedin}</p>
                    <p><i class="fab fa-github"></i> ${github}</p>
                    <div class="certification_preview">
                        <h3>Certifications</h3>
                        ${certificationsHTML}
                    </div>
                    <div class="skills_preview">
                        <h3>Skills</h3>
                        ${skillsHTML}
                    </div>
                    <div class="languages_preview">
                        <h3>Languages</h3>
                        ${languagesHTML}
                    </div>
                    <div class="interests_preview">
                        <h3>Interests</h3>
                        ${interestsHTML}
                    </div>
                </div>
                <div class="other-section">
                    <div class="resume-section">
                        <h3>Experience / Projects</h3>
                        ${experienceHTML}
                    </div>
                    <div class="resume-section">
                        <h3>Education</h3>
                        ${educationHTML}
                    </div>
                </div>
            </div>
        `;
    }

    function updateProfileImage() {
        const file = profileImageInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            profileImageSrc = e.target.result;
            const profileImage = document.getElementById('profile-image');
            if (profileImage) {
                profileImage.src = profileImageSrc;
            }
            updateResumePreview();
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    function addMoreCertifications() {
        certificationCount++;
        const certificationHTML = `
            <label for="certification${certificationCount}">Certification ${certificationCount}</label>
            <input type="text" id="certification${certificationCount}" name="certification${certificationCount}">
            <label for="company${certificationCount}">Company ${certificationCount}</label>
            <input type="text" id="company${certificationCount}" name="company${certificationCount}">
        `;
        certificationsContainer.insertAdjacentHTML('beforeend', certificationHTML);
        form.addEventListener('input', updateResumePreview);
    }

    function addMoreSkills() {
        skillCount++;
        const skillHTML = `
            <label for="skill${skillCount}">Skill ${skillCount}</label>
            <input type="text" id="skill${skillCount}" name="skill${skillCount}">
        `;
        skillsContainer.insertAdjacentHTML('beforeend', skillHTML);
        form.addEventListener('input', updateResumePreview);
    }

    function addMoreExperience() {
        experienceCount++;
        const experienceHTML = `
            <label for="experience${experienceCount}-name">Experience / Project ${experienceCount} Name</label>
            <input type="text" id="experience${experienceCount}-name" name="experience${experienceCount}-name" required>
            <label for="experience${experienceCount}-details">Experience / Project ${experienceCount} Details (use bullet points)</label>
            <textarea id="experience${experienceCount}-details" name="experience${experienceCount}-details" rows="4" required></textarea>
        `;
        experienceContainer.insertAdjacentHTML('beforeend', experienceHTML);
        form.addEventListener('input', updateResumePreview);
    }

    function addMoreLanguages() {
        languageCount++;
        const languageHTML = `
            <label for="language${languageCount}">Language ${languageCount}</label>
            <input type="text" id="language${languageCount}" name="language${languageCount}">
        `;
        languagesContainer.insertAdjacentHTML('beforeend', languageHTML);
        form.addEventListener('input', updateResumePreview);
    }

    function addMoreInterests() {
        interestCount++;
        const interestHTML = `
            <label for="interest${interestCount}">Interest ${interestCount}</label>
            <input type="text" id="interest${interestCount}" name="interest${interestCount}">
        `;
        interestsContainer.insertAdjacentHTML('beforeend', interestHTML);
        form.addEventListener('input', updateResumePreview);
    }

    function addMoreEducation() {
        educationCount++;
        const educationHTML = `
            <label for="degree${educationCount}">Degree ${educationCount}</label>
            <input type="text" id="degree${educationCount}" name="degree${educationCount}">
            <label for="college${educationCount}">College ${educationCount}</label>
            <input type="text" id="college${educationCount}" name="college${educationCount}">
        `;
        educationContainer.insertAdjacentHTML('beforeend', educationHTML);
        form.addEventListener('input', updateResumePreview);
    }

    function downloadResume(dataUrl, format) {
        const element = document.createElement('a');
        element.href = dataUrl;
        element.download = `resume.${format}`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    function exportResume() {
        const format = exportFormat.value;

        if (format === 'jpg' || format === 'jpeg' || format === 'png') {
            html2canvas(preview).then(canvas => {
                const dataUrl = canvas.toDataURL(`image/${format}`);
                downloadResume(dataUrl, format);
            }).catch(error => {
                console.error('Error exporting as image:', error);
            });
        } else if (format === 'pdf') {
            html2canvas(preview).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                doc.addImage(imgData, 'PNG', 10, 10, 180, 160); // Adjust dimensions as needed
                doc.save('resume.pdf');
            }).catch(error => {
                console.error('Error exporting as PDF:', error);
            });
        } else if (format === 'docx') {
            const content = preview.outerHTML;
            const converted = htmlDocx.asBlob(content);
            const dataUrl = URL.createObjectURL(converted);
            downloadResume(dataUrl, 'docx');
        }
    }
});
