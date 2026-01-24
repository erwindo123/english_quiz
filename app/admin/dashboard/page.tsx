'use client';

import React from "react"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Submission {
  _id: string;
  studentName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpent: number;
  submittedAt: string;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions');
      if (!response.ok) throw new Error('Failed to fetch submissions');
      const data = await response.json();
      setSubmissions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 80) return '#4caf50';
    if (percentage >= 60) return '#ff9800';
    return '#f44336';
  };

  const getGradeLabel = (percentage: number) => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>Admin Dashboard</h1>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{submissions.length}</div>
            <div style={styles.statLabel}>Total Submissions</div>
          </div>

          {submissions.length > 0 && (
            <>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>
                  {(submissions.reduce((sum, s) => sum + s.percentage, 0) / submissions.length).toFixed(1)}%
                </div>
                <div style={styles.statLabel}>Average Score</div>
              </div>

              <div style={styles.statCard}>
                <div style={styles.statNumber}>
                  {Math.max(...submissions.map((s) => s.percentage))}%
                </div>
                <div style={styles.statLabel}>Highest Score</div>
              </div>
            </>
          )}
        </div>

        <div style={styles.tableSection}>
          <h2 style={styles.sectionTitle}>Quiz Results</h2>

          {loading ? (
            <div style={styles.loading}>Loading submissions...</div>
          ) : error ? (
            <div style={styles.error}>{error}</div>
          ) : submissions.length === 0 ? (
            <div style={styles.empty}>No submissions yet</div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.tableHeaderCell}>Student Name</th>
                    <th style={styles.tableHeaderCell}>Score</th>
                    <th style={styles.tableHeaderCell}>Percentage</th>
                    <th style={styles.tableHeaderCell}>Grade</th>
                    <th style={styles.tableHeaderCell}>Time Spent</th>
                    <th style={styles.tableHeaderCell}>Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission._id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{submission.studentName}</td>
                      <td style={styles.tableCell}>
                        {submission.score}/{submission.totalQuestions}
                      </td>
                      <td style={styles.tableCell}>
                        <span
                          style={{
                            ...styles.percentage,
                            color: getGradeColor(submission.percentage),
                          }}
                        >
                          {submission.percentage}%
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <span
                          style={{
                            ...styles.grade,
                            borderColor: getGradeColor(submission.percentage),
                            color: getGradeColor(submission.percentage),
                          }}
                        >
                          {getGradeLabel(submission.percentage)}
                        </span>
                      </td>
                      <td style={styles.tableCell}>{formatTime(submission.timeSpent)}</td>
                      <td style={styles.tableCell}>{formatDate(submission.submittedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: '#f5f5f5',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '1.5rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: 600,
  },
  logoutButton: {
    padding: '10px 20px',
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'all 0.3s',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  statCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 600,
    color: '#667eea',
    marginBottom: '0.5rem',
  },
  statLabel: {
    color: '#666',
    fontSize: '0.9rem',
  },
  tableSection: {
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  sectionTitle: {
    padding: '1.5rem',
    margin: 0,
    borderBottom: '1px solid #e0e0e0',
    fontSize: '1.3rem',
    fontWeight: 600,
    color: '#333',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem',
  },
  tableHeader: {
    background: '#f8f9fa',
    borderBottom: '2px solid #e0e0e0',
  },
  tableHeaderCell: {
    padding: '1rem',
    textAlign: 'left',
    fontWeight: 600,
    color: '#333',
  },
  tableRow: {
    borderBottom: '1px solid #e0e0e0',
    transition: 'background-color 0.2s',
  },
  tableCell: {
    padding: '1rem',
    color: '#333',
  },
  percentage: {
    fontWeight: 600,
  },
  grade: {
    padding: '4px 12px',
    borderRadius: '20px',
    border: '2px solid',
    fontSize: '0.85rem',
    fontWeight: 600,
  },
  loading: {
    padding: '2rem',
    textAlign: 'center',
    color: '#666',
  },
  error: {
    padding: '1.5rem',
    background: '#ffebee',
    color: '#f44336',
    margin: '1rem',
    borderRadius: '8px',
  },
  empty: {
    padding: '2rem',
    textAlign: 'center',
    color: '#999',
  },
};
