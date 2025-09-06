document.addEventListener('DOMContentLoaded', function () {
    const wrapLabels = (labels) => {
        return labels.map(label => {
            if (label.length > 16) {
                const words = label.split(' ');
                const lines = [];
                let currentLine = '';
                words.forEach(word => {
                    if ((currentLine + word).length <= 16) {
                        currentLine += (currentLine === '' ? '' : ' ') + word;
                    } else {
                        lines.push(currentLine);
                        currentLine = word;
                    }
                });
                if (currentLine !== '') lines.push(currentLine);
                return lines;
            }
            return label;
        });
    };

    const commonTooltipConfig = {
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        const item = tooltipItems[0];
                        let label = item.chart.data.labels[item.dataIndex];
                        return Array.isArray(label) ? label.join(' ') : label;
                    }
                }
            }
        }
    };

    const skillsData = {
        labels: wrapLabels([
            'Problem-Solving', 'Communication', 'Project Management',
            'Stakeholder Management', 'Administration', 'Budget Management'
        ]),
        datasets: [{
            label: 'Proficiency Score',
            data: [90, 95, 85, 90, 80, 75],
            fill: true,
            backgroundColor: 'rgba(107, 153, 255, 0.2)',
            borderColor: '#6B99FF',
            pointBackgroundColor: '#6B99FF',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#6B99FF'
        }]
    };

    const skillsRadarCtx = document.getElementById('skillsRadarChart').getContext('2d');
    new Chart(skillsRadarCtx, {
        type: 'radar',
        data: skillsData,
        options: {
            ...commonTooltipConfig,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { display: false },
                    suggestedMin: 50,
                    suggestedMax: 100,
                    ticks: { display: false },
                    pointLabels: { font: { size: 14 } }
                }
            }
        }
    });

    const careerData = {
        labels: wrapLabels([
            'Teacher (Biology) - Education Sector',
            'Administration & Operations',
            'Digital Ambassador - Community & Public Service',
            'Assistant Manager - Education Sector',
            'Constituency Manager - Community & Public Service'
        ]),
        datasets: [{
            label: 'Years in Role',
            data: [11, 5.5, 2, 0.75, 1.5],
            backgroundColor: ['#FF6B6B', '#FFD933', '#6BFFB8', '#6B99FF', '#FF6B6B'],
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1
        }]
    };

    const careerChartCtx = document.getElementById('careerChart').getContext('2d');
    new Chart(careerChartCtx, {
        type: 'bar',
        data: careerData,
        options: {
            ...commonTooltipConfig,
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: { beginAtZero: true, title: { display: true, text: 'Years' } },
                y: { ticks: { font: { size: 14 } } }
            }
        }
    });
});