// Main Application Script for GitHub Pages
class CVApp {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.cvData = {
            personal: {},
            education: [],
            experience: [],
            skills: {}
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSampleData();
        this.updateUI();
        this.checkOnlineStatus();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href');
                this.scrollToSection(target);
            });
        });

        // Mobile menu toggle
        document.querySelector('.nav-toggle')?.addEventListener('click', () => {
            document.querySelector('.nav-menu').classList.toggle('show');
        });

        // Form navigation
        document.querySelector('.btn-next')?.addEventListener('click', () => this.nextStep());

        // Template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const template = e.currentTarget.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.selectTemplate(template);
            });
        });
    }

    loadSampleData() {
        // Load sample data for demo
        this.cvData = {
            personal: {
                name: "Md. Shihab Hossain",
                email: "shihab@example.com",
                phone: "013********",
                location: "সিরাজগঞ্জ, রাজশাহী"
            },
            education: [
                {
                    degree: "উচ্চমাধ্যমিক (এইচএসসি)",
                    institute: "সিরাজগঞ্জ সরকারি কলেজ",
                    year: "2018-2020",
                    grade: "জিপিএ ৪.৫০"
                }
            ],
            experience: [
                {
                    title: "অফিস সহকারী",
                    company: "স্থানীয় প্রতিষ্ঠান",
                    duration: "২০২১ - বর্তমান",
                    responsibilities: "• দৈনন্দিন অফিস কাজ\n• ফাইলিং এবং ডকুমেন্টেশন\n• গ্রাহক সেবা"
                }
            ],
            skills: {
                technical: "Microsoft Office, Email, Internet",
                soft: "যোগাযোগ, টিমওয়ার্ক, সমস্যা সমাধান",
                languages: "বাংলা, ইংরেজি"
            }
        };

        // Update form fields
        this.updateFormFields();
    }

    updateFormFields() {
        const { personal } = this.cvData;
        
        document.getElementById('name').value = personal.name || '';
        document.getElementById('email').value = personal.email || '';
        document.getElementById('phone').value = personal.phone || '';
        document.getElementById('location').value = personal.location || '';
    }

    updateUI() {
        // Update active step
        document.querySelectorAll('.step').forEach((step, index) => {
            step.classList.toggle('active', index + 1 === this.currentStep);
        });

        // Update form steps
        document.querySelectorAll('.form-step').forEach((formStep, index) => {
            formStep.classList.toggle('active', index + 1 === this.currentStep);
        });

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateUI();
            this.scrollToSection('#create');
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    }

    selectTemplate(template) {
        // Show success message
        this.showNotification(`"${template}" টেমপ্লেট নির্বাচন করা হয়েছে!`);
        
        // Update UI
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        event.currentTarget.classList.add('selected');
    }

    scrollToSection(sectionId) {
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    checkOnlineStatus() {
        if (!navigator.onLine) {
            this.showNotification('আপনি অফলাইনে আছেন। কিছু ফিচার কাজ নাও করতে পারে।', 'warning');
        }
    }

    // Export CV as PDF (using html2pdf)
    exportAsPDF() {
        const element = document.createElement('div');
        element.innerHTML = this.generateCVHTML();
        
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `${this.cvData.personal.name}_CV.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save();
        this.showNotification('CV PDF হিসেবে ডাউনলোড হয়েছে!', 'success');
    }

    generateCVHTML() {
        const { personal, education, experience, skills } = this.cvData;
        
        return `
            <div style="font-family: 'Hind Siliguri', sans-serif; padding: 30px; max-width: 800px; margin: 0 auto;">
                <h1 style="text-align: center; color: #2563eb; margin-bottom: 10px;">${personal.name}</h1>
                <div style="text-align: center; margin-bottom: 30px; color: #666;">
                    ${personal.email ? `${personal.email} • ` : ''}
                    ${personal.phone ? `${personal.phone} • ` : ''}
                    ${personal.location || ''}
                </div>
                
                ${education.length > 0 ? `
                <h2 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px; margin-bottom: 20px;">শিক্ষাগত যোগ্যতা</h2>
                ${education.map(edu => `
                    <div style="margin-bottom: 15px;">
                        <h3 style="margin: 0; color: #333;">${edu.degree}</h3>
                        <p style="margin: 5px 0; color: #666;">${edu.institute} • ${edu.year}</p>
                        ${edu.grade ? `<p style="color: #2563eb; font-weight: bold;">${edu.grade}</p>` : ''}
                    </div>
                `).join('')}
                ` : ''}
                
                ${experience.length > 0 ? `
                <h2 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px; margin-bottom: 20px;">কাজের অভিজ্ঞতা</h2>
                ${experience.map(exp => `
                    <div style="margin-bottom: 20px;">
                        <h3 style="margin: 0; color: #333;">${exp.title}</h3>
                        <p style="margin: 5px 0; color: #666;">${exp.company} • ${exp.duration}</p>
                        <p style="color: #555; white-space: pre-line;">${exp.responsibilities}</p>
                    </div>
                `).join('')}
                ` : ''}
                
                ${skills.technical || skills.soft || skills.languages ? `
                <h2 style="border-bottom: 2px solid #2563eb; padding-bottom: 5px; margin-bottom: 20px;">দক্ষতা</h2>
                ${skills.technical ? `<p><strong>প্রযুক্তিগত:</strong> ${skills.technical}</p>` : ''}
                ${skills.soft ? `<p><strong>নরম স্কিল:</strong> ${skills.soft}</p>` : ''}
                ${skills.languages ? `<p><strong>ভাষা:</strong> ${skills.languages}</p>` : ''}
                ` : ''}
                
                <div style="margin-top: 40px; text-align: center; color: #999; font-size: 12px;">
                    CV AI Bot দ্বারা তৈরি • ${new Date().toLocaleDateString('bn-BD')}
                </div>
            </div>
        `;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cvApp = new CVApp();
    
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #1e293b;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        }
        
        .notification.success {
            background: #10b981;
        }
        
        .notification.warning {
            background: #f59e0b;
        }
        
        .notification.error {
            background: #ef4444;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .nav-menu.show {
            display: flex !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .template-card.selected {
            border: 3px solid #2563eb;
            transform: scale(1.02);
        }
    `;
    document.head.appendChild(style);
});

// Global functions for HTML onclick events
function startCreatingCV() {
    window.cvApp.scrollToSection('#create');
    window.cvApp.showNotification('CV তৈরি শুরু করুন!', 'success');
}

function showTemplates() {
    window.cvApp.scrollToSection('#templates');
}

// Handle online/offline status
window.addEventListener('online', () => {
    window.cvApp?.showNotification('ইন্টারনেট সংযোগ পুনরুদ্ধার হয়েছে!', 'success');
});

window.addEventListener('offline', () => {
    window.cvApp?.showNotification('আপনি অফলাইনে আছেন।', 'warning');
});

// PWA Support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js').then(
            function(registration) {
                console.log('Service Worker registered with scope:', registration.scope);
            },
            function(err) {
                console.log('Service Worker registration failed:', err);
            }
        );
    });
}
