# KanbanApp

KanbanApp is a Trello-like project management tool designed to enhance productivity and collaboration. Built with Django, Django REST Framework (DRF), Celery, and Redis on the backend, and React, Vite, and TypeScript on the frontend, it offers a powerful and efficient platform for managing tasks and workflows.

## Getting Started
These instructions will guide you through setting up and running KanbanApp on your local machine for development and testing purposes. Please follow these steps carefully to ensure a smooth setup.

### Prerequisites
Before starting, ensure you have the following software installed:

- [Python](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/en/)
- [Redis](https://redis.io/)

### Backend Setup

1. **Clone the Repository**

    Begin by cloning the repository to your local machine:
    ```bash
    git clone https://github.com/petrosbeyene/kanban-trello-app.git
    cd kanban-trello-app/kanban-backend
    ```

2. **Set Up Virtual Environment**

    Create a virtual environment named .venv inside the backend directory:
    ```bash
    python -m venv .venv
    ```

    2.1 Activate the virtual environment:

    On Windows: 
    ```bash 
    .venv\Scripts\activate 
    ```

    On macOS and Linux: 
    ````bash 
    source .venv/bin/activate 
    ```

3. **Install Dependencies**

    Install all required packages from the requirements.txt file:
    ```bash
    pip install -r requirements.txt
    ```

4. **Start the Backend Server**

    Run the Django server:
    ```bash
    python manage.py runserver
    ```

5. **Start Redis Server**

    Ensure that [Redis](https://redis.io/) server is installed on your machine and start the Redis server. The command might vary depending on your operating system.

6. **Start Celery Worker**

    Start the Celery worker. For Windows users, the -P eventlet flag is necessary:

    On Windows:
    ```bash
    celery -A kanbanapp worker --loglevel=info -P eventlet
    ```
    On macOS and Linux:
    ```bash
    celery -A kanbanapp worker --loglevel=info
    ```


### Frontend Setup

1. **Navigate to the Frontend Directory**
    ```bash
    cd kanban-trello-app/kanban-frontend
    ```

2. **Install Dependencies**

    Install the necessary packages using npm:
    ```bash
    npm install
    ```

3. **Start the Frontend Development Server**

    Run the development server with Vite:
    ```bash
    npm run dev
    ```

    The application should now be running and accessible through http://localhost:5173/.


### Additional Information
Ensure that the backend and Redis server are running before starting the Celery worker.
Adjust the kanbanapp in the Celery command to match your Django project's name if it differs.
For more detailed instructions on setting up Redis, refer to the official Redis documentation.
Consult the Django and DRF documentation for further customization and setup options.