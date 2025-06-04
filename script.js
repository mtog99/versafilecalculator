function calculateROI() {
    // --- Get User Inputs ---
    const monthlyDocuments = parseFloat(document.getElementById('monthlyDocuments').value);
    const timePerDocumentMinutes = parseFloat(document.getElementById('timePerDocument').value);
    const hourlyCost = parseFloat(document.getElementById('hourlyCost').value);
    const manualErrorRate = parseFloat(document.getElementById('manualErrorRate').value) / 100; // Convert to decimal
    const auditPrepTimeHours = parseFloat(document.getElementById('auditPrepTime').value);
    const annualStorageCost = parseFloat(document.getElementById('annualStorageCost').value);
    const annualLegacyIntegrationCost = parseFloat(document.getElementById('annualLegacyIntegrationCost').value);
    const implementationCost = parseFloat(document.getElementById('implementationCost').value);
    const annualSubscriptionCost = parseFloat(document.getElementById('annualSubscriptionCost').value);

    // --- Docuflow Impact Assumptions (Fixed for this simple version) ---
    const automationEfficiencyGain = 0.70; // 70% reduction in time
    const errorRateReduction = 0.80; // 80% reduction in manual errors
    const auditPrepTimeReduction = 0.50; // 50% reduction in audit prep time
    const storageOptimization = 0.30; // 30% reduction in storage costs
    const integrationConsolidationSavings = 0.40; // 40% reduction in legacy integration costs

    // --- Calculations ---

    // 1. Current Annual Manual Processing Cost
    const timePerDocumentHours = timePerDocumentMinutes / 60;
    const currentAnnualManualProcessingCost = (monthlyDocuments * timePerDocumentHours * hourlyCost * 12);

    // 2. Automated Processing Labor Savings (Annual)
    const laborSavings = currentAnnualManualProcessingCost * automationEfficiencyGain;

    // 3. Error Reduction Savings (Annual) - Simplified: directly reduces a portion of manual processing cost
    const errorSavings = (currentAnnualManualProcessingCost * manualErrorRate) * errorRateReduction;

    // 4. Compliance Cost Reduction (Annual) - Assuming 1 audit per year for simplicity
    const complianceSavings = (auditPrepTimeHours * hourlyCost) * auditPrepTimeReduction;

    // 5. Storage Cost Reduction (Annual)
    const storageSavings = annualStorageCost * storageOptimization;

    // 6. Integration & Maintenance Savings (Annual)
    const integrationSavings = annualLegacyIntegrationCost * integrationConsolidationSavings;

    // 7. Total Annual Savings
    const totalAnnualSavings = laborSavings + errorSavings + complianceSavings + storageSavings + integrationSavings;

    // 8. Payback Period (Months)
    let paybackPeriod = 0;
    if (totalAnnualSavings > 0) {
        paybackPeriod = (implementationCost + annualSubscriptionCost) / (totalAnnualSavings / 12);
    } else {
        paybackPeriod = Infinity; // Or a very large number if no savings
    }

    // 9. 3-Year ROI Percentage
    const totalInvestment3Years = implementationCost + (annualSubscriptionCost * 3);
    const totalSavings3Years = totalAnnualSavings * 3;
    let roiPercentage = 0;
    if (totalInvestment3Years > 0) {
        roiPercentage = ((totalSavings3Years - totalInvestment3Years) / totalInvestment3Years) * 100;
    } else {
        roiPercentage = Infinity; // Or 0 if no investment
    }


    // --- Display Results ---
    document.getElementById('laborSavings').textContent = `$${laborSavings.toFixed(2)}`;
    document.getElementById('errorSavings').textContent = `$${errorSavings.toFixed(2)}`;
    document.getElementById('complianceSavings').textContent = `$${complianceSavings.toFixed(2)}`;
    document.getElementById('storageSavings').textContent = `$${storageSavings.toFixed(2)}`;
    document.getElementById('integrationSavings').textContent = `$${integrationSavings.toFixed(2)}`;
    document.getElementById('totalAnnualSavings').textContent = `$${totalAnnualSavings.toFixed(2)}`;

    document.getElementById('paybackPeriod').textContent = `${paybackPeriod.toFixed(1)} months`;
    document.getElementById('roiPercentage').textContent = `${roiPercentage.toFixed(1)}%`;

    // Basic validation to prevent negative outputs if savings are less than costs or inputs are zero
    if (paybackPeriod < 0 || isNaN(paybackPeriod) || !isFinite(paybackPeriod)) {
        document.getElementById('paybackPeriod').textContent = "N/A (No positive ROI)";
    }
    if (roiPercentage < 0 || isNaN(roiPercentage) || !isFinite(roiPercentage)) {
        document.getElementById('roiPercentage').textContent = "Negative ROI";
    }
}

// Call calculateROI on page load to show initial values
window.onload = calculateROI;