import os
import sys

# Ensure terminal can print unicode characters like the diamond separator
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding='utf-8')

def get_user_input(prompt_text, default=""):
    """
    Prompt the user for input with a given message.
    Allows skipping by pressing Enter.
    """
    response = input(f"{prompt_text} ")
    return response.strip() if response.strip() else default

def generate_resume(details):
    """
    Generate the text for the resume using the collected details.
    Uses local templates and string formatting.
    """
    resume_lines = []

    # Header
    name = details.get("name", "Name Not Provided")
    resume_lines.append(name.upper())
    
    # Contact Info Line 1
    contact_line1 = []
    if details.get("phone"): contact_line1.append(details["phone"])
    if details.get("location"): contact_line1.append(details["location"])
    if contact_line1:
        resume_lines.append(" ⋄ ".join(contact_line1))
        
    # Contact Info Line 2
    if details.get("email"):
        resume_lines.append(details["email"])
    resume_lines.append("")

    # Objective
    job_title = details.get("job_title", "Professional")
    is_fresher = details.get("experience", "").lower() in ["", "fresher", "none"]
    resume_lines.append("OBJECTIVE")
    if is_fresher:
        resume_lines.append(f"Motivated and detail-oriented entry-level professional seeking a {job_title} position to leverage academic knowledge and personal projects to contribute effectively to a dynamic team.")
    else:
        resume_lines.append(f"Experienced and results-driven professional seeking a challenging {job_title} role to utilize my skills and experience in delivering high-quality results.")
    resume_lines.append("")

    # Education
    if details.get("education"):
        resume_lines.append("EDUCATION")
        resume_lines.append(details["education"])
        resume_lines.append("")

    # Skills
    if details.get("skills"):
        resume_lines.append("SKILLS")
        resume_lines.append(details["skills"])
        resume_lines.append("")

    # Work Experience (Skip if fresher)
    if not is_fresher:
        resume_lines.append("EXPERIENCE")
        resume_lines.append(details["experience"])
        resume_lines.append("")

    # Projects
    if details.get("projects"):
        resume_lines.append("PROJECTS")
        resume_lines.append(details["projects"])
        resume_lines.append("")

    # Additional Information
    if details.get("extras"):
        resume_lines.append("EXTRA-CURRICULAR ACTIVITIES")
        resume_lines.append(details["extras"])
        resume_lines.append("")

    return "\n".join(resume_lines)

def main():
    """
    Main function to run the CLI tool.
    Collects user inputs, generates the resume locally, prints it, and saves it to a file.
    """
    print("\n" + "="*50)
    print("      Welcome to the Local AI Resume Generator!      ")
    print("="*50)
    print("Please answer the following questions to generate your resume.")
    print("You can press Enter to skip any optional fields.\n")

    details = {}
    
    # Collect inputs
    details["name"] = get_user_input("Full Name:")
    details["email"] = get_user_input("Email Address:")
    details["phone"] = get_user_input("Phone Number:")
    details["location"] = get_user_input("City / Location:")
    details["job_title"] = get_user_input("Job Title Applying For:")
    details["education"] = get_user_input("Education Details (Degree, University, Year):")
    details["skills"] = get_user_input("Technical Skills (Languages, Tools, Soft Skills):")
    details["experience"] = get_user_input("Work / Internship Experience (Type 'fresher' if none):")
    details["projects"] = get_user_input("Projects (Brief descriptions):")
    details["extras"] = get_user_input("Additional Information (Certifications, Languages, Hobbies):")

    print("\nGenerating your resume locally...\n")
    
    # Generate resume content
    resume_content = generate_resume(details)
    
    # Display the resume
    print("="*50)
    print("                  YOUR RESUME                    ")
    print("="*50)
    print(resume_content)
    print("\n" + "="*50 + "\n")

    # Save to file
    if details["name"]:
        filename_base = details["name"].lower().replace(" ", "_")
        filename = f"{filename_base}_resume.txt"
    else:
        filename = "my_resume.txt"

    try:
        with open(filename, "w", encoding="utf-8") as file:
            file.write(resume_content)
        print(f"Success! Your resume has been saved as: {filename}")
    except OSError as e:
        print(f"Error saving file: {e}. Please ensure you have write permissions in this directory.")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nResume generation cancelled by user. Exiting gracefully.")
        sys.exit(0)
