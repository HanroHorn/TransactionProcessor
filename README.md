# Customer Transaction Processor

Implemented by Hanro Horn
Link to GitHub repo: https://github.com/HanroHorn/TransactionProcessor

A React application to process and validate customer transaction files.

## About the application

Technologies Used
- React: A JavaScript library for building user interfaces.
- TypeScript: Typed JavaScript at scale.
- Vite: Fast and modern development server and build tool.
- Jest: Testing framework.
- React-Bootstrap: Bootstrap components built with React.
- PapaParse: Parse CSV data.
- Fast XML Parser: Parse XML data.

## Assumptions & Decisions

I made the following assumptions and decisions based on feedback from my questions and professional experience.

#### Overview
I developed this application with simplicity in mind. There are a lot of nice to have features which I would have liked to add but my focus was on showcasing not only my skills as a developer, but also the ability not to overthink a solution and to start with a MVP project and enhance it as and when needed.

#### File Upload
- Users should be able to upload multiple files in order to validate the transactions in bulk.
- Since the document format is MT940 only xml and csv files are accepted.
- I added some basic file structure validation which can be enhanced further in the future.
- I used the following two npm-packages to parse content from the files
- Papaparse: A popular CSV parsing tool with +2 million weekly downloads. The last publish was 2 years ago but it has no dependencies and is quite stable. In a real world project I would be much more thorough when searching for the right package. For this assessment application I find that this package well suited. Link to package: https://www.npmjs.com/package/papaparse
- fast-xml-parser: A very popular XML parsing, validating and building tool with +23 million weekly downloads. It's well maintained with a wide range of functionality. It suited my needs for this assessment application perfectly. Link to package: https://www.npmjs.com/package/fast-xml-parser

#### Transaction Validation
- I focused on the 2 mandatory validations mentioned in the assessment spec but felt that there were some small but valuable validations which I could add to improve the overall robustness of the validation process.
- The IBAN validation in its current form is quite basic and focused on Dutch bank accounts, but it can always be enhanced to cater for a wider range of countries.
- I added an addional layer of validation to the End Balance check. If the Start Balance and Mutation values aren't valid, then there is no need to was resources on computing a value we already know won't be valid.

#### Reporting
- I kept it simple with the format of the validation report and chose CSV as this is a business-friendly format. It's small in file size and easy to import into Excel for reporting.
- A future enhancement could be to generate an excel report directly from the interface.

#### Testing
- I added unit testing for all the helper functions as these functions are the backbone of all the component's logic.
- I added one component unit test to show the importance of unit testing components, but I unfortunately did not have enough time to add enough unit / snapshot testing for all the frontend components.

#### UI
- Even though there are no APIs or expensive computations in this assessment application, I still added loaders because I developed this application with a real world application mindset.
- I made use of react-bootstrap and react-icons as these are two very useful styling packages to use when you want a neat out-of-the box front end styling solution in the least amount of time. 

#### General
- I used Vite to create this react application and below I will list a few reasons why.
- Creating a new react app is quite fast and straight forward.
- Vite has out of the box support for Typscript, which is an important part of this application
- It comes with built-in support for frameworks like React which helps in development and configuration management
- Since the scope of this application is quite small, it obviously doesn't make use of all the optimizations provided by Vite, but it makes creating a new project fast and efficient. 

## Prerequisites

Ensure you have the following installed:
- Git (git-scm.com)
- NodeJS (https://nodejs.org/) (version 18.18.0 or higher)

## Getting Started

### 1. Clone the Repository

Open a command prompt (on Windows) or a terminal (on Mac/Linux)
git clone https://github.com/HanroHorn/TransactionProcessor.git

### 2. Setting up the app
cd TransactionProcessor
npm install

### 3. Running the app
npm run dev
Navigate to http://localhost:5173 in your browser

### 4. Running the tests
npm test

### 5. Build for production
npm run build

### 6. Preview the production build
npm run preview
