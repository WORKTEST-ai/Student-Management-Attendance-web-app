# Cookie Policy

**Last Updated: December 11, 2024**

## 1. Introduction

This Cookie Policy explains how SMA (Student Management & Attendance) uses cookies and similar technologies when you use our application. This policy should be read alongside our [Privacy Policy](./PRIVACY_POLICY.md).

---

## 2. What Are Cookies?

Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website or use an application. They help websites remember your preferences and improve your user experience.

### Types of Storage We Use

| Type | Description |
|------|-------------|
| **Cookies** | Small files stored by your browser |
| **Session Storage** | Temporary data cleared when browser closes |
| **Local Storage** | Persistent data stored in your browser |

---

## 3. Cookies We Use

### 3.1 Essential Cookies (Required)

These cookies are necessary for the application to function. You cannot opt out of these cookies.

| Cookie Name | Purpose | Duration | Type |
|-------------|---------|----------|------|
| `auth` | Stores your authentication token (JWT) in an HTTP-only cookie for secure session management | Session / 24 hours | HTTP-only |
| `__Host-session` | Session identifier for security | Session | Secure |

**Why Essential:**
- Without these cookies, you cannot log in or use the application
- They protect against security threats like CSRF attacks
- They maintain your authenticated state as you navigate

### 3.2 Functional Cookies

These cookies remember your preferences to enhance your experience.

| Cookie Name | Purpose | Duration |
|-------------|---------|----------|
| `theme` | Remembers your dark/light mode preference | 1 year |
| `sidebar-collapsed` | Remembers sidebar state | 30 days |
| `language` | Stores your language preference | 1 year |

### 3.3 Analytics Cookies (If Enabled)

We may use analytics to understand how our application is used.

| Cookie Name | Purpose | Duration | Provider |
|-------------|---------|----------|----------|
| `_ga` | Google Analytics - distinguishes users | 2 years | Google |
| `_gid` | Google Analytics - distinguishes users | 24 hours | Google |
| `_gat` | Google Analytics - throttle request rate | 1 minute | Google |

**Note:** Analytics cookies are optional and can be disabled.

---

## 4. How We Use Cookies

### 4.1 Authentication and Security
```
┌─────────────────────────────────────────────────────────┐
│                    Login Process                         │
├─────────────────────────────────────────────────────────┤
│  1. User enters credentials                             │
│  2. Server validates and creates JWT                    │
│  3. JWT stored in HTTP-only 'auth' cookie               │
│  4. Cookie sent with each request for verification      │
│  5. Middleware validates token on protected routes      │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Session Management
- Maintain your logged-in state
- Remember which pages you're authorized to access
- Secure your session against unauthorized access

### 4.3 User Experience
- Remember your theme preference
- Keep track of UI state (sidebars, menus)
- Personalize your experience

### 4.4 Performance and Analytics
- Understand how the application is used
- Identify areas for improvement
- Monitor error rates and performance

---

## 5. Cookie Security Measures

We implement the following security measures for our cookies:

### 5.1 HTTP-only Cookies
```
Set-Cookie: auth=<token>; HttpOnly; Secure; SameSite=Strict
```

| Attribute | Purpose |
|-----------|---------|
| `HttpOnly` | Prevents JavaScript access, protecting against XSS attacks |
| `Secure` | Only sent over HTTPS connections |
| `SameSite=Strict` | Prevents cross-site request forgery (CSRF) |

### 5.2 Token Security
- JWT tokens have limited expiration times
- Tokens are cryptographically signed
- Invalid tokens are automatically rejected

---

## 6. Third-Party Cookies

### 6.1 Current Third-Party Services

| Service | Cookies Set | Purpose |
|---------|-------------|---------|
| Google Fonts | None (CSS only) | Font loading |
| Vercel Analytics | Optional | Performance monitoring |
| Google Genkit | None | AI processing (server-side) |

### 6.2 Third-Party Cookie Policy
- We minimize third-party cookies
- All third-party services comply with privacy regulations
- You can opt out of non-essential third-party cookies

---

## 7. Managing Cookies

### 7.1 Browser Settings

You can control cookies through your browser settings:

**Google Chrome:**
1. Settings → Privacy and Security → Cookies
2. Choose your preferred option

**Mozilla Firefox:**
1. Settings → Privacy & Security → Cookies
2. Select your preference

**Safari:**
1. Preferences → Privacy → Cookies
2. Adjust settings

**Microsoft Edge:**
1. Settings → Cookies and site permissions
2. Manage cookies

### 7.2 Impact of Disabling Cookies

| Cookie Type | Impact if Disabled |
|-------------|-------------------|
| Essential | Cannot use the application; login will fail |
| Functional | Preferences won't be saved between sessions |
| Analytics | No impact on functionality |

### 7.3 Opt-Out Links

To opt out of specific analytics:
- Google Analytics: [tools.google.com/dlpage/gaoptout](https://tools.google.com/dlpage/gaoptout)

---

## 8. Cookie Consent

### 8.1 How We Obtain Consent
- Essential cookies are used by default (required for service)
- Optional cookies are only set after explicit consent
- You can change your preferences at any time

### 8.2 Consent Management
When you first visit SMA, you may see a cookie consent banner. Your choices:
- **Accept All**: Enables all cookies
- **Essential Only**: Only necessary cookies
- **Customize**: Choose specific cookie categories

### 8.3 Withdrawing Consent
To withdraw consent:
1. Clear cookies from your browser
2. Visit the cookie settings in the application
3. Modify your preferences

---

## 9. Data Retention

| Cookie Type | Retention Period |
|-------------|------------------|
| Session cookies | Until browser closes / logout |
| Authentication | 24 hours (or session) |
| Preferences | Up to 1 year |
| Analytics | Up to 2 years |

---

## 10. Children and Cookies

- SMA may be used by minors (students)
- We only use essential cookies for authentication
- No tracking or advertising cookies are used for children
- Parental consent is obtained through school enrollment

---

## 11. International Considerations

### 11.1 GDPR (European Union)
- We obtain consent before setting non-essential cookies
- You can withdraw consent at any time
- We provide clear information about cookies

### 11.2 CCPA (California)
- We disclose cookie usage in this policy
- You have the right to opt out of data sales (we don't sell data)

### 11.3 Other Jurisdictions
- We comply with local cookie laws
- Contact us for specific regional requirements

---

## 12. Updates to This Policy

We may update this Cookie Policy periodically. Changes will be posted on this page with an updated date.

**Notification of Changes:**
- Updated "Last Updated" date
- In-app notification for significant changes
- Email notification (if material changes)

---

## 13. Contact Us

For questions about our cookie practices:

**Email:** privacy@sma-school.com

**Data Protection Officer:**  
dpo@sma-school.com

**Address:**  
SMA - Student Management & Attendance  
[Your School/Organization Address]  
[City, State, PIN Code]  
India

---

## 14. Cookie Quick Reference

### Essential Cookies (Cannot Disable)
✅ `auth` - Authentication token

### Optional Cookies (Can Disable)
⚙️ `theme` - UI theme preference  
⚙️ `sidebar-collapsed` - Sidebar state  
📊 `_ga`, `_gid` - Analytics

---

*This Cookie Policy is effective as of December 11, 2024.*
