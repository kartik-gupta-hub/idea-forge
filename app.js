// js/app.js
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const industrySelect = document.getElementById('industry-select');
    const terminalBody = document.getElementById('terminal-body');
    const customSelect = document.querySelector('[data-select]');

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ideasDB = {
        fintech: [
            {
                name: 'LedgerPulse AI',
                tagline: 'A finance command center that predicts cash-flow stress before founders feel it.',
                market: 'High demand from bootstrapped SaaS teams and fractional CFOs managing volatile runway.',
                monetization: 'Seat-based SaaS with premium bank integrations and forecasting packs.',
                audience: 'Seed-stage founders, finance operators, startup studios.',
                stack: 'Open banking APIs, anomaly detection, React dashboard, Node event pipeline.'
            },
            {
                name: 'TrustRail Escrow',
                tagline: 'Milestone escrow for remote teams, verified through shipped work and source-control signals.',
                market: 'Growing freelance and agency spend needs lower-dispute payment infrastructure.',
                monetization: 'Transaction fee plus pro workflow templates for agencies.',
                audience: 'Freelancers, boutique dev shops, distributed product teams.',
                stack: 'Smart contracts, GitHub webhooks, Stripe Connect, risk scoring models.'
            }
        ],
        healthtech: [
            {
                name: 'Vitalsphere',
                tagline: 'Predictive wellness alerts built from wearables, symptom journals, and lifestyle patterns.',
                market: 'Consumer health platforms are hungry for proactive, low-friction monitoring tools.',
                monetization: 'B2B2C licensing to clinics, insurers, and employee wellness programs.',
                audience: 'Preventive care teams, chronic-care patients, wellness providers.',
                stack: 'Wearable APIs, time-series ML, privacy-first data vault, clinician portal.'
            },
            {
                name: 'CalmLab VR',
                tagline: 'Generative exposure therapy spaces tuned to rare phobias and therapist protocols.',
                market: 'Mental health providers need scalable digital therapies with measurable adherence.',
                monetization: 'Clinic subscriptions with per-session content generation credits.',
                audience: 'Therapists, telehealth platforms, specialized anxiety clinics.',
                stack: 'WebXR, LLM session plans, biofeedback inputs, secure patient records.'
            }
        ],
        cleantech: [
            {
                name: 'GridNest',
                tagline: 'A neighborhood marketplace for routing excess solar energy where it is needed most.',
                market: 'Distributed energy adoption is rising faster than local optimization software.',
                monetization: 'Marketplace take rate plus utility-grade analytics subscriptions.',
                audience: 'Solar households, property managers, local utility pilots.',
                stack: 'IoT meters, demand prediction, blockchain ledger, mobile energy wallet.'
            },
            {
                name: 'CanopyFleet',
                tagline: 'Drone-based reforestation intelligence for mapping, seeding, and survival tracking.',
                market: 'Carbon projects need better proof of restoration outcomes and lower field costs.',
                monetization: 'Per-hectare monitoring contracts and carbon verification reports.',
                audience: 'Reforestation NGOs, carbon funds, land restoration operators.',
                stack: 'Computer vision, drone telemetry, geospatial database, satellite overlays.'
            }
        ],
        edtech: [
            {
                name: 'DebateGhost',
                tagline: 'A historical persona simulator that teaches rhetoric by arguing back in real time.',
                market: 'Schools want active-learning tools that make humanities feel interactive again.',
                monetization: 'Institution licenses with curriculum packs by grade level.',
                audience: 'High schools, debate clubs, online learning platforms.',
                stack: 'LLM role agents, speech scoring, moderation filters, classroom analytics.'
            },
            {
                name: 'SignFlow Coach',
                tagline: 'Real-time sign language feedback using phone cameras and bite-sized practice loops.',
                market: 'Accessibility education is expanding, but quality feedback remains scarce.',
                monetization: 'Freemium mobile app with certification and enterprise training tiers.',
                audience: 'Students, families, customer-support teams, accessibility programs.',
                stack: 'Pose estimation, mobile vision models, gamified lessons, progress analytics.'
            }
        ],
        saas: [
            {
                name: 'QA Autopilot',
                tagline: 'An agent that watches real user sessions and writes reliable regression tests from them.',
                market: 'Product teams ship faster than QA coverage can keep up.',
                monetization: 'Usage-based SaaS priced by recorded sessions and generated tests.',
                audience: 'Engineering teams, QA leads, growth-stage SaaS companies.',
                stack: 'Session replay, Playwright/Cypress generation, diff analysis, CI integrations.'
            },
            {
                name: 'SignalDesk',
                tagline: 'A private operating system for detecting team health risks from anonymized work patterns.',
                market: 'People teams need earlier warning signals without invasive employee surveillance.',
                monetization: 'Enterprise subscriptions with compliance and HRIS integrations.',
                audience: 'People ops, executive teams, remote-first companies.',
                stack: 'Privacy-preserving analytics, Slack metadata, HRIS connectors, trend dashboards.'
            }
        ],
        any: [
            {
                name: 'OriginMark',
                tagline: 'Authenticity infrastructure for distinguishing human-made and AI-generated creative work.',
                market: 'Creators and marketplaces need provenance without blocking AI-assisted workflows.',
                monetization: 'API verification fees and marketplace trust badges.',
                audience: 'Creative platforms, galleries, licensing marketplaces, publishers.',
                stack: 'Content fingerprints, blockchain attestations, browser extensions, verification API.'
            },
            {
                name: 'PantryPredict',
                tagline: 'A grocery autopilot that learns household consumption from smart-fridge and receipt signals.',
                market: 'Food waste and convenience spending create a clear consumer automation opportunity.',
                monetization: 'Affiliate grocery revenue plus premium household planning subscriptions.',
                audience: 'Busy households, meal planners, grocery delivery partners.',
                stack: 'IoT weight sensors, recommendation models, retailer APIs, mobile app.'
            }
        ]
    };

    function scrollTerminal() {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function setButtonLoading(isLoading) {
        generateBtn.disabled = isLoading;
        generateBtn.setAttribute('aria-busy', String(isLoading));
        generateBtn.innerHTML = isLoading
            ? '<i class="fas fa-circle-notch fa-spin"></i> Synthesizing'
            : '<i class="fas fa-bolt"></i> Generate Idea';
    }

    function appendLine(text, className = 'sys-msg') {
        const line = document.createElement('p');
        line.className = `${className} terminal-line`;
        line.textContent = text;
        terminalBody.appendChild(line);
        scrollTerminal();
        return line;
    }

    async function typeLine(text, className = 'streaming-line', speed = 18) {
        const line = document.createElement('p');
        const cursor = document.createElement('span');
        line.className = `${className} terminal-line`;
        cursor.className = 'terminal-cursor';
        line.appendChild(cursor);
        terminalBody.appendChild(line);

        if (prefersReducedMotion) {
            line.textContent = text;
            scrollTerminal();
            return line;
        }

        for (const char of text) {
            cursor.before(document.createTextNode(char));
            scrollTerminal();
            await sleep(speed + Math.random() * 14);
        }

        cursor.remove();
        return line;
    }

    async function typeResultField(card, label, value) {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.innerHTML = `<span>${label}</span><p></p>`;
        card.querySelector('.result-grid').appendChild(item);

        const target = item.querySelector('p');
        if (prefersReducedMotion) {
            target.textContent = value;
            return;
        }

        for (const char of value) {
            target.textContent += char;
            scrollTerminal();
            await sleep(7);
        }
    }

    async function renderResultCard(idea) {
        const card = document.createElement('article');
        card.className = 'result-card';
        card.setAttribute('aria-label', `Generated startup result: ${idea.name}`);
        card.innerHTML = `
            <div>
                <h3></h3>
                <p class="result-tagline"></p>
            </div>
            <div class="result-grid"></div>
        `;
        terminalBody.appendChild(card);

        card.querySelector('h3').textContent = idea.name;
        await typeInto(card.querySelector('.result-tagline'), idea.tagline, 10);
        await typeResultField(card, 'Market potential', idea.market);
        await typeResultField(card, 'Monetization', idea.monetization);
        await typeResultField(card, 'Target audience', idea.audience);
        await typeResultField(card, 'Tech stack', idea.stack);
        scrollTerminal();
    }

    async function typeInto(element, text, speed = 14) {
        if (prefersReducedMotion) {
            element.textContent = text;
            return;
        }

        for (const char of text) {
            element.textContent += char;
            scrollTerminal();
            await sleep(speed);
        }
    }

    function chooseIdea(industry) {
        const sourceKey = industry === 'any'
            ? ['any', 'saas', 'fintech'][Math.floor(Math.random() * 3)]
            : industry;
        const list = ideasDB[sourceKey] || ideasDB.any;
        return list[Math.floor(Math.random() * list.length)];
    }

    async function runGeneration() {
        setButtonLoading(true);
        const industry = industrySelect.value;
        const selectedIdea = chooseIdea(industry);

        appendLine(`> request accepted | sector=${industry.toUpperCase()}`, 'sys-msg');
        await sleep(240);
        await typeLine('> scanning venture graph: pain intensity, budget owner, wedge clarity...', 'streaming-line');
        await sleep(220);
        await typeLine('> ranking monetization paths and technical feasibility...', 'streaming-line');
        await sleep(260);
        await typeLine('> compressing opportunity into launch-ready startup brief...', 'streaming-line');
        await sleep(220);
        appendLine('> SYNTHESIS COMPLETE | structured concept unlocked', 'sys-msg');
        await renderResultCard(selectedIdea);
        appendLine('> ready for next prompt', 'gen-msg');
        setButtonLoading(false);
    }

    // Premium custom dropdown that keeps the native select as the source of truth.
    if (customSelect) {
        const trigger = customSelect.querySelector('.select-trigger');
        const triggerLabel = trigger.querySelector('span');
        const options = Array.from(customSelect.querySelectorAll('[role="option"]'));

        function closeSelect() {
            customSelect.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
        }

        function openSelect() {
            customSelect.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
        }

        function selectOption(option) {
            options.forEach((item) => item.setAttribute('aria-selected', 'false'));
            option.setAttribute('aria-selected', 'true');
            industrySelect.value = option.dataset.value;
            triggerLabel.textContent = option.textContent;
            industrySelect.dispatchEvent(new Event('change', { bubbles: true }));
            closeSelect();
            trigger.focus();
        }

        trigger.addEventListener('click', () => {
            customSelect.classList.contains('open') ? closeSelect() : openSelect();
        });

        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openSelect();
                options.find((item) => item.getAttribute('aria-selected') === 'true')?.focus?.();
            }

            if (event.key === 'Escape') {
                closeSelect();
            }
        });

        options.forEach((option) => {
            option.tabIndex = 0;
            option.addEventListener('click', () => selectOption(option));
            option.addEventListener('keydown', (event) => {
                const index = options.indexOf(option);

                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectOption(option);
                }

                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    options[(index + 1) % options.length].focus();
                }

                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    options[(index - 1 + options.length) % options.length].focus();
                }

                if (event.key === 'Escape') {
                    closeSelect();
                    trigger.focus();
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (!customSelect.contains(event.target)) {
                closeSelect();
            }
        });
    }

    if (generateBtn && industrySelect && terminalBody) {
        generateBtn.addEventListener('click', () => {
            if (!generateBtn.disabled) {
                runGeneration();
            }
        });
    }

    // Lightweight reveal animation for existing content sections.
    const revealTargets = document.querySelectorAll('.idea-card, .submit-wrapper, .blog-card');
    revealTargets.forEach((element) => element.classList.add('reveal'));

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.16 });

        revealTargets.forEach((element) => observer.observe(element));
    } else {
        revealTargets.forEach((element) => element.classList.add('is-visible'));
    }

    const submitForm = document.getElementById('submit-form');
    if (submitForm) {
        submitForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const btn = submitForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Uploading';

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Uploaded';
                btn.classList.replace('secondary', 'primary');

                setTimeout(() => {
                    submitForm.reset();
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                    btn.classList.replace('primary', 'secondary');
                }, 2200);
            }, 1100);
        });
    }
});
