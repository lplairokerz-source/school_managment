
# School Management (React + Vite)

A lightweight React frontend for a School Management system with **10 tables** and **5 stored procedures** defined in `/db` (MySQL 8.0). The UI provides pages for Students, Teachers, Classes, Subjects, Enrollments, Attendance, Exams, Results, Fees, and Users.

> ⚠️ The frontend ships with mock data (localStorage). Switch `USE_MOCK` to `false` in `src/api/client.js` to call real APIs.

## Tech Stack
- React 18 + Vite 5
- React Router 6
- Axios
- Day.js

## Database Schema (10 tables)
- `users`, `students`, `teachers`, `classes`, `subjects`, `enrollments`, `attendance`, `exams`, `results`, `fees`

## Stored Procedures (5)
- `sp_get_student_report_card(student_id)`
- `sp_get_class_attendance_summary(class_id, start_date, end_date)`
- `sp_calculate_fee_due(student_id)`
- `sp_get_teacher_schedule(teacher_id)`
- `sp_promote_students(from_class_id, to_class_id, new_academic_year)`

See `/db/schema.sql` and `/db/stored_procedures.sql`.

## Run locally
```bash
# Install deps
npm install
# Dev server
npm run dev
```
Open http://localhost:5173

## Integrating with a Backend
The frontend expects REST endpoints for each table at `/api/<resource>` and stored procedure endpoints at `/api/sp/<name>`. For AWS, you can use **API Gateway + Lambda** calling **Amazon RDS (MySQL 8.0)** stored procedures, or an **ECS/EKS** service.

## Push to AWS CodeCommit
If your AWS account has access to AWS CodeCommit:
1. Create a repository (console or AWS CLI).
2. Configure Git credentials for HTTPS in **IAM**.
3. Add CodeCommit as remote and push.

A helper script is included at `scripts/setup-codecommit.sh`. Update `<region>` with your AWS Region.

> Note: Some AWS documentation currently indicates CodeCommit is not available to *new* customers. If you do not see CodeCommit in your account, consider GitHub/GitLab with **AWS CodePipeline** as alternatives.

## License
MIT
