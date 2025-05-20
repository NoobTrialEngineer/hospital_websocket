# Hospital WebSocket System

A comprehensive hospital management system with real-time communication capabilities using WebSockets. This application enables hospitals to manage patients, beds, zones, specialties, and patient referrals in real-time.

## Project Overview

This system is designed to help hospital administrators and healthcare professionals manage hospital resources efficiently. The application provides real-time updates on bed availability, patient information, and internal transfers using WebSocket technology for instant communication.

## Features

- **User Authentication**: Secure login and registration system for administrators and healthcare professionals
- **Real-time Updates**: WebSocket implementation for immediate data synchronization across all connected clients
- **Patient Management**: Create, update, and track patient information
- **Bed Management**: Monitor bed availability and occupancy in different hospital zones
- **Specialties**: Manage medical specialties available in the hospital
- **Patient Referrals**: Transfer patients between different hospital areas or to other healthcare facilities
- **Hospital Zones**: Organize and monitor different areas within the hospital
- **Administrative Tools**: Role-based access control for various administrative functions

## Technology Stack

### Frontend
- React.js (v18)
- Ant Design (UI Framework)
- Material UI components
- React Router for navigation
- WebSocket client for real-time communication

### Backend
- Java
- Tyrus WebSocket server (JSR 356 implementation)
- JSON Web Token (JWT) for authentication
- MySQL database for data persistence
- Grizzly server for WebSocket container

### Database
- MySQL 8.0

## Project Structure

```
hospital_websocket/
├── client/                # React frontend application
│   ├── public/            # Static files
│   └── src/               # Source code
│       ├── components/    # React components
│       ├── data/          # Data definitions and column configurations
│       ├── pages/         # Page components
│       ├── utils/         # Utility functions and configurations
│       ├── App.js         # Main application component
│       └── ...
├── server/                # Java backend application
│   ├── src/
│   │   └── main/
│   │       └── java/
│   │           ├── controller/  # Business logic controllers
│   │           ├── db/          # Database connection and operations
│   │           ├── model/       # Data models
│   │           ├── services/    # Service layer
│   │           ├── websocket/   # WebSocket implementation
│   │           └── Server/      # WebSocket endpoints
│   └── pom.xml            # Maven project configuration
└── db/                    # Database scripts
    └── dump-hospital.sql  # Database schema and initial data
```

## Getting Started

### Prerequisites
- Java Development Kit (JDK) 11 or higher
- Node.js 14 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

### Installation

#### Database Setup
1. Create a MySQL database named `hospital`
2. Import the database schema and initial data:
   ```bash
   mysql -u your_username -p hospital < db/dump-hospital.sql
   ```

#### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Build the project using Maven:
   ```bash
   mvn clean install
   ```
3. Run the server:
   ```bash
   java -jar target/WebSocketChat-0.0.1-SNAPSHOT.jar
   ```
   The WebSocket server will start on port 666.

#### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm start
   ```
   The application will be available at http://localhost:3000.

## Usage

1. Log in using the admin credentials:
   - Username: `mamedina13`
   - Password: `Martin`
   
   (Or use other credentials available in the database)

2. Navigate through the system using the sidebar menu to access different modules:
   - Patient Management
   - Bed Management
   - Hospital Zones
   - Specialties
   - Patient Referrals
   - Administrative Functions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a new Pull Request

## License

This project is proprietary software.

## Contact

For any inquiries regarding this project, please contact the development team.
