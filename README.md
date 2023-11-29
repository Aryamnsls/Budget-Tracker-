# Budget-Tracker- ImPlementation

Creating a budget tracker website with HTML, CSS, JS, and MongoDB involves several steps. Below is a simplified step-by-step implementation guide. Note that this is a basic example, and in a real-world scenario, you'd need to consider security, user authentication, and more.

### Step 1: Setup MongoDB

1. **Install MongoDB:**
   Download and install MongoDB from the official website: https://www.mongodb.com/try/download/community

2. **Start MongoDB Server:**
   Run MongoDB server on your machine. You can use the following command:
   ```bash
   mongod
   ```

### Step 2: Create HTML Structure

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Budget Tracker</title>
</head>
<body>
    <div class="container">
        <h1>Budget Tracker</h1>
        <form id="expenseForm">
            <label for="expenseName">Expense:</label>
            <input type="text" id="expenseName" required>

            <label for="amount">Amount:</label>
            <input type="number" id="amount" required>

            <button type="button" onclick="addExpense()">Add Expense</button>
        </form>

        <div id="expenseList">
            <!-- Expense items will be displayed here -->
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>
```

### Step 3: Style with CSS

```css
/* styles.css */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 5px;
}

input, button {
    margin-bottom: 10px;
    padding: 8px;
}

button {
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 4px;
}
```

### Step 4: Implement JavaScript

```js
// app.js
document.addEventListener("DOMContentLoaded", function() {
    loadExpenses();
});

function addExpense() {
    const expenseName = document.getElementById("expenseName").value;
    const amount = document.getElementById("amount").value;

    // Validate input
    if (expenseName && amount) {
        // Send data to MongoDB (Assuming you have an API endpoint to handle this)
        fetch("/api/addExpense", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ expenseName, amount }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadExpenses();
            } else {
                alert("Failed to add expense. Please try again.");
            }
        });
    } else {
        alert("Please enter both expense name and amount.");
    }
}

function loadExpenses() {
    // Fetch expenses from MongoDB (Assuming you have an API endpoint to handle this)
    fetch("/api/getExpenses")
        .then(response => response.json())
        .then(data => {
            const expenseList = document.getElementById("expenseList");
            expenseList.innerHTML = "";

            data.forEach(expense => {
                const expenseItem = document.createElement("div");
                expenseItem.innerText = `${expense.expenseName}: $${expense.amount}`;
                expenseList.appendChild(expenseItem);
            });
        });
}
```

### Step 5: Set up Node.js Server with Express

1. Install Node.js and npm: https://nodejs.org/
2. Create `package.json`:

```bash
npm init -y
```

3. Install Express and body-parser:

```bash
npm install express body-parser mongoose
```

4. Create `server.js`:

```js
// server.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/budgetTracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema for expenses
const expenseSchema = new mongoose.Schema({
    expenseName: String,
    amount: Number,
});

const Expense = mongoose.model("Expense", expenseSchema);

app.use(bodyParser.json());

// API endpoint to add an expense
app.post("/api/addExpense", async (req, res) => {
    const { expenseName, amount } = req.body;

    try {
        await Expense.create({ expenseName, amount });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// API endpoint to get all expenses
app.get("/api/getExpenses", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

### Step 6: Run Your Application

1. Start your MongoDB server.
2. Run your Node.js server:

```bash
node server.js
```

3. Open your browser and go to `http://localhost:3000` to see the budget tracker in action.

This is a simplified example, and in a real-world scenario, you would need to implement user authentication, validation, error handling, and other security considerations.
