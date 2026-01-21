
-- Schema: school management (MySQL 8.0)
CREATE DATABASE IF NOT EXISTS school_mgmt;
USE school_mgmt;

CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(80) NOT NULL UNIQUE,
  password_hash VARCHAR(255),
  role ENUM('admin','teacher','student') NOT NULL DEFAULT 'admin'
);

CREATE TABLE students (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NULL,
  roll_no VARCHAR(20) NOT NULL UNIQUE,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  dob DATE,
  gender ENUM('M','F','O') DEFAULT 'O',
  guardian_name VARCHAR(120),
  contact VARCHAR(40),
  address VARCHAR(255),
  admission_date DATE,
  status ENUM('active','inactive') DEFAULT 'active',
  CONSTRAINT fk_students_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE teachers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NULL,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  email VARCHAR(120),
  contact VARCHAR(40),
  hire_date DATE,
  department VARCHAR(80),
  CONSTRAINT fk_teachers_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE classes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  section VARCHAR(10),
  class_teacher_id BIGINT NULL,
  academic_year VARCHAR(20) NOT NULL,
  CONSTRAINT fk_classes_teacher FOREIGN KEY(class_teacher_id) REFERENCES teachers(id)
);

CREATE TABLE subjects (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  code VARCHAR(20) NOT NULL UNIQUE,
  description VARCHAR(255)
);

CREATE TABLE enrollments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  student_id BIGINT NOT NULL,
  class_id BIGINT NOT NULL,
  academic_year VARCHAR(20) NOT NULL,
  CONSTRAINT fk_enroll_student FOREIGN KEY(student_id) REFERENCES students(id),
  CONSTRAINT fk_enroll_class FOREIGN KEY(class_id) REFERENCES classes(id)
);

CREATE TABLE attendance (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  student_id BIGINT NOT NULL,
  class_id BIGINT NOT NULL,
  date DATE NOT NULL,
  status ENUM('Present','Absent','Late') NOT NULL,
  CONSTRAINT fk_att_stud FOREIGN KEY(student_id) REFERENCES students(id),
  CONSTRAINT fk_att_class FOREIGN KEY(class_id) REFERENCES classes(id)
);

CREATE TABLE exams (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  class_id BIGINT NOT NULL,
  term VARCHAR(40),
  exam_date DATE,
  CONSTRAINT fk_exam_class FOREIGN KEY(class_id) REFERENCES classes(id)
);

CREATE TABLE results (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  exam_id BIGINT NOT NULL,
  student_id BIGINT NOT NULL,
  subject_id BIGINT NOT NULL,
  marks_obtained DECIMAL(5,2) NOT NULL,
  grade VARCHAR(2),
  CONSTRAINT fk_res_exam FOREIGN KEY(exam_id) REFERENCES exams(id),
  CONSTRAINT fk_res_student FOREIGN KEY(student_id) REFERENCES students(id),
  CONSTRAINT fk_res_subject FOREIGN KEY(subject_id) REFERENCES subjects(id)
);

CREATE TABLE fees (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  student_id BIGINT NOT NULL,
  fee_type VARCHAR(80) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE,
  paid_amount DECIMAL(10,2) DEFAULT 0,
  balance AS (amount - paid_amount) STORED,
  status ENUM('due','partial','paid') DEFAULT 'due',
  last_payment_date DATE,
  CONSTRAINT fk_fee_student FOREIGN KEY(student_id) REFERENCES students(id)
);
