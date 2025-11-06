function maximizeROI(budget, projects) {
  const n = projects.length;
  const dp = Array.from({ length: n + 1 }, () => Array(budget + 1).fill(0));

  // Build DP table
  for (let i = 1; i <= n; i++) {
    const { cost, roi } = projects[i - 1];
    for (let b = 0; b <= budget; b++) {
      if (cost <= b) {
        dp[i][b] = Math.max(dp[i - 1][b], dp[i - 1][b - cost] + roi);
      } else {
        dp[i][b] = dp[i - 1][b];
      }
    }
  }

  // Backtrack to find selected projects
  let maxROI = dp[n][budget];
  let selectedProjects = [];
  let remainingBudget = budget;

  for (let i = n; i > 0 && remainingBudget >= 0; i--) {
    if (dp[i][remainingBudget] !== dp[i - 1][remainingBudget]) {
      selectedProjects.push(projects[i - 1].name);
      remainingBudget -= projects[i - 1].cost;
    }
  }

  return {
    maxROI,
    selectedProjects: selectedProjects.reverse()
  };
}


const budget1 = 10000;
const projects1 = [
  { name: "AI Chatbot", cost: 5000, roi: 8000 },
  { name: "Mobile App", cost: 4000, roi: 6000 },
  { name: "Website Redesign", cost: 3000, roi: 4000 },
  { name: "Cloud Migration", cost: 6000, roi: 9000 }
];
console.log(maximizeROI(budget1, projects1));

const budget2 = 15000;
const projects2 = [
  { name: "CRM System", cost: 8000, roi: 12000 },
  { name: "Analytics Tool", cost: 5000, roi: 7000 },
  { name: "Security Upgrade", cost: 7000, roi: 10000 },
  { name: "API Development", cost: 4000, roi: 5000 }
];
console.log(maximizeROI(budget2, projects2));
