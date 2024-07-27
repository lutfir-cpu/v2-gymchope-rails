# GymChope Setup Guide

## Prerequisites

You will need the following pre-installed locally on your computer:
- Ruby (>= 3.3.4)
- Rails
- Node.js (>= v20.10.0)

## Node.js Installation

1. Download and set up Node.js from [Node.js Downloads](https://nodejs.org/en/download/package-manager).

2. Check that you have Node.js installed. In your terminal, type:
    ```sh
    node -v
    ```

## Ruby Installation

1. Download Ruby from [RubyInstaller](https://rubyinstaller.org) [Ruby+Devkit 3.3.X (x64) version].

2. Check that you have Ruby installed. In your terminal, type:
    ```sh
    ruby -v
    ```

## Rails Installation

1. To install Rails, type the following in your terminal:
    ```sh
    gem install rails
    ```

2. Check that you have Rails installed. In your terminal, type:
    ```sh
    rails -v
    ```

## Running the Website

1. Download all files from GitHub.

2. On your terminal, change your directory to the project directory:
    ```sh
    cd v2-gymchope-rails
    ```

3. Run the following commands to install dependencies, create, and populate the database:
    ```sh
    bundle install
    rails db:seed
    rails db:migrate
    ```

4. Start the backend server. In your terminal, type:
    ```sh
    rails s
    ```
   Then, navigate to 'http://localhost:3000' in your browser to check if it is set up properly. It should return a 'Backend is online...' value.

5. Open another tab in the terminal and change your directory to the frontend:
    ```sh
    cd frontend
    ```

6. Install npm dependencies. In your terminal, type:
    ```sh
    npm install axios
    ```

7. Start the frontend server. In your terminal, type:
    ```sh
    npm run dev
    ```
   Navigate to 'http://localhost:5174' in another tab in your browser to access the website.

## Editing the Project

1. Change the directory to the project directory:
    ```sh
    cd v2-gymchope-rails
    ```

2. Open the project in your code editor. In your terminal, type:
    ```sh
    code .
    ```