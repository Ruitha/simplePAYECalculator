const onNssfNo = document.querySelectorAll("[data-option='to-disable']");
const radioOptions = document.querySelectorAll("[data-option]");
const payAndBenefitsInputs = document.querySelectorAll("[data-num]");
const basicSalaryInput = document.getElementById("basic-salary");
const benefitsInput = document.getElementById("benefits");
const calculateBtn = document.querySelector("#calculateBtn");
const outputSection = document.querySelector(".output");
const tableResultFields = document.querySelectorAll("td");

let kshFormat = Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KSH",
});
outputSection.classList.add("nothing");

const formatIfIsNan = (elem) => {
  if (isNaN(elem)) {
    elem = kshFormat.format(elem);
  }
};

const waitTime = (timeoutSecs) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeoutSecs * 1000);
    clearTimeout();
  });
};

function resultTable(
  b_salary,
  _benefits,
  pensionConribution,
  incomeAfterPension,
  benefitsInKind,
  taxableIncome,
  taxOnTIncome,
  personalRelief,
  taxNetOffRelief,
  paye,
  ahlDeduction,
  chargeableIncome,
  nhifContribution,
  netPay
) {
  outputSection.innerHTML = `
    <table id="results-t">
        <tr>
            <th>Income Before Pension Deduction</th>
            <td>${kshFormat.format(b_salary ?? 0)}</td>
        </tr>
        <tr>
            <th>Deductible NSSF Pension Contribution</th>
            <td>${kshFormat.format(pensionConribution ?? 0)}</td>
        </tr>
        <tr>
            <th>Income After Pension Deductions</th>
            <td>${kshFormat.format(incomeAfterPension ?? 0)}</td>
        </tr>
        <tr>
            <th>Benefits in Kind</th>
            <td>${kshFormat.format(benefitsInKind ?? 0)}</td>
        </tr>
        <tr>
            <th>Taxable Income</th>
            <td>${kshFormat.format(taxableIncome ?? 0)}</td>
        </tr>
        <tr>
            <th>Tax on Taxable Income</th>
            <td>${kshFormat.format(taxOnTIncome ?? 0)}</td>
        </tr>
        <tr>
            <th>Personal Relief</th>
            <td>${kshFormat.format(personalRelief ?? 0)}</td>
        </tr>
        <tr>
            <th>Tax Net Off Relief</th>
            <td>${kshFormat.format(taxNetOffRelief ?? 0)}</td>
        </tr>
        <tr>
            <th>PAYE</th>
            <td>${kshFormat.format(paye ?? 0)}</td>
        </tr>
        <tr>
            <th>Affordable Housing</th>
            <td>${kshFormat.format(ahlDeduction ?? 0 )}</td>
        </tr>
        <tr>
            <th>Chargeable Income</th>
            <td>${kshFormat.format(chargeableIncome ?? 0)}</td>
        </tr>
        <tr>
            <th>NHIF Contribution</th>
            <td>${kshFormat.format(nhifContribution ?? 0)}</td>
        </tr>
        <tr id="netpay">
            <th>Net Pay</th>
            <td>${kshFormat.format(netPay ?? 0)}</td>
        </tr>
    </table>
  `;
}

const radioChecked = () => {
  let defaultChecked = [];
  radioOptions.forEach((r_btn) => {
    if (r_btn.checked) {
      if (r_btn.value == "nssf_no") {
        return;
      } else {
        defaultChecked.push(r_btn.value);
      }
    }
  });
  return defaultChecked;
};

const getPayAndBenefits = () => {
  let inputs = [];

  for (let salaryBenInp of payAndBenefitsInputs) {
    if (salaryBenInp.value === " ") {
      alert("Cannot calculate Empty values");
      return [];
    }
    inputs.push(parseFloat(salaryBenInp.value));
  }
  return inputs;
};

// Calculate NSSF (Effective February 2024)
const evaluateNewNssfPension = (b_salary) => {
  let pensionContribution = 0;
  const tier1Limit = 7000;
  const tier2Limit = 36000;
  const tierRate = 0.06; // 6% contribution rate

  // Calculate Tier I contribution
  if (b_salary <= tier1Limit) {
    pensionContribution = b_salary * tierRate;
  } else {
    pensionContribution = tier1Limit * tierRate;
    // Calculate Tier II contribution
    if (b_salary <= tier2Limit) {
      pensionContribution += (b_salary - tier1Limit) * tierRate;
    } else {
      pensionContribution += (tier2Limit - tier1Limit) * tierRate;
    }
  }

  // Ensure the contribution does not exceed the maximum allowed contribution
  const maxContribution = 2160;
  pensionContribution = Math.min(pensionContribution, maxContribution);

  return pensionContribution;
};

// Calculate NHIF 
function evaluateNhif(b_salary) {
  let nhifContribution;
  if (b_salary >= 0) {
    if (b_salary >= 0 && b_salary <= 5999) {
      nhifContribution = 150;
    } else if (b_salary >= 6000 && b_salary <= 7999) {
      nhifContribution = 300;
    } else if (b_salary >= 8000 && b_salary <= 11999) {
      nhifContribution = 400;
    } else if (b_salary >= 12000 && b_salary <= 14999) {
      nhifContribution = 500;
    } else if (b_salary >= 15000 && b_salary <= 19999) {
      nhifContribution = 600;
    } else if (b_salary >= 20000 && b_salary <= 24999) {
      nhifContribution = 750;
    } else if (b_salary >= 25000 && b_salary <= 29999) {
      nhifContribution = 850;
    } else if (b_salary >= 30000 && b_salary <= 34999) {
      nhifContribution = 900;
    } else if (b_salary >= 35000 && b_salary <= 39999) {
      nhifContribution = 950;
    } else if (b_salary >= 40000 && b_salary <= 44999) {
      nhifContribution = 1000;
    } else if (b_salary >= 45000 && b_salary <= 49999) {
      nhifContribution = 1100;
    } else if (b_salary >= 50000 && b_salary <= 59999) {
      nhifContribution = 1200;
    } else if (b_salary >= 60000 && b_salary <= 69999) {
      nhifContribution = 1300;
    } else if (b_salary >= 70000 && b_salary <= 79999) {
      nhifContribution = 1400;
    } else if (b_salary >= 80000 && b_salary <= 89999) {
      nhifContribution = 1500;
    } else if (b_salary >= 90000 && b_salary <= 99999) {
      nhifContribution = 1600;
    } else if (b_salary >= 100000) {
      nhifContribution = 1700;
    } else {
      nhifContribution = 0.0;
    }
  }
  return nhifContribution;
}

// Calculate PAYE 
const evaluateIncomeTax = (b_salary) => {
  let bs_taxed = 0;

  if (b_salary <= 24000) {
    bs_taxed = b_salary * 0.10;
  } else if (b_salary <= 32333) {
    bs_taxed = (24000 * 0.10) + ((b_salary - 24000) * 0.25);
  } else if (b_salary <= 500000) {
    bs_taxed = (24000 * 0.10) + (8333 * 0.25) + ((b_salary - 32333) * 0.30);
  } else if (b_salary <= 800000) {
    bs_taxed = (24000 * 0.10) + (8333 * 0.25) + (467667 * 0.30) + ((b_salary - 500000) * 0.325);
  } else {
    bs_taxed = (24000 * 0.10) + (8333 * 0.25) + (467667 * 0.30) + (300000 * 0.325) + ((b_salary - 800000) * 0.35);
  }

  return bs_taxed;
};

// Calculate AHL Contributions
const evaluateAffordableHousingLevy = (b_salary) => {
  const levyRate = 0.015; // 1.5% contribution rate for Affordable Housing Levy
  return b_salary * levyRate;
};

// Computing all Deductions 
const compileResultsDisplay = () => {
  let [b_salary, benefits] = getPayAndBenefits();

  if (b_salary === undefined || benefits === undefined) return;

  let personalRelief = 2400;
  // let defaultChecked = radioChecked();

  let chargeableIncome = b_salary + benefits;

  let pensionConribution = evaluateNewNssfPension(b_salary);
  let incomeAfterPension = chargeableIncome - pensionConribution;

  let benefitsInKind = benefits * 0.3;
  let taxableIncome = incomeAfterPension + benefitsInKind;

  let taxOnTIncome = evaluateIncomeTax(taxableIncome);
  let taxNetOffRelief = taxOnTIncome - personalRelief;
  let paye = Math.max(taxNetOffRelief, 0);

  // Calculate AHL
  let ahlDeduction = evaluateAffordableHousingLevy(b_salary);
  
  let chargeableIncomeAfterAHL = chargeableIncome - ahlDeduction;

  let nhifContribution = evaluateNhif(b_salary);

  let netPay = chargeableIncomeAfterAHL - (paye + nhifContribution );

  resultTable(
    b_salary,
    benefits,
    pensionConribution,
    incomeAfterPension,
    benefitsInKind,
    taxableIncome,
    taxOnTIncome,
    personalRelief,
    taxNetOffRelief,
    paye,
    ahlDeduction,
    chargeableIncomeAfterAHL,
    nhifContribution,
    netPay
  );

  outputSection.classList.remove("nothing");
};

calculateBtn.addEventListener("click", (event) => {
  event.preventDefault();  // prevent form submission
  compileResultsDisplay();
});
