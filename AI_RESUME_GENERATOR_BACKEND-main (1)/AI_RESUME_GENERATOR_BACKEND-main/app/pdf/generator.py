from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import os

class ResumePDFGenerator:
    def __init__(self, output_path: str):
        self.output_path = output_path
        self.styles = getSampleStyleSheet()
        self._setup_faang_styles()

    def _setup_faang_styles(self):
        # FAANG Name Header (Centered, Large, Bold)
        self.styles.add(ParagraphStyle(
            name='FAANGName',
            fontSize=22,
            leading=26,
            alignment=TA_CENTER,
            spaceAfter=4,
            fontName='Helvetica-Bold'
        ))
        
        # FAANG Contact Line (Centered, Compact)
        self.styles.add(ParagraphStyle(
            name='FAANGContact',
            fontSize=10,
            leading=12,
            alignment=TA_CENTER,
            spaceAfter=15,
            fontName='Helvetica'
        ))
        
        # FAANG Section Header (Bold, Left Aligned, All Caps, Border Below)
        self.styles.add(ParagraphStyle(
            name='FAANGSection',
            fontSize=11,
            leading=14,
            alignment=TA_LEFT,
            spaceBefore=12,
            spaceAfter=4,
            fontName='Helvetica-Bold',
            textTransform='uppercase'
        ))
        
        # FAANG Body Text (Compact, Justified/Left)
        self.styles.add(ParagraphStyle(
            name='FAANGBody',
            fontSize=10.5,
            leading=13,
            alignment=TA_LEFT,
            spaceAfter=4,
            fontName='Helvetica'
        ))

    def generate(self, data: dict):
        doc = SimpleDocTemplate(self.output_path, pagesize=A4, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
        story = []

        # 1. Name
        story.append(Paragraph(data['contact']['name'].upper(), self.styles['FAANGName']))
        
        # 2. Contact Line
        contact_parts = [data['contact']['phone'], data['contact']['email']]
        if data['contact'].get('linkedin'): contact_parts.append("LinkedIn")
        if data['contact'].get('github'): contact_parts.append("GitHub")
        
        contact_line = "  |  ".join([p for p in contact_parts if p])
        story.append(Paragraph(contact_line, self.styles['FAANGContact']))

        # 3. Objective (Optional but structured)
        if data.get('summary'):
            story.append(Paragraph("OBJECTIVE", self.styles['FAANGSection']))
            story.append(HRFlowable(width="100%", thickness=1, color=colors.black, spaceAfter=4))
            story.append(Paragraph(data['summary'], self.styles['FAANGBody']))

        # 4. Education
        if data.get('education'):
            story.append(Paragraph("EDUCATION", self.styles['FAANGSection']))
            story.append(HRFlowable(width="100%", thickness=1, color=colors.black, spaceAfter=4))
            for edu in data['education']:
                edu_text = f"<b>{edu['institution']}</b> | {edu['degree']} ({edu['year']})"
                story.append(Paragraph(edu_text, self.styles['FAANGBody']))

        # 5. Skills
        if data.get('skills'):
            story.append(Paragraph("SKILLS", self.styles['FAANGSection']))
            story.append(HRFlowable(width="100%", thickness=1, color=colors.black, spaceAfter=4))
            skills_text = ", ".join(data['skills'])
            story.append(Paragraph(skills_text, self.styles['FAANGBody']))

        # 6. Experience
        if data.get('experience'):
            story.append(Paragraph("EXPERIENCE", self.styles['FAANGSection']))
            story.append(HRFlowable(width="100%", thickness=1, color=colors.black, spaceAfter=4))
            for exp in data['experience']:
                exp_header = f"<b>{exp['company']}</b> | {exp['job_title']}"
                story.append(Paragraph(exp_header, self.styles['FAANGBody']))
                story.append(Paragraph(f"<i>{exp['start_date']} - {exp['end_date']}</i>", self.styles['FAANGBody']))
                story.append(Paragraph(exp['description'], self.styles['FAANGBody']))
                story.append(Spacer(1, 4))

        # 7. Projects
        if data.get('projects'):
            story.append(Paragraph("PROJECTS", self.styles['FAANGSection']))
            story.append(HRFlowable(width="100%", thickness=1, color=colors.black, spaceAfter=4))
            for proj in data['projects']:
                proj_header = f"<b>{proj['title']}</b>"
                story.append(Paragraph(proj_header, self.styles['FAANGBody']))
                story.append(Paragraph(proj['description'], self.styles['FAANGBody']))
                story.append(Paragraph(f"<i>Technologies: {', '.join(proj['technologies'])}</i>", self.styles['FAANGBody']))
                story.append(Spacer(1, 4))

        doc.build(story)
        return self.output_path
