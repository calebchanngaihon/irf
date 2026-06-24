// State Data
const statesData = {
    "1,1,1": {
        name: "Peak Agency",
        reality: "Organic, sustainable, high-equity institutional practice. The initiative is woven into everyday teaching, planning, and review. It survives leadership changes and external scrutiny because it is owned by the profession and anchored in student outcomes.",
        nextMove: "Protect the standard, review conditions regularly, and avoid initiative overload.",
        gap: "None"
    },
    "1,0,1": {
        name: "Surface Compliance",
        reality: "Teachers comply under surveillance, but the practice disappears when monitoring fades. The system has capacity and a mandate, but little authentic desire.",
        nextMove: "Focus on Step 2 — rebuild meaning and identity fit before tightening oversight.",
        gap: "Desire"
    },
    "0,1,1": {
        name: "Capacity Deficit",
        reality: "Staff care and feel obligated, but lack time or skill. Implementation becomes high-effort and chaotic, with stress and exhaustion spiking.",
        nextMove: "Prioritise Step 1 and Step 3 — clear time, then build skill in context.",
        gap: "Ability"
    },
    "1,1,0": {
        name: "Isolated Practice",
        reality: "Good practice exists in pockets, but students experience an equity lottery. Ability and Desire are strong in some classrooms, but Obligation is weak at system level.",
        nextMove: "Proceed to Step 4 — formalise the standard and embed it in workflow.",
        gap: "Obligation"
    },
    "1,0,0": {
        name: "Unused Infrastructure",
        reality: "The school has invested in tools or structures, but they sit idle. Capacity exists, but neither Desire nor Obligation is strong enough to activate the infrastructure.",
        nextMove: "Return to Step 2 and Step 4 — reconnect the tool to impact, then set a bounded expectation.",
        gap: "Desire, Obligation"
    },
    "0,1,0": {
        name: "Blocked Initiative",
        reality: "Teachers want to move and feel the need, but the system blocks them. Structures and expectations are too rigid or misaligned to allow the work.",
        nextMove: "Start with Step 1 — remove structural barriers and create a path from pilots to standards.",
        gap: "Ability, Obligation"
    },
    "0,0,1": {
        name: "Forced Compliance",
        reality: "The school mandates a practice without building ability or desire. Staff comply enough to meet the minimum requirement, but quality is low and anxiety is high.",
        nextMove: "Reset to Step 1 and Step 2 — reduce pressure, create space, and rebuild desire before insisting on fidelity.",
        gap: "Ability, Desire"
    },
    "0,0,0": {
        name: "Institutional Inertia",
        reality: "None of the forces are strong enough to move the initiative. The culture defaults to maintenance and drift. New ideas remain talk, not practice.",
        nextMove: "Begin with small structural shifts (Step 1), then gradually build desire and skill before formalising any obligation.",
        gap: "Ability, Desire, Obligation"
    }
};

// Expert Advisor Data
const expertAdvisors = {
    "Ability": {
        initials: "JS",
        image: "images/sweller.png",
        role: "John Sweller • Cognitive Load",
        quote: "Teacher exhaustion is organizational cognitive overload.",
        desc: "To resolve your Ability gap, prioritize Step 1: streamline administrative tasks and protect timetabled time before introducing new expectations."
    },
    "Desire": {
        initials: "TG",
        image: "images/guskey.png",
        role: "Thomas Guskey • Teacher Change",
        quote: "Belief in an initiative is a trailing indicator of student success.",
        desc: "To resolve your Desire gap, focus on Step 2: run small, well-supported pilots, gather local student evidence, and let success build motivation."
    },
    "Obligation": {
        initials: "RD",
        image: "images/dufour.png",
        role: "Richard DuFour • PLC pioneer",
        quote: "True accountability is built on peer-to-peer promises to students.",
        desc: "To resolve your Obligation gap, implement Step 4: frame requirement as a student entitlement, and embed review routines in department agendas."
    },
    "Ability, Desire": {
        initials: "RE",
        image: "images/elmore.png",
        role: "Richard Elmore • Instructional Core",
        quote: "Internal coherence must always precede external accountability.",
        desc: "Without skill or motivation, compliance mandates will backfire. Reset to Step 1 & 2: clear space and show early student impact."
    },
    "Ability, Obligation": {
        initials: "JS",
        image: "images/sweller.png",
        role: "John Sweller • Cognitive Load",
        quote: "Do not mandate what teachers have no working memory to execute.",
        desc: "Start with Step 1: remove structural barriers and simplify routines before trying to scale standard procedures."
    },
    "Desire, Obligation": {
        initials: "TG",
        image: "images/guskey.png",
        role: "Thomas Guskey • Model of Change",
        quote: "Demonstrate classroom outcomes first, then institutionalize.",
        desc: "Focus on Step 2 & 3: generate proof of concept to win heart and mind support before embedding it in policy requirements."
    },
    "Ability, Desire, Obligation": {
        initials: "RE",
        image: "images/elmore.png",
        role: "Richard Elmore • Coherence Theory",
        quote: "The culture defaults to the skills currently in the building.",
        desc: "You are experiencing Institutional Inertia. Begin with Step 1: quietly adjust structures to free up time, build competence, and scale slowly."
    },
    "None": {
        initials: "MF",
        image: "images/fullan.png",
        role: "Michael Fullan • Change Leadership",
        quote: "Coherence is a shared depth of understanding about the work.",
        desc: "Your school is at Peak Agency. Safeguard the standard, protect your staff from initiative overload, and sustain peer review cycles."
    }
};

// Scenario Presets
const scenarios = {
    "a": { a1: 4, a2: 3, d1: 1, d2: 2, o1: 5, o2: 4 }, // Surface Compliance
    "b": { a1: 1, a2: 1, d1: 4, d2: 5, o1: 4, o2: 3 }, // Capacity Deficit
    "c": { a1: 4, a2: 4, d1: 5, d2: 4, o1: 1, o2: 2 }, // Isolated Practice
    "reset": { a1: 0, a2: 0, d1: 0, d2: 0, o1: 0, o2: 0 }
};

// Threshold for a force to be considered "Present" (1)
const THRESHOLD = 3;

document.addEventListener('DOMContentLoaded', () => {
    // Values and visual fills
    const stateRefs = {
        competence: { input: document.getElementById('competence'), val: document.getElementById('val-competence'), fill: document.getElementById('fill-competence'), score: 0 },
        bandwidth: { input: document.getElementById('bandwidth'), val: document.getElementById('val-bandwidth'), fill: document.getElementById('fill-bandwidth'), score: 0 },
        epistemic: { input: document.getElementById('epistemic'), val: document.getElementById('val-epistemic'), fill: document.getElementById('fill-epistemic'), score: 0 },
        identity: { input: document.getElementById('identity'), val: document.getElementById('val-identity'), fill: document.getElementById('fill-identity'), score: 0 },
        requirement: { input: document.getElementById('requirement'), val: document.getElementById('val-requirement'), fill: document.getElementById('fill-requirement'), score: 0 },
        commitment: { input: document.getElementById('commitment'), val: document.getElementById('val-commitment'), fill: document.getElementById('fill-commitment'), score: 0 }
    };

    const statusEls = {
        ability: document.getElementById('status-ability'),
        desire: document.getElementById('status-desire'),
        obligation: document.getElementById('status-obligation')
    };

    // Diagnostic UI Elements
    const diagState = document.getElementById('diag-state');
    const diagCoord = document.getElementById('diag-coord');
    const diagGapAlert = document.getElementById('diag-gap-alert');
    const diagGap = document.getElementById('diag-gap');
    const diagReality = document.getElementById('diag-reality');
    const diagNextMove = document.getElementById('diag-next-move');

    // Radar Chart Setup
    const canvas = document.getElementById('radarChart');
    const ctx = canvas.getContext('2d');
    
    // Create a glowing radial gradient for the chart fill
    const gradient = ctx.createRadialGradient(
        canvas.width / 2 || 200, canvas.height / 2 || 200, 0,
        canvas.width / 2 || 200, canvas.height / 2 || 200, 150
    );
    gradient.addColorStop(0, 'rgba(255, 180, 123, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 180, 123, 0.05)');

    // Set Chart.js defaults for dark theme
    Chart.defaults.color = 'rgba(255, 255, 255, 0.5)';
    Chart.defaults.font.family = "'Inter', sans-serif";
    
    const radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Competence',
                'Bandwidth',
                'Belief in Impact',
                'Cultural Fit',
                'Requirement',
                'Commitment'
            ],
            datasets: [{
                label: 'Readiness Score',
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: gradient,
                borderColor: 'rgba(255, 180, 123, 0.8)',
                pointBackgroundColor: '#ffb47b',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ffb47b',
                borderWidth: 2,
                pointRadius: 4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 800,
                easing: 'easeOutQuart'
            },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
                    grid: { color: 'rgba(255, 255, 255, 0.05)', circular: true },
                    pointLabels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: { size: 11, weight: '500' }
                    },
                    ticks: { display: false, min: 0, max: 5, stepSize: 1 }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(20, 24, 32, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#b5b0a8',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}/5`;
                        }
                    }
                }
            }
        }
    });

    // Update Functions
    function updateVisuals() {
        const scores = {
            a1: stateRefs.competence.score,
            a2: stateRefs.bandwidth.score,
            d1: stateRefs.epistemic.score,
            d2: stateRefs.identity.score,
            o1: stateRefs.requirement.score,
            o2: stateRefs.commitment.score
        };

        // Update Text and Fill Widths for sliders
        Object.keys(stateRefs).forEach(key => {
            const ref = stateRefs[key];
            ref.val.textContent = ref.score;
            ref.fill.style.width = `${(ref.score / 5) * 100}%`;
            if (ref.input.value != ref.score) {
                ref.input.value = ref.score; // Sync input value if set externally
            }
        });

        const abilityState = (scores.a1 >= THRESHOLD && scores.a2 >= THRESHOLD) ? 1 : 0;
        const desireState = (scores.d1 >= THRESHOLD && scores.d2 >= THRESHOLD) ? 1 : 0;
        const obligationState = (scores.o1 >= THRESHOLD && scores.o2 >= THRESHOLD) ? 1 : 0;

        // Update Force Status Labels
        updateForceStatus(statusEls.ability, abilityState);
        updateForceStatus(statusEls.desire, desireState);
        updateForceStatus(statusEls.obligation, obligationState);

        // Update Chart
        radarChart.data.datasets[0].data = [
            scores.a1, scores.a2,
            scores.d1, scores.d2,
            scores.o1, scores.o2
        ];
        
        radarChart.update();
    }

    function updateContent() {
        const scores = {
            a1: stateRefs.competence.score,
            a2: stateRefs.bandwidth.score,
            d1: stateRefs.epistemic.score,
            d2: stateRefs.identity.score,
            o1: stateRefs.requirement.score,
            o2: stateRefs.commitment.score
        };

        const abilityState = (scores.a1 >= THRESHOLD && scores.a2 >= THRESHOLD) ? 1 : 0;
        const desireState = (scores.d1 >= THRESHOLD && scores.d2 >= THRESHOLD) ? 1 : 0;
        const obligationState = (scores.o1 >= THRESHOLD && scores.o2 >= THRESHOLD) ? 1 : 0;

        // Update Diagnostic UI
        const coordStr = `${abilityState},${desireState},${obligationState}`;
        const stateData = statesData[coordStr];

        diagState.textContent = stateData.name;
        diagCoord.textContent = `[${abilityState}, ${desireState}, ${obligationState}]`;
        diagReality.textContent = stateData.reality;
        diagNextMove.textContent = stateData.nextMove;
        
        if (stateData.gap === "None") {
            diagGapAlert.style.display = 'none';
        } else {
            diagGapAlert.style.display = 'block';
            diagGap.textContent = stateData.gap;
        }

        // Highlight active state card
        document.querySelectorAll('.state-card').forEach(card => {
            card.classList.remove('active-state');
            if (card.getAttribute('data-state') === `[${abilityState},${desireState},${obligationState}]`) {
                card.classList.add('active-state');
            }
        });

        // Update Expert Advisor Panel
        const expertEl = document.getElementById('expert-advisor');
        if (expertEl) {
            const advisor = expertAdvisors[stateData.gap] || expertAdvisors["None"];
            expertEl.innerHTML = `
                <div class="advisor-card">
                    <div class="advisor-avatar-badge">
                        <img src="${advisor.image}" alt="${advisor.role} profile illustration">
                    </div>
                    <div class="advisor-content">
                        <div class="advisor-role">${advisor.role}</div>
                        <div class="advisor-quote">"${advisor.quote}"</div>
                        <div class="advisor-desc">${advisor.desc}</div>
                    </div>
                </div>
            `;
        }
    }

    function updateForceStatus(el, state) {
        if (state === 1) {
            el.textContent = "Present";
            el.classList.add('active');
        } else {
            el.textContent = "Missing";
            el.classList.remove('active');
        }
    }

    // Input Event Handlers
    Object.keys(stateRefs).forEach(key => {
        const ref = stateRefs[key];
        
        // On drag: update only visuals
        ref.input.addEventListener('input', (e) => {
            ref.score = parseInt(e.target.value, 10);
            updateVisuals();
        });

        // On release: update text content
        ref.input.addEventListener('change', (e) => {
            updateContent();
        });
    });

    // Scenario Buttons
    document.querySelectorAll('.btn-scenario').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const scId = e.target.getAttribute('data-scenario') || e.target.closest('.btn-scenario').getAttribute('data-scenario');
            const data = scenarios[scId];
            
            if(data) {
                stateRefs.competence.score = data.a1;
                stateRefs.bandwidth.score = data.a2;
                stateRefs.epistemic.score = data.d1;
                stateRefs.identity.score = data.d2;
                stateRefs.requirement.score = data.o1;
                stateRefs.commitment.score = data.o2;
                
                updateVisuals();
                updateContent();
                
                // Scroll to diagnostic engine
                document.getElementById('diagnostic-engine').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Theory Accordion Listeners
    document.querySelectorAll('.theory-anchor-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const anchor = e.target.closest('.theory-anchor');
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            
            // Close other rollout accordions
            document.querySelectorAll('.theory-anchor').forEach(el => {
                if (el !== anchor) {
                    el.classList.remove('active');
                    el.querySelector('.theory-anchor-btn').setAttribute('aria-expanded', 'false');
                }
            });

            anchor.classList.toggle('active');
            btn.setAttribute('aria-expanded', !isExpanded);
        });
    });

    // Initial render
    updateVisuals();
    updateContent();
});
