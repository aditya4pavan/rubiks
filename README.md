
## Getting Started

Install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Use your Mouse to Control the Environment to Zoom and Rotate

Coming Soon: Functionality to Rotate Faces

![Demo](public/images/Sample.png)


### **JIRA Ticket: Enhance AWS Glue Job for Robustness, Scalability, and Monitoring**

---

**Summary:**  
Enhance the AWS Glue job to ensure scalability, robustness, monitoring, and cost optimization while handling larger data volumes efficiently.

---

**Acceptance Criteria:**

- **Given**: The AWS Glue job processes data from S3 and writes it to DynamoDB.  

  - **Then**: The job uses efficient partitioning and dynamic partitioning for DynamoDB to handle large data volumes.  
  - **Then**: Schema validation and error logging are implemented to ensure data quality.  
  - **Then**: Detailed monitoring is set up with CloudWatch Logs and Alarms for job performance and failures.  
  - **Then**: The workflow is automated using S3 Event Notifications or scheduled triggers.  
  - **Then**: Incremental updates are handled via DynamoDB Streams for efficient aggregation.  
  - **Then**: Deduplication is applied, and backup of raw and aggregated data is stored in S3.  
  - **Then**: Cost optimization is ensured with appropriate timeouts and temporary use of DynamoDB On-Demand Mode.

---
