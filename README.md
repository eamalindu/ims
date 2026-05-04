# IMS — Inquiry Management System

[![Java](https://img.shields.io/badge/Java-17-orange?logo=openjdk)](https://openjdk.org/projects/jdk/17/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-brightgreen?logo=springboot)](https://spring.io/projects/spring-boot)
[![Gradle](https://img.shields.io/badge/Build-Gradle-02303A?logo=gradle)](https://gradle.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Thymeleaf](https://img.shields.io/badge/Template-Thymeleaf-005F0F?logo=thymeleaf)](https://www.thymeleaf.org/)
[![Spring Security](https://img.shields.io/badge/Security-Spring%20Security-6DB33F?logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![RMS Sync](https://img.shields.io/badge/RMS-Synced-success)](https://github.com/eamalindu/ims)

---

## Overview

**IMS (Inquiry Management System)** is a comprehensive web application built for **STEAM Higher Education Institute** to streamline inquiry handling, student registration, and performance reporting. The system **syncs data with the RMS (Registration Management System)**, ensuring that registration records, student data, and course information remain consistent across both platforms.

---

## Features

- 📋 **Inquiry Management** — Capture, track, and update student inquiries with status workflows
- 🔁 **Follow-Up Automation** — Schedule and manage counsellor follow-ups for pending inquiries
- 📝 **Student Registration** — Register students into batches and manage registration statuses
- 🔄 **RMS Data Sync** — Synchronise registration and student data with the external RMS system
- 📊 **Performance Reports** — Generate monthly performance and commission reports per counsellor
- 📧 **Email Notifications** — Automated email alerts via Gmail SMTP (Spring Mail)
- 🔐 **Role-Based Access Control** — Manage users, roles, and module-level privileges
- 👤 **Employee Management** — Maintain employee profiles and designations
- 🏫 **Course & Batch Management** — Configure courses, batches, schedules, and payment plans
- 🔑 **Password Reset** — Secure OTP-based password recovery

---

## Tech Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| Backend      | Java 17, Spring Boot 3.2.1        |
| Frontend     | Thymeleaf, jQuery, HTML/CSS/JS    |
| Security     | Spring Security                   |
| Database     | MySQL 8                           |
| ORM          | Spring Data JPA (Hibernate)       |
| Build Tool   | Gradle                            |
| Mail         | Spring Mail (Gmail SMTP)          |

---

## Prerequisites

- Java 17+
- MySQL 8+
- Gradle 8+ (or use the included `./gradlew` wrapper)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/eamalindu/ims.git
cd ims
```

### 2. Configure the database

Create a MySQL database named `steam` and update the credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/steam
spring.datasource.username=root
spring.datasource.password=your_password
```

### 3. Configure mail (optional)

Update the Gmail SMTP credentials in `application.properties`:

```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

### 4. Build and run

```bash
./gradlew bootRun
```

The application starts on **port 8888** by default: [http://localhost:8888](http://localhost:8888)

---

## Project Structure

```
src/
├── main/
│   ├── java/lk/steam/ims/
│   │   ├── config/          # Web & security configuration
│   │   ├── controller/      # REST controllers
│   │   ├── dao/             # Spring Data JPA repositories
│   │   ├── entity/          # JPA entities
│   │   └── service/         # Business logic & mail service
│   └── resources/
│       ├── templates/       # Thymeleaf HTML templates
│       ├── static/          # CSS, JS, images
│       └── application.properties
└── test/                    # Unit & integration tests
```

---

## RMS Integration

IMS synchronises key data with the **RMS (Registration Management System)**:

- Student records created in IMS are pushed to RMS upon registration
- Registration statuses are kept in sync between both systems
- Batch and course data reflect the RMS master data

---

## Running Tests

```bash
./gradlew test
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

> Built with ❤️ for **STEAM Higher Education Institute**
