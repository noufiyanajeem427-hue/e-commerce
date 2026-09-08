// Converts a numeric amount to English words for official invoices

const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function convertGroup(num: number): string {
  let result = "";
  if (num >= 100) {
    result += ones[Math.floor(num / 100)] + " Hundred ";
    num %= 100;
  }
  if (num >= 20) {
    result += tens[Math.floor(num / 10)] + " ";
    num %= 10;
  }
  if (num > 0) {
    result += ones[num] + " ";
  }
  return result.trim();
}

export function numberToWords(amount: number, currency: string = "INR"): string {
  if (amount === 0) return "Zero Only";

  const num = Math.round(amount);
  if (isNaN(num)) return "";

  let words = "";

  if (currency === "INR") {
    // Indian numbering system: Crores, Lakhs, Thousands, Hundreds
    const crore = Math.floor(num / 10000000);
    const lakh = Math.floor((num % 10000000) / 100000);
    const thousand = Math.floor((num % 100000) / 1000);
    const remainder = num % 1000;

    if (crore > 0) words += convertGroup(crore) + " Crore ";
    if (lakh > 0) words += convertGroup(lakh) + " Lakh ";
    if (thousand > 0) words += convertGroup(thousand) + " Thousand ";
    if (remainder > 0) words += convertGroup(remainder) + " ";

    return `Indian Rupees ${words.trim()} Only`;
  } else {
    // Western system: Millions, Thousands, Hundreds
    const million = Math.floor(num / 1000000);
    const thousand = Math.floor((num % 1000000) / 1000);
    const remainder = num % 1000;

    if (million > 0) words += convertGroup(million) + " Million ";
    if (thousand > 0) words += convertGroup(thousand) + " Thousand ";
    if (remainder > 0) words += convertGroup(remainder) + " ";

    const prefix = currency === "USD" ? "US Dollars" : currency === "EUR" ? "Euros" : currency === "GBP" ? "British Pounds" : currency;
    return `${prefix} ${words.trim()} Only`;
  }
}
