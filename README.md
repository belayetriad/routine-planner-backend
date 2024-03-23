# Routine Planner

Routine Planner is a sophisticated web application tailored to assist students in crafting personalized study schedules that align with their preferences and constraints.

## Features

- **Secure Authentication**: Users can confidently sign up, log in, and log out, knowing their data is protected.
- **Dynamic Routine Generation**: Study plans are meticulously crafted on a 5-7 day basis, accommodating individual study time availability and learning objectives.
- **Intelligent Prioritization**: Study sessions are thoughtfully prioritized, considering factors such as duration and importance.

## Technology Stack

- **Language**: JavaScript (Node.js)
- **Framework**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Data Validation**: Joi, Express Validator
- **Testing Framework**: Jest, supertest (for backend testing)
- **Authentication Security**: bcryptjs, jsonwebtoken

## Getting Started

### Prerequisites

- Ensure Node.js is installed on your system.
- MongoDB should be installed and running either locally or accessible remotely.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/belayetriad/routine-planner-backend.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd routine-planner
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

   Alternatively, you can build and run Docker containers:

   ```bash
   docker-compose up --build
   ```

4. **Set up environment variables:**

   - Create a `.env` file in the root directory based on the `.env.example` file.
   - Populate the file with necessary environment variables such as MongoDB URI, JWT secret, etc.

5. **Start the server:**

   ```bash
   npm start
   ```

   The server will be up and running on port 3001.

## Contributing

Contributions are warmly welcomed! To contribute, fork the repository, make your enhancements, and submit a pull request.

## License

This project is licensed under the ISC License. For further details, refer to the LICENSE file.

## Contact

For any inquiries or feedback, don't hesitate to reach out to [Belayet Hossen](mailto:belayetriadbd@gmail.com). Your input is greatly valued.
