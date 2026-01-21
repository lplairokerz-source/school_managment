
USE school_mgmt;

-- 1. Student report card
DELIMITER $$
CREATE PROCEDURE sp_get_student_report_card(IN p_student_id BIGINT)
BEGIN
  SELECT s.id AS student_id, s.first_name, s.last_name, c.name AS class_name,
         ex.name AS exam_name, sub.name AS subject, r.marks_obtained, r.grade
  FROM results r
  JOIN students s ON s.id = r.student_id
  JOIN exams ex ON ex.id = r.exam_id
  JOIN subjects sub ON sub.id = r.subject_id
  JOIN classes c ON c.id = ex.class_id
  WHERE s.id = p_student_id
  ORDER BY ex.exam_date DESC, sub.name ASC;
END $$
DELIMITER ;

-- 2. Class attendance summary
DELIMITER $$
CREATE PROCEDURE sp_get_class_attendance_summary(
  IN p_class_id BIGINT,
  IN p_start DATE,
  IN p_end DATE
)
BEGIN
  SELECT a.class_id,
         COUNT(*) AS total_records,
         SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) AS present_count,
         SUM(CASE WHEN a.status = 'Absent' THEN 1 ELSE 0 END) AS absent_count,
         SUM(CASE WHEN a.status = 'Late' THEN 1 ELSE 0 END) AS late_count
  FROM attendance a
  WHERE a.class_id = p_class_id AND a.date BETWEEN p_start AND p_end
  GROUP BY a.class_id;
END $$
DELIMITER ;

-- 3. Calculate fee due for a student
DELIMITER $$
CREATE PROCEDURE sp_calculate_fee_due(IN p_student_id BIGINT)
BEGIN
  SELECT f.student_id,
         SUM(f.amount) AS total_billed,
         SUM(f.paid_amount) AS total_paid,
         SUM(f.amount - f.paid_amount) AS total_due
  FROM fees f
  WHERE f.student_id = p_student_id
  GROUP BY f.student_id;
END $$
DELIMITER ;

-- 4. Teacher schedule (classes and upcoming exams)
DELIMITER $$
CREATE PROCEDURE sp_get_teacher_schedule(IN p_teacher_id BIGINT)
BEGIN
  SELECT t.id AS teacher_id,
         c.name AS class_name,
         c.section,
         ex.name AS exam_name,
         ex.exam_date
  FROM classes c
  LEFT JOIN exams ex ON ex.class_id = c.id AND ex.exam_date >= CURDATE()
  JOIN teachers t ON t.id = c.class_teacher_id
  WHERE t.id = p_teacher_id
  ORDER BY ex.exam_date ASC;
END $$
DELIMITER ;

-- 5. Promote students from one class to next class for an academic year
DELIMITER $$
CREATE PROCEDURE sp_promote_students(
  IN p_from_class_id BIGINT,
  IN p_to_class_id BIGINT,
  IN p_new_academic_year VARCHAR(20)
)
BEGIN
  INSERT INTO enrollments (student_id, class_id, academic_year)
  SELECT e.student_id, p_to_class_id, p_new_academic_year
  FROM enrollments e
  WHERE e.class_id = p_from_class_id;
END $$
DELIMITER ;
