# AI/LLM Disclosure

**Last Updated: December 11, 2024**

## 1. Overview

SMA (Student Management & Attendance) integrates Artificial Intelligence (AI) and Large Language Model (LLM) technology to enhance educational insights and improve the user experience. This document discloses how AI is used in our application.

---

## 2. AI Technology Used

### 2.1 Google Genkit

We use **Google Genkit**, an open-source framework for building AI-powered applications, integrated with Google's Generative AI services.

| Component | Description |
|-----------|-------------|
| **Framework** | Genkit v1.20.0 |
| **Provider** | @genkit-ai/google-genai |
| **Integration** | Server-side AI processing |
| **Purpose** | Attendance insights generation |

### 2.2 AI Model Information

| Aspect | Details |
|--------|---------|
| **Model Type** | Large Language Model (LLM) |
| **Provider** | Google Generative AI |
| **Processing** | Server-side (not client-side) |
| **Data Handling** | Processed according to Google's AI policies |

---

## 3. How AI Is Used in SMA

### 3.1 Attendance Insights Generation

The primary AI feature analyzes attendance data to provide actionable insights.

```
┌─────────────────────────────────────────────────────────┐
│                AI Attendance Analysis                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Input:                                                  │
│  ├── Historical attendance records                       │
│  ├── Student attendance patterns                         │
│  └── Class-wide statistics                              │
│                                                          │
│  AI Processing:                                          │
│  ├── Pattern recognition                                 │
│  ├── Anomaly detection                                   │
│  ├── Trend analysis                                      │
│  └── Risk assessment                                     │
│                                                          │
│  Output:                                                 │
│  ├── Attendance pattern insights                         │
│  ├── At-risk student identification                      │
│  ├── Intervention recommendations                        │
│  └── Actionable suggestions for educators                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Specific AI Features

| Feature | Description | Data Used |
|---------|-------------|-----------|
| **Pattern Analysis** | Identifies regular vs irregular attendance | Attendance dates, statuses |
| **Anomaly Detection** | Flags unusual absence patterns | Historical attendance data |
| **Trend Identification** | Recognizes day/subject-specific patterns | Attendance by day/subject |
| **Risk Assessment** | Identifies students who may need support | Aggregated attendance metrics |
| **Recommendations** | Suggests interventions | Pattern analysis results |

---

## 4. Data Sent to AI

### 4.1 What Data Is Processed

When AI features are used, the following data may be sent:

| Data Type | Example | Identifiable? |
|-----------|---------|---------------|
| Attendance Status | "Present", "Absent", "Late" | No |
| Date | "2024-05-20" | No |
| Class ID | "class-1" | Pseudonymized |
| Subject ID | "sub-1" | Pseudonymized |
| Student ID | "user-4" | Pseudonymized |

### 4.2 What Data Is NOT Sent

| Data NOT Sent | Reason |
|---------------|--------|
| Student names | Privacy protection |
| Email addresses | Not needed for analysis |
| Passwords | Never transmitted |
| Personal details | Not relevant to attendance analysis |

### 4.3 Data Anonymization

Before sending data to AI:
1. **Pseudonymization**: Real IDs are replaced with internal identifiers
2. **Aggregation**: Data is grouped where possible
3. **Minimization**: Only necessary data is included
4. **No PII**: Personally identifiable information is stripped

---

## 5. AI Processing and Storage

### 5.1 Processing Location

| Aspect | Details |
|--------|---------|
| **Initial Processing** | Our servers (Next.js API) |
| **AI Processing** | Google Cloud infrastructure |
| **Data Residency** | Subject to Google Cloud policies |

### 5.2 Data Retention by AI

| Stage | Retention |
|-------|-----------|
| **In Transit** | Encrypted, not stored |
| **AI Processing** | Temporary, for response generation only |
| **Results** | Returned immediately, not stored by AI |
| **Our Storage** | Results may be cached for performance |

### 5.3 Google's AI Data Usage

According to Google's AI policies:
- Data is processed to generate responses
- Data is not used to train models (when using API)
- Enterprise-grade security and privacy
- Compliance with applicable regulations

---

## 6. AI Limitations and Disclaimer

### 6.1 AI Is Not Perfect

⚠️ **Important Disclaimers:**

| Limitation | Explanation |
|------------|-------------|
| **Not 100% Accurate** | AI-generated insights may contain errors |
| **Pattern-Based** | Analysis is based on available data only |
| **No Guarantees** | Insights are suggestions, not certainties |
| **Human Oversight** | All AI recommendations should be reviewed by educators |

### 6.2 AI Should Not Replace Human Judgment

```
┌─────────────────────────────────────────────────────────┐
│                    ⚠️ IMPORTANT ⚠️                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  AI insights are meant to ASSIST educators, not         │
│  REPLACE their professional judgment.                    │
│                                                          │
│  ✓ Use AI insights as one input among many              │
│  ✓ Verify important patterns manually                   │
│  ✓ Consider context AI cannot see                       │
│  ✓ Apply professional expertise to recommendations      │
│                                                          │
│  ✗ Don't make major decisions based solely on AI        │
│  ✗ Don't assume AI insights are always correct          │
│  ✗ Don't ignore obvious errors in AI output             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 6.3 Known Limitations

| Limitation | Impact |
|------------|--------|
| **Limited Context** | AI doesn't know reasons for absences |
| **Data Dependency** | Quality depends on data accuracy |
| **Cultural Factors** | May not account for local customs/events |
| **Edge Cases** | Unusual patterns may be misinterpreted |

---

## 7. Transparency and Explainability

### 7.1 How AI Decisions Are Made

AI insights are generated by:
1. Analyzing patterns in attendance data
2. Comparing to typical attendance patterns
3. Identifying deviations and trends
4. Generating natural language explanations

### 7.2 Explainable Outputs

AI responses include:
- Clear summary of findings
- Specific data points referenced
- Reasoning for recommendations
- Confidence indicators where applicable

---

## 8. User Rights Regarding AI

### 8.1 Opt-Out Options

| Option | Availability |
|--------|-------------|
| Disable AI Features | Contact administrator |
| Manual Analysis Only | Available as alternative |
| Data Exclusion | Request data not be analyzed by AI |

### 8.2 Your Rights

You have the right to:
- Know when AI is being used
- Understand what data is processed
- Request human review of AI decisions
- Opt out of AI processing (where feasible)

### 8.3 How to Exercise Rights

Contact your school administrator or email: ai-privacy@sma-school.com

---

## 9. AI Ethics and Principles

### 9.1 Our AI Principles

| Principle | Implementation |
|-----------|----------------|
| **Transparency** | This disclosure document |
| **Fairness** | No bias in attendance analysis |
| **Privacy** | Data anonymization and minimization |
| **Human Oversight** | AI assists, doesn't decide |
| **Security** | Encrypted processing |
| **Accountability** | Clear responsibility chain |

### 9.2 Bias Prevention

We take steps to prevent AI bias:
- Diverse data representation
- Regular bias audits
- Human review of edge cases
- Feedback mechanisms for corrections

---

## 10. Security Measures

### 10.1 Data Security

| Measure | Description |
|---------|-------------|
| **Encryption** | All AI communications encrypted (TLS) |
| **Access Control** | Limited to authorized educators |
| **Audit Logging** | AI usage is logged |
| **Secure API** | Server-side processing only |

### 10.2 No Client-Side AI

- AI processing happens on our servers
- No AI models run in the browser
- Your device doesn't send data directly to AI
- All processing goes through our secure backend

---

## 11. Children and AI

### 11.1 Special Considerations for Minors

| Consideration | Implementation |
|---------------|----------------|
| **Data Minimization** | Only attendance data analyzed |
| **No Profiling** | No behavioral profiling of children |
| **Parental Awareness** | Parents informed via this policy |
| **School Oversight** | Teachers review AI insights |

### 11.2 COPPA and GDPR Compliance

- AI features comply with children's privacy laws
- No individual targeting of children
- Aggregate patterns only, not individual predictions

---

## 12. Future AI Features

### 12.1 Potential Future Enhancements

| Feature | Status | Data Implications |
|---------|--------|-------------------|
| Grade Prediction | Planned | May include academic data |
| Behavior Analysis | Under Review | Requires additional consent |
| Parent Communication | Planned | Natural language generation |

### 12.2 Notification of Changes

When new AI features are added:
- This disclosure will be updated
- Users will be notified
- Additional consent obtained if needed

---

## 13. Regulatory Compliance

### 13.1 Applicable Regulations

| Regulation | Applicability |
|------------|---------------|
| **GDPR (EU)** | AI transparency requirements met |
| **CCPA (California)** | Automated decision-making disclosed |
| **India IT Rules** | Reasonable security practices |
| **FERPA (US Education)** | Educational records protection |

### 13.2 AI-Specific Regulations

We monitor evolving AI regulations including:
- EU AI Act
- AI governance frameworks
- Educational AI guidelines

---

## 14. Contact Information

### For AI-Related Questions:

**Email:** ai-privacy@sma-school.com

**Subject Lines:**
- "AI Opt-Out Request" - To disable AI features
- "AI Data Question" - About data processing
- "AI Feedback" - To report issues with AI outputs

**Response Time:** Within 5 business days

---

## 15. Summary

| Aspect | Summary |
|--------|---------|
| **AI Used** | Google Genkit with Generative AI |
| **Purpose** | Attendance insights and patterns |
| **Data Processed** | Anonymized attendance data |
| **Storage** | Not permanently stored by AI |
| **Human Oversight** | Required for all decisions |
| **Opt-Out** | Available upon request |

---

*This AI Disclosure is effective as of December 11, 2024.*

---

## Appendix: AI Feature Technical Details

### A.1 Genkit Flow Definition

```typescript
// Simplified representation of our AI flow
const generateAttendanceInsightsFlow = ai.defineFlow({
  name: 'generateAttendanceInsightsFlow',
  inputSchema: z.object({
    attendanceData: z.string() // JSON attendance records
  }),
  outputSchema: z.object({
    insights: z.string() // Natural language insights
  })
});
```

### A.2 Sample AI Prompt (Simplified)

```
Analyze the following attendance data and identify:
- Patterns and trends
- Anomalies or concerns
- Actionable recommendations

Provide clear, concise insights for educators.
```

---

*Document Version: 1.0*
