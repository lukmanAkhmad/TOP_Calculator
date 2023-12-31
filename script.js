let numberA = '';
let numberB = '';
let harusResetLayar = false;
let operasiSaatIni = null;

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const samadenganBtn = document.querySelector('#equalsBtn');
const hapusSemuaBtn = document.querySelector('#clearBtn');
const hapusBtn = document.querySelector('#deleteBtn');
const titikBtn = document.querySelector('#pointBtn');
const operasiLayarTerakhir = document.querySelector('#operasiLayarTerakhir');
const operasiLayarSekarang = document.querySelector('#operasiLayarSekarang');

samadenganBtn.addEventListener('click', evaluate);
hapusSemuaBtn.addEventListener('click', hapusSemua)
titikBtn.addEventListener('click', masukanTitik);
hapusBtn.addEventListener('click', hapusSatuNumber);
window.addEventListener('keydown', inputDenganKeyboard);

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        masukanNumberKeLayar(button.textContent);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setOperation(button.textContent);
    });
});

function masukanNumberKeLayar(number) {
    if (operasiLayarSekarang.textContent === '0' || harusResetLayar) {
        resetLayar();
    };
    operasiLayarSekarang.textContent += number;
};

function resetLayar() {
    operasiLayarSekarang.textContent = '';
    harusResetLayar = false;
};

function setOperation(operator) {
    if (operasiSaatIni !== null) {
        evaluate();
    };
    numberA = operasiLayarSekarang.textContent;
    operasiSaatIni = operator;
    operasiLayarTerakhir.textContent = `${numberA} ${operasiSaatIni}`;
    harusResetLayar = true;
};

function evaluate() {
    if (operasiSaatIni === null || harusResetLayar) return;
    if (operasiSaatIni === '/' && operasiLayarSekarang.textContent === '0') {
        alert("Anda tidak dapat membagi dengan angka 0")
        return;
    };
    numberB = operasiLayarSekarang.textContent;
    operasiLayarSekarang.textContent = roundResult(
        operate(operasiSaatIni, numberA, numberB)
    );
    operasiLayarTerakhir.textContent = `${numberA} ${operasiSaatIni} ${numberB} =`;
    operasiSaatIni = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;    // You should round answers with long decimals so that they don’t overflow the screen.
};

function hapusSemua() {
    operasiLayarSekarang.textContent = '0';
    operasiLayarTerakhir.textContent = '';
    numberA = '';
    numberB = '';
    operasiSaatIni = null;
};

function masukanTitik() {
    if (harusResetLayar) {
        resetLayar();
    };
    if (operasiLayarSekarang.textContent === '') {
        operasiLayarSekarang.textContent = '0';
    };
    if (operasiLayarSekarang.textContent.includes('.')) {
        return;
    };
    operasiLayarSekarang.textContent += '.';
};

function hapusSatuNumber() {
    operasiLayarSekarang.textContent = operasiLayarSekarang.textContent
        .toString()
        .slice(0, -1);
}

function inputDenganKeyboard(e) {
    if (e.key >= 0 && e.key <= 9) masukanNumberKeLayar(e.key);
    if (e.key === '.') masukanTitik();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') hapusSatuNumber();
    if (e.key === 'Escape') hapusSemua();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperation(convertOperator(e.key));
    };
};

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '+') return '+';
    if (keyboardOperator === '-') return '-';
    if (keyboardOperator === '*') return 'x';
    if (keyboardOperator === '/') return '/';
}

function tambah(a, b) {
    return a + b;
};
function kurang(a, b) {
    return a - b;
};
function kali(a, b) {
    return a * b;
};
function bagi(a, b) {
    return a / b;
};

function operate(operator, numberA, numberB) {
    numberA = Number(numberA);
    numberB = Number(numberB);
    switch (operator) {
        case '+':
            return tambah(numberA, numberB);
        case '-':
            return kurang(numberA, numberB);
        case 'x':
            return kali(numberA, numberB);
        case '/':
            if (numberB === 0) {
                return null;
            } else {
                return bagi(numberA, numberB)
            }
        default:
            return null;
    }
};