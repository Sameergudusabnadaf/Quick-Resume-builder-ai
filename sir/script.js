document.getElementById('resume-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect all inputs
    const details = {
        name: document.getElementById('name').value.trim() || "Name Not Provided",
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        location: document.getElementById('location').value.trim(),
        job_title: document.getElementById('job_title').value.trim() || "Professional",
        education: document.getElementById('education').value.trim(),
        skills: document.getElementById('skills').value.trim(),
        experience: document.getElementById('experience').value.trim(),
        projects: document.getElementById('projects').value.trim(),
        extras: document.getElementById('extras').value.trim()
    };

    const isFresher = details.experience.toLowerCase() === 'fresher' || details.experience === '';

    let resumeLines = [];

    // Header (FAANGPath style)
    resumeLines.push(details.name.toUpperCase());
    
    // Contact Info line 1: Phone and Location
    let contactLine1 = [];
    if (details.phone) contactLine1.push(details.phone);
    if (details.location) contactLine1.push(details.location);
    if (contactLine1.length > 0) {
        resumeLines.push(contactLine1.join(" ⋄ "));
    }
    
    // Contact Info line 2: Email
    if (details.email) {
        resumeLines.push(details.email);
    }
    resumeLines.push("");

    // Objective
    resumeLines.push("OBJECTIVE");
    if (isFresher) {
        resumeLines.push(`Motivated and detail-oriented entry-level professional seeking a ${details.job_title} position to leverage academic knowledge and personal projects to contribute effectively to a dynamic team.`);
    } else {
        resumeLines.push(`Experienced and results-driven professional seeking a challenging ${details.job_title} role to utilize my skills and experience in delivering high-quality results.`);
    }
    resumeLines.push("");

    // Education
    if (details.education) {
        resumeLines.push("EDUCATION");
        resumeLines.push(details.education);
        resumeLines.push("");
    }

    // Skills
    if (details.skills) {
        resumeLines.push("SKILLS");
        resumeLines.push(details.skills);
        resumeLines.push("");
    }

    // Work Experience (Skip if fresher)
    if (!isFresher) {
        resumeLines.push("EXPERIENCE");
        resumeLines.push(details.experience);
        resumeLines.push("");
    }

    // Projects
    if (details.projects) {
        resumeLines.push("PROJECTS");
        resumeLines.push(details.projects);
        resumeLines.push("");
    }

    // Additional Information
    if (details.extras) {
        resumeLines.push("EXTRA-CURRICULAR ACTIVITIES");
        resumeLines.push(details.extras);
        resumeLines.push("");
    }

    const resumeContent = resumeLines.join('\n');
    
    // Display the result
    document.getElementById('resume-output').textContent = resumeContent;
    document.getElementById('output-section').style.display = 'block';

    // Smooth scroll to output
    document.getElementById('output-section').scrollIntoView({ behavior: 'smooth' });

    // Setup download button
    const downloadBtn = document.getElementById('download-btn');
    
    // Remove previous event listener if any (by cloning and replacing)
    const newDownloadBtn = downloadBtn.cloneNode(true);
    downloadBtn.parentNode.replaceChild(newDownloadBtn, downloadBtn);
    
    newDownloadBtn.addEventListener('click', () => {
        // Function to replace newlines with <br> for HTML rendering
        const formatText = (text) => text.replace(/\n/g, '<br>');

        let html = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset='utf-8'>
            <style>
                body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; }
                h1 { text-align: center; font-size: 24pt; font-weight: normal; margin-bottom: 5px; text-transform: uppercase; }
                .contact { text-align: center; font-size: 11pt; margin-bottom: 20px; }
                h2 { font-size: 12pt; border-bottom: 1px solid black; text-transform: uppercase; margin-top: 15px; margin-bottom: 5px; padding-bottom: 2px; }
                p { margin: 0; padding: 0; }
                .section-content { margin-bottom: 10px; }
            </style>
        </head>
        <body>
            <h1>${details.name}</h1>
            <div class="contact">
        `;

        let contactLine1 = [];
        if (details.phone) contactLine1.push(details.phone);
        if (details.location) contactLine1.push(details.location);
        if (contactLine1.length > 0) {
            html += `<p>${contactLine1.join(" &#x22C4; ")}</p>`; // HTML entity for diamond
        }
        if (details.email) {
            html += `<p>${details.email}</p>`;
        }
        html += `</div>`;

        // Objective
        html += `<h2>OBJECTIVE</h2><div class="section-content"><p>`;
        if (isFresher) {
            html += `Motivated and detail-oriented entry-level professional seeking a ${details.job_title} position to leverage academic knowledge and personal projects to contribute effectively to a dynamic team.`;
        } else {
            html += `Experienced and results-driven professional seeking a challenging ${details.job_title} role to utilize my skills and experience in delivering high-quality results.`;
        }
        html += `</p></div>`;

        if (details.education) {
            html += `<h2>EDUCATION</h2><div class="section-content"><p>${formatText(details.education)}</p></div>`;
        }

        if (details.skills) {
            html += `<h2>SKILLS</h2><div class="section-content"><p>${formatText(details.skills)}</p></div>`;
        }

        if (!isFresher && details.experience) {
            html += `<h2>EXPERIENCE</h2><div class="section-content"><p>${formatText(details.experience)}</p></div>`;
        }

        if (details.projects) {
            html += `<h2>PROJECTS</h2><div class="section-content"><p>${formatText(details.projects)}</p></div>`;
        }

        if (details.extras) {
            html += `<h2>EXTRA-CURRICULAR ACTIVITIES</h2><div class="section-content"><p>${formatText(details.extras)}</p></div>`;
        }

        html += `</body></html>`;

        const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        const filenameBase = details.name !== "Name Not Provided" ? 
                             details.name.toLowerCase().replace(/\s+/g, '_') : 
                             "my";
        
        a.href = url;
        a.download = `${filenameBase}_resume.doc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});
