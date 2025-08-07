// =========================
// BLOG PAGE JAVASCRIPT
// =========================

document.addEventListener('DOMContentLoaded', function() {
    
    // Category Filter
    const categoryTags = document.querySelectorAll('.category-tag');
    const blogCards = document.querySelectorAll('.blog-card');
    
    categoryTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tag
            categoryTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter blog cards
            blogCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Search Functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase();
            
            blogCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // If no results, show message
            const visibleCards = document.querySelectorAll('.blog-card[style*="flex"]');
            if (visibleCards.length === 0) {
                showNoResults();
            } else {
                hideNoResults();
            }
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'newsletter-success';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Inscrição realizada com sucesso!</p>
            `;
            
            this.appendChild(successMessage);
            emailInput.value = '';
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }
    
    // Pagination
    const pageButtons = document.querySelectorAll('.page-btn:not([disabled])');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            pageButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            if (!this.querySelector('i')) {
                this.classList.add('active');
            }
            
            // Scroll to top of articles
            const articlesSection = document.querySelector('.blog-grid-section');
            if (articlesSection) {
                articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Simulate loading new articles
            blogCards.forEach(card => {
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = 'fadeIn 0.5s ease';
                }, 100);
            });
        });
    });
    
    // Download Guide Button
    const downloadBtns = document.querySelectorAll('.download-widget .btn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show download modal
            showDownloadModal();
        });
    });
    
    // Show No Results Message
    function showNoResults() {
        const existingMessage = document.querySelector('.no-results');
        if (!existingMessage) {
            const articlesGrid = document.querySelector('.articles-grid');
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results';
            noResultsDiv.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>Nenhum artigo encontrado</h3>
                <p>Tente buscar por outros termos ou navegue pelas categorias.</p>
            `;
            articlesGrid.appendChild(noResultsDiv);
        }
    }
    
    // Hide No Results Message
    function hideNoResults() {
        const noResultsDiv = document.querySelector('.no-results');
        if (noResultsDiv) {
            noResultsDiv.remove();
        }
    }
    
    // Show Download Modal
    function showDownloadModal() {
        const modal = document.createElement('div');
        modal.className = 'download-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3>Baixar Guia de Regularização 2024</h3>
                <p>Preencha seus dados para receber o material no e-mail:</p>
                <form class="download-form">
                    <input type="text" placeholder="Nome completo" required>
                    <input type="email" placeholder="E-mail corporativo" required>
                    <input type="text" placeholder="Empresa" required>
                    <button type="submit" class="btn btn-primary btn-block">
                        <i class="fas fa-download"></i> Enviar e Baixar
                    </button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        // Handle form submission
        const downloadForm = modal.querySelector('.download-form');
        downloadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success
            this.innerHTML = `
                <div class="download-success">
                    <i class="fas fa-check-circle"></i>
                    <h4>Material enviado!</h4>
                    <p>Verifique seu e-mail em alguns instantes.</p>
                </div>
            `;
            
            // Close modal after 3 seconds
            setTimeout(() => {
                modal.remove();
            }, 3000);
        });
        
        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // Add necessary styles
    const style = document.createElement('style');
    style.textContent = `
        .newsletter-success {
            background: rgba(255, 255, 255, 0.2);
            padding: 1rem;
            border-radius: var(--radius);
            margin-top: 1rem;
            text-align: center;
            animation: slideInUp 0.5s ease;
        }
        
        .newsletter-success i {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            color: var(--white);
        }
        
        .newsletter-success p {
            margin: 0;
            color: var(--white);
        }
        
        .no-results {
            grid-column: 1 / -1;
            text-align: center;
            padding: 4rem 2rem;
            background: var(--white);
            border-radius: var(--radius);
            box-shadow: var(--shadow-md);
        }
        
        .no-results i {
            font-size: 4rem;
            color: var(--text-secondary);
            margin-bottom: 1rem;
            opacity: 0.5;
        }
        
        .no-results h3 {
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }
        
        .no-results p {
            color: var(--text-secondary);
        }
        
        .download-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: var(--white);
            padding: 2.5rem;
            border-radius: var(--radius);
            max-width: 500px;
            width: 90%;
            position: relative;
            animation: slideInUp 0.3s ease;
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: var(--text-secondary);
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            color: var(--text-primary);
            transform: rotate(90deg);
        }
        
        .modal-content h3 {
            margin-bottom: 0.75rem;
            color: var(--text-primary);
        }
        
        .modal-content p {
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
        }
        
        .download-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .download-form input {
            padding: 0.875rem;
            border: 2px solid var(--border);
            border-radius: var(--radius);
            font-size: 1rem;
        }
        
        .download-form input:focus {
            outline: none;
            border-color: var(--primary);
        }
        
        .download-success {
            text-align: center;
            padding: 2rem;
        }
        
        .download-success i {
            font-size: 3rem;
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        .download-success h4 {
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }
        
        .download-success p {
            color: var(--text-secondary);
            margin: 0;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Animate blog cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    blogCards.forEach(card => {
        observer.observe(card);
    });
});
