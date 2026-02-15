export const students = [
  {
    id: 1,
    name: "Rahul Sharma",
    enrollment: "ENR2023001",
    department: "Computer Engineering",
    year: "3rd Year",
    mentor: "Dr. Mehta",
    email: "rahul.sharma@email.com",
    mobile: "9876543210"
  },
  {
    id: 2,
    name: "Anjali Patel",
    enrollment: "ENR2023002",
    department: "Information Technology",
    year: "2nd Year",
    mentor: "Dr. Mehta",
    email: "anjali.patel@email.com",
    mobile: "9876543211"
  },
  {
    id: 3,
    name: "Vikram Singh",
    enrollment: "ENR2023003",
    department: "Mechanical Engineering",
    year: "4th Year",
    mentor: "Prof. Rao",
    email: "vikram.singh@email.com",
    mobile: "9876543212"
  }
];

export const mentors = [
  {
    id: 1,
    name: "Dr. Mehta",
    department: "Computer Engineering",
    email: "dr.mehta@college.edu",
    mobile: "9988776655",
    totalStudents: 15,
    status: "Active"
  },
  {
    id: 2,
    name: "Prof. Rao",
    department: "Mechanical Engineering",
    email: "prof.rao@college.edu",
    mobile: "9988776644",
    totalStudents: 12,
    status: "Active"
  }
];

export const mentoringSessions = [
  {
    id: 1,
    studentName: "Rahul Sharma",
    mentorName: "Dr. Mehta",
    date: "2023-10-15",
    attendance: "Present",
    stressLevel: "Medium",
    issues: "Difficulty with advanced algorithms.",
    agenda: "Review previous assignments and discuss project topics."
  },
  {
    id: 2,
    studentName: "Anjali Patel",
    mentorName: "Dr. Mehta",
    date: "2023-10-16",
    attendance: "Present",
    stressLevel: "Low",
    issues: "Seeking internship guidance.",
    agenda: "Resume review and interview preparation."
  },
  {
    id: 3,
    studentName: "Vikram Singh",
    mentorName: "Prof. Rao",
    date: "2023-10-18",
    attendance: "Absent",
    stressLevel: "High",
    issues: "N/A",
    agenda: "Discuss academic performance."
  }
];