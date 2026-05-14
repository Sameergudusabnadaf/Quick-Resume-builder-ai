import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Font } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume.types';

// Register standard fonts (serif is usually built-in, but we can specify)
// For simplicity, we'll use Helvetica (sans-serif) or Times-Roman (serif)

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    fontSize: 9,
    color: '#333333',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginBottom: 6,
    paddingBottom: 2,
    letterSpacing: 1,
  },
  summary: {
    fontSize: 10,
  },
  skills: {
    fontSize: 10,
  },
  projectItem: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  itemTech: {
    fontSize: 9,
    fontStyle: 'italic',
    marginBottom: 2,
  },
  itemDate: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  experienceItem: {
    marginBottom: 10,
  },
  bulletList: {
    marginLeft: 10,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
  },
  link: {
    color: '#0066CC',
    textDecoration: 'underline',
  },
});

interface PDFDocumentProps {
  data: ResumeData;
}

const PDFDocument: React.FC<PDFDocumentProps> = ({ data }) => (
  <Document title={`${data.fullName}_Resume`} author={data.fullName}>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.fullName || 'Your Name'}</Text>
        <View style={styles.contactRow}>
          <Text>{data.email}</Text>
          {data.phone && <Text>| {data.phone}</Text>}
          {data.linkedIn && (
            <Text>| <Link src={data.linkedIn} style={styles.link}>LinkedIn</Link></Text>
          )}
          {data.github && (
            <Text>| <Link src={data.github} style={styles.link}>GitHub</Link></Text>
          )}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </View>
      )}

      {/* Skills */}
      {data.skills && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.skills}>
            {data.skills.split(',').map(s => s.trim()).join(' • ')}
          </Text>
        </View>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={styles.projectItem}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{proj.name}</Text>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  {proj.githubUrl && <Link src={proj.githubUrl} style={styles.link}>Code</Link>}
                  {proj.liveUrl && <Link src={proj.liveUrl} style={styles.link}>Live</Link>}
                </View>
              </View>
              <Text style={styles.itemTech}>{proj.tech}</Text>
              <Text>{proj.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={styles.experienceItem}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{exp.jobTitle} — {exp.company}</Text>
                <Text style={styles.itemDate}>{exp.startDate} – {exp.endDate}</Text>
              </View>
              <View style={styles.bulletList}>
                {exp.responsibilities.split('\n').map((resp, j) => (
                  <View key={j} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{resp.trim()}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{edu.degree} — {edu.institution}</Text>
                <Text style={styles.itemDate}>{edu.graduationYear}</Text>
              </View>
              {edu.gradeOrCGPA && <Text>Grade: {edu.gradeOrCGPA}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {data.certifications.map((cert, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text><Text style={{ fontWeight: 'bold' }}>{cert.name}</Text> — {cert.issuingBody}</Text>
              <Text style={styles.itemDate}>{cert.year}</Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default PDFDocument;
