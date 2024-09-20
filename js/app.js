// Get Elements
const balance = document.getElementById('balance');
const incomeDisplay = document.getElementById('income');
const expenseDisplay = document.getElementById('expense');
const transactionList = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');

// Variables
let transactions = [];

// Add Transaction
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const description = descriptionInput.value.trim();
    const amount = +amountInput.value.trim(); // Convert string to number

    if (description === '' || amount === '') {
        alert('Por favor, preencha todos os campos');
        return;
    }

    const transaction = {
        id: generateID(),
        description,
        amount
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    
    descriptionInput.value = '';
    amountInput.value = '';
});

// Generate Unique ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Add Transaction to DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'expense' : 'income');
    item.innerHTML = `${transaction.description} <span>${sign} R$ ${Math.abs(transaction.amount)}</span>
                      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;
    transactionList.appendChild(item);
}

// Update Balance, Income, and Expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `R$ ${total}`;
    incomeDisplay.innerText = `R$ ${income}`;
    expenseDisplay.innerText = `R$ ${expense}`;
}

// Remove Transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

// Initialize the App
function init() {
    transactionList.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();
