export const generatePDF = (data: any) => {
  // Create a new window with the resume content
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  // Add the resume content
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${data.fullName} - Resume</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1, h2 {
          color: #2563eb;
          margin-bottom: 10px;
        }
        .section {
          margin-bottom: 20px;
        }
        .contact {
          color: #666;
          margin-bottom: 20px;
        }
        .education-item, .experience-item {
          margin-bottom: 15px;
        }
        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .skill {
          background: #e5e7eb;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <h1>${data.fullName}</h1>
      <div class="contact">
        <p>${data.jobTitle}</p>
        <p>${data.email} | ${data.phone}</p>
      </div>
      
      <div class="section">
        <h2>Professional Summary</h2>
        <p>${data.summary}</p>
      </div>

      <div class="section">
        <h2>Education</h2>
        ${data.education.map((edu: any) => `
          <div class="education-item">
            <strong>${edu.school}</strong>
            <p>${edu.degree} - ${edu.year}</p>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2>Experience</h2>
        ${data.experience.map((exp: any) => `
          <div class="experience-item">
            <strong>${exp.company}</strong>
            <p>${exp.position} | ${exp.duration}</p>
            <p>${exp.description}</p>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2>Skills</h2>
        <div class="skills">
          ${data.skills.split(',').map((skill: string) => `
            <span class="skill">${skill.trim()}</span>
          `).join('')}
        </div>
      </div>
    </body>
    </html>
  `);

  // Print the window
  printWindow.document.close();
  printWindow.print();
};