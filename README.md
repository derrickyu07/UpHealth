# UpHealth

A full stack health management app for tracking appointments, vaccinations, and personal health information in one place.

I built UpHealth as a personal tool for keeping my own health appointments organized, and as a way to learn C# and ASP.NET Core in depth, along with containerized deployment to Azure.

## Features

**Profile**: Manage personal and health details tied to your account.

**Dashboard**: See upcoming appointments and health records at a glance.

**Vaccination Tracking**: Record vaccinations and keep a history in one place.

**Health News**: Browse current health news from within the app.

**Appointment Booking**: Schedule appointments and receive a confirmation email through SendGrid when a booking is made.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Redux Toolkit |
| Backend | ASP.NET Core (C#) REST API |
| Data access | Entity Framework Core |
| Database | SQL Server |
| Authentication | ASP.NET Core Identity |
| Email | SendGrid |
| Containerization | Docker |
| Hosting | Azure App Service (Web App for Containers) |
| CI/CD | GitHub Actions |

## Architecture

```
React + Redux Toolkit
        |
        |  HTTP / JSON
        v
ASP.NET Core Web API
  Controllers  ->  Services (registered via DI)  ->  EF Core DbContext
        |                                                  |
   ASP.NET Identity                                   SQL Server
        |
     SendGrid (booking confirmation emails)
```

Controllers stay thin and delegate business logic to service classes registered through ASP.NET Core dependency injection. Services use Entity Framework Core to read and write SQL Server. ASP.NET Core Identity handles registration, password hashing, and authentication. On the frontend, Redux Toolkit slices hold auth state and data fetched from the API.

## Getting Started

### Prerequisites

* [.NET SDK](https://dotnet.microsoft.com/download) (version used by the project)
* [Node.js](https://nodejs.org/) and npm
* SQL Server (local install, or the SQL Server Docker image)
* [Docker](https://www.docker.com/) (optional, for running the container)
* A SendGrid API key (optional, only needed for email)

### Configuration

Set the following values in `appsettings.Development.json` or with [user secrets](https://learn.microsoft.com/aspnet/core/security/app-secrets):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=UpHealth;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "SendGrid": {
    "ApiKey": "<your-sendgrid-api-key>",
    "FromEmail": "<verified-sender-address>"
  }
}
```

Never commit real keys. Use user secrets locally and app settings or environment variables in Azure.

### Run the backend

```bash
cd <backend-folder>
dotnet restore
dotnet ef database update
dotnet run
```

### Run the frontend

```bash
cd <frontend-folder>
npm install
npm start
```

Point the frontend at the API's local URL (check the API base URL setting in the frontend config).

### Run with Docker

```bash
docker build -t uphealth .
docker run -p 8080:8080 uphealth
```

## Deployment

Each push to `main` triggers a GitHub Actions workflow that builds the Docker image, pushes it to a container registry, and deploys it to Azure App Service (Web App for Containers). Connection strings and the SendGrid key are supplied through App Service configuration rather than the repo.

The app was previously live on Azure and is not currently hosted.

