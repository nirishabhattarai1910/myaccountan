document.addEventListener('DOMContentLoaded', () => {
            const hamburger = document.querySelector('.hamburger');
            const mobileNavlinks = document.querySelector('.mobile-navlinks');
            const closeBtn = document.querySelector('.mobile-navlinks .close-btn');
            const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
            const allDropdowns = document.querySelectorAll('.dropdown');
            const accordionHeaders = document.querySelectorAll('.accordion-header');

            // Function to toggle mobile menu
            function toggleMobileMenu() {
                mobileNavlinks.classList.toggle('active');
                mobileMenuOverlay.classList.toggle('active');
                document.body.style.overflow = mobileNavlinks.classList.contains('active') ? 'hidden' : ''; // Prevent scrolling when menu is open
            }

            // Open mobile menu
            hamburger.addEventListener('click', toggleMobileMenu);

            // Close mobile menu
            closeBtn.addEventListener('click', toggleMobileMenu);
            mobileMenuOverlay.addEventListener('click', toggleMobileMenu); // Close when clicking outside menu

            // Handle dropdowns for both desktop and mobile
            allDropdowns.forEach(dropdown => {
                const dropdownToggle = dropdown.querySelector('.dropdown > a');
                // Use a data attribute to track if the dropdown was opened by a click
                dropdownToggle.dataset.clicked = 'false';

                dropdownToggle.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent default link behavior

                    const wasClicked = dropdownToggle.dataset.clicked === 'true';

                    // Close all other dropdowns (both desktop and mobile)
                    allDropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                            otherDropdown.classList.remove('active');
                            otherDropdown.querySelector('.dropdown > a').dataset.clicked = 'false'; // Reset click state for others
                        }
                    });

                    // Toggle the clicked dropdown's 'active' class
                    dropdown.classList.toggle('active');
                    // Toggle the clicked state
                    dropdownToggle.dataset.clicked = wasClicked ? 'false' : 'true';
                });

                // Add hover functionality for desktop only
                dropdown.addEventListener('mouseenter', () => {
                    if (window.innerWidth > 992) {
                        // Only add 'active' on hover if it's not currently open due to a click
                        if (dropdownToggle.dataset.clicked === 'false') {
                            dropdown.classList.add('active');
                        }
                    }
                });

                dropdown.addEventListener('mouseleave', () => {
                    if (window.innerWidth > 992) {
                        // Only remove 'active' on mouseleave if it was not opened by a click
                        if (dropdownToggle.dataset.clicked === 'false') {
                            dropdown.classList.remove('active');
                        }
                    }
                });
            });

            // Close dropdowns when clicking anywhere outside the navbar, mobile menu, or FAQ accordion
            document.addEventListener('click', (e) => {
                const isClickInsideNavbar = e.target.closest('.navbar');
                const isClickInsideMobileMenu = e.target.closest('.mobile-navlinks');
                const isClickInsideAccordion = e.target.closest('.accordion-item');

                // If the click is outside all these elements, close all active dropdowns
                if (!isClickInsideNavbar && !isClickInsideMobileMenu && !isClickInsideAccordion) {
                    allDropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                        dropdown.querySelector('.dropdown > a').dataset.clicked = 'false'; // Reset click state
                    });
                }
            });

            // Close mobile menu if window is resized to desktop size
            window.addEventListener('resize', () => {
                if (window.innerWidth > 992 && mobileNavlinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });

            // Accordion functionality for FAQ
            accordionHeaders.forEach(header => {
                header.addEventListener('click', () => {
                    const accordionItem = header.parentElement;
                    const isActive = accordionItem.classList.contains('active');

                    // Close all other open accordion items
                    accordionHeaders.forEach(otherHeader => {
                        const otherItem = otherHeader.parentElement;
                        if (otherItem !== accordionItem && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });

                    // Toggle the clicked accordion item
                    accordionItem.classList.toggle('active');
                });
            });
        });