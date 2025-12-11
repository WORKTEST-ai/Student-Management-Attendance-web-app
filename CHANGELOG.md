# Changelog

All notable changes to SMA (Student Management & Attendance) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Email notification system
- Parent portal
- Mobile app support
- Advanced analytics dashboard

---

## [1.0.0] - 2024-12-11

### Added
- **Authentication System**
  - Custom JWT-based authentication
  - HTTP-only secure cookies
  - Role-based access control (Admin, Teacher, Student)
  - Login/logout functionality

- **Admin Features**
  - User management (CRUD operations)
  - Teacher management
  - Class and subject management
  - Audit log viewing
  - System reports
  - Student reports

- **Teacher Features**
  - Attendance marking interface
  - Student list per class
  - Class reports
  - Quick status overview

- **Student Features**
  - Personal attendance overview
  - Attendance history
  - Subject-wise breakdown

- **AI Features**
  - Genkit AI integration
  - Attendance pattern analysis
  - Automated insights generation
  - Intervention recommendations

- **Technical**
  - Next.js 15 with App Router
  - React 19 with TypeScript
  - TailwindCSS styling
  - Radix UI components
  - Responsive design
  - Dark/Light mode support

### Security
- JWT token authentication
- HTTP-only cookies
- CSRF protection via SameSite cookies
- Input validation
- Role-based middleware protection

---

## Version History Format

### [Version] - YYYY-MM-DD

#### Added
New features

#### Changed
Changes in existing functionality

#### Deprecated
Soon-to-be removed features

#### Removed
Removed features

#### Fixed
Bug fixes

#### Security
Security improvements

---

*For detailed commit history, see GitHub commits.*
