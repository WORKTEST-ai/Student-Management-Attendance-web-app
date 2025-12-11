# Security Policy

**Last Updated: December 11, 2024**

## 1. Reporting a Vulnerability

If you discover a security vulnerability in SMA, please report it responsibly.

### How to Report

**Email:** security@sma-school.com

**Include:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Your contact information (optional)

**Response Timeline:**
- Acknowledgment: Within 48 hours
- Initial Assessment: Within 7 days
- Resolution: Depends on severity

---

## 2. Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x.x | ✅ Yes |
| < 1.0 | ❌ No |

---

## 3. Security Measures

### 3.1 Authentication
- JWT-based authentication
- HTTP-only secure cookies
- Token expiration and rotation
- Role-based access control

### 3.2 Data Protection
- All data encrypted in transit (TLS 1.3)
- Sensitive data not logged
- Input validation and sanitization
- SQL injection prevention

### 3.3 Infrastructure
- Regular security updates
- Firewall protection
- DDoS mitigation
- Regular backups

---

## 4. Security Best Practices for Users

### Administrators
- Use strong, unique passwords
- Enable 2FA when available
- Review user access regularly
- Monitor audit logs

### Teachers & Students
- Don't share login credentials
- Log out on shared devices
- Report suspicious activity
- Keep browsers updated

---

## 5. Responsible Disclosure

We follow responsible disclosure principles:
- We work with researchers in good faith
- We don't pursue legal action for good-faith reports
- We credit researchers (with permission)
- We aim to fix critical issues within 90 days

---

## 6. Security Updates

Security patches are released as:
- **Critical:** Immediate hotfix release
- **High:** Within 7 days
- **Medium:** Next scheduled release
- **Low:** Backlog prioritization

---

**Contact:** security@sma-school.com
