document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.getElementById('faq-container');
    const faqDataPath = 'assets/data/faq_data.json';

    if (!faqContainer) return;

    // Fetch FAQ Data
    fetch(faqDataPath)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            renderFAQ(data, faqContainer);
        })
        .catch(error => {
            console.error('Error fetching FAQ data:', error);
            faqContainer.innerHTML = '<p class="text-center">Unable to load FAQs at this time. Please try again later.</p>';
        });

    function renderFAQ(data, container) {
        container.innerHTML = ''; // Clear loading text

        if (data.length === 0) {
            container.innerHTML = '<p class="text-center">No FAQs found.</p>';
            return;
        }

        data.forEach(category => {
            // Create Category Element
            const categoryEl = document.createElement('div');
            categoryEl.classList.add('faq-category');

            // Category Header
            const headerEl = document.createElement('div');
            headerEl.classList.add('faq-category-header');
            headerEl.innerHTML = `
        <h3>${category.category}</h3>
        <span class="icon-toggle">+</span>
      `;

            // Questions Container
            const questionsContainer = document.createElement('div');
            questionsContainer.classList.add('faq-questions');

            // Add Questions
            category.items.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.classList.add('faq-item');

                const questionEl = document.createElement('div');
                questionEl.classList.add('faq-question');
                questionEl.innerHTML = `
          <span>${item.question}</span>
          <span class="icon-toggle-sm">+</span>
        `;

                const answerEl = document.createElement('div');
                answerEl.classList.add('faq-answer');
                answerEl.innerHTML = `<p>${item.answer}</p>`;

                // Question Click Event
                questionEl.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent bubbling to category
                    const isActive = itemEl.classList.contains('active');

                    // Close other questions in this category (optional - "accordion" style? User didn't specify strict accordion, but it's cleaner. User said "select the question show the answer")
                    // Let's keep it simple: toggle current.

                    itemEl.classList.toggle('active');
                    const icon = questionEl.querySelector('.icon-toggle-sm');
                    icon.textContent = itemEl.classList.contains('active') ? '-' : '+';

                    if (itemEl.classList.contains('active')) {
                        answerEl.style.maxHeight = answerEl.scrollHeight + "px";
                    } else {
                        answerEl.style.maxHeight = null;
                    }
                });

                itemEl.appendChild(questionEl);
                itemEl.appendChild(answerEl);
                questionsContainer.appendChild(itemEl);
            });

            // Category Click Event
            headerEl.addEventListener('click', () => {
                const isActive = categoryEl.classList.contains('active');

                // Optional: Close other categories? User said "Not all FAQ shall be loaded", maybe expandable format implies minimizing others. I'll toggle.
                categoryEl.classList.toggle('active');

                const icon = headerEl.querySelector('.icon-toggle');
                icon.textContent = categoryEl.classList.contains('active') ? '-' : '+';

                if (categoryEl.classList.contains('active')) {
                    questionsContainer.style.maxHeight = questionsContainer.scrollHeight + "px"; // Basic calc, might need resize observer if content changes or rigid max-height
                    // For nested dynamic height, scrollHeight might be tricky if children expand. 
                    // Better approach: set max-height to a large value or 'none' after transition? 
                    // CSS-only max-height transition usually requires a fixed value. 
                    // I'll set a large max-height in CSS for 'active' state or calculate.
                    // Actually, if I use JS for height, I can handle it. 
                    // But if inner items expand, outer container needs to grow.
                    // Use 'none' after transition? Or just large value.
                    questionsContainer.style.maxHeight = "5000px"; // Simpler
                } else {
                    questionsContainer.style.maxHeight = null;
                }
            });

            categoryEl.appendChild(headerEl);
            categoryEl.appendChild(questionsContainer);
            container.appendChild(categoryEl);
        });
    }
});
