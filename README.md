# Nations Application - Quick Start Guide

## 🚀 How to Start the Application

### Prerequisites
- Docker Desktop installed and running
- Java JDK 17+ installed
- Node.js 18+ and Angular CLI installed

---

## Step 1: Start Database (Docker)

```bash
# Start MariaDB container
docker-compose up -d

# Wait 10 seconds for database to initialize
```

**Database Credentials:**
- Host: `localhost:3306`
- Database: `nations`
- Username: `nations_user`
- Password: `nations_pass`

---

## Step 2: Start Backend

```bash
# Navigate to backend folder
cd backend

# Start Spring Boot application
mvn spring-boot:run
```

**Backend will run on:** `http://localhost:8080`

---

## Step 3: Start Frontend

```bash
# Navigate to frontend folder (in a new terminal)
cd frontend/nations-frontend

# Start Angular application
ng serve
```

**Frontend will run on:** `http://localhost:4200`

---

## Step 4: Open Application

Open your browser and go to:
```
http://localhost:4200
```

---

## 🛑 How to Stop the Application

```bash
# Stop Frontend (in its terminal)
Press Ctrl+C

# Stop Backend (in its terminal)
Press Ctrl+C

# Stop Database
docker-compose down
```

---

## 📝 Quick Reference

| Component | Command | URL |
|-----------|---------|-----|
| Database | `docker-compose up -d` | localhost:3306 |
| Backend | `mvn spring-boot:run` | http://localhost:8080 |
| Frontend | `ng serve` | http://localhost:4200 |

---

## ✅ Verify Everything Works

1. ✅ Database: `docker ps` should show `nations-db` container
2. ✅ Backend: Open `http://localhost:8080/api/countries` - should return JSON
3. ✅ Frontend: Open `http://localhost:4200` - should show application

---

## 🐛 Common Issues

**Backend can't connect to database?**
- Check database is running: `docker ps`
- Check credentials in `application.properties` match docker-compose.yml

**Frontend shows errors?**
- Make sure backend is running first
- Check browser console (F12) for error messages

---

That's it! 🎉

Your application should now be running with:
- MariaDB database in Docker
- Spring Boot backend on port 8080
- Angular frontend on port 4200
